import JSZip from 'jszip';
import type { MaterialPack } from '../types/materialpackTypes';
import { type VersionRange, applyTemplate, loadTemplate } from './utils/template';

// All Weapon Types
const WEAPON_TYPES = ['dagger', 'hammer', 'club', 'spear', 'quarterstaff', 'glaive'] as const;
type WeaponType = (typeof WEAPON_TYPES)[number];

// Weapon Types with held variants only
const HELD_VARIANT_WEAPONS = ['spear', 'glaive', 'quarterstaff'] as const;
type HeldVariantWeapon = (typeof HELD_VARIANT_WEAPONS)[number];

interface FabricModCondition {
	condition: 'fabric:all_mods_loaded';
	values: string[];
}

interface FabricNotModCondition {
	condition: 'fabric:not';
	value: FabricModCondition;
}

interface FabricLoadCondition {
	condition: 'fabric:all_mods_loaded';
	values: string[];
}

interface NeoForgeModCondition {
	type: 'neoforge:mod_loaded';
	modid: string;
}

interface NeoForgeNotModCondition {
	type: 'neoforge:not';
	value: NeoForgeModCondition;
}

interface NeoForgeLoadCondition {
	type: 'neoforge:mod_loaded';
	modid: string;
}

interface RecipeTemplate {
	type: 'minecraft:crafting_shaped';
	group?: string;
	pattern: string[];
	key: Record<string, any>;
	result: {
		id: string;
		count: number;
		required?: boolean;
	};
	'fabric:load_conditions'?: (FabricLoadCondition | FabricNotModCondition | FabricAndCondition)[];
	'neoforge:conditions'?: (
		| NeoForgeLoadCondition
		| NeoForgeNotModCondition
		| NeoForgeAndCondition
	)[];
}

// For dagger recipes with main/compat variants targeting farmersdelight
interface DaggerRecipeTemplate {
	main: RecipeTemplate;
	compat: RecipeTemplate;
}

// For club recipes with main/alt variants
interface ClubRecipeTemplate {
	main: RecipeTemplate;
	alt: RecipeTemplate;
}

interface SmithingRecipeTemplate {
	type: 'minecraft:smithing_transform';
	template: {
		item: string;
	};
	base: {
		item: string;
	};
	addition: {
		item: string;
	};
	result: {
		id: string;
		count: number;
	};
	'fabric:load_conditions'?: FabricLoadCondition[];
	'neoforge:conditions'?: NeoForgeLoadCondition[];
}

const BASE_WEAPON_REACH_BONUS = {
	dagger: -0.25,
	hammer: 0,
	club: 0,
	spear: 1.5,
	quarterstaff: 0.75,
	glaive: 0.75
} as const;
interface FabricAndCondition {
	condition: 'fabric:and';
	values: (FabricLoadCondition | FabricNotModCondition)[];
}

interface NeoForgeAndCondition {
	type: 'neoforge:and';
	values: (NeoForgeLoadCondition | NeoForgeNotModCondition)[];
}

export class MaterialPackBuilder {
	private materialPack: MaterialPack;
	private zip: JSZip;
	private versionRange: VersionRange;

	constructor(materialPack: MaterialPack, versionRange: VersionRange) {
		this.materialPack = materialPack;
		this.zip = new JSZip();
		this.versionRange = versionRange;
	}

	/**
	 * Gets a dagger recipe template structure.
	 */
	private async getDaggerTemplate(): Promise<DaggerRecipeTemplate> {
		const mainStr = await loadTemplate(this.versionRange, 'data/recipes/dagger.json');
		const compatStr = await loadTemplate(this.versionRange, 'data/recipes/dagger_compat.json');
		return {
			main: JSON.parse(mainStr) as RecipeTemplate,
			compat: JSON.parse(compatStr) as RecipeTemplate
		};
	}

	/**
	 * Gets a club recipe template structure. Handles variant naming differences between versions.
	 */
	private async getClubTemplate(): Promise<ClubRecipeTemplate> {
		const mainStr = await loadTemplate(this.versionRange, 'data/recipes/club.json');
		// 1.21 uses club_alt.json, 1.21.10 uses club_variant.json
		const variantFileName = this.versionRange === '1.21.10' ? 'club_variant.json' : 'club_alt.json';
		const variantStr = await loadTemplate(this.versionRange, `data/recipes/${variantFileName}`);
		return {
			main: JSON.parse(mainStr) as RecipeTemplate,
			alt: JSON.parse(variantStr) as RecipeTemplate
		};
	}

	/**
	 * Gets a recipe template for non-variant weapons.
	 */
	private async getStandardRecipeTemplate(weaponType: WeaponType): Promise<RecipeTemplate> {
		const templatePath = `data/recipes/${weaponType}.json`;
		const templateStr = await loadTemplate(this.versionRange, templatePath);
		return JSON.parse(templateStr) as RecipeTemplate;
	}

	/**
	 * Gets a smithing recipe template.
	 */
	private async getSmithingTemplate(): Promise<SmithingRecipeTemplate> {
		const templateStr = await loadTemplate(this.versionRange, 'data/recipes/smithing.json');
		return JSON.parse(templateStr) as SmithingRecipeTemplate;
	}

	/**
	 * Gets a model template.
	 */
	private async getModelTemplate(type: 'standard' | 'held'): Promise<Record<string, any>> {
		const templatePath = `assets/models/item/${type}.json`;
		const templateStr = await loadTemplate(this.versionRange, templatePath);
		return JSON.parse(templateStr);
	}

	private async generateRootPackMcmeta() {
		const templateStr = await loadTemplate(this.versionRange, 'root/pack.mcmeta.json');
		this.zip.file('pack.mcmeta', templateStr);
	}

	private async generateMaterialPackIcon() {
		if (this.materialPack.pack_icon) {
			const iconData = this.base64ToUint8Array(this.materialPack.pack_icon);
			this.zip.file('pack.png', iconData);
		}
	}

	private async generateLoadingRequirements() {
		if (this.materialPack.mod_dependency_modid) {
			const requirements = {
				requires_mod: this.materialPack.mod_dependency_modid
			};
			this.zip.file('loading_requirements.json', JSON.stringify(requirements, null, 2));
		}
	}

	private async generateDataPack() {
		const dataFolder = this.zip.folder('data');
		if (!dataFolder) throw new Error('Failed to create data folder');

		// Add pack.mcmeta with version-specific format (pack_format is already in the template)
		const templateStr = await loadTemplate(this.versionRange, 'data/pack.mcmeta.json');
		dataFolder.file('pack.mcmeta', templateStr);

		await this.generateRecipes(dataFolder);
		await this.generateTags(dataFolder);
		await this.generateRepairIngredientTags(dataFolder);
		await this.generateWeaponAttributes(dataFolder);
		await this.generateRecipeAdvancements(dataFolder);
	}

	private async generateResourcePack() {
		const resourceFolder = this.zip.folder('assets');
		if (!resourceFolder) throw new Error('Failed to create assets folder');

		// Add pack.mcmeta with version-specific format (pack_format is already in the template)
		const templateStr = await loadTemplate(this.versionRange, 'assets/pack.mcmeta.json');
		resourceFolder.file('pack.mcmeta', templateStr);

		await this.generateLanguageFiles(resourceFolder);
		await this.generateModels(resourceFolder);
		await this.generateItems(resourceFolder);
		await this.generateTextures(resourceFolder);
	}

	private async generateRecipes(dataFolder: JSZip) {
		const recipesFolder = dataFolder.folder('basicweapons/recipe');
		const compatFolder = recipesFolder?.folder('compat');
		if (!recipesFolder || !compatFolder) throw new Error('Failed to create recipe folders');

		for (const material of this.materialPack.materials) {
			const isTag = material.repair_ingredient.startsWith('#');
			// For 1.21.10: use direct string format (items are direct, tags have # prefix)
			// For 1.21-1.21.1: use nested object format with ingredient_type
			const baseVariables: Record<string, string | number> =
				this.versionRange === '1.21.10'
					? {
						material_name: material.material_name,
						repair_ingredient: material.repair_ingredient, // Keep # prefix for tags if present
						handle_ingredient: material.handle_ingredient
					}
					: {
						material_name: material.material_name,
						repair_ingredient: isTag ? material.repair_ingredient.slice(1) : material.repair_ingredient,
						ingredient_type: isTag ? 'tag' : 'item',
						handle_ingredient: material.handle_ingredient
					};

			// Create mod dependency conditions if a mod dependency exists
			let fabricCondition: FabricLoadCondition | undefined;
			let neoforgeCondition: NeoForgeLoadCondition | undefined;

			if (this.materialPack.mod_dependency_modid) {
				fabricCondition = {
					condition: 'fabric:all_mods_loaded',
					values: [this.materialPack.mod_dependency_modid]
				};
				neoforgeCondition = {
					type: 'neoforge:mod_loaded',
					modid: this.materialPack.mod_dependency_modid
				};
			}

			for (const weaponType of WEAPON_TYPES) {
				if (material.textures[weaponType] === null) continue;

				if (material.recipe_type === 'smithing') {
					// Generate smithing recipe
					const smithingVariables: Record<string, string | number> = {
						...baseVariables,
						weapon_type: weaponType,
						upgrade_smithing_template_ingredient: material.upgrade_smithing_template_ingredient,
						smithing_weapon_material_prefix: material.smithing_weapon_material_prefix
					};

					const smithingRecipe = await this.getSmithingTemplate();

					if (fabricCondition && neoforgeCondition) {
						smithingRecipe['fabric:load_conditions'] = [fabricCondition];
						smithingRecipe['neoforge:conditions'] = [neoforgeCondition];
					}

					recipesFolder.file(
						`${material.material_name}_${weaponType}_smithing.json`,
						JSON.stringify(
							JSON.parse(applyTemplate(JSON.stringify(smithingRecipe), smithingVariables)),
							null,
							2
						)
					);
					continue;
				}

				// Handle crafting recipes
				let template: RecipeTemplate | DaggerRecipeTemplate | ClubRecipeTemplate;
				if (weaponType === 'dagger') {
					template = await this.getDaggerTemplate();
				} else if (weaponType === 'club') {
					template = await this.getClubTemplate();
				} else {
					template = await this.getStandardRecipeTemplate(weaponType);
				}

				if (weaponType === 'dagger') {
					// Handle dagger recipes
					const daggerTemplate = template as DaggerRecipeTemplate;

					if (fabricCondition && neoforgeCondition) {
						// Main dagger recipe
						const mainRecipe: RecipeTemplate = {
							...daggerTemplate.main,
							result: {
								...daggerTemplate.main.result,
								required: this.materialPack.mod_dependency_modid ? false : undefined
							}
						};

						// Add load conditions
						mainRecipe['fabric:load_conditions'] = [
							{
								condition: 'fabric:and',
								values: [
									fabricCondition,
									{
										condition: 'fabric:not',
										value: { condition: 'fabric:all_mods_loaded', values: ['farmersdelight'] }
									}
								]
							}
						];

						mainRecipe['neoforge:conditions'] = [
							{
								type: 'neoforge:and',
								values: [
									neoforgeCondition,
									{
										type: 'neoforge:not',
										value: { type: 'neoforge:mod_loaded', modid: 'farmersdelight' }
									}
								]
							}
						];

						// Compat dagger recipe
						const compatRecipe: RecipeTemplate = {
							...daggerTemplate.compat,
							result: {
								...daggerTemplate.compat.result,
								required: this.materialPack.mod_dependency_modid ? false : undefined
							}
						};

						compatRecipe['fabric:load_conditions'] = [
							{
								condition: 'fabric:and',
								values: [
									fabricCondition,
									{ condition: 'fabric:all_mods_loaded', values: ['farmersdelight'] }
								]
							}
						];

						compatRecipe['neoforge:conditions'] = [
							{
								type: 'neoforge:and',
								values: [
									neoforgeCondition,
									{ type: 'neoforge:mod_loaded', modid: 'farmersdelight' }
								]
							}
						];

						// Generate both recipes
						recipesFolder.file(
							`${material.material_name}_dagger.json`,
							JSON.stringify(
								JSON.parse(applyTemplate(JSON.stringify(mainRecipe), baseVariables)),
								null,
								2
							)
						);
						compatFolder.file(
							`${material.material_name}_dagger.json`,
							JSON.stringify(
								JSON.parse(applyTemplate(JSON.stringify(compatRecipe), baseVariables)),
								null,
								2
							)
						);
					} else {
						// No mod dependency, use original dagger recipe generation logic
						recipesFolder.file(
							`${material.material_name}_dagger.json`,
							JSON.stringify(
								JSON.parse(applyTemplate(JSON.stringify(daggerTemplate.main), baseVariables)),
								null,
								2
							)
						);
						compatFolder.file(
							`${material.material_name}_dagger.json`,
							JSON.stringify(
								JSON.parse(applyTemplate(JSON.stringify(daggerTemplate.compat), baseVariables)),
								null,
								2
							)
						);
					}
				} else if (weaponType === 'club') {
					// Handle club recipes
					const clubTemplate = template as ClubRecipeTemplate;
					const mainRecipe: RecipeTemplate = {
						...clubTemplate.main,
						result: {
							...clubTemplate.main.result,
							required: this.materialPack.mod_dependency_modid ? false : undefined
						}
					};
					const altRecipe: RecipeTemplate = {
						...clubTemplate.alt,
						result: {
							...clubTemplate.alt.result,
							required: this.materialPack.mod_dependency_modid ? false : undefined
						}
					};

					if (fabricCondition && neoforgeCondition) {
						mainRecipe['fabric:load_conditions'] = [fabricCondition];
						mainRecipe['neoforge:conditions'] = [neoforgeCondition];
						altRecipe['fabric:load_conditions'] = [fabricCondition];
						altRecipe['neoforge:conditions'] = [neoforgeCondition];
					}

					recipesFolder.file(
						`${material.material_name}_club.json`,
						JSON.stringify(
							JSON.parse(applyTemplate(JSON.stringify(mainRecipe), baseVariables)),
							null,
							2
						)
					);
					recipesFolder.file(
						`${material.material_name}_club${this.versionRange === '1.21.10' ? '_variant' : '_alt'}.json`,
						JSON.stringify(
							JSON.parse(applyTemplate(JSON.stringify(altRecipe), baseVariables)),
							null,
							2
						)
					);
				} else {
					// Handle non-dagger recipes
					const baseRecipe: RecipeTemplate = {
						...(template as RecipeTemplate),
						result: {
							...(template as RecipeTemplate).result,
							required: this.materialPack.mod_dependency_modid ? false : undefined
						}
					};

					if (fabricCondition && neoforgeCondition) {
						baseRecipe['fabric:load_conditions'] = [fabricCondition];
						baseRecipe['neoforge:conditions'] = [neoforgeCondition];
					}

					recipesFolder.file(
						`${material.material_name}_${weaponType}.json`,
						JSON.stringify(
							JSON.parse(applyTemplate(JSON.stringify(baseRecipe), baseVariables)),
							null,
							2
						)
					);
				}
			}
		}
	}

	private async generateTags(dataFolder: JSZip) {
		const tagsFolder = dataFolder.folder('basicweapons/tags/item/tools');
		if (!tagsFolder) throw new Error('Failed to create tags folder');

		const weaponsByType = new Map(WEAPON_TYPES.map(type => [type, [] as string[]]));

		for (const material of this.materialPack.materials) {
			for (const weaponType of WEAPON_TYPES) {
				if (material.textures[weaponType] !== null) {
					const weaponId = `basicweapons:${material.material_name}_${weaponType}`;
					weaponsByType.get(weaponType)?.push(weaponId);
				}
			}
		}

		for (const [weaponType, weapons] of weaponsByType) {
			if (weapons.length > 0) {
				const fileName =
					weaponType === 'quarterstaff' ? 'quarterstaves.json' : `${weaponType}s.json`;

				// Load template and merge in the dynamic values array
				const templateStr = await loadTemplate(this.versionRange, 'data/tags/tool.json');
				const template = JSON.parse(templateStr);
				const content = {
					...template,
					values: weapons
				};
				tagsFolder.file(fileName, JSON.stringify(content, null, 2));
			}
		}
	}

	private async generateWeaponAttributes(dataFolder: JSZip) {
		const weaponAttributesFolder = dataFolder.folder('basicweapons/weapon_attributes');
		if (!weaponAttributesFolder) throw new Error('Failed to create weapon_attributes folder');

		for (const material of this.materialPack.materials) {
			for (const weaponType of WEAPON_TYPES) {
				// Only generate attribute file if the material has a texture for this weapon type
				if (material.textures[weaponType] !== null) {
					const fileName = `${material.material_name}_${weaponType}.json`;

					// Calculate total reach by adding base reach and material bonus
					let calculatedReachBonus = BASE_WEAPON_REACH_BONUS[weaponType] + material.reach_bonus;
					// Add small value to avoid no change being applied whatsoever
					if (calculatedReachBonus === 0) {
						calculatedReachBonus = 0.01;
					}

					const templateStr = await loadTemplate(this.versionRange, 'data/weapon_attributes/weapon_attribute.json');
					const variables = {
						weapon_type: weaponType,
						range_bonus: calculatedReachBonus.toFixed(2)
					};
					weaponAttributesFolder.file(fileName, applyTemplate(templateStr, variables));
				}
			}
		}
	}

	private capitalizeFirstLetter(str: string): string {
		// Split by underscore, capitalize each word, then join with space
		return str
			.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	private async generateLanguageFiles(resourceFolder: JSZip) {
		const langFolder = resourceFolder.folder('basicweapons/lang');
		if (!langFolder) throw new Error('Failed to create lang folder');

		// Create en_us.json
		const languageEntries: Record<string, string> = {};

		for (const material of this.materialPack.materials) {
			const materialNameCapitalized = this.capitalizeFirstLetter(material.material_name);

			for (const weaponType of WEAPON_TYPES) {
				// Only add language entry if the material has a texture for this weapon type
				if (material.textures[weaponType] !== null) {
					const key = `item.basicweapons.${material.material_name}_${weaponType}`;
					const weaponTypeCapitalized = this.capitalizeFirstLetter(weaponType);
					languageEntries[key] = `${materialNameCapitalized} ${weaponTypeCapitalized}`;
				}
			}
		}

		// Write the language file
		langFolder.file('en_us.json', JSON.stringify(languageEntries, null, 2));
	}

	private hasHeldVariant(weaponType: WeaponType): weaponType is HeldVariantWeapon {
		return HELD_VARIANT_WEAPONS.includes(weaponType as HeldVariantWeapon);
	}

	private async generateModels(resourceFolder: JSZip) {
		const modelsFolder = resourceFolder.folder('basicweapons/models/item');
		if (!modelsFolder) throw new Error('Failed to create models folder');

		for (const material of this.materialPack.materials) {
			for (const weaponType of WEAPON_TYPES) {
				// Skip if no texture exists for this weapon type
				if (material.textures[weaponType] === null) continue;

				const variables = {
					material_name: material.material_name,
					weapon_type: weaponType
				};

				// Generate standard model
				const standardFileName = `${material.material_name}_${weaponType}.json`;
				const standardModelTemplate = await this.getModelTemplate('standard');
				modelsFolder.file(
					standardFileName,
					JSON.stringify(
						JSON.parse(applyTemplate(JSON.stringify(standardModelTemplate), variables)),
						null,
						2
					)
				);

				// Generate held variant if applicable
				if (this.hasHeldVariant(weaponType)) {
					// Check if held texture exists
					const heldTextureKey = `${weaponType}_held` as keyof typeof material.textures;
					if (material.textures[heldTextureKey] !== null) {
						const heldFileName = `${material.material_name}_${weaponType}_held.json`;
						const heldModelTemplate = await this.getModelTemplate('held');
						modelsFolder.file(
							heldFileName,
							JSON.stringify(
								JSON.parse(applyTemplate(JSON.stringify(heldModelTemplate), variables)),
								null,
								2
							)
						);
					}
				}
			}
		}
	}

	private async generateItems(resourceFolder: JSZip) {
		// Only generate items folder for 1.21.10
		if (this.versionRange !== '1.21.10') {
			return;
		}

		const itemsFolder = resourceFolder.folder('basicweapons/items');
		if (!itemsFolder) throw new Error('Failed to create items folder');

		for (const material of this.materialPack.materials) {
			for (const weaponType of WEAPON_TYPES) {
				// Skip if no texture exists for this weapon type
				if (material.textures[weaponType] === null) continue;

				const variables = {
					material_name: material.material_name,
					weapon_type: weaponType
				};

				const fileName = `${material.material_name}_${weaponType}.json`;

				// Check if this weapon has a held variant
				if (this.hasHeldVariant(weaponType)) {
					const heldTextureKey = `${weaponType}_held` as keyof typeof material.textures;
					if (material.textures[heldTextureKey] !== null) {
						// Use held variant template
						const templateStr = await loadTemplate(this.versionRange, 'assets/items/held_variant.json');
						const template = JSON.parse(templateStr);
						itemsFolder.file(
							fileName,
							JSON.stringify(
								JSON.parse(applyTemplate(JSON.stringify(template), variables)),
								null,
								2
							)
						);
					} else {
						// Has held variant position but no texture, use simple template
						const templateStr = await loadTemplate(this.versionRange, 'assets/items/simple.json');
						const template = JSON.parse(templateStr);
						itemsFolder.file(
							fileName,
							JSON.stringify(
								JSON.parse(applyTemplate(JSON.stringify(template), variables)),
								null,
								2
							)
						);
					}
				} else {
					// Use simple template for weapons without held variants
					const templateStr = await loadTemplate(this.versionRange, 'assets/items/simple.json');
					const template = JSON.parse(templateStr);
					itemsFolder.file(
						fileName,
						JSON.stringify(
							JSON.parse(applyTemplate(JSON.stringify(template), variables)),
							null,
							2
						)
					);
				}
			}
		}
	}

	private base64ToUint8Array(base64: string): Uint8Array {
		const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
		const binaryString = atob(base64Data);
		const bytes = new Uint8Array(binaryString.length);
		for (let i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		return bytes;
	}

	private async generateTextures(resourceFolder: JSZip) {
		const texturesFolder = resourceFolder.folder('basicweapons/textures/item');
		if (!texturesFolder) throw new Error('Failed to create textures folder');

		for (const material of this.materialPack.materials) {
			// Process each weapon type
			for (const weaponType of WEAPON_TYPES) {
				const textureKey = weaponType as keyof typeof material.textures;
				const texture = material.textures[textureKey];

				if (texture) {
					const fileName = `${material.material_name}_${weaponType}.png`;
					const textureData = this.base64ToUint8Array(texture);
					texturesFolder.file(fileName, textureData);
				}

				// Handle held variants for applicable weapons
				if (this.hasHeldVariant(weaponType)) {
					const heldTextureKey = `${weaponType}_held` as keyof typeof material.textures;
					const heldTexture = material.textures[heldTextureKey];

					if (heldTexture) {
						const fileName = `${material.material_name}_${weaponType}_held.png`;
						const textureData = this.base64ToUint8Array(heldTexture);
						texturesFolder.file(fileName, textureData);
					}
				}
			}
		}
	}

	private async generateRepairIngredientTags(dataFolder: JSZip) {
		// Only generate repair ingredient tags for 1.21.10(where ToolMaterial requires TagKey)
		if (this.versionRange !== '1.21.10') {
			return;
		}

		const tagsFolder = dataFolder.folder('basicweapons/tags/item');
		if (!tagsFolder) throw new Error('Failed to create basicweapons tags folder');

		for (const material of this.materialPack.materials) {
			// Only create tag if repair_ingredient is an item (doesn't start with #)
			if (material.repair_ingredient.startsWith('#')) {
				continue;
			}

			const tagFileName = `${material.material_name}_tool_materials.json`;
			const tagContent = {
				values: [material.repair_ingredient]
			};

			tagsFolder.file(tagFileName, JSON.stringify(tagContent, null, 2));
		}
	}

	private async generateCustomMaterials() {
		const customMaterialsFolder = this.zip.folder('custom_materials');
		if (!customMaterialsFolder) throw new Error('Failed to create custom_materials folder');

		for (const material of this.materialPack.materials) {
			const fileName = `${material.material_name}.json`;

			// For 1.21.10, if repair_ingredient is an item (not a tag), reference the generated tag
			// Otherwise, use the repair_ingredient directly (keeping # prefix for tags)
			let repairIngredientReference: string;
			if (this.versionRange === '1.21.10' && !material.repair_ingredient.startsWith('#')) {
				// Item-based repair ingredient: reference the generated tag
				repairIngredientReference = `#basicweapons:${material.material_name}_tool_materials`;
			} else {
				// Tag-based repair ingredient (already has #) or older version: use as-is
				repairIngredientReference = material.repair_ingredient;
			}

			const templateStr = await loadTemplate(this.versionRange, 'custom_materials/material.json');
			const variables = {
				material_name: material.material_name,
				durability: material.durability,
				attack_damage_bonus: material.attack_damage_bonus,
				attack_speed_bonus: material.attack_speed_bonus,
				reach_bonus: material.reach_bonus,
				enchantability: material.enchantability,
				repair_ingredient: repairIngredientReference
			};
			customMaterialsFolder.file(fileName, applyTemplate(templateStr, variables));
		}
	}

	private async generateRecipeAdvancements(dataFolder: JSZip) {
		const advancementsFolder = dataFolder.folder('basicweapons/advancement/recipes');
		if (!advancementsFolder) throw new Error('Failed to create advancements folder');

		for (const material of this.materialPack.materials) {
			const isTag = material.repair_ingredient.startsWith('#');
			const criteriaId = `got_${material.material_name}_material`;

			// Build the list of recipes to reward
			const recipes: string[] = [];
			for (const weaponType of WEAPON_TYPES) {
				if (material.textures[weaponType] === null) continue;

				// Add recipe with appropriate suffix for smithing recipes
				if (material.recipe_type === 'smithing') {
					recipes.push(`basicweapons:${material.material_name}_${weaponType}_smithing`);
				} else {
					recipes.push(`basicweapons:${material.material_name}_${weaponType}`);
					if (weaponType === 'club') {
						const variantSuffix = this.versionRange === '1.21.10' ? '_variant' : '_alt';
						recipes.push(`basicweapons:${material.material_name}_${weaponType}${variantSuffix}`);
					}
				}
			}

			if (recipes.length === 0) continue;

			const templateStr = await loadTemplate(this.versionRange, 'data/advancement/recipes/advancement.json');
			const repairIngredient = isTag ? material.repair_ingredient.slice(1) : material.repair_ingredient;
			const template = JSON.parse(templateStr);
			const criteriaKey = `got_${material.material_name}_material`;
			const processedTemplate: any = {
				...template,
				criteria: {
					[criteriaKey]: {
						...template.criteria[`got_{{material_name}}_material`],
						conditions: {
							items: [
								{
									items: [
										repairIngredient
									]
								}
							]
						}
					}
				},
				requirements: [
					[criteriaKey]
				],
				rewards: {
					recipes: recipes
				}
			};

			const fileName = `got_${material.material_name}_material.json`;
			advancementsFolder.file(fileName, JSON.stringify(processedTemplate, null, 2));
		}
	}

	async build(): Promise<Blob> {
		await this.generateRootPackMcmeta();
		await this.generateMaterialPackIcon();
		await this.generateLoadingRequirements();
		await this.generateDataPack();
		await this.generateResourcePack();
		await this.generateCustomMaterials();
		return this.zip.generateAsync({ type: 'blob' });
	}
}

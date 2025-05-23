import JSZip from 'jszip';
import type { MaterialPack } from '../types/materialpackTypes';
import { PACK_FORMAT_VERSIONS, applyTemplate } from './utils/template';

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

// Union type for all variant possibilities
type VariantRecipeTemplate = DaggerRecipeTemplate | ClubRecipeTemplate;

type RecipeTemplates = {
	dagger: DaggerRecipeTemplate;
	club: ClubRecipeTemplate;
	hammer: RecipeTemplate;
	spear: RecipeTemplate;
	quarterstaff: RecipeTemplate;
	glaive: RecipeTemplate;
};

// Recipe templates
const RECIPE_TEMPLATES: RecipeTemplates = {
	club: {
		main: {
			type: 'minecraft:crafting_shaped',
			group: '{{material_name}}_club',
			pattern: [' #', '# ', '/ '],
			key: {
				'#': { '{{ingredient_type}}': '{{repair_ingredient}}' },
				'/': { item: '{{handle_ingredient}}' }
			},
			result: { id: 'basicweapons:{{material_name}}_club', count: 1 }
		},
		alt: {
			type: 'minecraft:crafting_shaped',
			group: '{{material_name}}_club',
			pattern: ['# ', ' #', ' /'],
			key: {
				'#': { '{{ingredient_type}}': '{{repair_ingredient}}' },
				'/': { item: '{{handle_ingredient}}' }
			},
			result: { id: 'basicweapons:{{material_name}}_club', count: 1 }
		}
	},
	dagger: {
		main: {
			type: 'minecraft:crafting_shaped',
			pattern: ['#', '/'],
			key: {
				'#': { '{{ingredient_type}}': '{{repair_ingredient}}' },
				'/': { item: '{{handle_ingredient}}' }
			},
			result: { id: 'basicweapons:{{material_name}}_dagger', count: 1 },
			'fabric:load_conditions': [
				{
					condition: 'fabric:not',
					value: { condition: 'fabric:all_mods_loaded', values: ['farmersdelight'] }
				}
			],
			'neoforge:conditions': [
				{
					type: 'neoforge:not',
					value: { type: 'neoforge:mod_loaded', modid: 'farmersdelight' }
				}
			]
		},
		compat: {
			type: 'minecraft:crafting_shaped',
			pattern: [' #', '/ '],
			key: {
				'#': { '{{ingredient_type}}': '{{repair_ingredient}}' },
				'/': { item: '{{handle_ingredient}}' }
			},
			result: { id: 'basicweapons:{{material_name}}_dagger', count: 1 },
			'fabric:load_conditions': [
				{
					condition: 'fabric:all_mods_loaded',
					values: ['farmersdelight']
				}
			],
			'neoforge:conditions': [
				{
					type: 'neoforge:mod_loaded',
					modid: 'farmersdelight'
				}
			]
		}
	},
	hammer: {
		type: 'minecraft:crafting_shaped',
		pattern: ['###', '#/#', ' / '],
		key: {
			'#': { '{{ingredient_type}}': '{{repair_ingredient}}' },
			'/': { item: '{{handle_ingredient}}' }
		},
		result: { id: 'basicweapons:{{material_name}}_hammer', count: 1 }
	},
	quarterstaff: {
		type: 'minecraft:crafting_shaped',
		pattern: ['  /', ' O ', '/  '],
		key: {
			'/': { item: '{{handle_ingredient}}' },
			O: { '{{ingredient_type}}': '{{repair_ingredient}}' }
		},
		result: { id: 'basicweapons:{{material_name}}_quarterstaff', count: 1 }
	},
	spear: {
		type: 'minecraft:crafting_shaped',
		pattern: ['  ^', ' / ', '/  '],
		key: {
			'^': { '{{ingredient_type}}': '{{repair_ingredient}}' },
			'/': { item: '{{handle_ingredient}}' }
		},
		result: { id: 'basicweapons:{{material_name}}_spear', count: 1 }
	},
	glaive: {
		type: 'minecraft:crafting_shaped',
		pattern: [' OO', 'O/ ', '/  '],
		key: {
			'/': { item: '{{handle_ingredient}}' },
			O: { '{{ingredient_type}}': '{{repair_ingredient}}' }
		},
		result: { id: 'basicweapons:{{material_name}}_glaive', count: 1 }
	}
} as const;

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

const SMITHING_RECIPE_TEMPLATE: SmithingRecipeTemplate = {
	type: 'minecraft:smithing_transform',
	template: {
		item: '{{upgrade_smithing_template_ingredient}}'
	},
	base: {
		item: 'basicweapons:{{smithing_weapon_material_prefix}}_{{weapon_type}}'
	},
	addition: {
		item: '{{repair_ingredient}}'
	},
	result: {
		id: 'basicweapons:{{material_name}}_{{weapon_type}}',
		count: 1
	}
} as const;

// Model templates
const MODEL_TEMPLATES = {
	standard: {
		parent: 'minecraft:item/handheld',
		textures: {
			layer0: 'basicweapons:item/{{material_name}}_{{weapon_type}}'
		}
	},
	held: {
		parent: 'basicweapons:item/handheld_big_{{weapon_type}}',
		textures: {
			layer0: 'basicweapons:item/{{material_name}}_{{weapon_type}}_held'
		}
	}
} as const;

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
	private versionRange: keyof typeof PACK_FORMAT_VERSIONS.data;

	constructor(materialPack: MaterialPack, versionRange: keyof typeof PACK_FORMAT_VERSIONS.data) {
		this.materialPack = materialPack;
		this.zip = new JSZip();
		this.versionRange = versionRange;
	}

	private async generateRootPackMcmeta() {
		const packMcmeta = {
			pack: {
				description: [
					{ text: 'ᴍᴀᴛᴇʀɪᴀʟ ᴘᴀᴄᴋ ғᴏʀ', color: '#9BE17B' },
					{ text: '\n▢ ʙᴀsɪᴄ ᴡᴇᴀᴘᴏɴs ▢', color: '#79CCF5' }
				],
				pack_format: 0
			}
		};

		this.zip.file('pack.mcmeta', JSON.stringify(packMcmeta, null, 2));
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

		// Add pack.mcmeta with version-specific format
		const packMcmeta = {
			pack: {
				pack_format: PACK_FORMAT_VERSIONS.data[this.versionRange],
				description: [
					{ text: 'ᴍᴀᴛᴇʀɪᴀʟ ᴘᴀᴄᴋ ғᴏʀ', color: '#9BE17B' },
					{ text: '\n▢ ʙᴀsɪᴄ ᴡᴇᴀᴘᴏɴs ▢', color: '#79CCF5' }
				]
			}
		};
		dataFolder.file('pack.mcmeta', JSON.stringify(packMcmeta, null, 2));

		await this.generateRecipes(dataFolder);
		await this.generateTags(dataFolder);
		await this.generateWeaponAttributes(dataFolder);
		await this.generateRecipeAdvancements(dataFolder);
	}

	private async generateResourcePack() {
		const resourceFolder = this.zip.folder('assets');
		if (!resourceFolder) throw new Error('Failed to create assets folder');

		// Add pack.mcmeta with version-specific format
		const packMcmeta = {
			pack: {
				pack_format: PACK_FORMAT_VERSIONS.resource[this.versionRange],
				description: [
					{ text: 'ᴍᴀᴛᴇʀɪᴀʟ ᴘᴀᴄᴋ ғᴏʀ', color: '#9BE17B' },
					{ text: '\n▢ ʙᴀsɪᴄ ᴡᴇᴀᴘᴏɴs ▢', color: '#79CCF5' }
				]
			}
		};
		resourceFolder.file('pack.mcmeta', JSON.stringify(packMcmeta, null, 2));

		await this.generateLanguageFiles(resourceFolder);
		await this.generateModels(resourceFolder);
		await this.generateTextures(resourceFolder);
	}

	private async generateRecipes(dataFolder: JSZip) {
		const recipesFolder = dataFolder.folder('basicweapons/recipe');
		const compatFolder = recipesFolder?.folder('compat');
		if (!recipesFolder || !compatFolder) throw new Error('Failed to create recipe folders');

		for (const material of this.materialPack.materials) {
			const isTag = material.repair_ingredient.startsWith('#');
			const baseVariables = {
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
					const smithingVariables = {
						...baseVariables,
						weapon_type: weaponType,
						upgrade_smithing_template_ingredient: material.upgrade_smithing_template_ingredient,
						smithing_weapon_material_prefix: material.smithing_weapon_material_prefix
					};

					const smithingRecipe = { ...SMITHING_RECIPE_TEMPLATE };

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
				const template = RECIPE_TEMPLATES[weaponType];

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
						`${material.material_name}_club_alt.json`,
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

		const tagTemplate = {
			replace: false,
			values: [] as string[]
		};

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

				const content = {
					...tagTemplate,
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

					const content = {
						parent: `basicweapons:basic_${weaponType}`,
						attributes: {
							range_bonus: Number(calculatedReachBonus.toFixed(2))
						}
					};

					weaponAttributesFolder.file(fileName, JSON.stringify(content, null, 2));
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
				modelsFolder.file(
					standardFileName,
					JSON.stringify(
						JSON.parse(applyTemplate(JSON.stringify(MODEL_TEMPLATES.standard), variables)),
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
						modelsFolder.file(
							heldFileName,
							JSON.stringify(
								JSON.parse(applyTemplate(JSON.stringify(MODEL_TEMPLATES.held), variables)),
								null,
								2
							)
						);
					}
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

	private async generateCustomMaterials() {
		const customMaterialsFolder = this.zip.folder('custom_materials');
		if (!customMaterialsFolder) throw new Error('Failed to create custom_materials folder');

		for (const material of this.materialPack.materials) {
			const materialData = {
				material_name: material.material_name,
				durability: material.durability,
				attack_damage_bonus: material.attack_damage_bonus,
				attack_speed_bonus: material.attack_speed_bonus,
				reach_bonus: material.reach_bonus,
				enchantability: material.enchantability,
				repair_ingredient: material.repair_ingredient
			};

			const fileName = `${material.material_name}.json`;
			customMaterialsFolder.file(fileName, JSON.stringify(materialData, null, 2));
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
					// Add variant recipes if they exist (only for crafting recipes)
					if (weaponType === 'club') {
						recipes.push(`basicweapons:${material.material_name}_${weaponType}_alt`);
					}
				}
			}

			// Skip if no recipes left to give
			if (recipes.length === 0) continue;

			const advancement = {
				parent: 'minecraft:recipes/root',
				criteria: {
					[criteriaId]: {
						conditions: {
							items: [
								{
									items: [isTag ? material.repair_ingredient.slice(1) : material.repair_ingredient]
								}
							]
						},
						trigger: 'minecraft:inventory_changed'
					}
				},
				requirements: [[criteriaId]],
				rewards: {
					recipes: recipes
				}
			};

			const fileName = `got_${material.material_name}_material.json`;
			advancementsFolder.file(fileName, JSON.stringify(advancement, null, 2));
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

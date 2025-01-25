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
	result: { id: string; count: number };
	'fabric:load_conditions'?: (FabricLoadCondition | FabricNotModCondition)[];
	'neoforge:conditions'?: (NeoForgeLoadCondition | NeoForgeNotModCondition)[];
}

interface VariantRecipeTemplate {
	main: RecipeTemplate;
	[key: string]: RecipeTemplate;
}

type RecipeTemplates = {
	[K in WeaponType]: RecipeTemplate | VariantRecipeTemplate;
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
				'/': { item: 'minecraft:stick' }
			},
			result: { id: 'basicweapons:{{material_name}}_club', count: 1 }
		},
		alt: {
			type: 'minecraft:crafting_shaped',
			group: '{{material_name}}_club',
			pattern: ['# ', ' #', ' /'],
			key: {
				'#': { '{{ingredient_type}}': '{{repair_ingredient}}' },
				'/': { item: 'minecraft:stick' }
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
				'/': { item: 'minecraft:stick' }
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
				'/': { item: 'minecraft:stick' }
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
			'/': { item: 'minecraft:stick' }
		},
		result: { id: 'basicweapons:{{material_name}}_hammer', count: 1 }
	},
	quarterstaff: {
		type: 'minecraft:crafting_shaped',
		pattern: ['  /', ' O ', '/  '],
		key: {
			'/': { item: 'minecraft:stick' },
			O: { '{{ingredient_type}}': '{{repair_ingredient}}' }
		},
		result: { id: 'basicweapons:{{material_name}}_quarterstaff', count: 1 }
	},
	spear: {
		type: 'minecraft:crafting_shaped',
		pattern: ['  ^', ' / ', '/  '],
		key: {
			'^': { '{{ingredient_type}}': '{{repair_ingredient}}' },
			'/': { item: 'minecraft:stick' }
		},
		result: { id: 'basicweapons:{{material_name}}_spear', count: 1 }
	},
	glaive: {
		type: 'minecraft:crafting_shaped',
		pattern: [' OO', 'O/ ', '/  '],
		key: {
			'/': { item: 'minecraft:stick' },
			O: { '{{ingredient_type}}': '{{repair_ingredient}}' }
		},
		result: { id: 'basicweapons:{{material_name}}_glaive', count: 1 }
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

const BASE_WEAPON_REACH = {
	dagger: 2.25,
	hammer: 2.5,
	club: 2.5,
	spear: 4.0,
	quarterstaff: 3.25,
	glaive: 3.25
} as const;

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
			const variables = {
				material_name: material.material_name,
				repair_ingredient: isTag ? material.repair_ingredient.slice(1) : material.repair_ingredient,
				ingredient_type: isTag ? 'tag' : 'item'
			};

			for (const weaponType of WEAPON_TYPES) {
				if (material.textures[weaponType] === null) continue;

				const template = RECIPE_TEMPLATES[weaponType];
				if ('main' in template) {
					if (weaponType === 'club') {
						recipesFolder.file(
							`${material.material_name}_club.json`,
							JSON.stringify(
								JSON.parse(applyTemplate(JSON.stringify(template.main), variables)),
								null,
								2
							)
						);
						recipesFolder.file(
							`${material.material_name}_club_alt.json`,
							JSON.stringify(
								JSON.parse(applyTemplate(JSON.stringify(template.alt), variables)),
								null,
								2
							)
						);
					} else if (weaponType === 'dagger') {
						recipesFolder.file(
							`${material.material_name}_dagger.json`,
							JSON.stringify(
								JSON.parse(applyTemplate(JSON.stringify(template.main), variables)),
								null,
								2
							)
						);
						compatFolder.file(
							`${material.material_name}_dagger.json`,
							JSON.stringify(
								JSON.parse(applyTemplate(JSON.stringify(template.compat), variables)),
								null,
								2
							)
						);
					}
				} else {
					recipesFolder.file(
						`${material.material_name}_${weaponType}.json`,
						JSON.stringify(JSON.parse(applyTemplate(JSON.stringify(template), variables)), null, 2)
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

		const weaponsByType = new Map(WEAPON_TYPES.map((type) => [type, [] as string[]]));

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
					const totalReach = BASE_WEAPON_REACH[weaponType] + material.reach_bonus;

					const content = {
						parent: `basicweapons:basic_${weaponType}`,
						attributes: {
							attack_range: Number(totalReach.toFixed(2))
						}
					};

					weaponAttributesFolder.file(fileName, JSON.stringify(content, null, 2));
				}
			}
		}
	}

	private capitalizeFirstLetter(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
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

	async build(): Promise<Blob> {
		await this.generateRootPackMcmeta();
		await this.generateMaterialPackIcon();
		await this.generateDataPack();
		await this.generateResourcePack();
		await this.generateCustomMaterials();
		return this.zip.generateAsync({ type: 'blob' });
	}
}

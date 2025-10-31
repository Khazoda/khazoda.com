import JSZip from 'jszip';
import type { MaterialPack, Material } from '../types/materialpackTypes';
import { extractPackInfoFromFilename, detectMinecraftVersion } from './utils/zipParser';
import { discoverMaterials, parseCustomMaterial } from './utils/materialParser';
import { parseRecipeInfo } from './utils/recipeParser';
import { mapTextures, extractPackIcon } from './utils/textureMapper';
import {
	DEFAULT_DURABILITY,
	DEFAULT_ATTACK_DAMAGE_BONUS,
	DEFAULT_ATTACK_SPEED_BONUS,
	DEFAULT_REACH_BONUS,
	DEFAULT_ENCHANTABILITY,
	DEFAULT_RECIPE_TYPE,
	DEFAULT_REPAIR_INGREDIENT,
	DEFAULT_HANDLE_INGREDIENT
} from 'src/config/material-pack-creator';

export class MaterialPackImporter {
	private zip: JSZip;

	constructor(zip: JSZip) {
		this.zip = zip;
	}

	async import(zipFile: File): Promise<{
		pack: Partial<MaterialPack>;
		detectedVersion?: string;
	}> {
		const zip = await JSZip.loadAsync(zipFile);
		this.zip = zip;

		const filenameInfo = extractPackInfoFromFilename(zipFile.name);
		const detectedVersion = await detectMinecraftVersion(zip);
		const modDependencyModid = await this.extractModDependency();
		const packIcon = await extractPackIcon(zip);
		const materialNames = await discoverMaterials(zip);

		if (materialNames.length === 0) {
			throw new Error('No materials found in pack. This may not be a valid materialpack.');
		}

		const materials = await Promise.all(
			materialNames.map(name => this.reconstructMaterial(name))
		);

		const localstorage_id = `pack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

		return {
			pack: {
				localstorage_id,
				pack_name: filenameInfo.pack_name,
				mod_dependency_modid: modDependencyModid || '',
				pack_icon: packIcon,
				materials
			},
			detectedVersion: detectedVersion || filenameInfo.minecraft_version
		};
	}

	private async reconstructMaterial(materialName: string): Promise<Material> {
		const stats = await parseCustomMaterial(this.zip, materialName);
		const recipeInfo = await parseRecipeInfo(this.zip, materialName);
		const textures = await mapTextures(this.zip, materialName);
		const material: Material = {
			material_name: stats.material_name || materialName,
			durability: stats.durability || DEFAULT_DURABILITY,
			attack_damage_bonus: stats.attack_damage_bonus || DEFAULT_ATTACK_DAMAGE_BONUS,
			attack_speed_bonus: stats.attack_speed_bonus || DEFAULT_ATTACK_SPEED_BONUS,
			reach_bonus: stats.reach_bonus || DEFAULT_REACH_BONUS,
			enchantability: stats.enchantability || DEFAULT_ENCHANTABILITY,
			textures,
			recipe_type: recipeInfo.recipe_type || DEFAULT_RECIPE_TYPE,
			repair_ingredient: recipeInfo.smithing_repair_ingredient || stats.repair_ingredient || DEFAULT_REPAIR_INGREDIENT,
			handle_ingredient: recipeInfo.handle_ingredient || DEFAULT_HANDLE_INGREDIENT,
			upgrade_smithing_template_ingredient:
				recipeInfo.upgrade_smithing_template_ingredient || '',
			smithing_weapon_material_prefix: recipeInfo.smithing_weapon_material_prefix || '',
			smelts_into: recipeInfo.smelts_into
		};

		return material;
	}

	private async extractModDependency(): Promise<string | null> {
		const requirementsFile = this.zip.file('loading_requirements.json');
		if (!requirementsFile) return null;

		try {
			const content = await requirementsFile.async('text');
			const data = JSON.parse(content);
			return data.requires_mod || null;
		} catch (e) {
			return null;
		}
	}
}


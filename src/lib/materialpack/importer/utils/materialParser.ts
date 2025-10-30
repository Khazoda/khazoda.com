import JSZip from 'jszip';
import type { Material } from '../../types/materialpackTypes';

const WEAPON_TYPES = ['dagger', 'hammer', 'club', 'spear', 'quarterstaff', 'glaive'] as const;

export async function discoverMaterials(zip: JSZip): Promise<string[]> {
	const customMaterialsFolder = zip.folder('custom_materials');
	if (!customMaterialsFolder) return [];
	
	const materialNames: string[] = [];
	
	customMaterialsFolder.forEach((relativePath, file) => {
		if (file && !file.dir && relativePath.endsWith('.json')) {
			const materialName = relativePath.replace(/\.json$/, '');
			materialNames.push(materialName);
		}
	});
	
	return materialNames;
}

export async function parseCustomMaterial(
	zip: JSZip,
	materialName: string
): Promise<Partial<Material>> {
	const file = zip.file(`custom_materials/${materialName}.json`);
	if (!file) {
		throw new Error(`Material file not found: ${materialName}`);
	}
	
	const content = await file.async('text');
	const data = JSON.parse(content);
	
	const material: Partial<Material> = {
		material_name: data.material_name || materialName,
		durability: Number(data.durability) || 100,
		attack_damage_bonus: Number(data.attack_damage_bonus) || 0,
		attack_speed_bonus: Number(data.attack_speed_bonus) || 0,
		reach_bonus: Number(data.reach_bonus) || 0,
		enchantability: Number(data.enchantability) || 10
	};
	
	const repairIngredient = data.repair_ingredient || '';
	if (repairIngredient.startsWith('#basicweapons:')) {
		const tagName = repairIngredient.replace('#basicweapons:', '').replace('_tool_materials', '');
		const tagFile = zip.file(`data/basicweapons/tags/item/${tagName}.json`);
		if (tagFile) {
			const tagContent = await tagFile.async('text');
			const tagData = JSON.parse(tagContent);
			if (tagData.values && tagData.values.length > 0) {
				material.repair_ingredient = tagData.values[0];
			}
		}
	} else {
		material.repair_ingredient = repairIngredient;
	}
	
	return material;
}


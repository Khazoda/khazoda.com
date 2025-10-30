import JSZip from 'jszip';
import type { Material } from '../../types/materialpackTypes';

const WEAPON_TYPES = ['dagger', 'hammer', 'club', 'spear', 'quarterstaff', 'glaive'] as const;

interface RecipeInfo {
	recipe_type?: 'crafting' | 'smithing';
	handle_ingredient?: string;
	upgrade_smithing_template_ingredient?: string;
	smithing_weapon_material_prefix?: string;
	smelts_into?: string;
}

export async function parseRecipeInfo(
	zip: JSZip,
	materialName: string
): Promise<RecipeInfo> {
	const info: RecipeInfo = {};
	
	const smithingRecipe = zip.file(`data/basicweapons/recipe/${materialName}_dagger_smithing.json`);
	if (smithingRecipe) {
		info.recipe_type = 'smithing';
		const content = await smithingRecipe.async('text');
		const recipe = JSON.parse(content);
		
		if (recipe.template) {
			info.upgrade_smithing_template_ingredient = recipe.template.item;
		}
		if (recipe.base) {
			const baseItem = recipe.base.item || '';
			const match = baseItem.match(/^[^:]+:([^_]+)_(?:dagger|hammer|club|spear|quarterstaff|glaive)$/);
			if (match) {
				info.smithing_weapon_material_prefix = match[1];
			}
		}
		return info;
	}
	
	info.recipe_type = 'crafting';
	
	const craftingRecipe = zip.file(`data/basicweapons/recipe/${materialName}_hammer.json`) ||
	                       zip.file(`data/basicweapons/recipe/${materialName}_dagger.json`);
	
	if (craftingRecipe) {
		const content = await craftingRecipe.async('text');
		const recipe = JSON.parse(content);
		
		if (recipe.key) {
			for (const [key, value] of Object.entries(recipe.key)) {
				if (key === '/') {
					const ingredient = value as any;
					if (ingredient.item) {
						info.handle_ingredient = ingredient.item;
					} else if (typeof ingredient === 'string') {
						info.handle_ingredient = ingredient;
					}
					break;
				}
			}
		}
	}
	
	const blastingRecipe = zip.file(`data/basicweapons/recipe/weapons_to_nuggets/weapons_to_nuggets_${materialName}_blasting.json`) ||
	                      zip.file(`data/recipes/weapons_to_nuggets_${materialName}_blasting.json`);
	
	if (blastingRecipe) {
		const content = await blastingRecipe.async('text');
		const recipe = JSON.parse(content);
		if (recipe.result && recipe.result.id) {
			info.smelts_into = recipe.result.id;
		}
	}
	
	return info;
}


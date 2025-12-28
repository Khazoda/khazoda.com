import JSZip from 'jszip';
import type { Material } from '../../types/materialpackTypes';

const WEAPON_TYPES = ['dagger', 'hammer', 'club', 'spear', 'quarterstaff', 'glaive', 'sword', 'axe', 'pike'] as const;

interface RecipeInfo {
	recipe_type?: 'crafting' | 'smithing';
	handle_ingredient?: string;
	upgrade_smithing_template_ingredient?: string;
	smithing_weapon_material_prefix?: string;
	smithing_repair_ingredient?: string;
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

		// Handle 1.21.10+ format (strings) or 1.21 format (objects)
		if (typeof recipe.template === 'string') {
			// 1.21.10+ (VERSION_RANGE.V1_21_10)
			info.upgrade_smithing_template_ingredient = recipe.template;
		} else if (recipe.template?.item) {
			// 1.21 (VERSION_RANGE.V1_21)
			info.upgrade_smithing_template_ingredient = recipe.template.item;
		}

		// Extract repair_ingredient from addition field for smithing recipes
		if (typeof recipe.addition === 'string') {
			// 1.21.10+ (VERSION_RANGE.V1_21_10)
			info.smithing_repair_ingredient = recipe.addition;
		} else if (recipe.addition?.item) {
			// 1.21 (VERSION_RANGE.V1_21)
			info.smithing_repair_ingredient = recipe.addition.item;
		}

		const baseItem = typeof recipe.base === 'string'
			? recipe.base
			: recipe.base?.item || '';
		if (baseItem) {
			const match = baseItem.match(/^[^:]+:([^_]+)_(?:dagger|hammer|club|spear|quarterstaff|glaive|sword|axe|pike)$/);
			if (match) {
				info.smithing_weapon_material_prefix = match[1];
			}
		}
	}

	if (!info.recipe_type) {
		info.recipe_type = 'crafting';

		const craftingRecipe = zip.file(`data/basicweapons/recipe/${materialName}_hammer.json`) ||
			zip.file(`data/basicweapons/recipe/${materialName}_dagger.json`) ||
			zip.file(`data/basicweapons/recipe/${materialName}_sword.json`) ||
			zip.file(`data/basicweapons/recipe/${materialName}_axe.json`);

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
	}

	const recipePaths = [
		`data/basicweapons/recipe/weapons_to_nuggets/weapons_to_nuggets_${materialName}_smelting.json`,
		`data/basicweapons/recipe/weapons_to_nuggets/weapons_to_nuggets_${materialName}_blasting.json`,
	];

	for (const path of recipePaths) {
		const recipeFile = zip.file(path);

		if (recipeFile) {
			const content = await recipeFile.async('text');
			const recipe = JSON.parse(content);
			if (recipe.result?.id) {
				info.smelts_into = recipe.result.id;
				break;
			}
		}
	}

	return info;
}


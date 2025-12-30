const RecipeTypes = {
	crafting: 'crafting',
	smithing: 'smithing'
} as const;
type RecipeType = (typeof RecipeTypes)[keyof typeof RecipeTypes];

type Material = {
	// Stats Section
	material_name: string;
	durability: number;
	mining_speed?: number;
	attack_damage_bonus: number;
	attack_speed_bonus: number;
	reach_bonus: number;
	enchantability: number;
	// Assets Section
	textures: {
		dagger: string | null;
		hammer: string | null;
		club: string | null;
		spear: string | null;
		spear_held: string | null;
		quarterstaff: string | null;
		quarterstaff_held: string | null;
		glaive: string | null;
		glaive_held: string | null;
		sword: string | null;
		axe: string | null;
		pike: string | null;
		pike_held: string | null;
		vanillaspear: string | null;
		vanillaspear_held: string | null;
	};
	// Recipes Section
	recipe_type: RecipeType;
	smelts_into?: string;
	// Crafting
	repair_ingredient: string;
	handle_ingredient?: string; // Only required for crafting recipes
	// Smithing
	upgrade_smithing_template_ingredient?: string; // Only required for smithing recipes
	smithing_weapon_material_prefix?: string; // Only required for smithing recipes
};

type MaterialPack = {
	localstorage_id: string;
	pack_name: string;
	mod_dependency_modid: string;
	materials: Material[];
	pack_icon: string | null;
};

export type { Material, MaterialPack, RecipeType };
export { RecipeTypes };

const RecipeTypes = {
	crafting: 'crafting',
	smithing: 'smithing'
} as const;
type RecipeType = (typeof RecipeTypes)[keyof typeof RecipeTypes];

type Material = {
	// Stats Section
	material_name: string;
	durability: number;
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
	};
	// Recipes Section
	recipe_type: RecipeType;
	// Crafting
	repair_ingredient: string; // e.g. Diamond, Iron Ingot
	handle_ingredient: string; // e.g. Stick, End Rod
	// Smithing
	upgrade_smithing_template_ingredient: string; // Slot 1
	smithing_weapon_ingredient: string; // Slot 2
};

type MaterialPack = {
	localstorage_id: string;
	pack_name: string;
	mod_dependency_name: string;
	mod_dependency_modid: string;
	materials: Material[];
	pack_icon: string | null;
};

// Update exports
export type { Material, MaterialPack, RecipeType };
export { RecipeTypes };

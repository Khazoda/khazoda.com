// Types
type Material = {
	material_name: string;
	durability: number;
	attack_damage_bonus: number;
	attack_speed_bonus: number;
	reach_bonus: number;
	enchantability: number;
	repair_ingredient: string;
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
};

type MaterialPack = {
	localstorage_id: string;
	pack_name: string;
	mod_dependency_name: string;
	mod_dependency_modid: string;
	materials: Material[];
	pack_icon: string | null;
};

// Export the types
export type { Material, MaterialPack };

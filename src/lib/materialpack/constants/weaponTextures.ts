import type { Material } from "../types/materialpackTypes";
import club from "../media/weapon_outlines/club.png";
import dagger from "../media/weapon_outlines/dagger.png";
import hammer from "../media/weapon_outlines/hammer.png";
import glaive from "../media/weapon_outlines/glaive.png";
import quarterstaff from "../media/weapon_outlines/quarterstaff.png";
import spear from "../media/weapon_outlines/spear.png";
import spear_held from "../media/weapon_outlines/spear_held.png";
import quarterstaff_held from "../media/weapon_outlines/quarterstaff_held.png";
import glaive_held from "../media/weapon_outlines/glaive_held.png";
import sword from "../media/weapon_outlines/sword.png";
import axe from "../media/weapon_outlines/axe.png";
import pike from "../media/weapon_outlines/pike.png";
import pike_held from "../media/weapon_outlines/pike_held.png";
import vanillaspear from "../media/weapon_outlines/vanillaspear.png";
import vanillaspear_held from "../media/weapon_outlines/vanillaspear_held.png";

export const WEAPON_TEXTURES: Array<{
	id: keyof Material["textures"];
	label: string;
	classification: "basic" | "vanilla" | "deprecated";
	placeholderBackground: string;
}> = [
		{ id: "dagger", label: "dagger.png", classification: "basic", placeholderBackground: dagger },
		{ id: "hammer", label: "hammer.png", classification: "basic", placeholderBackground: hammer },
		{ id: "club", label: "club.png", classification: "basic", placeholderBackground: club },
		{ id: "quarterstaff", label: "quarterstaff.png", classification: "basic", placeholderBackground: quarterstaff },
		{ id: "glaive", label: "glaive.png", classification: "basic", placeholderBackground: glaive },
		{ id: "pike", label: "pike.png", classification: "basic", placeholderBackground: pike },
		{ id: "quarterstaff_held", label: "quarterstaff_held.png", classification: "basic", placeholderBackground: quarterstaff_held },
		{ id: "glaive_held", label: "glaive_held.png", classification: "basic", placeholderBackground: glaive_held },
		{ id: "pike_held", label: "pike_held.png", classification: "basic", placeholderBackground: pike_held },
		{ id: "sword", label: "sword.png", classification: "vanilla", placeholderBackground: sword },
		{ id: "axe", label: "axe.png", classification: "vanilla", placeholderBackground: axe },
		{ id: "vanillaspear", label: "vanillaspear.png", classification: "vanilla", placeholderBackground: vanillaspear },
		{ id: "vanillaspear_held", label: "vanillaspear_held.png", classification: "vanilla", placeholderBackground: vanillaspear_held },

		{ id: "spear", label: "spear.png", classification: "deprecated", placeholderBackground: spear },
		{ id: "spear_held", label: "spear_held.png", classification: "deprecated", placeholderBackground: spear_held },
	];


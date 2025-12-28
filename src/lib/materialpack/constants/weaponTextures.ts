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

export const WEAPON_TEXTURES: Array<{
	id: keyof Material["textures"];
	label: string;
	placeholderBackground: string;
}> = [
		{ id: "dagger", label: "dagger.png", placeholderBackground: dagger },
		{ id: "hammer", label: "hammer.png", placeholderBackground: hammer },
		{ id: "club", label: "club.png", placeholderBackground: club },
		{ id: "quarterstaff", label: "quarterstaff.png", placeholderBackground: quarterstaff },
		{ id: "glaive", label: "glaive.png", placeholderBackground: glaive },
		{ id: "pike", label: "pike.png", placeholderBackground: pike },
		{ id: "quarterstaff_held", label: "quarterstaff_held.png", placeholderBackground: quarterstaff_held },
		{ id: "glaive_held", label: "glaive_held.png", placeholderBackground: glaive_held },
		{ id: "pike_held", label: "pike_held.png", placeholderBackground: pike_held },
		{ id: "sword", label: "sword.png", placeholderBackground: sword },
		{ id: "axe", label: "axe.png", placeholderBackground: axe },

		{ id: "spear", label: "spear.png", placeholderBackground: spear },
		{ id: "spear_held", label: "spear_held.png", placeholderBackground: spear_held },
	];


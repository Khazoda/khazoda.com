import type { MaterialPack } from '../types/materialpackTypes';
import { writable } from 'svelte/store';
import copperTemplate from '../templates/copper.json';
import wardenTemplate from '../templates/warden.json';
import netherTemplate from '../templates/nether.json';

export type MaterialPackTemplate = {
	name: string;
	description: string;
	pack_icon: string;
	materials: MaterialPack['materials'];
	mod_dependency_name: string;
	mod_dependency_modid: string;
};

// Create a store for available templates
export const templates = writable<MaterialPackTemplate[]>([
	copperTemplate,
	wardenTemplate,
	netherTemplate
]);

// Function to create a new pack from a template
export function createPackFromTemplate(template: MaterialPackTemplate): Partial<MaterialPack> {
	return {
		pack_name: template.name,
		pack_icon: template.pack_icon,
		materials: template.materials,
		mod_dependency_name: template.mod_dependency_name,
		mod_dependency_modid: template.mod_dependency_modid
	};
}

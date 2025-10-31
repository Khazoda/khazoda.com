import type { MaterialPack } from '../types/materialpackTypes';
import { writable } from 'svelte/store';
import wardenTemplate from '../templates/warden.json';
import netherTemplate from '../templates/nether.json';

export type MaterialPackTemplate = {
	name: string;
	description: string;
	pack_icon: string;
	materials: MaterialPack['materials'];
	mod_dependency_modid: string;
};

export const templates = writable<MaterialPackTemplate[]>([
	wardenTemplate as MaterialPackTemplate,
	netherTemplate as MaterialPackTemplate
]);

export function createPackFromTemplate(template: MaterialPackTemplate): Partial<MaterialPack> {
	return {
		pack_name: template.name,
		pack_icon: template.pack_icon,
		materials: template.materials,
		mod_dependency_modid: template.mod_dependency_modid
	};
}

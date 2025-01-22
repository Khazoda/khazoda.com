import type { Material } from '../types/materialpackTypes';
import { writable } from 'svelte/store';
import woodTemplate from '../templates/materials/wood.json';
import stoneTemplate from '../templates/materials/stone.json';
import ironTemplate from '../templates/materials/iron.json';
import goldTemplate from '../templates/materials/gold.json';
import diamondTemplate from '../templates/materials/diamond.json';
import netheriteTemplate from '../templates/materials/netherite.json';

export type MaterialTemplate = Material & {
	name: string;
	description: string;
};

// Store for available material templates
export const materialTemplates = writable<MaterialTemplate[]>([
	{ ...woodTemplate, name: 'Wooden', description: 'Low durability, no bonuses' },
	{ ...stoneTemplate, name: 'Stone', description: 'Low durability, small damage bonus' },
	{ ...ironTemplate, name: 'Iron', description: 'Medium durability, good damage bonus' },
	{ ...goldTemplate, name: 'Golden', description: 'Very low durability, high enchantability' },
	{ ...diamondTemplate, name: 'Diamond', description: 'High durability, great damage bonus' },
	{ ...netheriteTemplate, name: 'Netherite', description: 'Highest durability and damage' }
]);

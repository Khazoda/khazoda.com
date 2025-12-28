import type { Material, RecipeType } from '../types/materialpackTypes';
import { writable } from 'svelte/store';
import woodTemplate from '../templates/materials/wood.json';
import stoneTemplate from '../templates/materials/stone.json';
import copperTemplate from '../templates/materials/copper.json';
import ironTemplate from '../templates/materials/iron.json';
import goldTemplate from '../templates/materials/gold.json';
import diamondTemplate from '../templates/materials/diamond.json';
import netheriteTemplate from '../templates/materials/netherite.json';

export type MaterialTemplate = Material & {
	name: string;
	description: string;
	exampleTexture: string;
};

// Store for available material templates
export const materialTemplates = writable<MaterialTemplate[]>([
	{
		...woodTemplate,
		recipe_type: woodTemplate.recipe_type as RecipeType,
		name: 'Wooden',
		description: 'Low durability, Good enchantability',
		exampleTexture: woodTemplate.textures.dagger
	},
	{
		...stoneTemplate,
		recipe_type: stoneTemplate.recipe_type as RecipeType,
		name: 'Stone',
		description: 'Low durability, small damage bonus',
		exampleTexture: stoneTemplate.textures.hammer
	},
	{
		...copperTemplate,
		recipe_type: copperTemplate.recipe_type as RecipeType,
		name: 'Copper',
		description: 'Medium durability, small damage bonus',
		exampleTexture: copperTemplate.textures.glaive
	},
	{
		...ironTemplate,
		recipe_type: ironTemplate.recipe_type as RecipeType,
		name: 'Iron',
		description: 'Medium durability, good damage bonus',
		exampleTexture: ironTemplate.textures.club
	},
	{
		...goldTemplate,
		recipe_type: goldTemplate.recipe_type as RecipeType,
		name: 'Golden',
		description: 'Very low durability, high enchantability',
		exampleTexture: goldTemplate.textures.pike
	},
	{
		...diamondTemplate,
		recipe_type: diamondTemplate.recipe_type as RecipeType,
		name: 'Diamond',
		description: 'High durability, great damage bonus',
		exampleTexture: diamondTemplate.textures.quarterstaff
	},
	{
		...netheriteTemplate,
		recipe_type: netheriteTemplate.recipe_type as RecipeType,
		name: 'Netherite',
		description: 'Highest durability and damage',
		exampleTexture: netheriteTemplate.textures.glaive
	}
]);

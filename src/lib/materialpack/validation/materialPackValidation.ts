import { z } from 'zod';
import { RecipeTypes } from '$lib/materialpack/types/materialpackTypes';
import {
	PACK_NAME_MIN_LENGTH,
	PACK_NAME_MAX_LENGTH,
	MOD_DEPENDENCY_MAX_LENGTH,
	MATERIAL_NAME_MIN_LENGTH,
	MATERIAL_NAME_MAX_LENGTH,
	NUMBER_MIN_VALUE,
	NUMBER_MAX_VALUE,
	DURABILITY_MIN,
	DURABILITY_MAX,
	ENCHANTABILITY_MIN,
	ENCHANTABILITY_MAX
} from 'src/config/material-pack-creator';

export const materialPackNameSchema = z
	.string()
	.min(PACK_NAME_MIN_LENGTH, "Pack name can't be empty")
	.max(PACK_NAME_MAX_LENGTH, `Pack name can't be longer than ${PACK_NAME_MAX_LENGTH} characters`)
	.transform(val => val.toLowerCase()) // Convert to lowercase
	.transform(val => val.replace(/\s+/g, '-')) // Replace spaces with underscores
	.transform(val => val.replace(/[^a-z0-9-]/g, '')); // Remove any non-alphanumeric characters except underscores

export const modDependencySchema = z
	.string()
	.max(MOD_DEPENDENCY_MAX_LENGTH, `Mod dependency name can't be longer than ${MOD_DEPENDENCY_MAX_LENGTH} characters`)
	.transform(val => val.toLowerCase())
	.transform(val => val.replace(/\s+/g, '-'))
	.transform(val => val.replace(/[^a-z0-9-]/g, ''));

export const materialNameSchema = z
	.string()
	.min(MATERIAL_NAME_MIN_LENGTH, "Material name can't be empty")
	.max(MATERIAL_NAME_MAX_LENGTH, `Material name can't be longer than ${MATERIAL_NAME_MAX_LENGTH} characters`)
	.transform(val => val.toLowerCase())
	.transform(val => val.replace(/\s+/g, '_'))
	.transform(val => val.replace(/[^a-z0-9_]/g, ''));

export const itemOrTagSchema = z
	.string()
	.min(1, "Repair ingredient can't be empty")
	.regex(
		/^#?[a-z0-9_.-]+:[a-z0-9_.-]+$/,
		'Must be in format: namespace:itemname or #namespace:tagname'
	);

export const itemSchema = z
	.string()
	.min(1, "Item can't be empty")
	.regex(/^[a-z0-9_.-]+:[a-z0-9_.-]+$/, 'Must be in format: namespace:itemname');

export const itemMaterialInSmithingRecipeSchema = z
	.string()
	.min(1, "Material name can't be empty")
	.regex(/^[a-z0-9_.-]+$/, 'Must be in format: weaponprefix (e.g. "diamond" or "iron")');

export const numberSchema = z
	.number()
	.min(NUMBER_MIN_VALUE, `Value can't be less than ${NUMBER_MIN_VALUE}`)
	.max(NUMBER_MAX_VALUE, `Value can't be more than ${NUMBER_MAX_VALUE}`);

export const durabilitySchema = z
	.number()
	.int()
	.min(DURABILITY_MIN, `Durability must be at least ${DURABILITY_MIN}`)
	.max(DURABILITY_MAX, `Durability can't be more than ${DURABILITY_MAX}`);

export const enchantabilitySchema = z
	.number()
	.int()
	.min(ENCHANTABILITY_MIN, `Enchantability must be at least ${ENCHANTABILITY_MIN}`)
	.max(ENCHANTABILITY_MAX, `Enchantability can't be more than ${ENCHANTABILITY_MAX}`);

export const recipeTypeSchema = z.enum(Object.values(RecipeTypes) as [string, ...string[]]);

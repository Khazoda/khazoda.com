import { z } from 'zod';

// Material Pack validation schema
export const materialPackNameSchema = z
	.string()
	.min(1, "Pack name can't be empty")
	.max(16, "Pack name can't be longer than 16 characters")
	.transform((val) => val.toLowerCase()) // Convert to lowercase
	.transform((val) => val.replace(/\s+/g, '-')) // Replace spaces with underscores
	.transform((val) => val.replace(/[^a-z0-9-]/g, '')); // Remove any non-alphanumeric characters except underscores

export const modDependencySchema = z
	.string()
	.max(24, "Mod dependency name can't be longer than 24 characters")
	.transform((val) => val.toLowerCase())
	.transform((val) => val.replace(/\s+/g, '-'))
	.transform((val) => val.replace(/[^a-z0-9-]/g, ''));

// Material validation schema
export const materialNameSchema = z
	.string()
	.min(1, "Material name can't be empty")
	.max(16, "Material name can't be longer than 16 characters")
	.transform((val) => val.toLowerCase())
	.transform((val) => val.replace(/\s+/g, '_'))
	.transform((val) => val.replace(/[^a-z0-9_]/g, ''));

export const repairIngredientSchema = z
	.string()
	.min(1, "Repair ingredient can't be empty")
	.regex(
		/^#?[a-z0-9_.-]+:[a-z0-9_.-]+$/,
		'Must be in format: namespace:itemname or #namespace:tagname'
	);

export const numberSchema = z
	.number()
	.min(-100, "Value can't be less than -100")
	.max(100, "Value can't be more than 100");

export const durabilitySchema = z
	.number()
	.int()
	.min(1, 'Durability must be at least 1')
	.max(10000, "Durability can't be more than 10000");

export const enchantabilitySchema = z
	.number()
	.int()
	.min(1, 'Enchantability must be at least 1')
	.max(100, "Enchantability can't be more than 100");

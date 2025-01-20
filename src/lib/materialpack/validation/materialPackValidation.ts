import { z } from 'zod';
import { PACK_FORMAT_VERSIONS } from '../../../routes/basicweapons/materialpacks/create/data';

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

export const minecraftVersionSchema = z
	.string()
	.refine((val) => Object.keys(PACK_FORMAT_VERSIONS.data).includes(val), {
		message: 'Please select a valid Minecraft version range'
	});

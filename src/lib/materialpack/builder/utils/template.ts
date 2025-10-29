export function applyTemplate(
	template: string,
	variables: Record<string, string | number>
): string {
	return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(variables[key] ?? ''));
}

/**
 * Maps version range keys to directory names
 */
export function getVersionDirectory(versionRange: keyof typeof PACK_FORMAT_VERSIONS.data): string {
	const versionMap: Record<string, string> = {
		'1.21 - 1.21.1': 'v1.21',
		'1.21.10': 'v1.21.10'
	};
	return versionMap[versionRange] || 'v1.21'; // Default to v1.21 for safety
}

/**
 * Checks if a version uses file-based templates
 * Currently only 1.21.10 uses file-based templates
 */
export function usesFileTemplates(versionRange: keyof typeof PACK_FORMAT_VERSIONS.data): boolean {
	return versionRange === '1.21.10';
}

// Preload v1.21.10 templates using Vite's glob import
const templateModules = import.meta.glob<string>(
	'../templates/v1.21.10/**/*.json',
	{ eager: false, import: 'default' }
);

/**
 * Loads a template JSON file from the version-specific templates directory
 * Only works for versions that use file-based templates (currently 1.21.10)
 * @param versionRange The version range (e.g., '1.21.10')
 * @param templatePath Path relative to templates directory (e.g., 'data/recipes/dagger.json')
 */
export async function loadTemplate(
	versionRange: keyof typeof PACK_FORMAT_VERSIONS.data,
	templatePath: string
): Promise<string> {
	if (!usesFileTemplates(versionRange)) {
		throw new Error(`Version ${versionRange} does not use file-based templates`);
	}

	const versionDir = getVersionDirectory(versionRange);
	const fullPath = `../templates/${versionDir}/${templatePath}`;
	
	// Normalize path separators for cross-platform compatibility
	const normalizedPath = fullPath.replace(/\\/g, '/');
	
	const module = templateModules[normalizedPath];
	if (!module) {
		// Try to list available modules for debugging
		const availablePaths = Object.keys(templateModules);
		throw new Error(
			`Template not found: ${normalizedPath}\n` +
			`Available templates: ${availablePaths.slice(0, 5).join(', ')}...`
		);
	}

	const template = await module();
	return typeof template === 'string' ? template : JSON.stringify(template);
}

// https://minecraft.wiki/w/Pack_format
const PACK_FORMAT_VERSIONS = {
	data: {
		'1.21 - 1.21.1': 48,
		'1.21.10': 88.0
	},
	resource: {
		'1.21 - 1.21.1': 34,
		'1.21.10': 69.0
	}
} as const;

export const getVersionRanges = () => {
	return Object.keys(PACK_FORMAT_VERSIONS.data).reverse();
};

export { PACK_FORMAT_VERSIONS };

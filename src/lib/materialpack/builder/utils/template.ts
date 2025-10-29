export function applyTemplate(
	template: string,
	variables: Record<string, string | number>
): string {
	return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(variables[key] ?? ''));
}

/**
 * Supported Minecraft version ranges
 */
export const VERSION_RANGES = ['1.21 - 1.21.1', '1.21.10'] as const;

export type VersionRange = (typeof VERSION_RANGES)[number];

/**
 * Maps version range keys to directory names
 */
export function getVersionDirectory(versionRange: VersionRange): string {
	const versionMap: Record<VersionRange, string> = {
		'1.21 - 1.21.1': 'v1.21',
		'1.21.10': 'v1.21.10'
	};
	return versionMap[versionRange] || 'v1.21'; // Default to v1.21 for safety
}

// Preload all template versions
const templateModules = import.meta.glob<string>(
	'../templates/v*/**/*.json',
	{ eager: false, import: 'default' }
);

/**
 * Loads a template JSON file from the version-specific templates directory
 * @param versionRange The version range (e.g., '1.21.10' or '1.21 - 1.21.1')
 * @param templatePath Path relative to templates directory (e.g., 'data/recipes/dagger.json')
 */
export async function loadTemplate(
	versionRange: VersionRange,
	templatePath: string
): Promise<string> {
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
			`Version dir: ${versionDir}\n` +
			`Available templates: ${availablePaths.slice(0, 10).join(', ')}...`
		);
	}

	const template = await module();
	return typeof template === 'string' ? template : JSON.stringify(template);
}

/**
 * Gets the pack_format value from a pack.mcmeta.json template file
 * @param versionRange The version range (e.g., '1.21.10' or '1.21 - 1.21.1')
 * @param packType Either 'data' or 'assets'
 */
export async function getPackFormatFromTemplate(
	versionRange: VersionRange,
	packType: 'data' | 'assets'
): Promise<number> {
	const templatePath = packType === 'data' ? 'data/pack.mcmeta.json' : 'assets/pack.mcmeta.json';
	const templateStr = await loadTemplate(versionRange, templatePath);
	const template = JSON.parse(templateStr);
	return template.pack.pack_format;
}

export const getVersionRanges = () => {
	return [...VERSION_RANGES].reverse();
};

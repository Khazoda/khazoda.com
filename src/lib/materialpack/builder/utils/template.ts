export function applyTemplate(
	template: string,
	variables: Record<string, string | number>
): string {
	return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(variables[key] ?? ''));
}

export function loadTemplate(templatePath: string): string {
	throw new Error('Not implemented');
}

// https://minecraft.wiki/w/Pack_format
const PACK_FORMAT_VERSIONS = {
	data: {
		'1.21-1.21.1': 48
	},
	resource: {
		'1.21-1.21.1': 34
	}
} as const;

export const getVersionRanges = () => {
	return Object.keys(PACK_FORMAT_VERSIONS.data).reverse();
};

export { PACK_FORMAT_VERSIONS };

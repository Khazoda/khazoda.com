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

export const VERSION_RANGES = ['1.21 - 1.21.1', '1.21.10'] as const;

export type VersionRange = (typeof VERSION_RANGES)[number];

export const VERSION_DIRECTORY_MAP: Record<VersionRange, string> = {
	'1.21 - 1.21.1': 'v1.21',
	'1.21.10': 'v1.21.10'
};

export const DEFAULT_VERSION_DIRECTORY = 'v1.21';

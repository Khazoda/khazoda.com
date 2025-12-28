export const VERSION_RANGE = {
	V1_21: '1.21 - 1.21.1',
	V1_21_10: '1.21.10'
} as const;

export interface VersionMetadata {
	range: string;
	directory: string;
	packFormats: number[];
	filenameSuffix: string;
	features: {
		supportsSwordsAndAxes: boolean;
		usesClubVariantNaming: boolean;
		usesNestedIngredients: boolean;
		hasItemsFolder: boolean;
		hasRepairIngredientTags: boolean;
	};
}

export const VERSION_METADATA: Record<string, VersionMetadata> = {
	[VERSION_RANGE.V1_21]: {
		range: VERSION_RANGE.V1_21,
		directory: 'v1.21',
		packFormats: [47, 48],
		filenameSuffix: '1.21.1',
		features: {
			supportsSwordsAndAxes: false,
			usesClubVariantNaming: false,
			usesNestedIngredients: true,
			hasItemsFolder: false,
			hasRepairIngredientTags: false
		}
	},
	[VERSION_RANGE.V1_21_10]: {
		range: VERSION_RANGE.V1_21_10,
		directory: 'v1.21.10',
		packFormats: [88],
		filenameSuffix: '1.21.10',
		features: {
			supportsSwordsAndAxes: true,
			usesClubVariantNaming: true,
			usesNestedIngredients: false,
			hasItemsFolder: true,
			hasRepairIngredientTags: true
		}
	}
};

export const VERSION_RANGES = [VERSION_RANGE.V1_21, VERSION_RANGE.V1_21_10] as const;

export type VersionRange = (typeof VERSION_RANGES)[number];

export function getVersionMetadata(range: VersionRange): VersionMetadata {
	return VERSION_METADATA[range];
}

export function detectVersionFromPackFormat(packFormat: number): VersionRange | undefined {
	for (const range of VERSION_RANGES) {
		if (VERSION_METADATA[range].packFormats.includes(packFormat)) {
			return range as VersionRange;
		}
	}
	return undefined;
}

export const DEFAULT_VERSION_DIRECTORY = 'v1.21';

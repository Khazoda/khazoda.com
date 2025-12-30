export const VERSION_RANGE = {
	V1_21: '1.21 - 1.21.1',
	V1_21_10: '1.21.10',
	V1_21_11: '1.21.11'
} as const;

export const VERSION_RANGES = Object.values(VERSION_RANGE);
export type VersionRange = (typeof VERSION_RANGE)[keyof typeof VERSION_RANGE];

export interface VersionMetadata {
	range: string;
	directory: string;
	dataPackFormat: number;
	filenameSuffix: string;
	features: {
		supportsSwordsAndAxes: boolean;
		usesClubVariantNaming: boolean;
		usesNestedIngredients: boolean;
		hasItemsFolder: boolean;
		hasRepairIngredientTags: boolean;
		hasPike: boolean;
		spearHasRecipes: boolean;
		supportsVanillaSpear: boolean;
	};
}

export const VERSION_METADATA: Record<string, VersionMetadata> = {
	[VERSION_RANGE.V1_21]: {
		range: VERSION_RANGE.V1_21,
		directory: 'v1.21',
		dataPackFormat: 48,
		filenameSuffix: '1.21.1',
		features: {
			supportsSwordsAndAxes: false,
			usesClubVariantNaming: false,
			usesNestedIngredients: true,
			hasItemsFolder: false,
			hasRepairIngredientTags: false,
			hasPike: false,
			spearHasRecipes: true,
			supportsVanillaSpear: false
		}
	},
	[VERSION_RANGE.V1_21_10]: {
		range: VERSION_RANGE.V1_21_10,
		directory: 'v1.21.10',
		dataPackFormat: 88,
		filenameSuffix: '1.21.10',
		features: {
			supportsSwordsAndAxes: true,
			usesClubVariantNaming: true,
			usesNestedIngredients: false,
			hasItemsFolder: true,
			hasRepairIngredientTags: true,
			hasPike: false,
			spearHasRecipes: true,
			supportsVanillaSpear: false
		}
	},
	[VERSION_RANGE.V1_21_11]: {
		range: VERSION_RANGE.V1_21_11,
		directory: 'v1.21.11',
		dataPackFormat: 94.1,
		filenameSuffix: '1.21.11',
		features: {
			supportsSwordsAndAxes: true,
			usesClubVariantNaming: true,
			usesNestedIngredients: false,
			hasItemsFolder: true,
			hasRepairIngredientTags: true,
			hasPike: true,
			spearHasRecipes: false,
			supportsVanillaSpear: true
		}
	}
};

export function getVersionMetadata(range: VersionRange): VersionMetadata {
	return VERSION_METADATA[range];
}

export function detectVersionFromPackFormat(packFormat: number): VersionRange | undefined {
	for (const range of VERSION_RANGES) {
		if (VERSION_METADATA[range].dataPackFormat === packFormat) {
			return range as VersionRange;
		}
	}
	return undefined;
}

export const DEFAULT_VERSION_DIRECTORY = 'v1.21';

export type MaterialPackCategory = 'mod compatibility' | 'vanilla-like' | 'other';

export interface MaterialPackMetadata {
	slug: string;
	category: MaterialPackCategory;
	required_mod_slug?: string;
	official: boolean;
}

export const MATERIAL_PACKS: MaterialPackMetadata[] = [
	{
		slug: 'bwmp_copper_minecraft',
		category: 'vanilla-like',
		official: true
	},
	{
		slug: 'create',
		category: 'mod compatibility',
		required_mod_slug: 'fabric-api',
		official: false
	},
	{
		slug: 'bwmp_warden_deeper-and-darker',
		category: 'mod compatibility',
		required_mod_slug: 'deeperdarker',
		official: true
	},
	{
		slug: 'bwmp_nether-materials_minecraft',
		category: 'vanilla-like',
		official: true
	},
	{
		slug: 'plushables',
		category: 'vanilla-like',
		required_mod_slug: 'plushables',
		official: true
	}
];

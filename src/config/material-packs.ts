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
		slug: 'bwmp_emerald_minecraft',
		category: 'vanilla-like',
		official: true
	},
	{
		slug: 'bwmp_obsidian_minecraft',
		category: 'vanilla-like',
		official: true
	},
	{
		slug: 'bwmp_amethyst_minecraft',
		category: 'vanilla-like',
		official: true
	},
	{
		slug: 'bwmp-ae2-integration',
		required_mod_slug: 'ae2',
		category: 'mod compatibility',
		official: false
	}
];

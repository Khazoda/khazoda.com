import type { MinecraftVersion, ModCompatibility } from './types';

import platform_plushables from '$lib/media/mod_icons/platform_plushables.webp';
import platform_basicweapons from '$lib/media/mod_icons/platform_basicweapons.webp';
import platform_bronze from '$lib/media/mod_icons/platform_bronze.webp';
import platform_breakerplacer from '$lib/media/mod_icons/platform_breakerplacer.webp';
import platform_basicstorage from '$lib/media/mod_icons/platform_basicstorage.webp';
import platform_heirlooms from '$lib/media/mod_icons/platform_heirlooms.webp';

import beef_project_icon from '$lib/media/mod_icons/beef_project_icon.webp';
import dwayne_project_icon from '$lib/media/mod_icons/dwayne_project_icon.webp';
import hookaduck_project_icon from '$lib/media/mod_icons/hookaduck_project_icon.webp';
import kreebles_project_icon from '$lib/media/mod_icons/kreebles_project_icon.webp';
import plastar_project_icon from '$lib/media/mod_icons/plastar_project_icon.webp';
import helpfulcampfires_project_icon from '$lib/media/mod_icons/helpfulcampfires_project_icon.webp';

// Update these manually as new versions are released
export let minecraftVersions: MinecraftVersion[] = [
	{ version: '1.21.11', type: 'major', releaseDate: '2025-12-09', versionGroup: '1.21' },
	{ version: '1.21.10', type: 'major', releaseDate: '2025-10-07', versionGroup: '1.21' },
	{ version: '1.21.9', type: 'superceded', releaseDate: '2025-09-30', versionGroup: '1.21' },
	{ version: '1.21.8', type: 'minor', releaseDate: '2025-07-17', versionGroup: '1.21' },
	{ version: '1.21.7', type: 'superceded', releaseDate: '2025-06-30', versionGroup: '1.21' },
	{ version: '1.21.6', type: 'minor', releaseDate: '2025-05-17', versionGroup: '1.21' },
	{ version: '1.21.5', type: 'minor', releaseDate: '2025-03-25', versionGroup: '1.21' },
	{ version: '1.21.4', type: 'minor', releaseDate: '2024-12-03', versionGroup: '1.21' },
	{ version: '1.21.3', type: 'minor', releaseDate: '2024-10-23', versionGroup: '1.21' },
	{ version: '1.21.2', type: 'superceded', releaseDate: '2024-10-22', versionGroup: '1.21' },
	{ version: '1.21.1', type: 'major', releaseDate: '2024-08-08', versionGroup: '1.21' },
	{ version: '1.21', type: 'minor', releaseDate: '2024-06-13', versionGroup: '1.21' },
	{ version: '1.20.6', type: 'minor', releaseDate: '2024-04-29', versionGroup: '1.20' },
	{ version: '1.20.5', type: 'superceded', releaseDate: '2024-04-23', versionGroup: '1.20' },
	{ version: '1.20.4', type: 'minor', releaseDate: '2023-12-07', versionGroup: '1.20' },
	{ version: '1.20.3', type: 'superceded', releaseDate: '2023-12-05', versionGroup: '1.20' },
	{ version: '1.20.2', type: 'minor', releaseDate: '2023-09-21', versionGroup: '1.20' },
	{ version: '1.20.1', type: 'major', releaseDate: '2023-06-12', versionGroup: '1.20' },
	{ version: '1.20', type: 'minor', releaseDate: '2023-06-07', versionGroup: '1.20' },
	{ version: '1.19.4', type: 'minor', releaseDate: '2023-03-14', versionGroup: '1.19' },
	{ version: '1.19.3', type: 'minor', releaseDate: '2022-12-07', versionGroup: '1.19' },
	{ version: '1.19.2', type: 'minor', releaseDate: '2022-08-05', versionGroup: '1.19' },
	{ version: '1.19', type: 'minor', releaseDate: '2022-06-07', versionGroup: '1.19' },
	{ version: '1.18.2', type: 'minor', releaseDate: '2022-02-28', versionGroup: '1.18' },
	{ version: '1.16.5', type: 'minor', releaseDate: '2021-01-15', versionGroup: '1.16' }
];

// Update these manually as you release new mods
export let mods: ModCompatibility[] = [
	{
		modId: 'plushables',
		icon: platform_plushables,
		name: 'Plushables',
		supportedVersions: [
			'1.16.5',
			'1.19',
			'1.20',
			'1.20.1',
			'1.20.2',
			'1.20.4',
			'1.20.5',
			'1.20.6',
			'1.21',
			'1.21.1',
			'1.21.5',
			'1.21.10',
			'1.21.11'
		]
	},
	{
		modId: 'basicweapons',
		icon: platform_basicweapons,
		name: 'Basic Weapons',
		supportedVersions: [
			'1.19.2',
			'1.20',
			'1.20.1',
			'1.20.2',
			'1.20.4',
			'1.20.5',
			'1.20.6',
			'1.21',
			'1.21.1',
			'1.21.2',
			'1.21.3',
			'1.21.4',
			'1.21.10',
			'1.21.11'
		]
	},
	{
		modId: 'bronze',
		icon: platform_bronze,
		name: 'Bronze',
		supportedVersions: ['1.20.1', '1.20.2', '1.20.6', '1.21', '1.21.1', '1.21.5', '1.21.10', '1.21.11']
	},
	{
		modId: 'basicstorage',
		icon: platform_basicstorage,
		name: 'Basic Storage',
		supportedVersions: ['1.20.1', '1.20.2', '1.21', '1.21.1', '1.21.4', '1.21.8', '1.21.10', '1.21.11']
	},
	{
		modId: 'breakerplacer',
		icon: platform_breakerplacer,
		name: 'Block Breaker & Block Placer',
		supportedVersions: ['1.21', '1.21.1', '1.21.5', '1.21.6', '1.21.7', '1.21.8', '1.21.10', '1.21.11']
	},
	{
		modId: 'heirlooms',
		icon: platform_heirlooms,
		name: 'Heirlooms',
		supportedVersions: ['1.20.1', '1.21.1', '1.21.9', '1.21.10', '1.21.11']
	},
	{
		modId: 'plastar',
		icon: plastar_project_icon,
		name: 'Mecha Soldier PLASTAR',
		supportedVersions: ['1.21', '1.21.1']
	},
	{
		modId: 'kreebles',
		icon: kreebles_project_icon,
		name: 'Kreebles',
		supportedVersions: ['1.21', '1.21.1']
	},
	{
		modId: 'hookaduck',
		icon: hookaduck_project_icon,
		name: 'Hook a Duck',
		supportedVersions: ['1.21', '1.21.1']
	},
	{
		modId: 'beefandblade',
		icon: beef_project_icon,
		name: 'Beef & Blade',
		supportedVersions: ['1.19', '1.19.3', '1.20.1', '1.21', '1.21.1']
	},
	{
		modId: 'dwayne',
		icon: dwayne_project_icon,
		name: 'Dwayne "The Block" Johnson',
		supportedVersions: ['1.18.2', '1.19', '1.19.4', '1.20', '1.20.1', '1.21', '1.21.1']
	},
	{
		modId: 'helpfulcampfires',
		icon: helpfulcampfires_project_icon,
		name: 'Helpful Campfires',
		supportedVersions: ['1.21.1']
	}
];

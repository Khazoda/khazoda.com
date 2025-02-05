import type { MinecraftVersion, ModCompatibility } from './types';

import plushables_project_icon from '$lib/media/project_icons/plushables_project_icon.webp';
import basicweapons_project_icon from '$lib/media/project_icons/basicweapons_project_icon.webp';
import bronze_project_icon from '$lib/media/project_icons/bronze_project_icon.webp';
import breakerplacer_project_icon from '$lib/media/project_icons/breakerplacer_project_icon.webp';
import basicstorage_project_icon from '$lib/media/project_icons/basicstorage_project_icon.webp';
import beef_project_icon from '$lib/media/project_icons/beef_project_icon.webp';
import dwayne_project_icon from '$lib/media/project_icons/dwayne_project_icon.webp';
import hookaduck_project_icon from '$lib/media/project_icons/hookaduck_project_icon.webp';
import kreebles_project_icon from '$lib/media/project_icons/kreebles_project_icon.webp';
import plastar_project_icon from '$lib/media/project_icons/plastar_project_icon.webp';

// Update these manually as new versions are released
export let minecraftVersions: MinecraftVersion[] = [
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
		icon: plushables_project_icon,
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
			'1.21.1'
		]
	},
	{
		modId: 'basicweapons',
		icon: basicweapons_project_icon,
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
			'1.21.4'
		]
	},
	{
		modId: 'bronze',
		icon: bronze_project_icon,
		name: 'Bronze',
		supportedVersions: ['1.20.1', '1.20.2', '1.20.6', '1.21', '1.21.1']
	},
	{
		modId: 'basic-storage',
		icon: basicstorage_project_icon,
		name: 'Basic Storage',
		supportedVersions: ['1.20.1', '1.20.2', '1.21', '1.21.1', '1.21.4']
	},
	{
		modId: 'breakerplacer',
		icon: breakerplacer_project_icon,
		name: 'Block Breaker & Block Placer',
		supportedVersions: ['1.21', '1.21.1']
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
		modId: 'beef-and-blade',
		icon: beef_project_icon,
		name: 'Beef & Blade',
		supportedVersions: ['1.19', '1.19.3', '1.20.1', '1.21', '1.21.1']
	},
	{
		modId: 'dwayne',
		icon: dwayne_project_icon,
		name: 'Dwayne "The Block" Johnson',
		supportedVersions: ['1.18.2', '1.19', '1.19.4', '1.20', '1.20.1', '1.21', '1.21.1']
	}
];

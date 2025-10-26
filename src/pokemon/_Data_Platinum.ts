import boxart_platinum from './images/boxart_platinum.png';
import platinum_trainer_sprite from './images/trainersprite_platinum.png';
import type { Pokemon, Playthrough } from './_DataTypes';

export const data: Playthrough = {
	title: 'TBD',
	boxArt: boxart_platinum,
	trainer: {
		name: 'June',
		id: '54321',
		money: 987654,
		startDate: '2025-03-10',
		endDate: '2025-03-25',
		badges: 8,
		badgeImages: [
			'https://archives.bulbagarden.net/media/upload/thumb/0/0b/Coal_Badge.png/75px-Coal_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/8/8c/Forest_Badge.png/75px-Forest_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/2/27/Cobble_Badge.png/75px-Cobble_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/1/13/Fen_Badge.png/75px-Fen_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/2/28/Relic_Badge.png/75px-Relic_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/f/fe/Mine_Badge.png/75px-Mine_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/0/09/Icicle_Badge.png/75px-Icicle_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/0/0c/Beacon_Badge.png/75px-Beacon_Badge.png'
		],
		trainerSprite: platinum_trainer_sprite,
		playtime: '42:00',
		pokedexCount: 210
	},
	team: [
		{
			name: 'Infernape',
			nickname: 'Blaze',
			level: 55,
			dex: 392
		},
		{
			name: 'Staraptor',
			nickname: 'Wings',
			level: 53,
			dex: 398
		},
		{
			name: 'Luxray',
			nickname: 'Spark',
			level: 52,
			dex: 405
		},
		{
			name: 'Roserade',
			nickname: 'Petal',
			level: 51,
			dex: 407
		},
		{
			name: 'Gastrodon',
			nickname: 'Slimey',
			level: 50,
			dex: 423
		},
		{
			name: 'Garchomp',
			nickname: 'Chomp',
			level: 56,
			dex: 445
		}
	],
	helpfulPokemon: [
		{
			name: 'Bibarel',
			nickname: 'HM Buddy',
			level: 18,
			dex: 400
		},
		{
			name: 'Bronzor',
			nickname: 'Shield',
			level: 22,
			dex: 436
		},
		{
			name: 'Floatzel',
			nickname: 'Swimmy',
			level: 30,
			dex: 419
		}
	]
};

import boxart_ruby from './images/boxart_ruby.png';
import ruby_trainer_sprite from './images/trainersprite_ruby.png';
import type { Pokemon, Playthrough } from './_DataTypes.ts';

export const data: Playthrough = {
	title: 'First full trip through the 2003 Hoenn Region',
	subtitle:
		"I partially played Tobias' copy of Sapphire in 2006 and Alpha Sapphire fully in 2014, but never generation 3 from start to finish. This playthrough took place at the same time as I moved to Leicester.",
	boxArt: boxart_ruby,
	trainer: {
		name: 'June',
		id: '09609',
		money: 55174,
		startDate: '2025-03-27',
		endDate: '2025-05-23',
		badges: 8,
		badgeImages: [
			'https://archives.bulbagarden.net/media/upload/thumb/6/63/Stone_Badge.png/75px-Stone_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/9/97/Knuckle_Badge.png/75px-Knuckle_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/3/34/Dynamo_Badge.png/75px-Dynamo_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/c/c4/Heat_Badge.png/75px-Heat_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/6/63/Balance_Badge.png/75px-Balance_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/6/62/Feather_Badge.png/75px-Feather_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/c/cc/Mind_Badge.png/75px-Mind_Badge.png',
			'https://archives.bulbagarden.net/media/upload/thumb/9/9b/Rain_Badge.png/75px-Rain_Badge.png'
		],
		trainerSprite: ruby_trainer_sprite,
		playtime: '37:50',
		pokedexCount: 74
	},
	team: [
		{
			name: 'Hariyama',
			level: 54,
			dex: 297
		},
		{
			name: 'Exploud',
			level: 57,
			dex: 295
		},
		{
			name: 'Gardevoir',
			nickname: 'Oolong',
			level: 42,
			dex: 282
		},
		{
			name: 'Mightyena',
			level: 42,
			dex: 262
		},
		{
			name: 'Sceptile',
			nickname: 'Greeple',
			level: 60,
			dex: 254
		},
		{
			name: 'Tentacruel',
			nickname: 'Scroot',
			level: 40,
			dex: 73
		}
	],
	helpfulPokemon: [
		{
			name: 'Nuzleaf',
			nickname: 'Acob',
			level: 17,
			dex: 274
		},
		{
			name: 'Beautifly',
			nickname: 'Grumple',
			level: 11,
			dex: 267
		},
		{
			name: 'Wingull',
			level: 14,
			dex: 278
		},
		{
			name: 'Ninjask',
			level: 20,
			dex: 291
		},
		{
			name: 'Shedinja',
			level: 20,
			dex: 292
		},
		{
			name: 'Skarmory',
			nickname: 'Vicious',
			level: 18,
			dex: 227
		},
		{
			name: 'Wobbuffet',
			nickname: 'The Buffet',
			level: 25,
			dex: 202
		},
		{
			name: 'Linoone',
			level: 29,
			dex: 264
		},
		{
			name: 'Machoke',
			nickname: 'Ralph',
			level: 32,
			dex: 67
		},
		{
			name: 'Groudon',
			nickname: 'Groodle',
			level: 45,
			dex: 383
		},
		{
			name: 'Pelipper',
			nickname: 'Gully',
			level: 31,
			dex: 279
		},
		{
			name: 'Dusclops',
			nickname: 'Saul',
			level: 37,
			dex: 356
		}
	]
};

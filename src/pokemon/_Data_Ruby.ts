import boxart_ruby from './images/boxart_ruby.png';
import ruby_trainer_sprite from './images/trainersprite_ruby.png';
import type { Pokemon, Playthrough } from './_DataTypes.ts';

export const data: Playthrough = {
	title: 'First trip through the Hoenn Region',
	subtitle:
		"Unless you're counting Tobias' copy of Sapphire in 2006 or Alpha Sapphire in 2014. This playthrough took place at the same time as I moved out.",
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
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/297.png',
			level: 54,
			dex: 297
		},
		{
			name: 'Exploud',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/295.png',
			level: 57,
			dex: 295
		},
		{
			name: 'Gardevoir',
			nickname: 'Oolong',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png',
			level: 42,
			dex: 282
		},
		{
			name: 'Mightyena',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/262.png',
			level: 42,
			dex: 262
		},
		{
			name: 'Sceptile',
			nickname: 'Greeple',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/254.png',
			level: 60,
			dex: 254
		},
		{
			name: 'Tentacruel',
			nickname: 'Scroot',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png',
			level: 40,
			dex: 73
		}
	],
	helpfulPokemon: [
		{
			name: 'Nuzleaf',
			nickname: 'Acob',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/274.png',
			level: 17,
			dex: 274
		},
		{
			name: 'Beautifly',
			nickname: 'Grumple',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/267.png',
			level: 11,
			dex: 267
		},
		{
			name: 'Wingull',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/278.png',
			level: 14,
			dex: 278
		},
		{
			name: 'Ninjask',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/291.png',
			level: 20,
			dex: 291
		},
		{
			name: 'Shedinja',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/292.png',
			level: 20,
			dex: 292
		},
		{
			name: 'Skarmory',
			nickname: 'Vicious',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/227.png',
			level: 18,
			dex: 227
		},
		{
			name: 'Wobbuffet',
			nickname: 'The Buffet',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/202.png',
			level: 25,
			dex: 202
		},
		{
			name: 'Linoone',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/264.png',
			level: 29,
			dex: 264
		},
		{
			name: 'Machoke',
			nickname: 'Ralph',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/67.png',
			level: 32,
			dex: 67
		},
		{
			name: 'Groudon',
			nickname: 'Groodle',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/383.png',
			level: 45,
			dex: 383
		},
		{
			name: 'Pelipper',
			nickname: 'Gully',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/279.png',
			level: 31,
			dex: 279
		},
		{
			name: 'Dusclops',
			nickname: 'Saul',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/356.png',
			level: 37,
			dex: 356
		}
	]
};

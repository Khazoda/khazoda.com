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
		id: '12345',
		money: 123456,
		startDate: '2024-01-01',
		endDate: '2024-01-15',
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
		playtime: '34:15',
		pokedexCount: 151
	},
	team: [
		{
			name: 'Blaziken',
			nickname: 'Torch',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png',
			level: 50,
			dex: 257
		},
		{
			name: 'Swellow',
			nickname: 'Wings',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/277.png',
			level: 48,
			dex: 277
		},
		{
			name: 'Ludicolo',
			nickname: 'Fiesta',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/272.png',
			level: 49,
			dex: 272
		},
		{
			name: 'Manectric',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/310.png',
			level: 47,
			dex: 310
		},
		{
			name: 'Aggron',
			nickname: 'Ironclad',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/306.png',
			level: 48,
			dex: 306
		},
		{
			name: 'Gardevoir',
			nickname: 'Grace',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png',
			level: 50,
			dex: 282
		}
	],
	helpfulPokemon: [
		{
			name: 'Zigzagoon',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/263.png',
			level: 12,
			dex: 263
		},
		{
			name: 'Pelipper',
			nickname: 'Mailman',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/279.png',
			level: 28,
			dex: 279
		},
		{
			name: 'Hariyama',
			nickname: 'Sumo',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/297.png',
			level: 32,
			dex: 297
		},
		{
			name: 'Beautifly',
			nickname: 'Petal',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/267.png',
			level: 22,
			dex: 267
		},
		{
			name: 'Makuhita',
			nickname: 'Mak',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/296.png',
			level: 16,
			dex: 296
		},
		{
			name: 'Electrike',
			nickname: 'Bolt',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/309.png',
			level: 18,
			dex: 309
		},
		{
			name: 'Sableye',
			nickname: 'Gem',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/302.png',
			level: 25,
			dex: 302
		},
		{
			name: 'Torkoal',
			nickname: 'Coal',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/324.png',
			level: 27,
			dex: 324
		},
		{
			name: 'Trapinch',
			nickname: 'Chomp',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/328.png',
			level: 20,
			dex: 328
		},
		{
			name: 'Altaria',
			nickname: 'Cloudy',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/334.png',
			level: 35,
			dex: 334
		},
		{
			name: 'Absol',
			nickname: 'Disaster',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/359.png',
			level: 36,
			dex: 359
		},
		{
			name: 'Wailord',
			nickname: 'Big Blue',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/321.png',
			level: 40,
			dex: 321
		},
		{
			name: 'Linoone',
			nickname: 'Stripe',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/264.png',
			level: 20,
			dex: 264
		},
		{
			name: 'Manectric',
			nickname: 'Amp',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/310.png',
			level: 30,
			dex: 310
		},
		{
			name: 'Breloom',
			nickname: 'Punchy',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/286.png',
			level: 29,
			dex: 286
		},
		{
			name: 'Sharpedo',
			nickname: 'Jaws',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/319.png',
			level: 33,
			dex: 319
		},
		{
			name: 'Camerupt',
			nickname: 'Volcano',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/323.png',
			level: 34,
			dex: 323
		},
		{
			name: 'Flygon',
			nickname: 'Dragonfly',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/330.png',
			level: 45,
			dex: 330
		},
		{
			name: 'Walrein',
			nickname: 'Tusk',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/365.png',
			level: 44,
			dex: 365
		},
		{
			name: 'Dusclops',
			nickname: 'Spooky',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/356.png',
			level: 37,
			dex: 356
		},
		{
			name: 'Castform',
			nickname: 'Weather',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/351.png',
			level: 25,
			dex: 351
		},
		{
			name: 'Kecleon',
			nickname: 'Chameleon',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/352.png',
			level: 26,
			dex: 352
		},
		{
			name: 'Seviper',
			nickname: 'Venom',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/336.png',
			level: 28,
			dex: 336
		},
		{
			name: 'Solrock',
			nickname: 'Sunstone',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/338.png',
			level: 29,
			dex: 338
		},
		{
			name: 'Lunatone',
			nickname: 'Moonstone',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/337.png',
			level: 29,
			dex: 337
		},
		{
			name: 'Chimecho',
			nickname: 'Bell',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/358.png',
			level: 30,
			dex: 358
		},
		{
			name: 'Whiscash',
			nickname: 'Whiskers',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/340.png',
			level: 31,
			dex: 340
		},
		{
			name: 'Cacturne',
			nickname: 'Spikes',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/332.png',
			level: 32,
			dex: 332
		},
		{
			name: 'Banette',
			nickname: 'Doll',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/354.png',
			level: 34,
			dex: 354
		},
		{
			name: 'Tropius',
			nickname: 'Banana',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/357.png',
			level: 30,
			dex: 357
		},
		{
			name: 'Relicanth',
			nickname: 'Ancient',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/369.png',
			level: 35,
			dex: 369
		},
		{
			name: 'Claydol',
			nickname: 'Totem',
			sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/344.png',
			level: 36,
			dex: 344
		}
	]
};

import boxart_za from './images/boxart_za.png';
import za_trainer_sprite from './images/trainersprite_za.png';
import type { Pokemon, Playthrough } from './_DataTypes';

export const data: Playthrough = {
	title: 'Saving Kalos from AZ\'s\ weapon AGAIN',
	subtitle: "It's been 3 years since Pokemon Violet released, and Legends ZA lived up to and surpassed my expectations totally. The writing was excellent and the new battle format is so refreshing",
	boxArt: boxart_za,
	trainer: {
		name: 'June',
		id: '-',
		money: 48363,
		startDate: '2025-10-16',
		endDate: '2025-10-25',
		badges: 0,
		badgeImages: [],
		trainerSprite: za_trainer_sprite,
		playtime: '37:30',
		pokedexCount: 199
	},
	team: [
		{
			name: 'Emoga',
			level: 65,
			dex: 587
		},
		{
			name: 'Leafa',
			level: 77,
			dex: 154
		},

		{
			name: 'Alba',
			level: 72,
			dex: 663
		},
		{
			name: 'Wheel boy',
			level: 69,
			dex: 545,
			shiny: true
		},
		{
			name: 'Gardevoir',
			level: 73,
			dex: 282
		},

		{
			name: 'Garfield',
			level: 73,
			dex: 445
		}
	],
	helpfulPokemon: [
		{
			name: 'Beedrill',
			nickname: 'Drillo',
			level: 23,
			dex: 15
		},
		{
			name: 'Aegislash',
			level: 46,
			dex: 681
		},
		{
			name: 'Furfrou',
			level: 60,
			dex: 676
		},
		{
			name: 'Diggersby',
			nickname: 'Bubblebleam',
			level: 52,
			dex: 660
		},
		{
			name: 'Charizard',
			nickname: 'Charli',
			level: 59,
			dex: 6
		},
		{
			name: 'Lopunny',
			nickname: 'Buns',
			level: 43,
			dex: 428
		},
		{
			name: 'Banette',
			nickname: 'Dependababs',
			level: 50,
			dex: 354
		},
		{
			name: 'Gyarados',
			level: 41,
			dex: 130
		},
		{
			name: 'Ampharos',
			level: 36,
			dex: 181,
			shiny: true
		},
		{
			name: 'Sylveon',
			nickname: 'Sylvester',
			level: 45,
			dex: 700
		},
		{
			name: 'Clefable',
			level: 59,
			dex: 36
		},
		{
			name: 'Absol',
			level: 32,
			dex: 359
		},
		{
			name: 'Pikachu',
			nickname: 'Gelly',
			level: 20,
			dex: 25
		}
	]
};
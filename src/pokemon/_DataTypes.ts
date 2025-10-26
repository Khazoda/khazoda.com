// TypeScript interfaces for Pokémon data
export interface Pokemon {
	name: string;
	nickname?: string;
	level: number;
	dex: number;
	shiny?: boolean;
}

export interface Playthrough {
	title: string;
	subtitle?: string;
	boxArt: string;
	trainer: {
		name: string;
		id: string;
		money: number;
		startDate: string;
		endDate: string;
		badges: number;
		badgeImages: string[];
		trainerSprite: string;
		playtime: string;
		pokedexCount: number;
	};
	team: Pokemon[];
	helpfulPokemon: Pokemon[];
}

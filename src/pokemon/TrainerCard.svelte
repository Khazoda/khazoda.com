<script lang="ts">
	import type { Pokemon, Playthrough } from "./_DataTypes";

	export let trainer: Playthrough["trainer"] = {
		name: "",
		id: "",
		money: 0,
		startDate: "",
		endDate: "",
		badges: 0,
		badgeImages: [],
		trainerSprite: "",
		playtime: "",
		pokedexCount: 0
	};

	import EliteTeamDisplay from "./EliteTeamDisplay.svelte";

	export let team: Pokemon[] = [];

	// Optional small prop for compact display
	export let small: boolean = false;
</script>

<div class="trainer-card {small ? 'small' : ''}">
	<div class="trainer-header">
		<span class="trainer-name">{trainer.name}</span>
		<span class="trainer-id">ID: {trainer.id}</span>
		{#if trainer.trainerSprite}
			<img class="trainer-sprite" src={trainer.trainerSprite} alt="Trainer Sprite" />
		{/if}
	</div>
	<div class="money">
		<span class="label">Money:</span> ₽{trainer.money.toLocaleString()}
	</div>
	<div class="playtime-pokedex">
		{#if trainer.playtime}
			<span class="label">Playtime:</span> {trainer.playtime}
		{/if}
		{#if trainer.pokedexCount !== undefined}
			<span class="label" style="margin-left:1rem;">Pokédex:</span> {trainer.pokedexCount}
		{/if}
	</div>
	<div class="dates">
		<span class="label">Start:</span>
		{trainer.startDate}
		<span class="label" style="margin-left:1rem;">End:</span>
		{trainer.endDate}
	</div>
	<div class="badges">
		{#each trainer.badgeImages as badge, i}
			<img class="badge-img" src={badge} alt={`Badge ${i + 1}`} />
		{/each}
	</div>
	{#if team && team.length}
		<span class="elite4-team">
			<EliteTeamDisplay {team} />
		</span>
	{/if}
</div>

<style>
	.trainer-card {
		position: relative;
		width: 100%;
		max-width: 700px;
		margin-bottom: 1rem;
		padding: 1.2rem 1.5rem;
		border: 2px solid #e2c9a0;
		border-radius: 18px;
		background: #fffdfa;
		box-shadow: 0 4px 16px rgba(120, 80, 40, 0.1);
		font-family: "Quicksand", "Comic Sans MS", cursive, sans-serif;
	}
	.trainer-card.small {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		min-width: 300px;
		max-width: 400px;
		min-height: 120px;
		margin-bottom: 0;
		padding: 0.7rem 0.7rem 0.7rem 1rem;
		border-radius: 16px;
		background: #fffdfa;
		box-shadow: 0 2px 8px rgba(120, 80, 40, 0.08);
	}
	.trainer-card.small .trainer-header {
		height: 100%;
		gap: 0.5rem;
	}
	.trainer-card.small .trainer-sprite {
		top: -0.5rem;
		right: -1rem;
		width: 60px;
		min-width: 60px;
		max-width: 60px;
		height: 60px;
		min-height: 60px;
		max-height: 60px;
	}
	.trainer-card.small .trainer-header {
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
	}
	.trainer-card.small .trainer-name,
	.trainer-card.small .trainer-id,
	.trainer-card.small .money,
	.trainer-card.small .playtime-pokedex,
	.trainer-card.small .dates,
	.trainer-card.small .badges {
		align-items: flex-start;
		justify-content: flex-start;
		text-align: left;
	}
	.trainer-card.small .elite4-team {
		display: none;
	}
	.trainer-sprite {
		z-index: 0;
		position: absolute;
		top: 0;
		right: 0;
		width: 225px;
		height: 225px;
		object-fit: contain;
		image-rendering: pixelated;
	}
	.trainer-header,
	.money,
	.playtime-pokedex,
	.dates,
	.badges,
	.elite4-team {
		z-index: 1;
		position: relative;
	}
	.trainer-header {
		display: flex;
		position: relative;
		align-items: center;
		margin-bottom: 0.7rem;
		gap: 1rem;
	}
	.trainer-name {
		color: #d62839;
		font-weight: bold;
		font-size: 1.3rem;
		letter-spacing: 1px;
	}
	.trainer-id {
		margin-left: 0.5rem;
		padding: 0.1rem 0.5rem;
		border-radius: 8px;
		background: #f7e6c4;
		color: #8b7b5a;
		font-size: 0.95rem;
	}
	.money {
		margin-bottom: 0.3rem;
		color: #4e7c59;
		font-size: 1.1rem;
	}
	.playtime-pokedex {
		margin-bottom: 0.3rem;
		color: #4e7c59;
		font-size: 1.05rem;
	}
	.dates {
		margin-bottom: 0.5rem;
		color: #7c6f57;
		font-size: 0.95rem;
	}
	.badges {
		display: flex;
		flex-wrap: wrap;
		margin-top: 0.5rem;
		gap: 0.4rem;
	}
	.badge-img {
		width: 28px;
		height: 28px;
		object-fit: contain;
		border: 1.5px solid #e2c9a0;
		border-radius: 6px;
		background: #f7e6c4;
		box-shadow: 0 1px 4px rgba(120, 80, 40, 0.1);
	}
	.label {
		margin-right: 0.3rem;
		color: #bfa76a;
		font-size: 0.9rem;
	}
</style>

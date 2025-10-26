<script lang="ts">
	import type { Pokemon } from "./_DataTypes.ts";

	export let team: Pokemon[] = [];

	export let rows: number | undefined = undefined;

	const size: number = 6;
	// Helper to split team into rows if rows prop is provided
	$: teamRows =
		rows && team.length > 0
			? Array.from({ length: rows }, (_, i) =>
					team.slice(i * Math.ceil(team.length / rows), (i + 1) * Math.ceil(team.length / rows))
				)
			: [team];
</script>

<div class="team" class:multirow={rows && rows > 1}>
	{#each teamRows as row}
		<div class="team-row">
			{#each row as poke}
				<div class="pokemon">
					<img class="sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (poke.shiny ? "shiny/" : "") + poke.dex + ".png"} alt={poke.name} />
					<div class="nickname">{poke.nickname ? poke.nickname : poke.name}</div>
					<div class="level">Lv.{poke.level}</div>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.team {
		margin-top: 1rem;
		padding: 0.8rem 1.2rem;
		border-radius: 14px;
		outline: 0.5rem solid white;
		background: #f8f4e6;
		box-shadow: 0 2px 8px rgba(120, 80, 40, 0.07);
		font-family: "Quicksand", "Comic Sans MS", cursive, sans-serif;
	}
	.team-row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.pokemon {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: auto;
		min-width: 0;
		max-width: 100px;
		height: auto;
		margin-bottom: 0.1rem;
		padding: 0.25rem;
	}
	.sprite {
		flex: 1 1 auto;
		width: 72px;
		max-width: 72px;
		height: 72px;
		max-height: 72px;
		margin-bottom: 0.2rem;
		object-fit: contain;
		border: 2px solid #e2c9a0;
		border-radius: 50%;
		background: #fffbe7;
		box-shadow: 0 1px 4px rgba(120, 80, 40, 0.3);
	}
	.nickname {
		max-width: 100%;
		margin-bottom: 0.1rem;
		color: #d62839;
		font-weight: bold;
		font-size: 1rem;
		line-height: 1.1;
		font-family: monospace;
		text-align: center;
		text-shadow: 0 1px 0 #fffbe7;
		white-space: nowrap;
		word-break: break-word;
	}

	.level {
		margin-top: 0.05rem;
		color: #2d4c3a;
		font-size: 0.95rem;
		font-family: inherit;
		text-align: center;
	}
</style>

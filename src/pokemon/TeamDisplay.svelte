<script lang="ts">
	import type { Pokemon } from "./_DataTypes.ts";

	export let team: Pokemon[] = [];

	export let size: number = 48;

	let hovered: (Pokemon & { i: number }) | null = null;
</script>

<div class="box-team-grid">
	{#each team.slice(0, 30) as poke, i}
		<div
			class="box-pokemon"
			role="button"
			tabindex="0"
			style="width: {size + 8}px; height: {size + 8}px;"
			on:mouseenter={() => (hovered = { ...poke, i })}
			on:mouseleave={() => (hovered = null)}
			on:focus={() => (hovered = { ...poke, i })}
			on:blur={() => (hovered = null)}>
			<img class="box-sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (poke.shiny ? "shiny/" : "") + poke.dex + ".png"} alt={poke.name} style="width: {size}px; height: {size}px;" />
			{#if hovered && hovered.i === i}
				<div class="poke-popup">
					<div class="popup-header">
						<div class="popup-dex">#{poke.dex.toString().padStart(3, "0")}</div>
						<div class="popup-level">Lv.{poke.level}</div>
					</div>
					<img
						src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (poke.shiny ? "shiny/" : "") + poke.dex + ".png"}
						alt={poke.name}
						class="popup-sprite"
						width="120"
						height="120"
						style="width: 120px; height: 120px;" />
					<div class="popup-nick">{poke.nickname ? poke.nickname.toUpperCase() : ""}</div>
					<div class="popup-species">{poke.name.toUpperCase()}</div>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.box-team-grid {
		display: grid;
		grid-template-rows: repeat(5, 1fr);
		grid-template-columns: repeat(6, 1fr);
		align-items: center;
		justify-items: center;
		width: fit-content;
		padding: 1.2rem 1.5rem;
		gap: 12px;
		border: 3px solid #f7d38c;
		border-radius: 18px;
		background: linear-gradient(180deg, #ffe9b3 0%, #aee9f7 100%);
		box-shadow:
			0 2px 8px rgba(80, 120, 80, 0.13),
			0 0 0 6px #fffbe7 inset;
		font-size: x-large;
		font-family: "dsFont", monospace;
		text-shadow: 0 2px 0 #ffffff;
	}
	.box-pokemon {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		border: 2px solid #f7d38c;
		border-radius: 10px;
		background: linear-gradient(160deg, #fffbe7 60%, #f7e6b3 100%);
		box-shadow:
			0 1px 4px rgba(200, 180, 120, 0.1),
			0 0 0 2px #fffbe7 inset;
		transition:
			box-shadow 0.2s,
			border-color 0.2s;
	}
	.box-pokemon:hover,
	.box-pokemon:focus {
		border-color: #f7b86c;
		box-shadow:
			0 2px 8px rgba(240, 200, 120, 0.18),
			0 0 0 3px #ffe9b3 inset;
	}
	.box-sprite {
		display: block;
		object-fit: contain;
		border: none;
		background: none;
		box-shadow: none;
	}
	.poke-popup {
		display: flex;
		z-index: 10;
		position: absolute;
		top: 50%;
		left: 110%;
		flex-direction: column;
		align-items: center;
		min-width: 170px;
		padding: 18px 18px 10px 18px;
		transform: translateY(-50%);
		border: 2.5px solid #6fcf97;
		border-radius: 14px;
		background: linear-gradient(180deg, #c7f7d3 80%, #b0e6c2 100%);
		box-shadow:
			0 2px 8px rgba(80, 120, 80, 0.18),
			0 0 0 4px #eafff1 inset;
		pointer-events: none;
	}
	.popup-sprite {
		display: block;
		width: 120px;
		height: 120px;
		margin-bottom: 8px;
		padding: 8px 0;
		object-fit: contain;
		border-radius: 8px;
		background: repeating-linear-gradient(0deg, #eafff1, #eafff1 4px, #c7f7d3 4px, #c7f7d3 8px);
		box-shadow: 0 1px 0 #b0e6c2 inset;
		image-rendering: pixelated;
	}
	.popup-header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 0.2em;
	}
	.popup-dex {
		color: #2d4c3a;
		font-weight: bold;
		font-size: 1.1em;
		font-family: inherit;
	}
	.popup-nick {
		margin-top: 0.2em;
		color: #2d4c3a;
		font-weight: bold;
		font-size: 1.15em;
		font-family: inherit;
		letter-spacing: 1px;
		text-align: center;
		text-transform: uppercase;
	}
	.popup-species {
		margin-bottom: 0.3em;
		color: #4e7c5a;
		font-size: 1.05em;
		font-family: inherit;
		text-align: center;
		text-transform: uppercase;
	}
	.popup-level {
		color: #2d4c3a;
		font-weight: bold;
		font-size: 1.1em;
		font-family: inherit;
	}
</style>

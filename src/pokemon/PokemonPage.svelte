<script lang="ts">
	import TrainerCard from "./TrainerCard.svelte";
	import TeamDisplay from "./TeamDisplay.svelte";
	import { draggable } from "./draggable";

	import { data as ruby } from "./_Data_Ruby";
	import { data as platinum } from "./_Data_Platinum";

	// Data for each game
	const games = [ruby, platinum];

	// By default, no windows are open
	let openWindows = games.map(() => false);

	// Track z-index for each window
	let zIndexes = games.map((_, i) => i + 1);
	let topZ = games.length + 1;

	let timelineZoom = 1;
	$: timelineStyle = `scale: ${timelineZoom};`;
	function toggleZoom() {
		timelineZoom = timelineZoom === 1 ? 0.5 : 1;
	}

	function bringToFront(i: number) {
		zIndexes[i] = ++topZ;
	}

	function closeWindow(i: number) {
		openWindows[i] = false;
	}
	function openWindow(i: number) {
		openWindows[i] = true;
		bringToFront(i);
	}
</script>

<div class="desktop-bg">
	<div class="timeline">
		<div class="timeline-line-wrapper">
			<button
				class="zoom-toggle-btn-minimal"
				on:mousedown={toggleZoom}
				aria-label={timelineZoom === 1 ? "Zoom out" : "Zoom in"}>
				{timelineZoom === 1 ? "-" : "+"}
			</button>
			<div class="timeline-line"></div>
		</div>
		<div class="timeline-content" style={timelineStyle}>
			<div class="timeline-start">March 2025</div>
			{#each games as game, i}
				{#if !openWindows[i]}
					<div class="timeline-entry">
						<button class="game-launcher-btn" on:mousedown={() => openWindow(i)}>
							<TrainerCard trainer={game.trainer} small={true} />
						</button>
						<div class="timeline-title-container">
							<span class="timeline-title">{game.title}</span>
							{#if game.subtitle}
								<span class="timeline-subtitle">{game.subtitle}</span>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
	{#each games as game, i}
		{#if openWindows[i]}
			<div
				class="window"
				use:draggable={{ onStart: () => bringToFront(i) }}
				style="z-index: {zIndexes[i]}; right: {60 + i * 40}px; top: {60 + i * 40}px;">
				<div class="box-art-frame">
					<img class="box-art" src={game.boxArt} alt={game.title + " box art"} />
				</div>
				<div class="window-header">
					<span>{game.title}</span>
					<button class="window-close" on:mousedown={() => closeWindow(i)} aria-label="Close window">&times;</button>
				</div>
				<div class="window-content">
					<div class="game-details">
						<div class="trainer-section">
							<TrainerCard trainer={game.trainer} team={game.team} />
						</div>
						<div class="helpful-pokemon-section">
							<TeamDisplay team={game.helpfulPokemon} />
						</div>
					</div>
				</div>
			</div>
		{/if}
	{/each}
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;700&display=swap");
	.desktop-bg {
		position: relative;
		width: 100svw;
		height: 100svh;
		padding-top: 3rem;
		padding-bottom: 3rem;
		overflow-x: hidden;
		background: linear-gradient(135deg, #e0f4ff 0%, #fffbe7 100%);
	}
	.timeline {
		display: flex;
		position: relative;
		flex-direction: row;
		align-items: flex-start;
		height: 100%;
	}
	.timeline-line-wrapper {
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 4.5rem;
		height: 100%;
		padding-top: 2.5rem; /* space for button */
	}
	.zoom-toggle-btn-minimal {
		z-index: 2;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		border: none;
		background: none;
		color: #7ec4cf;
		font-size: 2rem;
		cursor: pointer;
		transition: transform 0.2s;
	}
	.timeline-line {
		z-index: 1;
		position: absolute;
		top: 2.5rem; /* below button */
		bottom: 0;
		left: 50%;
		width: 4px;
		transform: translateX(-50%);
		border-radius: 2px;
		background: linear-gradient(to bottom, #7ec4cf 0%, #ffe066 100%);
	}
	.timeline-content {
		display: flex;
		z-index: 1;
		position: relative;
		flex-direction: column;
		margin-top: 2.5rem;
		margin-left: 0;
		gap: 2rem;
		transform-origin: top left;
		scale: 1;
		transition: scale 0.5s;
	}
	.timeline-start {
		margin-bottom: 0.5rem;
		margin-left: 0.5rem;
		color: #7ec4cf;
		font-weight: bold;
		font-size: 1.1rem;
		letter-spacing: 1px;
		text-align: left;
	}
	.timeline-entry {
		display: flex;
		align-items: center;
		gap: 1.2rem;
	}
	.timeline-title-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		min-width: 300px;
		max-width: 400px;
		gap: 0.2rem;
	}
	.timeline-title {
		color: #35607a;
		font-weight: 600;
		font-size: 1.1rem;
		font-family: "Quicksand", "Segoe UI", Arial, sans-serif;
		letter-spacing: 0.5px;
		white-space: nowrap;
	}
	.timeline-subtitle {
		color: #35607a;
		font-size: 1rem;
		font-family: "Quicksand", "Segoe UI", Arial, sans-serif;
		letter-spacing: 0.5px;
	}
	.game-launcher-btn {
		padding: 0;
		border: none;
		border-radius: 18px;
		background: none;
		box-shadow: 0 2px 8px rgba(120, 80, 40, 0.08);
		cursor: pointer;
		transition:
			box-shadow 0.2s,
			transform 0.2s;
	}
	.game-launcher-btn:hover,
	.game-launcher-btn:focus {
		transform: translateY(-4px) scale(1.03);
		box-shadow: 0 4px 16px rgba(120, 80, 40, 0.18);
	}
	.window {
		position: absolute;
		top: 60px;
		right: 60px;
		min-width: 650px;
		max-width: 650px;
		border-radius: 14px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
	}
	.window-header {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: space-between;
		height: 65px;
		padding: 0.8rem;
		border: 2px solid rgba(0, 0, 0, 0.25);
		border-bottom: 2px solid rgba(0, 0, 0, 0.1);
		border-radius: 12px 12px 0 0;
		background: white;
		box-shadow: 0 2px 8px #39373033;
		color: #4e7c5a;
		font-weight: bold;
		font-size: 1.15rem;
		font-family: "Quicksand", "Comic Sans MS", cursive, sans-serif;
		letter-spacing: 1px;
		cursor: move;
		user-select: none;
	}

	.window-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5em;
		height: 1.5em;
		border: none;
		border-radius: 0.5rem;
		background: #f76c6c;
		box-shadow: 0 1px 4px #f76c6c33;
		color: #fff;
		font-weight: bold;
		font-size: 1.25em;
		cursor: pointer;
		transition:
			background 0.2s,
			transform 0.2s;
	}
	.window-close:hover,
	.window-close:focus {
		transform: scale(1.12) rotate(8deg);
		outline: none;
		background: #ffb366;
		color: #fff;
	}
	.window-content {
		padding: 1.2rem 1.5rem 1.5rem 1.5rem;
		border: 2px solid rgba(0, 0, 0, 0.25);
		border-top: none;
		border-radius: 0 0 12px 12px;
		background: linear-gradient(to bottom, #ebe9e3 0%, #dfe4e9 100%);
	}
	.box-art-frame {
		display: inline-block;
		z-index: -100;
		position: absolute;
		top: -0.25rem;
		left: -1.5rem;
		transform: rotate(-15deg);
		box-shadow:
			0 2px 8px #ffe06699,
			0 1px 4px #7ec4cf33;
		transition: transform 0.2s;
	}
	.box-art-frame:hover {
		z-index: 100;
		transform: rotate(-5deg) scale(1.05) translate(-10px, -10px);
		cursor: pointer;
	}
	.box-art {
		display: block;
		width: 100px;
		border-radius: 6px;
		background: #fffdfa;
	}
	.game-details {
		display: flex;
		z-index: 1;
		position: relative;
		flex: 1;
		flex-direction: column;
		gap: 0.7rem;
	}
	.trainer-section {
		display: flex;
		gap: 1rem;
	}
	.helpful-pokemon-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.helpful-title {
		margin-bottom: 0.5rem;
		color: #f76c6c;
		font-size: 1.5rem;
		font-family: "dsFont", cursive;
		letter-spacing: 1px;
	}
	.zoom-toggle-btn {
		display: none;
	}
</style>

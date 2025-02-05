<script>
	import { fly } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { onMount } from "svelte";
	import ImportantButton from "src/components/materialpack/ImportantButton.svelte";
	import HugeiconsArrowLeft02 from "virtual:icons/hugeicons/arrow-left-02";

	import CurlyArrow from "$lib/materialpack/media/curly_arrow.svg";

	let pageReady = false;
	let timeoutReady = false;
	onMount(() => {
		pageReady = true;
		setTimeout(() => {
			timeoutReady = true;
		}, 5000);
	});
</script>

<div class="page-container">
	{#if pageReady}
		<div class="content" transition:fly={{ y: -20, duration: 500, delay: 0 }}>
			<div class="flex-row gap-4 align-center above-header">
				<a class="flex-row gap-2" href="/basicweapons/materialpacks">
					<ImportantButton icon={HugeiconsArrowLeft02} label="Back" color="grey" backdropCorner="center" />
				</a>
			</div>

			<h1>What is a Material Pack?</h1>
			<p>
				Material packs are an easy way to create new weapons from custom materials for the
				<a href="https://khazoda.com#basicweapons" target="_blank">Basic Weapons</a>
				mod <u>without writing a single line of code.</u>
			</p>
			<h3>How do I make a Material Pack?</h3>
			<p>
				Material packs can be created from scratch, but the recommended method is to use the
				<a href="/basicweapons/materialpacks/create">Material Pack Creator</a>. You'll need to create the weapon
				textures yourself, but everything else is generated dynamically.
			</p>
			<p>
				If you want more granular control over certain values, or want to change things like item model files or
				translations, you can always edit the materialpack files locally after generating them.
			</p>
			<h3>How do I install a Material Pack?</h3>
			<p>
				Material packs can be downloaded from Modrinth. You can also browse our <a
					href="/basicweapons/materialpacks/list"
					>list of published material packs
				</a>, which links to the Modrinth page for each pack.
			</p>
		</div>
		<span class="curly-arrow-container {timeoutReady ? 'pageready' : ''}">
			<span>More Questions?</span>
			<img class="curly-arrow" src={CurlyArrow} alt="Curly Arrow" />
		</span>
	{/if}
</div>

<style lang="scss">
	.page-container {
		align-items: center;
		display: flex;
		height: calc(100dvh - 16px);
		justify-content: center;
		width: 100%;
		@media screen and (max-width: 600px) {
			height: calc(100dvh - 8px);
			padding: 8rem 2rem 2rem 2rem;
			width: calc(100dvw - 8px);
		}
	}
	.content {
		max-width: 600px;
		div a,
		div a:hover {
			text-decoration: none;
		}
	}

	h3 {
		font-family: "Quicksand", sans-serif;
		margin: 1.75rem 0 0 0;
	}
	p {
		color: rgb(218, 218, 218);
		margin: 0.75rem 0 0 0;
	}

	.curly-arrow-container {
		align-items: center;
		display: flex;
		gap: 0.5rem;
		height: 256px;
		opacity: 0;
		pointer-events: none;
		position: fixed;
		right: 1rem;
		top: 1rem;
		transition: opacity 0.3s ease;
		width: 256px;
		.curly-arrow {
			position: absolute;
			right: 0;
			top: 0;
		}
		span {
			bottom: 42px;
			font-family: "Quicksand", sans-serif;
			font-size: 1rem;
			font-weight: 600;
			left: -42px;
			position: absolute;
			transform: rotate(-10deg);
		}
		&.pageready {
			opacity: 0.75;
		}
		@media screen and (max-width: 800px) {
			display: none;
		}
	}
</style>

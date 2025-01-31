<script>
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';
	import ImportantButton from 'src/components/materialpack/ImportantButton.svelte';
	import HugeiconsArrowLeft02 from 'virtual:icons/hugeicons/arrow-left-02';

	import CurlyArrow from '$lib/materialpack/media/curly_arrow.svg';

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
					<ImportantButton
						icon={HugeiconsArrowLeft02}
						label="Back"
						color="grey"
						backdropCorner="center" />
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
				<a href="/basicweapons/materialpacks/create">Material Pack Creator</a>. You'll need to
				create the weapon textures yourself, but everything else is generated dynamically.
			</p>
			<p
				>If you want more granular control over certain values, or want to change things like item
				model files or translations, you can always edit the materialpack files locally after
				generating them.
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
		width: 100%;
		height: calc(100dvh - 16px);
		display: flex;
		justify-content: center;
		align-items: center;
		@media screen and (max-width: 600px) {
			width: calc(100dvw - 8px);
			height: calc(100dvh - 8px);
			padding: 8rem 2rem 2rem 2rem;
		}
	}
	.content {
		max-width: 600px;
	}

	h3 {
		margin: 1.75rem 0 0 0;
		font-family: 'Quicksand', sans-serif;
	}
	p {
		margin: 0.75rem 0 0 0;
		color: rgb(218, 218, 218);
	}

	.curly-arrow-container {
		pointer-events: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		position: fixed;
		top: 1rem;
		right: 1rem;
		width: 256px;
		height: 256px;
		opacity: 0;
		transition: opacity 0.3s ease;
		.curly-arrow {
			position: absolute;
			top: 0;
			right: 0;
		}
		span {
			font-family: 'Quicksand', sans-serif;
			font-size: 1rem;
			font-weight: 600;
			position: absolute;
			left: -42px;
			bottom: 42px;
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

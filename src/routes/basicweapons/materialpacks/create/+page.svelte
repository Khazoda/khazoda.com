<script lang="ts">
	import HomeButton from 'components/HomeButton.svelte';
	import HugeiconsPlusSignSquare from 'virtual:icons/hugeicons/plus-sign-square';
	import HugeiconsLibrary from 'virtual:icons/hugeicons/library';
	import HugeiconsBubbleChatQuestion from 'virtual:icons/hugeicons/bubble-chat-question';

	import { blur, crossfade, draw, fade, fly, scale, slide } from 'svelte/transition';
	import { onMount, tick } from 'svelte';

	let pageReady = false;

	onMount(() => {
		requestAnimationFrame(() => {
			setTimeout(() => {
				pageReady = true;
			}, 0);
		});
	});
</script>

<svelte:head>
	<title>Material Pack Creator</title>
</svelte:head>

<!-- #region HTML-->
<div class="page-container">
	{#if pageReady}
		<span class="absolute-top-left" transition:fade={{ duration: 500, delay: 0 }}>
			<HomeButton />
		</span>
		<div class="center-container">
			<h1 transition:fly={{ y: 200, duration: 500, delay: 0 }}>Basic Weapons</h1>
			<h2 transition:fly={{ y: 200, duration: 500, delay: 50 }}>Material Pack Creator</h2>
			<ul>
				<li transition:fly={{ y: 200, duration: 500, delay: 100 }}>
					Use this tool to create <a href="/basicweapons/materialpacks/help">material packs</a> for basic
					weapons
				</li>
				<li transition:fly={{ y: 200, duration: 500, delay: 150 }}>
					Define your own weapon stats and textures. The tool will take care of the rest
				</li>
			</ul>
			<div class="flex-row align-center">
				<button class="btn-important blue" transition:scale={{ duration: 500, delay: 500 }}>
					<HugeiconsLibrary /> View Material Packs
				</button>
				<button class="btn-important green" transition:scale={{ duration: 500, delay: 500 }}>
					<HugeiconsPlusSignSquare /> Create Material Pack
				</button>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.absolute-top-left {
		position: absolute;
		top: 1rem;
		left: 1rem;
	}
	.page-container {
		width: calc(100dvw - 16px);
		height: calc(100dvh - 16px);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.center-container {
		h1 {
			font-size: 64px;
			color: #79ccf5;
		}
		h2 {
			padding-left: 0.2rem;
		}
	}
	ul {
		list-style-position: outside;
		padding-inline: 1.25rem;
	}

	.btn-important {
		width: fit-content;
		margin-right: 2rem;
		padding: 1rem 2rem;
		font-family: 'Quicksand', 'sans-serif';
		font-size: 1.2rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #fff;
		border: none;
		border-radius: 8px;
		box-shadow: 0 4px 15px rgba(33, 147, 176, 0.3);
		&.green {
			background: linear-gradient(135deg, #21b039, #6ded93);
		}
		&.blue {
			background: linear-gradient(135deg, #2193b0, #6dd5ed);
		}
	}
</style>

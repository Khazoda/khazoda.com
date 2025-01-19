<script lang="ts">
	import HomeButton from 'components/HomeButton.svelte';
	import HugeiconsPlusSignSquare from 'virtual:icons/hugeicons/plus-sign-square';
	import HugeiconsLibrary from 'virtual:icons/hugeicons/library';
	import HugeiconsBubbleChatQuestion from 'virtual:icons/hugeicons/bubble-chat-question';

	import copper_dagger from '$lib/media/mod_specific_assets/basicweapons/copper_dagger.png';
	import copper_hammer from '$lib/media/mod_specific_assets/basicweapons/copper_hammer.png';
	import copper_spear from '$lib/media/mod_specific_assets/basicweapons/copper_spear.png';

	import { blur, crossfade, draw, fade, fly, scale, slide } from 'svelte/transition';
	import { onMount, tick } from 'svelte';
	import FanButton from 'src/components/materialpack/FanButton.svelte';

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
	<script src="/src/lib/scripts/redirectMobileUsers.js"></script>
</svelte:head>

<!-- #region HTML-->
<div class="page-container">
	{#if pageReady}
		<span class="absolute-top-left">
			<HomeButton />
		</span>
		<div class="center-container">
			<h1>Basic Weapons</h1>
			<h2 transition:fade={{ duration: 500, delay: 0 }}>Material Pack Creator</h2>
			<ul>
				<li transition:fade={{ duration: 500, delay: 100 }}>
					Use this tool to create
					<a href="/basicweapons/materialpacks/help">
						material packs<span>?</span>
					</a> for Basic Weapons
				</li>
				<li transition:fade={{ duration: 500, delay: 200 }}>
					Define your own weapon stats and textures. The tool will take care of the rest
				</li>
			</ul>
			<div class="flex-row align-center">
				<FanButton
					color="blue"
					href="/basicweapons/materialpacks/list"
					icon={HugeiconsLibrary}
					label="View Material Packs"
					fanImages={[copper_dagger, copper_hammer, copper_spear]}
				/>
				<FanButton
					color="green"
					href="/basicweapons/materialpacks/create"
					icon={HugeiconsPlusSignSquare}
					label="Create Material Pack"
					fanImages={[copper_dagger, copper_hammer, copper_spear]}
				/>
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
		h1,
		h2 {
			color: #51ebff;
			margin-top: 0;
		}
		h1 {
			font-size: 64px;
		}
		h2 {
			display: inline-flex;
			opacity: 0.7;
			padding-left: 0.2rem;
			margin-top: 0.25rem;
			margin-bottom: 1rem;
			text-transform: uppercase;
			font-weight: 800;
			font-size: 20px;
			&::after {
				content: 'BETA';
				color: #04ee04;
				font-size: 12px;
				font-weight: 800;
				margin-left: 0.5rem;
				border: 1px solid #04ee04;
				border-radius: 4px;
				padding: 0.2rem 0.5rem;
			}
		}
	}
	ul {
		list-style-position: outside;
		padding-inline: 1.25rem;
		margin-bottom: 2rem;
		li a span {
			opacity: 0;
			display: inline-block;
			width: 0;
		}
		li a:hover span {
			opacity: 1;
			width: 0.5rem;
		}
	}

	.btn-important {
		text-decoration: none;
		width: fit-content;
		margin-right: 2rem;
		padding: 1rem 2rem;
		font-family: 'Quicksand', 'sans-serif';
		font-size: 1.2rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: rgb(31, 31, 31);
		border: none;
		border-radius: 8px;
		transition:
			border 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		&.green {
			background: rgb(235, 235, 235);
			box-shadow: 5px 5px 0px #2ac444;
			border: 2px solid #2ac444;
			&:hover {
				box-shadow: 3px 3px 0px #24aa2f;
				border: 2px solid #24aa2f;
				cursor: pointer;
				span {
					transform: scale(1.1);
				}
			}
		}
		&.blue {
			background: rgb(235, 235, 235);
			box-shadow: 5px 5px 0px #0099ff;
			border: 2px solid #0099ff;
			&:hover {
				box-shadow: 3px 3px 0px #0066ff;
				border: 2px solid #0066ff;
				cursor: pointer;
				span {
					transform: scale(1.1);
				}
			}
		}

		span {
			gap: 0.5rem;
			filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.1));
			transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}
</style>

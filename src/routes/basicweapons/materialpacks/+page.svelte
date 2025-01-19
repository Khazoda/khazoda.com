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
		<span class="absolute-top-left">
			<HomeButton />
		</span>
		<div class="center-container">
			<h1>Basic Weapons</h1>
			<h2 transition:fade={{ duration: 500, delay: 0 }}>Material Pack Creator</h2>
			<ul>
				<li transition:fade={{ duration: 500, delay: 100 }}>
					Use this tool to create <a href="/basicweapons/materialpacks/help">material packs</a> for Basic
					Weapons
				</li>
				<li transition:fade={{ duration: 500, delay: 200 }}>
					Define your own weapon stats and textures. The tool will take care of the rest
				</li>
			</ul>
			<div class="flex-row align-center">
				<a
					href="/basicweapons/materialpacks/list"
					class="btn-important blue"
					transition:fade={{ duration: 500, delay: 350 }}
				>
					<span class="flex-row align-center">
						<HugeiconsLibrary /> View Material Packs
					</span>
				</a>
				<a
					href="/basicweapons/materialpacks/create"
					class="btn-important green"
					transition:fade={{ duration: 500, delay: 500 }}
				>
					<span class="flex-row align-center">
						<HugeiconsPlusSignSquare /> Create Material Pack
					</span>
				</a>
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
			opacity: 0.7;
			padding-left: 0.2rem;
			margin-top: 0.25rem;
			margin-bottom: 2rem;
			text-transform: uppercase;
			font-weight: 800;
			font-size: 20px;
		}
	}
	ul {
		list-style-position: outside;
		padding-inline: 1.25rem;
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
		color: #fff;
		border: none;
		border-radius: 8px;
		transition:
			border 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		&.green {
			background: linear-gradient(135deg, #6ded93, #21b039);
			box-shadow: 0px 0px 5px #6ded93;
			border: 1px solid #6ded93;
		}
		&.blue {
			background: linear-gradient(135deg, #2193b0, #6dd5ed);
			box-shadow: 0px 0px 5px #6dd5ed;
			border: 1px solid #6dd5ed;
		}

		&:hover {
			box-shadow: none;
			border: 1px solid black;
			cursor: pointer;
			span {
				transform: scale(1.1);
			}
		}

		span {
			gap: 0.5rem;
			filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.1));
			transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}
</style>

<script lang="ts">
	import HomeButton from "components/HomeButton.svelte";
	import HugeiconsPlusSignSquare from "virtual:icons/hugeicons/plus-sign-square";
	import HugeiconsQuillWrite02 from "virtual:icons/hugeicons/quill-write-02";
	import HugeiconsLibrary from "virtual:icons/hugeicons/library";
	import HugeiconsBubbleChatQuestion from "virtual:icons/hugeicons/bubble-chat-question";

	import empty_frame from "$lib/materialpack/media/empty_frame.png";
	import copper_dagger from "$lib/materialpack/media/framed_dagger.png";
	import copper_hammer from "$lib/materialpack/media/framed_hammer.png";
	import copper_spear from "$lib/materialpack/media/framed_spear.png";
	import materialpack_logo from "$lib/materialpack/media/creator_logo.webp";

	import { blur, crossfade, draw, fade, fly, scale, slide } from "svelte/transition";
	import { onMount, tick } from "svelte";
	import FanButton from "src/components/materialpack/FanButton.svelte";
	import { materialPacks } from "src/lib/materialpack/stores/materialPackStore";
	import FeedbackButton from "src/components/materialpack/FeedbackButton.svelte";
	import { navigating } from "$app/stores";
	import LoadingSpinner from "src/components/LoadingSpinner.svelte";

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
	{#if $navigating}
		<LoadingSpinner />
	{:else if pageReady}
		<div class="center-container">
			<div class="title-container">
				<span in:fade={{ duration: 500, delay: 0 }}
					><img
						class="materialpack-logo no-resample"
						src={materialpack_logo}
						alt="Material Pack Creator Logo"
						loading="eager" /></span>
				<span class="flex-col">
					<h1 in:fade={{ duration: 500, delay: 0 }}>Basic Weapons</h1>

					<h2 in:fade={{ duration: 500, delay: 50 }}>Material Pack Creator</h2>
				</span>
			</div>

			<div class="flex-col description">
				<span in:fade={{ duration: 500, delay: 100 }}>
					Use this tool to create
					<a href="/basicweapons/materialpacks/help"> material packs </a> for Basic Weapons
				</span>
				<span in:fade={{ duration: 500, delay: 200 }}> Define your own weapon stats and textures </span>
			</div>
			<div class="button-container align-center">
				<span in:fly={{ y: 50, duration: 500, delay: 250 }}>
					<FanButton
						color="blue"
						href="/basicweapons/materialpacks/list"
						icon={HugeiconsLibrary}
						label="Explore Material Packs"
						fanImages={[copper_hammer, copper_spear, copper_dagger]} />
				</span>
				<span in:fly={{ y: 50, duration: 500, delay: 350 }}>
					<FanButton
						color="green"
						href="/basicweapons/materialpacks/create"
						icon={Object.keys($materialPacks.packs).length > 0 ? HugeiconsQuillWrite02 : HugeiconsPlusSignSquare}
						label={Object.keys($materialPacks.packs).length > 0 ? "Your Material Packs" : "Create Material Pack"}
						fanImages={Object.values($materialPacks.packs).map(pack => pack.pack_icon || empty_frame)} />
				</span>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.page-container {
		align-items: center;
		display: flex;
		height: calc(100dvh - 16px);
		justify-content: center;
		overflow-x: hidden;
		width: 100%;
	}

	.center-container {
		.title-container {
			align-items: center;
			display: flex;
			flex-direction: row;
			justify-content: center;

			.materialpack-logo {
				filter: drop-shadow(6px 6px 1px rgba(0, 0, 0, 0.3));

				height: 128px;
				left: -1rem;
				position: relative;
				top: -2rem;
				width: 128px;
			}
			h1,
			h2 {
				color: #51ebff;
				filter: drop-shadow(4px 4px 1px rgba(0, 0, 0, 0.3));
				margin-top: 0;
			}
			h1 {
				font-size: 64px;
			}
			h2 {
				display: inline-flex;
				font-size: 20px;
				font-weight: 800;
				margin-bottom: 1.5rem;
				margin-top: 0.25rem;
				opacity: 0.7;
				padding-left: 0.2rem;
				position: relative;
				text-transform: uppercase;
				&::after {
					border: 1px solid #04ee04;
					border-radius: 4px;
					color: #04ee04;
					content: "BETA";
					font-size: 12px;
					font-weight: 800;
					margin-left: 0.5rem;
					padding: 0.2rem 0.5rem;
				}
			}
			@media screen and (max-width: 1000px) {
				flex-direction: column;
				.materialpack-logo {
					left: 0;
					top: 0;
				}

				@media screen and (max-width: 360px) {
					h2 {
						margin-bottom: 3rem;
					}
					h2::after {
						bottom: -2rem;
						left: -0.25rem;
						position: absolute;
					}
				}
			}
		}
	}

	.description {
		margin-bottom: 2rem;
		padding-left: 0.25rem;
	}
	.button-container {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		@media screen and (max-width: 1000px) {
			align-items: flex-start;
			flex-direction: column;
			gap: 1rem;
		}
	}

	.btn-important {
		align-items: center;
		border: none;
		border-radius: 8px;
		color: rgb(31, 31, 31);
		display: flex;
		font-family: "Quicksand", "sans-serif";
		font-size: 1.2rem;
		font-weight: 700;
		gap: 0.5rem;
		padding: 1rem 2rem;
		text-decoration: none;
		transition:
			border 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		width: fit-content;
		&.green {
			background: rgb(235, 235, 235);
			border: 2px solid #2ac444;
			box-shadow: 5px 5px 0px #2ac444;
			&:hover {
				border: 2px solid #24aa2f;
				box-shadow: 3px 3px 0px #24aa2f;
				cursor: pointer;
				span {
					transform: scale(1.1);
				}
			}
		}
		&.blue {
			background: rgb(235, 235, 235);
			border: 2px solid #0099ff;
			box-shadow: 5px 5px 0px #0099ff;
			&:hover {
				border: 2px solid #0066ff;
				box-shadow: 3px 3px 0px #0066ff;
				cursor: pointer;
				span {
					transform: scale(1.1);
				}
			}
		}

		span {
			filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.1));
			gap: 0.5rem;
			transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}
</style>

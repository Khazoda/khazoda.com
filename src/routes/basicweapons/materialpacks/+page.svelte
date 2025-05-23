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
	import { MATERIAL_PACK_CREATOR_VERSION } from "src/config/version";
	import Tooltip from "src/components/Tooltip.svelte";

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

					<h2 in:fade={{ duration: 500, delay: 50 }}>
						Material Pack Creator
						<Tooltip text={`${MATERIAL_PACK_CREATOR_VERSION}`}>
							<span class="beta-badge">BETA</span>
						</Tooltip>
					</h2>
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
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: calc(100dvh - 16px);
		overflow-x: hidden;
	}

	.center-container {
		.title-container {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.materialpack-logo {
				position: relative;
				top: -2rem;
				left: -1rem;
				width: 128px;

				height: 128px;
				filter: drop-shadow(6px 6px 1px rgba(0, 0, 0, 0.3));
			}
			h1,
			h2 {
				margin-top: 0;
				color: #51ebff;
				filter: drop-shadow(4px 4px 1px rgba(0, 0, 0, 0.3));
			}
			h1 {
				font-size: 64px;
			}
			h2 {
				display: inline-flex;
				position: relative;
				margin-top: 0.25rem;
				margin-bottom: 1.5rem;
				padding-left: 0.2rem;
				font-weight: 800;
				font-size: 20px;
				text-transform: uppercase;
				opacity: 0.7;
				.beta-badge {
					margin-left: 0.5rem;
					padding: 0.2rem 0.5rem;
					border: 1px solid #04ee04;
					border-radius: 4px;
					color: #04ee04;
					font-weight: 800;
					font-size: 12px;
					cursor: help;
				}
			}
			@media screen and (max-width: 1000px) {
				flex-direction: column;
				.materialpack-logo {
					top: 0;
					left: 0;
				}

				@media screen and (max-width: 360px) {
					h2 {
						margin-bottom: 3rem;
					}
					h2::after {
						position: absolute;
						bottom: -2rem;
						left: -0.25rem;
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
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
	}

	.btn-important {
		display: flex;
		align-items: center;
		width: fit-content;
		padding: 1rem 2rem;
		gap: 0.5rem;
		border: none;
		border-radius: 8px;
		color: rgb(31, 31, 31);
		font-weight: 700;
		font-size: 1.2rem;
		font-family: "Quicksand", "sans-serif";
		text-decoration: none;
		transition:
			border 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		&.green {
			border: 2px solid #2ac444;
			background: rgb(235, 235, 235);
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
			border: 2px solid #0099ff;
			background: rgb(235, 235, 235);
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
			gap: 0.5rem;
			filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.1));
			transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}
</style>

<script lang="ts">
	import HugeiconsPlusSignSquare from "virtual:icons/hugeicons/plus-sign-square";
	import HugeiconsQuillWrite02 from "virtual:icons/hugeicons/quill-write-02";
	import HugeiconsLibrary from "virtual:icons/hugeicons/library";

	import empty_frame from "$lib/materialpack/media/empty_frame.png";
	import copper_dagger from "$lib/materialpack/media/framed_dagger.png";
	import copper_hammer from "$lib/materialpack/media/framed_hammer.png";
	import copper_spear from "$lib/materialpack/media/framed_spear.png";
	import materialpack_logo from "$lib/materialpack/media/creator_logo.webp";

	import { blur, crossfade, draw, fade, fly, scale, slide } from "svelte/transition";
	import { onMount, tick } from "svelte";
	import FanButton from "src/components/materialpack/FanButton.svelte";
	import { materialPacks } from "src/lib/materialpack/stores/materialPackStore";
	import { navigating } from "$app/stores";
	import LoadingSpinner from "src/components/LoadingSpinner.svelte";
	import { MATERIAL_PACK_CREATOR_VERSION } from "src/config/general-config";
	import Tooltip from "src/components/Tooltip.svelte";
	import { cubicOut } from "svelte/easing";

	let pageReady = false;
	let logoImageLoaded = false;
	let showLogoAnimation = false;
	let logoImgElement: HTMLImageElement;

	let END_SIZE = 112;
	let START_SIZE = 300;

	// #region Animation
	function logoIntroAnimate(node: HTMLElement, { duration = 800 }) {
		let initialized = false;
		let translateX = 0;
		let translateY = 0;
		let scaleRatio = 1;

		function calculatePositions() {
			if (initialized) return;

			// Batch all getBoundingClientRect calls before animation starts to reduce load when animation is playing
			const rect = node.getBoundingClientRect();
			const pageContainer = node.closest(".page-container")?.getBoundingClientRect();

			if (!pageContainer) return;

			const centerX = pageContainer.left + pageContainer.width / 2;
			const centerY = pageContainer.top + pageContainer.height / 2;

			const startX = centerX - START_SIZE / 2;
			const startY = centerY - START_SIZE / 2;

			const endX = rect.left;
			const endY = rect.top;

			translateX = endX - startX;
			translateY = endY - startY;
			
			// Scale ratio calculation for transform
			scaleRatio = START_SIZE / END_SIZE;

			node.style.position = "fixed";
			node.style.left = `${startX}px`;
			node.style.top = `${startY}px`;
			node.style.width = `${END_SIZE}px`;
			node.style.height = `${END_SIZE}px`;
			node.style.opacity = "0";
			node.style.willChange = "transform, opacity";

			initialized = true;
		}

		return {
			duration,
			easing: cubicOut,
			css: (t: number) => {
				if (!initialized) {
					calculatePositions();
				}

				const currentScale = scaleRatio + (1 - scaleRatio) * t;
				const currentX = translateX * t;
				const currentY = translateY * t;
				const rotation = -225 * (1 - t);
				const opacity = t;

				return `
					transform: translate(${currentX}px, ${currentY}px) scale(${currentScale}) rotate(${rotation}deg);
					opacity: ${opacity};
				`;
			},
			tick: (t: number) => {
				if (t === 1) {
					node.style.position = "";
					node.style.left = "";
					node.style.top = "";
					node.style.width = "";
					node.style.height = "";
					node.style.opacity = "";
					node.style.willChange = "";
				}
			}
		};
	}

	// #region Lifecycle
	$: if (logoImgElement && logoImgElement.complete && logoImgElement.naturalHeight !== 0 && !logoImageLoaded) {
		logoImageLoaded = true;
	}

	$: if (pageReady && logoImageLoaded && !showLogoAnimation) {
		// Small delay to ensure layout is ready for animation
		tick().then(() => {
			showLogoAnimation = true;
		});
	}

	onMount(() => {
		// See if preloaded image was loaded
		if (logoImgElement && logoImgElement.complete && logoImgElement.naturalHeight !== 0 && !logoImageLoaded) {
			logoImageLoaded = true;
		}
		requestAnimationFrame(() => {
			setTimeout(() => {
				if (typeof window !== "undefined" && window.innerWidth < 650) {
					END_SIZE = 168;
					START_SIZE = 400;
				}
				pageReady = true;
			}, 0);
		});
	});
</script>

<svelte:head>
	<title>Material Pack Creator</title>
</svelte:head>

<!-- #region HTML-->
<!-- Preload image immediately so it can start loading -->
<div style="position: absolute; left: -9999px; opacity: 0; pointer-events: none;">
	<img
		class="no-resample"
		src={materialpack_logo}
		alt=""
		loading="eager"
		on:load={() => {
			logoImageLoaded = true;
		}}
		on:error={() => {
			logoImageLoaded = true;
		}}
		bind:this={logoImgElement} />
</div>

<div class="page-container">
	{#if $navigating || !pageReady || (pageReady && !logoImageLoaded)}
		<LoadingSpinner />
	{/if}
	{#if pageReady && !$navigating}
		<div class="center-wrapper gap-15" class:invisible={!logoImageLoaded}>
			<div class="row flex-row gap-15 height-112 width-100 top-row">
				{#if showLogoAnimation}
					<div class="logo-wrapper">
						<img
							in:logoIntroAnimate={{ duration: 800 }}
							class="no-resample logo-image"
							src={materialpack_logo}
							alt="Material Pack Creator Logo"
							loading="eager" />
					</div>
				{/if}
				<div class="col justify-start margin-left-auto title-row">
					<h1 in:fade={{ duration: 500, delay: 700 }}>Basic Weapons</h1>
					<h2 in:fade={{ duration: 500, delay: 750 }}>
						Material Pack Creator
						<Tooltip text={`${MATERIAL_PACK_CREATOR_VERSION}`}>
							<span class="beta-badge">BETA</span>
						</Tooltip>
					</h2>
				</div>
			</div>
			<div class="row flex-col middle-row">
				<span in:fade={{ duration: 500, delay: 800 }}>
					Use this tool to create
					<a href="/basicweapons/materialpacks/help"> material packs </a> for Basic Weapons
				</span>
				<span in:fade={{ duration: 500, delay: 900 }}>
					Share your pack with your friends or have it featured on the <a href="/basicweapons/materialpacks/list"
						>public list</a
					></span>
			</div>
			<div class="row flex-space-between width-100 bottom-row">
				<span in:fly={{ y: 50, duration: 500, delay: 950 }}>
					<FanButton
						color="blue"
						href="/basicweapons/materialpacks/list"
						icon={HugeiconsLibrary}
						label="Explore Material Packs"
						fanImages={[copper_hammer, copper_spear, copper_dagger]} />
				</span>
				<span in:fly={{ y: 50, duration: 500, delay: 1000 }}>
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

<!-- #region Styles -->
<style lang="scss">
	// General Styles
	h1,
	h2 {
		display: inline-flex;
		margin: 0;
		color: #98caf1;
		font-family: "Quicksand", "sans-serif";
		text-shadow: 2px 2px 0px rgba(50, 50, 50, 0.1);
		filter: drop-shadow(4px 4px 1px rgba(0, 0, 0, 0.3));
	}
	h1 {
		position: relative;
		top: -12px;
		left: -2px;
		align-items: flex-start;
		height: 55px;
		font-weight: 800;
		font-size: 64px;
	}
	h2 {
		align-items: center;
		justify-content: space-between;
		font-weight: 800;
		font-size: 36px;
		opacity: 0.8;
	}

	// Layout Styles
	.page-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: calc(100dvh - 16px);
		overflow-x: hidden;
	}
	.center-wrapper {
		display: flex;
		flex-direction: column;
		width: 600px;
		height: 250px;
	}
	.row {
		display: flex;
		width: fit-content;

		&.flex-row {
			flex-direction: row;
		}
		&.flex-col {
			flex-direction: column;
		}
		&.flex-space-between {
			justify-content: space-between;
		}
		&.width-100 {
			width: 100%;
		}
	}
	.col {
		display: flex;
		flex-direction: column;
		&.justify-start {
			justify-content: flex-start;
		}
	}

	.height-112 {
		// logo source is 28px*28px, and should be scaled in powers of 2
		height: 112px;
		min-height: 112px;
	}
	.width-100 {
		width: 100%;
	}
	.logo-wrapper {
		position: relative;
		flex-shrink: 0;
		width: 112px;
		height: 112px;
		.logo-image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			will-change: transform, opacity;
		}
	}
	.beta-badge {
		margin-right: 2px;
		margin-left: 0.5rem;
		padding: 0.2rem 0.4rem;
		border: 1px solid #319431;
		border-radius: 4px;
		color: #319431;
		font-weight: 800;
		font-size: 20px;
		cursor: help;
	}

	.gap-15 {
		gap: 15px;
	}

	.margin-left-auto {
		margin-left: auto;
	}

	.invisible {
		visibility: hidden;
	}

	@media screen and (max-width: 650px) {
		.page-container {
			align-items: flex-start;
			padding-top: 100px;
		}
		.center-wrapper {
			align-items: center;
			justify-content: center;
			width: 100%;
			height: fit-content;
		}
		.center-wrapper .top-row {
			display: contents;
			flex-direction: column;
			.logo-wrapper {
				display: block;
				width: 168px;
				height: 168px;
			}
			.title-row {
				margin-top: auto;
				margin-left: 0;
				h1 {
					top: 0;
					left: 0;
					height: fit-content;
					font-size: 36px;
				}
				h2 {
					font-size: 20px;
				}
				.beta-badge {
					font-size: 10px;
				}
			}
		}
		.middle-row {
			padding: 0 1.5rem 0 1.5rem;
			span {
				margin: 0.125rem 0;
				font-size: 14px;
			}
		}
		.bottom-row {
			flex-direction: column;
			align-items: center;
			gap: 1.5rem
		}
	}
</style>

<script lang="ts">
	import { replaceState } from "$app/navigation";
	import { page } from "$app/stores";

	export let showModal: boolean[];
	export let modalID: number;
	export let modIcon: string;
	export let returnToURL: string | undefined = undefined;
	export let learnMoreURL: string | undefined = undefined;
	export let hintsEnabled = true;

	let dialog: HTMLDialogElement;
	let playHintAnimation = false;
	let isCurrentlyOpen = false;

	$: if (dialog && showModal[modalID]) {
		if (!isCurrentlyOpen) {
			isCurrentlyOpen = true;
			if (hintsEnabled) {
				const hintSeenCount = parseInt(sessionStorage.getItem("swipe_hint_count") || "0");
				if (hintSeenCount < 2) {
					playHintAnimation = true;
					sessionStorage.setItem("swipe_hint_count", (hintSeenCount + 1).toString());
				} else {
					playHintAnimation = false;
				}
			} else {
				playHintAnimation = false;
			}
			dialog.showModal();
		}
	} else {
		isCurrentlyOpen = false;
	}

	// Modal Swipe Detection
	let touchStartX: number | null = null;
	let touchEndX: number | null = null;
	const swipe_dist_required = 50;

	const swipeStart = (e: TouchEvent) => {
		touchEndX = null;
		touchStartX = e.targetTouches[0].clientX;
		// console.log('start: ' + touchStartX);
	};
	const swipeMove = (e: TouchEvent) => {
		touchEndX = e.targetTouches[0].clientX;
		// console.log(touchEndX);
	};
	const swipeEnd = (e: TouchEvent) => {
		// Null check
		if (!touchStartX || !touchEndX) return;

		const distance_swiped = touchStartX - touchEndX;
		// console.log(distance_swiped);

		if (distance_swiped >= swipe_dist_required) {
			dialog.style.transform = "translateX(-150%)";
			dialog.style.opacity = "0";
			dialog.style.setProperty("--mobile-backdrop-opacity", "0");

			setTimeout(() => {
				document.getElementsByTagName("body")[0].style.overscrollBehavior = "unset";
				dialog.close();
				dialog.style.transform = "translateX(0%)";
				dialog.style.opacity = "1";
				dialog.style.setProperty("--mobile-backdrop-opacity", "1");
			}, 450);
		}
	};
	const closeDialog = () => {
		showModal[modalID] = false;
		dialog.close();
		if (returnToURL) replaceState(returnToURL, {});
		else replaceState($page.url.origin, {});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<dialog
		bind:this={dialog}
		class:animate-hint={playHintAnimation}
		on:close={closeDialog}
		on:click|self={closeDialog}
		on:touchstart|capture={swipeStart}
		on:touchmove={swipeMove}
		on:touchend={swipeEnd}>
		<div class="dialog-top">
			<div class="swipe-indicator" class:animate-hint={playHintAnimation}></div>
			<slot name="header" />
		</div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="dialog-middle" on:click|stopPropagation>
		<!-- svelte-ignore a11y-autofocus -->
		<slot name="description" />
		<hr />
		<slot name="info" />
		<hr />
		<slot name="feature" class="feature-slot" />
	</div>
	<div class="dialog-bottom">
		{#if learnMoreURL}
			<a href={learnMoreURL} class="learn-more-button" title="Learn More">
				<img src={modIcon} alt="">
				Learn More
			</a>
		{/if}
	</div>
</dialog>

<style lang="scss">
	dialog {
		--mobile-backdrop-opacity: 1;

		flex-direction: column;
		width: 100%;
		min-width: 25rem;
		max-width: 30%;
		height: 100%;
		min-height: 100dvh;
		margin: 0 auto 0 0;
		padding: 0.5rem;
		gap: 0.5rem;
		border: none;
		outline: none;
		background: none;
		color: #e9e9ec;
		scrollbar-color: #383838 #ff000000;
		scrollbar-width: thin;
		transition: transform 0.5s ease, opacity 0.5s ease;

		&::backdrop {
			background-image: linear-gradient(90deg, rgb(0, 0, 0), rgb(17, 17, 17));
			opacity: 0.75;
		}

		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-track {
			border-radius: 0.5rem;
			background: #141414;
		}

		&::-webkit-scrollbar-thumb {
			border: 2px solid #141414;
			border-radius: 0.5rem;
			background-color: #383838;
		}

		&::-webkit-scrollbar-thumb:hover {
			background-color: #505050;
		}
	}
	
	
	@media screen and (max-width: 1000px) {
		dialog {
			width: 100%;
			min-width: 100%;
			max-width: 100%;
			padding: 0.5rem;

			&::backdrop {
				opacity: var(--mobile-backdrop-opacity);
			}
		}

		dialog[open] {
			animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		}

		dialog[open].animate-hint {
			animation: zoomAndNudge 1.5s cubic-bezier(0.4, 0.0, 0.2, 1) 1;
		}
	}
	
	dialog[open] {
		display: flex;
	}

	@media screen and (min-width: 1001px) {
		dialog[open] {
			animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		}
	}

	.dialog-top,
	.dialog-middle,
	.dialog-bottom {
		width: 100%;
		margin: 0;
		padding: 1rem;
		border-radius: 0.5rem;
		background: #141414;
	}

	.dialog-top {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: sticky;
		top: 0;
		z-index: 10;
		min-height: 70px;
		max-height: 70px;
		border-radius: 0.5rem 0.5rem 0 0;
		box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.5);
	}

	.dialog-middle {
		flex: 1 1 auto;
		overflow-y: auto;
		border-radius: 0;
	}

	.dialog-bottom {
		display: flex;
		align-items: center;
		justify-content: center;
		position: sticky;
		bottom: 0;
		z-index: 10;
		min-height: 70px;
		max-height: 70px;
		border-radius: 0 0 0.5rem 0.5rem;
		padding: 0.5rem;
		box-shadow: 0 -0.25rem 0.25rem rgba(0, 0, 0, 0.5);
	}

	.learn-more-button {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		border: 2px solid #3d3d3d;
		border-radius: 0.75rem;
		background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);

		color: #ffffff;
		font-weight: 400;
		font-size: 1.25rem;
		font-family: 'Lexend', sans-serif;
		text-transform: uppercase;
		letter-spacing: 0.075em;
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
		
		img {
			width: 32px;
			height: 32px;
			object-fit: contain;
			image-rendering: pixelated;
			border-radius: 4px;
		}

		&:hover {
			transform: translateY(-2px);
			border-color: #4a4a4a;
			background: linear-gradient(135deg, #252525 0%, #323232 100%);
		}

		&:active {
			transform: translateY(2px);
			background: linear-gradient(135deg, #181818 0%, #222222 100%);
		}
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	@keyframes zoomAndNudge {
		0% {
			transform: scale(0.95) translateX(0);
		}
		20% {
			transform: scale(1) translateX(0);
		}
		40% {
			transform: scale(1) translateX(-8px);
		}
		100% {
			transform: scale(1) translateX(0);
		}
	}

	// Swipe Indicator (Mobile Only)
	.swipe-indicator {
		display: none;
	}

	@media screen and (max-width: 1000px) {
		.swipe-indicator {
			display: block;
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			width: 100%;
			max-width: 0;
			background: #333;
			pointer-events: none;
			z-index: 1000;
			border-radius: 4px 0 0 4px;
			
			&.animate-hint {
				animation: swipeExpand 1s 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) 1 forwards;
			}
		}
	}

	@keyframes swipeExpand {
		0% {
			max-width: 4px;
			opacity: 0.8;
		}
		40% {
			max-width: 30px;
			opacity: 1;
		}
		100% {
			max-width: 0;
			opacity: 0;
		}
	}

	// Mobile
	@media screen and (max-width: 1000px) {
		.dialog-top {
			padding: 0;
		}
	}

	hr {
		margin: 1rem 0;
		border: none;
		border-top: 1px solid #868686;
	}
</style>

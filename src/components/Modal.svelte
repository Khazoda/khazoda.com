<script lang="ts">
	import MingcuteCloseFill from "virtual:icons/mingcute/close-fill";
	import IcRoundSwipeLeft from "virtual:icons/ic/round-swipe-left";

	import { replaceState } from "$app/navigation";
	import { page } from "$app/stores";

	export let showModal: boolean[];
	export let modalID: number;
	export let returnToURL: string | undefined = undefined;

	let dialog: HTMLDialogElement;
	let dialog_inner: HTMLDivElement;
	$: if (dialog && showModal[modalID]) dialog.showModal();

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
			dialog_inner.style.transform = "translateX(-150%)";
			dialog_inner.style.opacity = "0";
			dialog.style.setProperty("--mobile-backdrop-opacity", "0");

			setTimeout(() => {
				document.getElementsByTagName("body")[0].style.overscrollBehavior = "unset";
				dialog.close();
				dialog_inner.style.transform = "translateX(0%)";
				dialog_inner.style.opacity = "1";
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
<dialog bind:this={dialog} on:close={closeDialog} on:click|self={closeDialog}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		bind:this={dialog_inner}
		class="dialog-inner"
		on:click|stopPropagation
		on:touchstart|capture={swipeStart}
		on:touchmove={swipeMove}
		on:touchend={swipeEnd}>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()} class="modal-close-button" type="button"
			><MingcuteCloseFill />
		</button>
		<span class="mobile-swipe-indicator"><IcRoundSwipeLeft /> swipe left anywhere to close</span>
		<slot name="header" />
		<hr />
		<slot name="description" />
		<hr />
		<slot name="info" />
		<hr />
		<slot name="feature" class="feature-slot" />
	</div>
</dialog>

<style lang="scss">
	dialog {
		--mobile-backdrop-opacity: 1;
		width: 100%;

		min-width: 25rem;
		max-width: 30%;
		height: 100%;
		min-height: 100dvh;
		margin: 0 auto 0 0;
		padding: 0.5rem 0 0.5rem 0.5rem;
		border: none;
		background: none;
		color: #e9e9ec;
		scrollbar-color: #383838 #141414;

		scrollbar-width: thin;

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
			padding: 0.5rem;

			&::backdrop {
				opacity: var(--mobile-backdrop-opacity);
			}
		}
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.dialog-inner {
		width: 100%;
		min-height: 100%;
		margin: 0;
		padding: 1rem;
		border-radius: 0.5rem;
		background: #141414;
		transition:
			transform 0.5s ease,
			opacity 0.5s ease;
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	.modal-close-button {
		box-sizing: content-box;
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;
		width: 40px;
		height: 40px;
		margin: 0;
		margin-left: auto;
		padding: 0;
		border: none;
		border-radius: 0.5rem;
		font-size: x-large;
		line-height: 1;

		cursor: pointer;
	}
	// Mobile
	@media screen and (max-width: 1000px) {
		.modal-close-button {
			display: none;
		}
	}

	.mobile-swipe-indicator {
		display: none;
	}
	@media screen and (max-width: 1000px) {
		.mobile-swipe-indicator {
			display: inline-flex;
			position: relative;
			justify-content: flex-start;
			width: 100%;
			gap: 0.25rem;
			color: #868686;
			font-size: small;

			&::before {
				position: absolute;
				top: 50%;
				left: -1rem;
				width: 0.5rem;
				height: 2rem;
				transform: translateY(-50%);
				border-radius: 0 0.25rem 0.25rem 0;
				background-color: rgba(134, 199, 108, 0.8);
				content: "";
			}
		}
	}

	hr {
		border-style: solid;
		border-color: #868686;
	}
</style>

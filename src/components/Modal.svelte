<script lang="ts">
	import MingcuteCloseFill from "virtual:icons/mingcute/close-fill";
	import IcRoundSwipeLeft from "virtual:icons/ic/round-swipe-left";

	import { replaceState } from "$app/navigation";
	import { page } from "$app/stores";

	export let showModal: boolean[];
	export let modalID: number;

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
		replaceState($page.url.origin, {});
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
		background: none;
		border: none;
		color: #e9e9ec;
		height: 100%;
		margin: 0 auto 0 0;
		max-width: 30%;
		min-height: 100dvh;

		min-width: 25rem;
		padding: 0.5rem 0 0.5rem 0.5rem;
		scrollbar-color: #383838 #141414;

		scrollbar-width: thin;
		width: 100%;

		&::backdrop {
			background-image: linear-gradient(90deg, rgb(0, 0, 0), rgb(17, 17, 17));
			opacity: 0.75;
		}

		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-track {
			background: #141414;
			border-radius: 0.5rem;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #383838;
			border: 2px solid #141414;
			border-radius: 0.5rem;
		}

		&::-webkit-scrollbar-thumb:hover {
			background-color: #505050;
		}
	}
	@media screen and (max-width: 1000px) {
		dialog {
			min-width: 100%;
			padding: 0.5rem;
			width: 100%;

			&::backdrop {
				opacity: var(--mobile-backdrop-opacity);
			}
		}
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.dialog-inner {
		background: #141414;
		border-radius: 0.5rem;
		margin: 0;
		min-height: 100%;
		padding: 1rem;
		transition:
			transform 0.5s ease,
			opacity 0.5s ease;
		width: 100%;
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
		align-items: center;
		aspect-ratio: 1;
		border: none;
		border-radius: 0.5rem;
		box-sizing: content-box;

		cursor: pointer;
		display: flex;
		font-size: x-large;
		height: 40px;
		justify-content: center;
		line-height: 1;
		margin: 0;
		margin-left: auto;
		padding: 0;
		width: 40px;
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
			color: #868686;
			display: inline-flex;
			font-size: small;
			gap: 0.25rem;
			justify-content: flex-start;
			position: relative;
			width: 100%;

			&::before {
				background-color: rgba(134, 199, 108, 0.8);
				border-radius: 0 0.25rem 0.25rem 0;
				content: "";
				height: 2rem;
				left: -1rem;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 0.5rem;
			}
		}
	}

	hr {
		border-color: #868686;
		border-style: solid;
	}
</style>

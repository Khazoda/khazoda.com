<script lang="ts">
	import MingcuteCloseFill from "virtual:icons/mingcute/close-fill";
	import IcRoundSwipeLeft from "virtual:icons/ic/round-swipe-left";
	import PixelarticonsScriptText from "~icons/pixelarticons/script-text";

	import { replaceState } from "$app/navigation";
	import { page } from "$app/stores";

	export let showModal: boolean[];
	export let modalID: number;
	export let returnToURL: string | undefined = undefined;
	export let fullDescriptionURL: string | undefined = undefined;

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
		<div class="top-buttons">
			{#if fullDescriptionURL}
				<a href={fullDescriptionURL} class="full-description-button" title="View Full Description">
					<PixelarticonsScriptText /> Full Description
				</a>
			{/if}
			<button autofocus on:click={() => dialog.close()} class="modal-close-button" type="button"
				><MingcuteCloseFill />
			</button>
		</div>
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

	.top-buttons {
		display: flex;
		position: relative;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 40px;
		gap: 0.5rem;
		@media screen and (max-width: 1000px) {
			height: 0px;
		}
		@media screen and (max-width: 500px) {
			height: 55px;
		}

		.full-description-button {
			display: flex;
			z-index: 1000;
			position: absolute;
			top: 0;
			left: 0;
			align-items: center;
			justify-content: center;
			height: 40px;
			margin: 0;
			padding: 0.75rem 1rem;
			gap: 0.5rem;
			border: 2px solid #4a4a4a;
			border-radius: 0.5rem;
			background: linear-gradient(135deg, #2a2a2a 0%, #383838 100%);
			color: #ffffff;
			font-weight: 500;
			font-size: 1rem;
			line-height: 40px;
			text-decoration: none;
			white-space: nowrap;
			cursor: pointer;
			transition: all 0.1s ease;

			&:hover {
				transform: translateY(-1px);
				border-color: #5a5a5a;
				background: linear-gradient(135deg, #3a3a3a 0%, #484848 100%);
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
			}

			&:active {
				transform: translateY(0);
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
			}

			@media screen and (max-width: 1000px) {
				right: 50px;
				left: unset;
				width: min-content;
			}
		}

		.modal-close-button {
			display: flex;
			position: absolute;
			top: 0;
			right: 0;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			margin: 0;
			margin-left: auto;
			z-index: 1000;

			padding: 0;
			border: 2px solid #4a4a4a;
			border-radius: 0.5rem;
			background: linear-gradient(135deg, #2a2a2a 0%, #383838 100%);
			color: #ffffff;
			font-size: x-large;
			line-height: 1;
			cursor: pointer;
			transition: all 0.1s ease;

			&:hover {
				transform: translateY(-1px);
				border-color: #5a5a5a;
				background: linear-gradient(135deg, #3a3a3a 0%, #484848 100%);
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
			}

			&:active {
				transform: translateY(0);
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
			}
		}
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

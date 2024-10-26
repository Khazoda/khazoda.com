<script lang="ts">
	import MingcuteCloseFill from 'virtual:icons/mingcute/close-fill';
	import IcRoundSwipeLeft from 'virtual:icons/ic/round-swipe-left';

	import { replaceState } from '$app/navigation';

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
			dialog_inner.style.transform = 'translateX(-150%)';
			dialog_inner.style.opacity = '0';
			dialog.style.setProperty('--mobile-backdrop-opacity', '0');

			setTimeout(() => {
				document.getElementsByTagName('body')[0].style.overscrollBehavior = 'unset';
				dialog.close();
				dialog_inner.style.transform = 'translateX(0%)';
				dialog_inner.style.opacity = '1';
				dialog.style.setProperty('--mobile-backdrop-opacity', '1');
			}, 450);
		}
	};
	const closeDialog = () => {
		showModal[modalID] = false;
		dialog.close();
		replaceState(window.location.pathname + window.location.search, {});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={closeDialog}
	on:click|self={closeDialog}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		bind:this={dialog_inner}
		class="dialog-inner"
		on:click|stopPropagation
		on:touchstart|capture={swipeStart}
		on:touchmove={swipeMove}
		on:touchend={swipeEnd}
	>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()} class="modal-close-button" type="button"
			><MingcuteCloseFill />
		</button>
		<span class="mobile-swipe-indicator"><IcRoundSwipeLeft/> swipe left anywhere to close</span>
		<slot name="header" />
		<hr />
		<slot name="description" />
		<hr />
		<slot name="info" />
		<hr />
		<slot name="feature" class="feature-slot"/>	
	</div>
</dialog>

<style lang="scss">
	
	dialog {
		--mobile-backdrop-opacity: 1;

		min-width: 25rem;
		max-width: 30%;
		min-height: 100dvh;
		width: 100%;
		height: 100%;
		padding: 0.5rem 0 0.5rem 0.5rem;
		background: none;
		border: none;
		color: #e9e9ec;
		margin: 0 auto 0 0;

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
            border-radius: 0.5rem;
            border: 2px solid #141414; 
        }

        &::-webkit-scrollbar-thumb:hover {
            background-color: #505050; 
        }

        scrollbar-width: thin; // Firefox
        scrollbar-color: #383838 #141414; // Firefox
	}
	@media screen and (max-width: 1000px) {
		dialog {
			min-width: 100%;
			width: 100%;
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
		min-height: 100%;
		width: 100%;
		border-radius: 0.5rem;
		padding: 1rem;
		margin: 0;
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
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		padding: 0;
		margin-left: auto;

		width: 40px;
		height: 40px;
		aspect-ratio: 1;
		border: none;

		background: #383838;
		color: #ffffff;
		font-size: x-large;
		line-height: 1;
		box-sizing: content-box;

		cursor: pointer;

		border-radius: 0.5rem;
		&:hover {
			transform: scale(1.05);
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
			width: 100%;
			display: inline-flex;
			gap: 0.25rem;
			position: relative;
			justify-content: flex-start;
			color: #868686;
			font-size: small;

			&::before {
				content: '';
				position: absolute;
				top: 50%;
				left: -1rem;
				width: 0.5rem;
				height: 2rem;
				background-color: rgba(134, 199, 108, 0.8);
				border-radius: 0 0.25rem 0.25rem 0;
				transform: translateY(-50%);
			}
		}
	}

	hr {
		border-style: solid;
		border-color: #868686;
	}

</style>

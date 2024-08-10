<script lang="ts">
	import MingcuteCloseFill from 'virtual:icons/mingcute/close-fill';

	export let showModal: boolean[];
	export let modalID: number;
	let dialog: HTMLDialogElement;
	let dialog_inner: HTMLDivElement;
	$: if (dialog && showModal[modalID]) dialog.showModal();

	// Modal Swipe Detection
	let touchStart: number | null = null;
	let touchEnd: number | null = null;
	const swipe_dist_required = 80;

	const swipeStart = (e: TouchEvent) => {
		touchEnd = null;
		touchStart = e.targetTouches[0].clientY;
		console.log('start: ' + touchStart);
	};
	const swipeMove = (e: TouchEvent) => {
		touchEnd = e.targetTouches[0].clientY;
		console.log(touchEnd);
	};
	const swipeEnd = (e: TouchEvent) => {
		// Null check
		if (!touchStart || !touchEnd) return;

		const distance_swiped = touchEnd - touchStart;
		console.log(distance_swiped);

		if (distance_swiped >= swipe_dist_required) {
			dialog_inner.style.transform = 'translateY(150%)';
			dialog_inner.style.opacity = '0';
			dialog.style.setProperty('--mobile-backdrop-opacity', '0');

			setTimeout(() => {
				document.getElementsByTagName('body')[0].style.overscrollBehavior = 'unset';
				dialog.close();
				dialog_inner.style.transform = 'translateY(0%)';
				dialog_inner.style.opacity = '1';
				dialog.style.setProperty('--mobile-backdrop-opacity', '1');
			}, 450);
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal[modalID] = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		bind:this={dialog_inner}
		class="dialog-inner"
		on:click|stopPropagation
		on:touchstart|capture={(e) => swipeStart(e)}
		on:touchmove={(e) => swipeMove(e)}
		on:touchend={(e) => swipeEnd(e)}
	>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()} class="modal-close-button" type="button"
			><MingcuteCloseFill /></button
		><span class="mobile-swipe-indicator">swipe down to close</span>
		<slot name="header" />
		<hr />
		<slot name="description" />
		<hr />
		<slot name="info" />
	</div>
</dialog>

<style lang="scss">
	dialog {
		--mobile-backdrop-opacity: 1;

		min-width: 25rem;
		max-width: 30%;
		min-height: 100vh;
		width: 100%;
		height: 100%;
		padding: 0.5rem;

		background: none;
		border: none;
		color: #e9e9ec;
		margin: 0 auto 0 0;

		&::backdrop {
			background-image: linear-gradient(90deg, rgb(0, 0, 0), rgb(17, 17, 17));
			opacity: 0.75;
		}
	}
	@media screen and (max-width: 1000px) {
		dialog {
			min-width: 100%;
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
		min-height: 100%;
		width: 100%;
		height: 100%;
		border-radius: 0.5rem;
		padding: 1rem;
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
			position: relative;
			justify-content: center;
			color: #868686;
			font-size: small;

			&::before {
				content: '';
				position: absolute;
				top: -1.25rem;
				width: 4rem;
				height: 0px;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				border-top: 10px solid rgb(116, 156, 100);
			}
		}
	}
</style>

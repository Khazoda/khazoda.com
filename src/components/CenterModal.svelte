<script lang="ts" context="module">
	export const closeDialog = () => {
		const dialogs = document.querySelectorAll('dialog');
		dialogs.forEach((dialog) => {
			if (dialog.open) dialog.close();
		});
	};
</script>

<script lang="ts">
	import MingcuteCloseFill from 'virtual:icons/mingcute/close-fill';
	import { replaceState } from '$app/navigation';

	export let showModal: boolean[];
	export let modalID: number;
	export let returnToURL: string | undefined = undefined;
	export let closeButtonOffset: number = 1;

	let dialog: HTMLDialogElement;
	$: if (dialog && showModal[modalID]) dialog.showModal();

	const closeDialog = () => {
		showModal[modalID] = false;
		dialog.close();
		if (returnToURL) replaceState(returnToURL, {});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={closeDialog} on:click|self={closeDialog}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="dialog-inner" on:click|stopPropagation>
		<button
			autofocus
			on:click={() => dialog.close()}
			class="modal-close-button"
			type="button"
			style="right: {closeButtonOffset}rem;"
		>
			<MingcuteCloseFill />
		</button>
		<slot name="header" />
		<slot name="description" />
	</div>
</dialog>

<style lang="scss">
	dialog {
		position: fixed;
		inset: 0;
		margin: auto;
		max-width: 500px;
		width: 90%;
		max-height: 90vh;
		height: fit-content;
		overflow-y: auto;
		padding: 0;
		background: none;
		border: none;
		color: #e9e9ec;

		@media (max-width: 530px) {
			margin: auto auto 5vh;
			max-height: 85vh;
		}

		&::backdrop {
			background: rgba(0, 0, 0, 0.75);
		}
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.dialog-inner {
		width: 100%;
		border-radius: 0.5rem;
		padding: 1.5rem;
		background: #141414;
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	@media (max-width: 530px) {
		@keyframes zoom {
			from {
				transform: scale(0.95);
			}
			to {
				transform: scale(1);
			}
		}
	}

	.modal-close-button {
		z-index: 1000;
		position: absolute;
		right: 1rem;
		top: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 0 1rem auto;
		width: 40px;
		height: 40px;
		border: none;

		font-size: x-large;
		border-radius: 0.5rem;
		cursor: pointer;
	}
</style>

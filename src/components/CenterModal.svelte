<script lang="ts" context="module">
	export const closeDialog = () => {
		const dialogs = document.querySelectorAll("dialog");
		dialogs.forEach(dialog => {
			if (dialog.open) dialog.close();
		});
	};
</script>

<script lang="ts">
	import MingcuteCloseFill from "virtual:icons/mingcute/close-fill";
	import { replaceState } from "$app/navigation";

	export let activeModal: string | null;
	export let modalID: string;
	export let returnToURL: string | undefined = undefined;
	export let closeButtonOffset: number = 1;
	export let style: string = "";

	let dialog: HTMLDialogElement;
	$: if (dialog && activeModal === modalID) {
		if (!dialog.open) dialog.showModal();
	} else if (dialog && dialog.open && activeModal !== modalID) {
		dialog.close();
	}

	const closeDialog = () => {
		if (activeModal === modalID) activeModal = null;
		dialog.close();
		if (returnToURL) replaceState(returnToURL, {});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={closeDialog} on:click|self={closeDialog} {style}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="dialog-middle" on:click|stopPropagation>
		<button
			autofocus
			on:click={() => dialog.close()}
			class="modal-close-button"
			type="button"
			style="right: {closeButtonOffset}rem;">
			<MingcuteCloseFill />
		</button>
		<slot name="header" />
		<slot name="description" />
	</div>
</dialog>

<style lang="scss">
	dialog {
		position: fixed;
		width: 90%;
		max-width: 700px;
		height: fit-content;
		max-height: 90vh;
		margin: auto;
		inset: 0;
		padding: 0;
		overflow-y: auto;
		border: none;
		background: none;
		color: #e9e9ec;

		@media (max-width: 530px) {
			max-height: 85vh;
			margin: auto auto 5vh;
		}

		&::backdrop {
			background: rgba(0, 0, 0, 0.75);
		}
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.dialog-middle {
		width: 100%;
		padding: 1.5rem;
		border-radius: 0.5rem;
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
		display: flex;
		z-index: 1000;
		position: absolute;
		top: 1rem;
		right: 1rem;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		margin: 0 0 1rem auto;
		border: none;
		border-radius: 0.5rem;

		font-size: x-large;
		cursor: pointer;
	}
</style>

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

	export let showModal: boolean[];
	export let modalID: number;
	export let returnToURL: string | undefined = undefined;
	export let closeButtonOffset: number = 1;
	export let style: string = "";

	let dialog: HTMLDialogElement;
	$: if (dialog && showModal[modalID]) dialog.showModal();

	const closeDialog = () => {
		showModal[modalID] = false;
		dialog.close();
		if (returnToURL) replaceState(returnToURL, {});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={closeDialog} on:click|self={closeDialog} {style}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="dialog-inner" on:click|stopPropagation>
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
		background: none;
		border: none;
		color: #e9e9ec;
		height: fit-content;
		inset: 0;
		margin: auto;
		max-height: 90vh;
		max-width: 500px;
		overflow-y: auto;
		padding: 0;
		position: fixed;
		width: 90%;

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
		background: #141414;
		border-radius: 0.5rem;
		padding: 1.5rem;
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
		align-items: center;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		display: flex;

		font-size: x-large;
		height: 40px;
		justify-content: center;
		margin: 0 0 1rem auto;
		position: absolute;
		right: 1rem;
		top: 1rem;
		width: 40px;
		z-index: 1000;
	}
</style>

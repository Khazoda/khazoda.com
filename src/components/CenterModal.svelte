<script lang="ts">
	import MingcuteCloseFill from 'virtual:icons/mingcute/close-fill';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/stores';

	export let showModal: boolean[];
	export let modalID: number;

	let dialog: HTMLDialogElement;
	$: if (dialog && showModal[modalID]) dialog.showModal();

	const closeDialog = () => {
		showModal[modalID] = false;
		dialog.close();
		replaceState($page.url.origin, {});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={closeDialog} on:click|self={closeDialog}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="dialog-inner" on:click|stopPropagation>
		<button autofocus on:click={() => dialog.close()} class="modal-close-button" type="button">
			<MingcuteCloseFill />
		</button>
		<slot name="header" />
		<slot name="description" />
	</div>
</dialog>

<style lang="scss">
	dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 500px;
		width: 90%;
		max-height: 90vh;
		overflow-y: auto;
		padding: 0;
		background: none;
		border: none;
		color: #e9e9ec;
		margin: auto;

		@media (max-width: 530px) {
			top: auto;
			bottom: 5vh;
			transform: translateX(-50%);
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
			transform: translate(-50%, -50%) scale(0.95);
		}
		to {
			transform: translate(-50%, -50%) scale(1);
		}
	}

	@media (max-width: 530px) {
		@keyframes zoom {
			from {
				transform: translateX(-50%) scale(0.95);
			}
			to {
				transform: translateX(-50%) scale(1);
			}
		}
	}

	.modal-close-button {
		position: absolute;
		right: 1rem;
		top: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 0 1rem auto;
		padding: 0;
		width: 40px;
		height: 40px;
		border: none;

		font-size: x-large;
		border-radius: 0.5rem;
		cursor: pointer;
	}
</style>

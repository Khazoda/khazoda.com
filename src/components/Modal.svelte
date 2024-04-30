<script lang="ts">
	export let showModal: boolean[];
	export let modalID: number;
	let dialog: HTMLDialogElement;
	$: if (dialog && showModal[modalID]) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal[modalID] = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="dialog-inner" on:click|stopPropagation>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()} class="modal-close-button" type="button"
			>✖</button
		>
		<slot name="header" />
		<hr />
		<slot name="description" />
		<hr />
		<slot name="info" />
	</div>
</dialog>

<style lang="scss">
	dialog {
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
			max-width: auto;
			min-width: fit-content;
			width: 100%;
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
		display: block;
		margin: 0;
		padding: 0;
		margin-left: auto;

		width: 40px;
		height: 40px;
		aspect-ratio: 1;
		border: none;

		background: #383838;
		color: #e9e9ec;
		font-size: x-large;
		cursor: pointer;

		border-radius: 0.5rem;
		&:hover {
			transform: scale(1.05);
		}
	}
	// Mobile
	@media screen and (max-width: 1000px) {
		.modal-close-button {
			margin-left: 0;
			margin-right: auto;
		}
	}
</style>

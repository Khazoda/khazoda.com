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
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>

<style lang="scss">
	dialog {
		min-width: 20rem;
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
	button {
		display: block;
	}
</style>

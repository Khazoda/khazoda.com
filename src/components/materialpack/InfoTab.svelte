<script lang="ts">
	import HugeiconsInformationSquare from "virtual:icons/hugeicons/information-square";
	import CenterModal from "../CenterModal.svelte";
	import { closeDialog } from "../CenterModal.svelte";

	export let title: string;
	export let activeModal: string | null;
	export let modalID: string;
	export let offset: number = 1;
	export let disabled: boolean = false;
</script>

{#if !disabled}
	<button class="info-tab" on:click={() => (activeModal = modalID)} style="right: {offset}rem;">
		<HugeiconsInformationSquare width="32" height="32" />
	</button>
{:else}
	<button class="info-tab disabled" style="right: {offset}rem;">
		<HugeiconsInformationSquare width="32" height="32" />
	</button>
{/if}
<!-- Content is passed through the slot -->
<CenterModal bind:activeModal {modalID} closeButtonOffset={3.5}>
	<div slot="description" class="modal-content info-modal">
		<h2>{title}</h2>
		<slot />
		<div class="modal-actions">
			<button class="ok-btn" on:click={closeDialog}>Got it!</button>
		</div>
	</div>
</CenterModal>

<style lang="scss">
	.info-tab {
		align-items: center;
		background: #333333;
		border: 2px solid #1c1c1c;
		border-bottom: none;
		border-radius: 6px 6px 0 0;
		cursor: pointer;
		display: inline-flex;
		justify-content: flex-start;
		padding: 0.5rem;
		position: absolute;
		right: 1rem;
		top: -3rem;
		transition: all 0.1s ease;
		width: fit-content;

		&:hover {
			background: rgb(77, 77, 77);
			color: #71b3ff;
		}
	}

	.info-tab.disabled {
		background: #333333;
		color: #555555;
		cursor: not-allowed;
	}
	h2 {
		margin: 0;
	}

	.modal-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 1rem;
		.ok-btn {
			background: #4a9eff;
			border: none;
			border-radius: 4px;
			color: white;
			cursor: pointer;
			font-weight: 600;
			padding: 0.5rem 2rem;
			transition: all 0.2s ease;

			&:hover {
				background: #3b8de6;
			}
		}
	}

	.info-modal {
		max-height: 80vh;
		overflow-y: auto;
		padding-right: 1rem;
		scrollbar-color: #4a9eff #1c1c1c;

		/* Firefox */
		scrollbar-width: thin;
		h2 {
			background: #141414;
			padding-bottom: 1rem;
			position: sticky;
			top: 0;
			z-index: 100;
		}
		.modal-actions {
			background: #141414;
			bottom: 0;
			padding-top: 1rem;
			position: sticky;
			z-index: 100;
		}

		/* Custom Scrollbar Styling */
		&::-webkit-scrollbar {
			height: 8px;
			width: 8px;
		}

		&::-webkit-scrollbar-track {
			background: #1c1c1c;
			border-radius: 4px;
		}

		&::-webkit-scrollbar-thumb {
			background: #4a9eff;
			border-radius: 4px;

			&:hover {
				background: #3b8de6;
			}
		}
	}
</style>

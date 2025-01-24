<script lang="ts">
	import HugeiconsInformationSquare from 'virtual:icons/hugeicons/information-square';
	import CenterModal from '../CenterModal.svelte';
	import { closeDialog } from '../CenterModal.svelte';

	export let title: string;
	export let showModal: boolean[] = Array(9).fill(false);
	export let modalID: number;
	export let offset: number = 1;
	export let disabled: boolean = false;
</script>

{#if !disabled}
	<button class="info-tab" on:click={() => (showModal[modalID] = true)} style="right: {offset}rem;">
		<HugeiconsInformationSquare width="32" height="32" />
	</button>
{:else}
	<button class="info-tab disabled" style="right: {offset}rem;">
		<HugeiconsInformationSquare width="32" height="32" />
	</button>
{/if}
<!-- Content is passed through the slot -->
<CenterModal bind:showModal {modalID} closeButtonOffset={3.5}>
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
		position: absolute;
		right: 1rem;
		top: -3rem;
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0.5rem;
		background: #333333;
		border: 2px solid #1c1c1c;
		border-bottom: none;
		border-radius: 6px 6px 0 0;
		cursor: pointer;
		transition: all 0.1s ease;
		width: fit-content;

		&:hover {
			background: rgb(77, 77, 77);
			color: #71b3ff;
		}
	}

	.info-tab.disabled {
		cursor: not-allowed;
		background: #333333;
		color: #555555;
	}
	h2 {
		margin: 0;
	}

	.modal-actions {
		display: flex;
		justify-content: center;
		margin-top: 1rem;
		gap: 1rem;
		.ok-btn {
			background: #4a9eff;
			color: white;
			padding: 0.5rem 2rem;
			border: none;
			border-radius: 4px;
			font-weight: 600;
			cursor: pointer;
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
		h2 {
			padding-bottom: 1rem;
			position: sticky;
			top: 0;
			background: #141414;
			z-index: 100;
		}
		.modal-actions {
			padding-top: 1rem;
			position: sticky;
			bottom: 0;
			background: #141414;
			z-index: 100;
		}

		/* Custom Scrollbar Styling */
		&::-webkit-scrollbar {
			width: 8px;
			height: 8px;
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

		/* Firefox */
		scrollbar-width: thin;
		scrollbar-color: #4a9eff #1c1c1c;
	}
</style>

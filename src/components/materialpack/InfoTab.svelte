<script lang="ts">
	import HugeiconsInformationSquare from 'virtual:icons/hugeicons/information-square';
	import CenterModal from '../CenterModal.svelte';
	import { closeDialog } from '../CenterModal.svelte';

	export let title: string;
	export let showModal: boolean[] = Array(9).fill(false);
	export let modalID: number;
	export let offset: number = 1;
	// Content is passed through the slot
</script>

<button class="info-tab" on:click={() => (showModal[modalID] = true)} style="right: {offset}rem;">
	<HugeiconsInformationSquare width="32" height="32" />
</button>

<CenterModal bind:showModal {modalID}>
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
</style>

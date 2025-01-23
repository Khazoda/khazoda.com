<script lang="ts">
	import HugeiconsMessageMultiple01 from 'virtual:icons/hugeicons/message-multiple-01';
	import CenterModal from '../CenterModal.svelte';
	import { closeDialog } from '../CenterModal.svelte';
	import SimpleIconsDiscord from 'virtual:icons/simple-icons/discord';

	let showModal: boolean[] = Array(1).fill(false);
</script>

<button class="feedback-btn" on:click={() => (showModal[0] = true)}>
	<HugeiconsMessageMultiple01 width="100%" height="100%" />
</button>

<CenterModal bind:showModal modalID={0}>
	<div slot="description" class="modal-content">
		<h2>Feedback & Support</h2>
		<ul>
			<li>Get help with material pack creation</li>
			<li>Report bugs</li>
			<li>Share your material packs</li>
			<li>Suggest new features</li>
		</ul>
		<div class="modal-actions">
			<a
				href="https://discord.com/invite/vEZUkSxwR9"
				target="_blank"
				rel="noopener noreferrer"
				class="discord-btn"
			>
				<SimpleIconsDiscord width="1.5rem" height="1.5rem" />
				Join Discord Server
			</a>
		</div>
	</div>
</CenterModal>

<style>
	.feedback-btn {
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 1rem;
		right: 1rem;
		border: 1px solid var(--v-color-border);
		border-radius: 4px;
		color: var(--v-color-text-primary);
		background: #5865f2;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.feedback-btn:hover {
		background: #4752c4;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
	}

	.modal-content {
		text-align: center;
	}

	h2 {
		margin-top: 0;
	}

	ul {
		text-align: left;
		margin: 1rem 1rem;
	}

	.discord-btn {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: 0 auto;
		padding: 0.75rem 1.5rem;
		width: 250px;
		background: #5865f2;
		color: white;
		border-radius: 4px;
		font-weight: 600;
		text-decoration: none;
		transition: background-color 0.2s ease;
	}

	.discord-btn:hover {
		background: #4752c4;
	}
</style>

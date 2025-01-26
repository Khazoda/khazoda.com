<script lang="ts">
	import HugeiconsMessageMultiple01 from 'virtual:icons/hugeicons/message-multiple-01';
	import CenterModal from '../CenterModal.svelte';
	import { closeDialog } from '../CenterModal.svelte';
	import SimpleIconsDiscord from 'virtual:icons/simple-icons/discord';
	import big_tater from '$lib/materialpack/media/big-tater.png';

	let showModal: boolean[] = Array(1).fill(false);
</script>

<button class="feedback-btn" on:click={() => (showModal[0] = true)}>
	<HugeiconsMessageMultiple01 width="100%" height="100%" />
</button>

<CenterModal bind:showModal modalID={0} style="overflow: hidden;">
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
			<div class="note-container">
				<div class="music-note note-1">♪</div>
				<div class="music-note note-2">♫</div>
				<div class="music-note note-3">♪</div>
				<div class="music-note note-4">♫</div>
				<div class="music-note note-5">♪</div>
			</div>
			<img src={big_tater} alt="Big Tater" class="big-tater" />
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
	h2 {
		margin-top: 0;
	}

	ul {
		text-align: left;
		margin: 1rem 1rem;
		padding: 0 0 0 0.1rem;
	}

	.modal-actions {
		width: fit-content;
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

	.big-tater {
		pointer-events: none;
		position: absolute;
		bottom: -1rem;
		right: -0.5rem;
		width: 100px;
		height: 100px;
		animation: taterGroove 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
		transform-origin: bottom center;
		filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.2));
	}

	@keyframes taterGroove {
		0% {
			transform: rotate(2deg) translateY(0) translateX(0) scale(1);
		}
		15% {
			transform: rotate(-2deg) translateY(-4px) translateX(-2px) scale(1.02);
		}
		22% {
			transform: rotate(3deg) translateY(-1px) translateX(1px) scale(0.98);
		}
		30% {
			transform: rotate(1deg) translateY(-3px) translateX(0px) scale(1.01);
		}
		42% {
			transform: rotate(-2deg) translateY(-1px) translateX(-1px) scale(0.99);
		}
		48% {
			transform: rotate(2deg) translateY(-4px) translateX(2px) scale(1.015);
		}
		55% {
			transform: rotate(-1deg) translateY(-2px) translateX(-1px) scale(0.98);
		}
		65% {
			transform: rotate(3deg) translateY(-3px) translateX(1px) scale(1.01);
		}
		78% {
			transform: rotate(-2deg) translateY(-1px) translateX(-2px) scale(0.99);
		}
		85% {
			transform: rotate(2deg) translateY(-4px) translateX(0px) scale(1.02);
		}
		92% {
			transform: rotate(-1deg) translateY(-2px) translateX(-1px) scale(0.98);
		}
		100% {
			transform: rotate(2deg) translateY(0) translateX(0) scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.big-tater {
			animation: none;
			transform: rotate(2deg);
		}
	}

	.note-container {
		position: absolute;
		bottom: 1rem;
		right: 0.5rem;
		width: 140px;
		height: 140px;
		pointer-events: none;
	}

	.music-note {
		position: absolute;
		font-size: 1rem;
		opacity: 0;
		color: rgba(255, 255, 255, 0.6);
	}

	.note-1 {
		right: 85px;
		bottom: 60px;
		animation:
			floatNote1 2.8s ease-out infinite,
			notePosition 11.2s ease-in-out infinite;
		animation-delay: 0.48s, 0s;
	}

	.note-2 {
		right: 100px;
		bottom: 50px;
		animation:
			floatNote2 3.1s ease-out infinite,
			notePosition 13.3s ease-in-out infinite;
		animation-delay: 1.54s, 0.7s;
	}

	.note-3 {
		right: 70px;
		bottom: 55px;
		animation:
			floatNote3 2.6s ease-out infinite,
			notePosition 9.7s ease-in-out infinite;
		animation-delay: 2.72s, 1.3s;
	}

	.note-4 {
		right: 90px;
		bottom: 45px;
		animation:
			floatNote4 2.9s ease-out infinite,
			notePosition 12.5s ease-in-out infinite;
		animation-delay: 0.96s, 0.3s;
	}

	.note-5 {
		right: 75px;
		bottom: 65px;
		animation:
			floatNote5 2.7s ease-out infinite,
			notePosition 10.9s ease-in-out infinite;
		animation-delay: 2.1s, 1.8s;
	}

	@keyframes floatNote1 {
		0% {
			opacity: 0;
			transform: translate(0, 0) rotate(0deg);
		}
		15% {
			opacity: 1;
		}
		65% {
			opacity: 0;
		}
		100% {
			opacity: 0;
			transform: translate(-15px, -50px) rotate(-15deg);
		}
	}

	@keyframes floatNote2 {
		0% {
			opacity: 0;
			transform: translate(0, 0) rotate(0deg);
		}
		15% {
			opacity: 1;
		}
		65% {
			opacity: 0;
		}
		100% {
			opacity: 0;
			transform: translate(-8px, -55px) rotate(-8deg);
		}
	}

	@keyframes floatNote3 {
		0% {
			opacity: 0;
			transform: translate(0, 0) rotate(0deg);
		}
		15% {
			opacity: 1;
		}
		65% {
			opacity: 0;
		}
		100% {
			opacity: 0;
			transform: translate(-12px, -45px) rotate(-12deg);
		}
	}

	@keyframes floatNote4 {
		0% {
			opacity: 0;
			transform: translate(0, 0) rotate(0deg);
		}
		15% {
			opacity: 1;
		}
		65% {
			opacity: 0;
		}
		100% {
			opacity: 0;
			transform: translate(-10px, -60px) rotate(-10deg);
		}
	}

	@keyframes floatNote5 {
		0% {
			opacity: 0;
			transform: translate(0, 0) rotate(0deg);
		}
		15% {
			opacity: 1;
		}
		65% {
			opacity: 0;
		}
		100% {
			opacity: 0;
			transform: translate(-14px, -48px) rotate(-14deg);
		}
	}

	@keyframes notePosition {
		0% {
			transform: translate(0, 0);
		}
		20% {
			transform: translate(-8px, 5px);
		}
		40% {
			transform: translate(6px, -4px);
		}
		60% {
			transform: translate(-5px, -6px);
		}
		80% {
			transform: translate(7px, 3px);
		}
		100% {
			transform: translate(0, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.music-note {
			display: none;
		}
	}
</style>

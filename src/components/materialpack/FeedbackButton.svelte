<script lang="ts">
	import HugeiconsMessageMultiple01 from "virtual:icons/hugeicons/message-multiple-01";
	import CenterModal from "../CenterModal.svelte";
	import { closeDialog } from "../CenterModal.svelte";
	import SimpleIconsDiscord from "virtual:icons/simple-icons/discord";
	import big_tater from "$lib/materialpack/media/big-tater.png";

	let activeModal: string | null = null;
</script>

<button class="feedback-button" on:click={() => (activeModal = "0")} title="Feedback">
	<HugeiconsMessageMultiple01 width="100%" height="100%" />
</button>

<CenterModal bind:activeModal modalID="0" style="overflow: hidden;">
	<div slot="description" class="modal-content">
		<h2>Feedback & Support</h2>
		<ul>
			<li>Get help with material pack creation</li>
			<li>Submit material packs for the public list</li>
			<li>Suggest new features</li>
			<li>Report bugs</li>
		</ul>
		<div class="modal-actions">
			<a href="https://discord.com/invite/vEZUkSxwR9" target="_blank" rel="noopener noreferrer" class="discord-btn">
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

<style lang="scss">
	.feedback-button {
		display: flex;
		position: relative;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		overflow: hidden;
		border-radius: 8px;
		background: linear-gradient(145deg, rgba(40, 40, 40, 0.9), rgba(28, 28, 28, 0.9));
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.2),
			inset 0 1px 1px rgba(255, 255, 255, 0.1),
			inset 0 -1px 1px rgba(0, 0, 0, 0.1);
		transition:
			background 0.3s ease-out,
			box-shadow 0.2s ease,
			transform 0.2s ease;

		&::after {
			position: absolute;
			width: 150%;
			height: 150%;
			inset: -25%;
			transform: translateX(-100%);
			background: linear-gradient(145deg, rgba(255, 255, 255, 0.3), transparent 50%);
			content: "";
			pointer-events: none;
			transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		}

		&:hover {
			transform: translateY(-1px);
			background: linear-gradient(125deg, rgba(56, 56, 56, 0.9), rgba(49, 2, 27, 0.9));
			box-shadow:
				0 4px 8px rgba(0, 0, 0, 0.3),
				inset 0 1px 1px rgba(255, 255, 255, 0.15),
				inset 0 -1px 1px rgba(0, 0, 0, 0.1);
			cursor: pointer;
		}

		&:has(a:focus-visible) {
			outline: solid 2px rgba(100, 200, 255, 0.8);
		}

		&:hover::after,
		&:focus-within::after {
			transform: translateX(100%);
		}

		&:active {
			transform: translateY(1px);
			background: linear-gradient(145deg, rgba(35, 35, 35, 0.9), rgba(25, 25, 25, 0.9));
			box-shadow:
				0 1px 2px rgba(0, 0, 0, 0.2),
				inset 0 1px 1px rgba(255, 255, 255, 0.05),
				inset 0 -1px 1px rgba(0, 0, 0, 0.1);
		}

		a {
			all: unset;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			padding: 0.5rem;
		}
	}

	h2 {
		margin-top: 0;
	}

	ul {
		margin: 1rem 1rem;
		padding: 0 0 0 0.1rem;
		text-align: left;
	}

	.modal-actions {
		width: fit-content;
	}

	.discord-btn {
		align-items: center;
		background: #5865f2;
		border-radius: 4px;
		color: white;
		display: flex;
		font-weight: 600;
		justify-content: space-around;
		margin: 0 auto;
		padding: 0.75rem 1.5rem;
		text-decoration: none;
		transition: background-color 0.2s ease;
		width: 250px;
	}

	.discord-btn:hover {
		background: #4752c4;
	}

	.big-tater {
		animation: taterGroove 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
		bottom: -1rem;
		height: 100px;
		pointer-events: none;
		position: absolute;
		right: -0.5rem;
		transform-origin: bottom center;
		width: 100px;
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
		bottom: 1rem;
		height: 140px;
		pointer-events: none;
		position: absolute;
		right: 0.5rem;
		width: 140px;
	}

	.music-note {
		color: rgba(255, 255, 255, 0.6);
		font-size: 1rem;
		opacity: 0;
		position: absolute;
	}

	.note-1 {
		animation:
			floatNote1 2.8s ease-out infinite,
			notePosition 11.2s ease-in-out infinite;
		animation-delay: 0.48s, 0s;
		bottom: 60px;
		right: 85px;
	}

	.note-2 {
		animation:
			floatNote2 3.1s ease-out infinite,
			notePosition 13.3s ease-in-out infinite;
		animation-delay: 1.54s, 0.7s;
		bottom: 50px;
		right: 100px;
	}

	.note-3 {
		animation:
			floatNote3 2.6s ease-out infinite,
			notePosition 9.7s ease-in-out infinite;
		animation-delay: 2.72s, 1.3s;
		bottom: 55px;
		right: 70px;
	}

	.note-4 {
		animation:
			floatNote4 2.9s ease-out infinite,
			notePosition 12.5s ease-in-out infinite;
		animation-delay: 0.96s, 0.3s;
		bottom: 45px;
		right: 90px;
	}

	.note-5 {
		animation:
			floatNote5 2.7s ease-out infinite,
			notePosition 10.9s ease-in-out infinite;
		animation-delay: 2.1s, 1.8s;
		bottom: 65px;
		right: 75px;
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

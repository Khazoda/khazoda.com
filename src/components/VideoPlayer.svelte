<script lang="ts">
	export let src;
	export let autoplay = true;
	export let loop = true;

	import IconoirSoundHigh from "virtual:icons/iconoir/sound-high";
	import IconoirSoundOff from "virtual:icons/iconoir/sound-off";

	let video: HTMLVideoElement;
	let isMuted: boolean = true;
	let isPlaying: boolean = false;

	function handleVideoClick(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();

		if (!video) return;

		if (video.paused) {
			video.play().catch(e => console.log("Play failed:", e));
		} else {
			video.pause();
		}
	}

	function toggleMute(event: MouseEvent) {
		event.stopPropagation();
		if (!video) return;

		isMuted = !isMuted;
		video.muted = isMuted;
	}

	$: if (video) {
		video.addEventListener("play", () => (isPlaying = true));
		video.addEventListener("pause", () => (isPlaying = false));
		isPlaying = !video.paused;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="video-wrapper" on:click={handleVideoClick}>
	<div class="click-overlay" />
	<video bind:this={video} {src} {autoplay} {loop} muted={isMuted} class="video" />

	<button class="mute-btn {isMuted ? 'muted' : ''}" on:click={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
		{#if isMuted}
			<IconoirSoundOff />
		{:else}
			<IconoirSoundHigh />
		{/if}
	</button>
</div>

<style>
	.video-wrapper {
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}

	.click-overlay {
		z-index: 1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.video {
		z-index: 0;
		width: 100%;
		height: 100%;
		object-fit: scale-down;
		border-radius: 8px;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}

	.mute-btn {
		z-index: 2;
		position: absolute;
		top: 1rem;
		right: 1rem;
		background:none;
		outline:none;
		padding: 4px 6px;
		border: none;
		border-radius: 3px;
		color: rgb(210, 210, 210);
		font-size: 2rem;
		cursor: pointer;
		opacity: 0.5;
		transition: opacity 0.2s ease;
	}

	.mute-btn:hover {
		opacity: 1;
	}
</style>

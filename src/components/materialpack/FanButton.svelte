<script lang="ts">
	// Props for button styling
	export let color: "blue" | "green" = "blue";
	export let href: string;

	// Props for content
	export let icon: any; // Svelte component type for the icon
	export let label: string;

	// Props for fan animation
	export let fanImages: string[] = [];

	let isHovered = false;
</script>

<a
	{href}
	class="btn-important {color}"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}>
	<span class="flex-row align-center">
		<svelte:component this={icon} />
		{label}
	</span>

	{#if fanImages.length > 0 && isHovered}
		<div class="fan-overlay">
			{#each [...fanImages].sort(() => Math.random() - 0.5).slice(0, 3) as image, i}
				<img src={image} alt="" class="fan-image fan-{i + 1} no-resample" />
			{/each}
		</div>
	{/if}
</a>

<style lang="scss">
	.btn-important {
		font-family: "Quicksand", system-ui, sans-serif;
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: 0.01em;
		padding: 0.75rem 1.5rem;
		text-decoration: none;
		width: fit-content;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		align-items: center;
		border: none;
		border-radius: 8px;
		color: rgb(31, 31, 31);
		display: flex;
		gap: 0.5rem;
		position: relative;
		text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
		transition:
			border 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		&.green {
			background: rgb(235, 235, 235);
			border: 2px solid #2ac444;
			box-shadow: 5px 5px 0px #2ac444;
			&:hover {
				border: 2px solid #24aa2f;
				box-shadow: 3px 3px 0px #24aa2f;
				cursor: pointer;
				span {
					backface-visibility: hidden;
					-webkit-backface-visibility: hidden;
					perspective: 1000;
					text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
					transform: scale(1.1);
					transform-style: preserve-3d;
				}
			}
		}

		&.blue {
			background: rgb(235, 235, 235);
			border: 2px solid #0099ff;
			box-shadow: 5px 5px 0px #0099ff;
			&:hover {
				border: 2px solid #0066ff;
				box-shadow: 3px 3px 0px #0066ff;
				cursor: pointer;
				span {
					backface-visibility: hidden;
					-webkit-backface-visibility: hidden;
					perspective: 1000;
					text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
					transform: scale(1.1);
					transform-style: preserve-3d;
				}
			}
		}

		span {
			backface-visibility: hidden;
			-webkit-backface-visibility: hidden;
			gap: 0.5rem;
			text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
			transform: perspective(1px) translateZ(0);
			transform-style: preserve-3d;
			transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}

	.fan-overlay {
		height: 64px;
		left: 0rem;
		pointer-events: none;
		position: absolute;
		top: 0.25rem;
		transform: rotate(-25deg);
		width: 64px;
	}

	.fan-image {
		filter: blur(0px); // Fixes rotation creating jagged edges (maybe a GPU thing?)
		height: 64px;
		object-fit: contain;
		opacity: 0;
		position: absolute;
		transform-origin: bottom center;
		transition: all 0.3s ease-out;
		width: 64px;
	}

	.fan-1 {
		animation: fanOut1 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
	}

	.fan-2 {
		animation: fanOut2 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
	}

	.fan-3 {
		animation: fanOut3 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
	}

	@keyframes fanOut1 {
		from {
			opacity: 0;
			transform: translateY(0) rotate(0deg);
		}
		to {
			opacity: 1;
			transform: translateY(-100%) rotate(-30deg);
		}
	}

	@keyframes fanOut2 {
		from {
			opacity: 0;
			transform: translateY(0) rotate(0deg);
		}
		to {
			opacity: 1;
			transform: translateY(-100%) rotate(0deg);
		}
	}

	@keyframes fanOut3 {
		from {
			opacity: 0;
			transform: translateY(0) rotate(0deg);
		}
		to {
			opacity: 1;
			transform: translateY(-100%) rotate(30deg);
		}
	}
</style>

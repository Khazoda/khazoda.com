<script lang="ts">
	// Props for button styling
	export let color: 'blue' | 'green' = 'blue';
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
	on:mouseleave={() => (isHovered = false)}
>
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
		text-decoration: none;
		width: fit-content;
		margin-right: 2rem;
		padding: 1rem 2rem;
		font-family: 'Quicksand', 'sans-serif';
		font-size: 1.2rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: rgb(31, 31, 31);
		border: none;
		border-radius: 8px;
		position: relative;
		transition:
			border 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		&.green {
			background: rgb(235, 235, 235);
			box-shadow: 5px 5px 0px #2ac444;
			border: 2px solid #2ac444;
			&:hover {
				box-shadow: 3px 3px 0px #24aa2f;
				border: 2px solid #24aa2f;
				cursor: pointer;
				span {
					transform: scale(1.1);
				}
			}
		}

		&.blue {
			background: rgb(235, 235, 235);
			box-shadow: 5px 5px 0px #0099ff;
			border: 2px solid #0099ff;
			&:hover {
				box-shadow: 3px 3px 0px #0066ff;
				border: 2px solid #0066ff;
				cursor: pointer;
				span {
					transform: scale(1.1);
				}
			}
		}

		span {
			gap: 0.5rem;
			filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.1));
			transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}

	.fan-overlay {
		position: absolute;
		top: 0.25rem;
		left: 0rem;
		transform: rotate(-25deg);
		width: 64px;
		height: 64px;
		pointer-events: none;
	}

	.fan-image {
		position: absolute;
		width: 64px;
		height: 64px;
		object-fit: contain;
		opacity: 0;
		transform-origin: bottom center;
		transition: all 0.3s ease-out;
		filter: blur(0px); // Fixes rotation creating jagged edges (maybe a GPU thing?)
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

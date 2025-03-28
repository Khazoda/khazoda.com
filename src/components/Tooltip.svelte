<script lang="ts">
	export let text: string;

	let tooltip: HTMLSpanElement;
	let tooltipContainer: HTMLDivElement;
	let x = 0;
	let y = 0;

	function handleMouseMove(event: MouseEvent) {
		if (!tooltipContainer) return;
		const rect = tooltipContainer.getBoundingClientRect();
		x = event.clientX - rect.left + 20;
		y = event.clientY - rect.top;
	}
</script>

<div class="tooltip" bind:this={tooltipContainer} on:mousemove={handleMouseMove} role="tooltip">
	<slot></slot>
	<span class="tooltip-text" bind:this={tooltip} style="left: {x + 10}px; top: {y}px">{text}</span>
</div>

<style lang="scss">
	.tooltip {
		display: inline-flex;
		position: relative;
	}

	.tooltip-text {
		visibility: hidden;
		z-index: 1;
		position: absolute;
		padding: 0.2rem 0.4rem;
		border: 1px solid rgba(81, 235, 255, 0.3);
		border-radius: 5px;
		background-color: rgba(31, 31, 31, 0.95);
		color: rgba(81, 235, 255, 0.8);
		font-size: 0.75rem;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s;
	}

	.tooltip:hover .tooltip-text {
		visibility: visible;
		opacity: 1;
	}
</style>

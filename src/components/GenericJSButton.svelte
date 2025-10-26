<script>
	export let colour;
</script>

<button class="home-button" style="--colour: {colour}" on:click >
	<slot name="icon"/>
</button>

<style lang="scss">
	.home-button {
		display: flex;
		position: relative;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		overflow: hidden;
		padding: 0.5rem;
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
			background: linear-gradient(125deg, rgba(56, 56, 56, 0.9),var(--colour, rgba(45,45,45, 0.9)));
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
			background: linear-gradient(145deg, rgba(35, 35, 35, 0.9),var(--colour,rgba(45, 45, 45, 0.9)));
			box-shadow:
				0 1px 2px rgba(0, 0, 0, 0.2),
				inset 0 1px 1px rgba(255, 255, 255, 0.05),
				inset 0 -1px 1px rgba(0, 0, 0, 0.1);
		}
	}
</style>

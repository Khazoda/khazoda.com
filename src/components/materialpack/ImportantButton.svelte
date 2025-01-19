<script lang="ts">
	// Props for button styling
	export let color: 'blue' | 'green' = 'blue';

	// Props for content
	export let icon: any; // Svelte component type for the icon
	export let label: string;

	// Optional props
	export let onClick: () => void = () => {};
	export let type: 'button' | 'submit' = 'button';
</script>

<button {type} class="important-btn {color}" on:click={onClick}>
	<span class="flex-row align-center">
		<svelte:component this={icon} />
		{label}
	</span>
</button>

<style lang="scss">
	.important-btn {
		text-decoration: none;
		width: fit-content;
		padding: 0.75rem 1.5rem;
		font-family: 'Quicksand', 'sans-serif';
		font-size: 1.1rem;
		font-weight: 600;
		background: rgb(235, 235, 235);
		color: rgb(31, 31, 31);
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		&.green {
			border: 2px solid #2ac444;
			box-shadow: 3px 3px 0px #2ac444;
			&:hover {
				box-shadow: 2px 2px 0px #24aa2f;
				border-color: #24aa2f;
				span {
					transform: scale(1.05);
				}
			}
		}

		&.blue {
			border: 2px solid #0099ff;
			box-shadow: 3px 3px 0px #0099ff;
			&:hover {
				box-shadow: 2px 2px 0px #0066ff;
				border-color: #0066ff;
				span {
					transform: scale(1.05);
				}
			}
		}

		span {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}
</style>

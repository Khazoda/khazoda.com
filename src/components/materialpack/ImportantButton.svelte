<script lang="ts">
	// Props for button styling
	export let color: 'blue' | 'green' | 'grey' = 'blue';
	export let backdropCorner:
		| 'top-left'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-right'
		| 'top-center'
		| 'bottom-center'
		| 'left-center'
		| 'right-center'
		| 'center' = 'bottom-right';

	// Props for content
	export let icon: any; // Svelte component type for the icon
	export let label: string;

	// Optional props
	export let onClick: () => void = () => {};
	export let type: 'button' | 'submit' = 'button';
</script>

<button
	{type}
	class="important-btn {color} {backdropCorner}"
	style="--button-color: {color === 'green'
		? '#2ac444'
		: color === 'blue'
			? '#0099ff'
			: '#a3a3a3'}; 
	       --button-hover-color: {color === 'green'
		? '#24aa2f'
		: color === 'blue'
			? '#0066ff'
			: '#6b6b6b'};"
	on:click={onClick}
>
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
		border: 2px solid var(--button-color);

		&.top-left {
			box-shadow: -3px -3px 0px var(--button-color);
		}
		&.top-right {
			box-shadow: 3px -3px 0px var(--button-color);
		}
		&.bottom-left {
			box-shadow: -3px 3px 0px var(--button-color);
		}
		&.bottom-right {
			box-shadow: 3px 3px 0px var(--button-color);
		}
		&.top-center {
			box-shadow: 0 -3px 0px var(--button-color);
		}
		&.bottom-center {
			box-shadow: 0 3px 0px var(--button-color);
		}
		&.left-center {
			box-shadow: -3px 0 0px var(--button-color);
		}
		&.right-center {
			box-shadow: 3px 0 0px var(--button-color);
		}
		&.center {
			transform: translate(0px, 0px);
		}

		&:hover {
			border-color: var(--button-hover-color);
			&.top-left {
				box-shadow: -2px -2px 0px var(--button-hover-color);
			}
			&.top-right {
				box-shadow: 2px -2px 0px var(--button-hover-color);
			}
			&.bottom-left {
				box-shadow: -2px 2px 0px var(--button-hover-color);
			}
			&.bottom-right {
				box-shadow: 2px 2px 0px var(--button-hover-color);
			}
			&.top-center {
				box-shadow: 0 -2px 0px var(--button-hover-color);
			}
			&.bottom-center {
				box-shadow: 0 2px 0px var(--button-hover-color);
			}
			&.left-center {
				box-shadow: -2px 0 0px var(--button-hover-color);
			}
			&.right-center {
				box-shadow: 2px 0 0px var(--button-hover-color);
			}
			&.center {
				transform: translate(1px, 1px);
			}

			span {
				transform: scale(1.05);
			}
		}

		&.grey:hover span {
			transform: scale(0.95);
		}

		span {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}
</style>

<script>
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';

	const items = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
		27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
		51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
		75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
		99, 100
	];

	let showItems = false;
	onMount(() => {
		showItems = true;
	});
</script>

<div class="a">
	{#each items as item, index (item)}
		{#key showItems}
			<div in:fly={{ y: -20, duration: 500, delay: index * 10 }}>
				{item}
			</div>
		{/key}
	{/each}

	<button on:click={() => (showItems = !showItems)}>Toggle</button>
</div>

what is a material pack? explain what they are, the general structure and how to install them

<style lang="scss">
	.a {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		font-size: 12px;

		div {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			width: 32px;
			height: 32px;
			padding: 4px;
			border: 2px solid white;
		}
	}
</style>

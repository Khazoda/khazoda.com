<script lang="ts">
	import HomeButton from 'src/components/HomeButton.svelte';
	import HugeiconsSearch01 from 'virtual:icons/hugeicons/search-01';
	import dummyPacksData from './dummyPacks.json';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	// Trigger page load transition
	let pageReady = false;
	onMount(() => {
		requestAnimationFrame(() => {
			setTimeout(() => {
				pageReady = true;
			}, 0);
		});
	});

	// Todo: Replace with API data
	const allPublicMaterialPacks = dummyPacksData.packs;

	// Sorting and filtering states
	let searchQuery: string = '';
	type SortMethod = 'alphabetical' | 'downloads' | 'recent';
	type SortDirection = 'asc' | 'desc';
	type MaterialPackCategory = 'mod-compatibility' | 'vanilla-like' | 'other';

	const categoryOrder: Record<MaterialPackCategory, number> = {
		'mod-compatibility': 0,
		'vanilla-like': 1,
		other: 2
	};

	let sortMethod: SortMethod = 'recent';
	let sortDirection: SortDirection = 'asc';
	let showCategories = true;

	const sortFunctions = {
		alphabetical: (a: any, b: any) => a.name.localeCompare(b.name),
		downloads: (a: any, b: any) => b.downloads - a.downloads,
		recent: (a: any, b: any) => new Date(b.created).getTime() - new Date(a.created).getTime()
	};

	// First filter by search
	$: searchFilteredPacks = allPublicMaterialPacks.filter((pack) =>
		pack.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Then sort based on method and direction
	$: sortedPacks = searchFilteredPacks.sort((a, b) => {
		let comparison = 0;
		if (showCategories) {
			// Always sort by category first when categories are shown
			comparison =
				categoryOrder[a.category as MaterialPackCategory] -
				categoryOrder[b.category as MaterialPackCategory];
			if (comparison === 0) {
				// Then apply the selected sort method within categories
				comparison = sortFunctions[sortMethod](a, b);
			}
		} else {
			// Sort by the selected method only when categories are hidden
			comparison = sortFunctions[sortMethod](a, b);
		}
		return sortDirection === 'asc' ? comparison : -comparison;
	});

	// Create display items with headers only if showing categories
	$: displayItems = showCategories
		? sortedPacks.reduce(
				(acc, pack, index) => {
					if (index === 0 || sortedPacks[index - 1].category !== pack.category) {
						acc.push({
							type: 'header',
							category: pack.category,
							content: pack.category
						});
					}
					acc.push({
						type: 'pack',
						category: pack.category,
						content: pack
					});
					return acc;
				},
				[] as Array<{ type: 'header' | 'pack'; category: string; content: any }>
			)
		: sortedPacks.map((pack) => ({
				type: 'pack',
				category: pack.category,
				content: pack
			}));
</script>

<div class="page-container">
	<span class="absolute-top-left">
		<HomeButton />
	</span>

	{#if pageReady}
		<div class="content" transition:fly={{ y: -20, duration: 500, delay: 0 }}>
			<h1>Material Packs</h1>

			<div class="controls">
				<div class="search-bar">
					<HugeiconsSearch01 width="20" height="20" />
					<input type="text" bind:value={searchQuery} placeholder="Search material packs..." />
				</div>

				<div class="filters">
					<select bind:value={sortMethod}>
						<option value="alphabetical">Alphabetical</option>
						<option value="downloads">Downloads</option>
						<option value="recent">Date Created</option>
					</select>

					<label class="category-toggle">
						<input type="checkbox" bind:checked={showCategories} />
						<span>Categories</span>
					</label>

					<button
						class="sort-direction"
						on:click={() => (sortDirection = sortDirection === 'asc' ? 'desc' : 'asc')}
						aria-label="Toggle sort direction"
					>
						{#if sortDirection === 'asc'}
							↑
						{:else}
							↓
						{/if}
					</button>
				</div>
			</div>

			<div class="packs-grid">
				{#each displayItems as item, index (item)}
					<div
						class={item.type === 'header' ? 'category-heading' : 'pack-card'}
						in:fly={item.type === 'pack'
							? { y: 5, delay: index * 25, duration: 100 }
							: { y: 0, delay: 0, duration: 0 }}
					>
						{#if item.type === 'header'}
							<h2>{item.content}</h2>
						{:else}
							<img src={item.content.icon} alt={item.content.name} />
							<div class="pack-info">
								<h3>{item.content.name}</h3>
								<p class="author">by {item.content.author}</p>
								<p class="description">{item.content.description}</p>
								<div class="stats">
									<span>{item.content.downloads} downloads</span>
									<span class="category">{item.content.category}</span>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	:global(html) {
		scrollbar-gutter: stable;
	}

	:global(::-webkit-scrollbar) {
		width: 10px;
		height: 10px;
	}

	:global(::-webkit-scrollbar-track) {
		background: #1a1a1a;
		border-radius: 5px;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: #3a3a3a;
		border-radius: 5px;
		border: 2px solid #1a1a1a;

		&:hover {
			background: #4a4a4a;
		}
	}

	.page-container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		padding-right: calc(2rem + 0.5rem);
	}

	.content {
		margin-top: 3rem;
	}

	.controls {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;

		.search-bar {
			flex: 1;
			min-width: 300px;
			display: flex;
			align-items: center;
			background: #2a2a2a;
			padding: 0.5rem 1rem;
			border-radius: 8px;
			border: 1px solid #3a3a3a;

			input {
				flex: 1;
				background: none;
				border: none;
				margin-left: 0.5rem;
				color: white;
				&:focus {
					outline: none;
				}
			}
		}

		.filters {
			display: flex;
			gap: 1rem;

			select {
				padding: 0.5rem 1rem;
				border-radius: 8px;
				background: #2a2a2a;
				border: 1px solid #3a3a3a;
				color: white;
				cursor: pointer;

				&:focus {
					outline: none;
					border-color: #4a9eff;
				}
			}

			.sort-direction {
				padding: 0.5rem 1rem;
				border-radius: 8px;
				background: #2a2a2a;
				border: 1px solid #3a3a3a;
				color: white;
				cursor: pointer;
				font-size: 1.2rem;
				line-height: 1;
				min-width: 42px;

				&:hover {
					background: #3a3a3a;
				}

				&:focus {
					outline: none;
					border-color: #4a9eff;
				}
			}

			.category-toggle {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.5rem 1rem;
				border-radius: 8px;
				background: #2a2a2a;
				border: 1px solid #3a3a3a;
				color: white;
				cursor: pointer;

				&:hover {
					background: #3a3a3a;
				}

				input {
					margin: 0;
				}

				span {
					user-select: none;
				}
			}
		}
	}

	.packs-grid {
		display: grid;
		justify-content: flex-start;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 0.5rem;
	}

	.pack-card {
		background: #2a2a2a;
		border: 1px solid #3a3a3a;
		border-radius: 8px;
		overflow: hidden;
		transition: all 0.2s ease;
		width: 180px;
		margin-bottom: 0.5rem;

		&:hover {
			transform: translateY(-2px);
			border-color: #4a9eff;
		}

		img {
			width: 100%;
			aspect-ratio: 1;
			height: auto;
			object-fit: cover;
		}

		.pack-info {
			padding: 0.75rem;

			h3 {
				margin: 0;
				font-size: 1rem;
			}

			.author {
				color: #888;
				font-size: 0.8rem;
				margin: 0.25rem 0;
			}

			.description {
				margin: 0.5rem 0;
				font-size: 0.8rem;
			}

			.stats {
				display: flex;
				flex-direction: column;
				gap: 0.1rem;
				justify-content: space-between;
				font-size: 0.7rem;
				color: #888;
				margin-top: 0.75rem;

				.category {
					text-transform: capitalize;
				}
			}
		}
	}

	.category-heading {
		grid-column: 1 / -1;
		margin: 2rem 0 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid #3a3a3a;
		text-transform: capitalize;
		color: #4a9eff;

		&:first-of-type {
			margin-top: 0;
		}
	}
</style>

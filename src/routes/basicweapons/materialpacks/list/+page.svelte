<script lang="ts">
	import HomeButton from "src/components/HomeButton.svelte";
	import HugeiconsSearch01 from "virtual:icons/hugeicons/search-01";
	import { onMount, onDestroy } from "svelte";
	import { fly, fade, scale } from "svelte/transition";
	import type { PageData } from "./$types";
	import { navigating } from "$app/stores";
	import LoadingSpinner from "src/components/LoadingSpinner.svelte";

	import HugeiconsBookDownload from "virtual:icons/hugeicons/book-download";
	import HugeiconsLinkSquare02 from "virtual:icons/hugeicons/link-square-02";
	import IcRoundFileDownload from "virtual:icons/ic/round-file-download";
	import IcBaselineDonutLarge from "virtual:icons/ic/baseline-donut-large";
	import HugeiconsSortByDown02 from "virtual:icons/hugeicons/sort-by-down-02";
	import HugeiconsSortByUp02 from "virtual:icons/hugeicons/sort-by-up-02";
	import HugeiconsArrowLeft02 from "virtual:icons/hugeicons/arrow-left-02";
	import SimpleIconsModrinth from "virtual:icons/simple-icons/modrinth";
	import HugeiconsMessageUpload01 from "virtual:icons/hugeicons/message-upload-01";
	import SimpleIconsDiscord from "virtual:icons/simple-icons/discord";

	import ModrinthBwDependencyExample from "$lib/materialpack/media/modrinth_bw_dependency_example.png";
	import HexagonIcon from "virtual:icons/codicon/debug-breakpoint-data-unverified";
	import DiamondIcon from "virtual:icons/codicon/debug-breakpoint-log-unverified";
	import type { MaterialPackCategory } from "src/config/material-packs";
	import ImportantButton from "src/components/materialpack/ImportantButton.svelte";
	import CenterModal, { closeDialog } from "src/components/CenterModal.svelte";
	import FeedbackButton from "src/components/materialpack/FeedbackButton.svelte";

	export let data: PageData;
	const rawMaterialPacks = data.materialPacks;

	let pageReady = false;
	let isMobile = false;

	onMount(() => {
		requestAnimationFrame(() => {
			pageReady = true;
		});
		if (typeof window !== "undefined" && window.innerWidth < 1000) {
			isMobile = true;
		}
	});

	// Sorting and filtering states
	let searchQuery: string = "";
	let debouncedSearchQuery: string = "";

	// Debounce the search query to prevent excessive re-renders
	let searchTimeout: number;
	$: {
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			debouncedSearchQuery = searchQuery;
		}, 250);
	}

	type SortMethod = "alphabetical" | "downloads" | "recent";
	type SortDirection = "asc" | "desc";

	const categoryOrder: Record<MaterialPackCategory, number> = {
		"mod compatibility": 0,
		"vanilla-like": 1,
		other: 2
	};

	let sortMethod: SortMethod = "recent";
	let sortDirection: SortDirection = "asc";
	let showCategories = true;

	const sortFunctions = {
		alphabetical: (a: any, b: any) => (a.name ? a.name.localeCompare(b.name) : 0),
		downloads: (a: any, b: any) => b.downloads - a.downloads,
		recent: (a: any, b: any) => new Date(b.created).getTime() - new Date(a.created).getTime()
	};

	// Use the debounced query for filtering
	$: searchFilteredPacks = rawMaterialPacks.filter(pack =>
		pack.name ? pack.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) : true
	);

	// Then sort based on method and direction
	$: sortedPacks = searchFilteredPacks.sort((a, b) => {
		let comparison = 0;
		if (showCategories) {
			// Always sort by category first when categories view is shown
			comparison =
				categoryOrder[a.category as MaterialPackCategory] - categoryOrder[b.category as MaterialPackCategory];
			if (comparison === 0) {
				// Then apply the selected sort method within categories
				comparison = sortFunctions[sortMethod](a, b);
			}
		} else {
			// Sort by the selected method only when categories view is not active
			comparison = sortFunctions[sortMethod](a, b);
		}
		return sortDirection === "asc" ? comparison : -comparison;
	});

	// Create display items with headers only if showing categories view
	$: displayItems = showCategories
		? sortedPacks.reduce(
				(acc, pack, index) => {
					if (index === 0 || sortedPacks[index - 1].category !== pack.category) {
						acc.push({
							type: "header",
							category: pack.category,
							content: pack.category
						});
					}
					acc.push({
						type: "pack",
						category: pack.category,
						content: pack
					});
					return acc;
				},
				[] as Array<{ type: "header" | "pack"; category: string; content: any }>
			)
		: sortedPacks.map(pack => ({
				type: "pack",
				category: pack.category,
				content: pack
			}));

	// Cleanup on component destroy
	onDestroy(() => {
		clearTimeout(searchTimeout);
	});

	function flyAndScale(node: HTMLElement, { y = 0, delay = 0, duration = 200 }) {
		return {
			duration,
			delay,
			css: (t: number) => {
				const scale = 0.95 + 0.05 * t;
				const yOffset = y * (1 - t);
				return `
					transform: scale(${scale}) translate(0, ${yOffset}px);
					opacity: ${t}
				`;
			}
		};
	}

	let showModal = Array(0).fill(false);
</script>

<div class="page-container">
	{#if pageReady}
		<div class="content" transition:fly={{ y: -20, duration: 500, delay: 0 }}>
			<div class="flex-row gap-4 align-center above-header">
				<a class="flex-row gap-2" href="/basicweapons/materialpacks">
					<ImportantButton icon={HugeiconsArrowLeft02} label="Back" color="grey" backdropCorner="center" />
				</a>
				{#if !isMobile}
					<span style="filter: saturate(0.75)">
						<ImportantButton
							icon={HugeiconsMessageUpload01}
							label="Submit Material Pack"
							color="blue"
							backdropCorner="top-right"
							onClick={() => (showModal[0] = true)} />
					</span>
				{/if}
			</div>

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
						on:click={() => (sortDirection = sortDirection === "asc" ? "desc" : "asc")}
						aria-label="Toggle sort direction">
						{#if sortDirection === "asc"}
							<HugeiconsSortByUp02 width="24" height="24" />
						{:else}
							<HugeiconsSortByDown02 width="24" height="24" />
						{/if}
					</button>
				</div>
			</div>

			{#if $navigating}
				<LoadingSpinner />
			{:else}
				<div class="packs-grid">
					{#each displayItems as item, index (item)}
						<div
							class={item.type === "header" ? "category-heading" : "pack-card"}
							in:flyAndScale={item.type === "pack"
								? { y: 5, delay: index * 25, duration: 100 }
								: { y: 0, delay: 0, duration: 0 }}>
							{#if item.type === "header"}
								<h2>{item.content}</h2>
							{:else if item.content.name != null}
								<span class="external-link-popup">
									<SimpleIconsModrinth width="16" height="16" color="#1bd96a" />
									<HugeiconsLinkSquare02 width="16" height="16" />
								</span>
								<div class="pack-header">
									<img src={item.content.icon} alt={item.content.name} />
									<span>
										<h3>{item.content.name}</h3>
										<p class="author">by {item.content.author}</p>
									</span>
								</div>
								<div class="pack-info">
									<div class="stats">
										<span
											><IcRoundFileDownload width="16" height="16" />{item.content.downloads.toLocaleString("en-US")} Downloads</span>
										<span class="category"><IcBaselineDonutLarge width="16" height="16" />{item.content.category}</span>
									</div>
								</div>
								<a
									class="materialpack-modrinth-link-overlay"
									href={item.content.url}
									target="_blank"
									rel="noopener noreferrer">
								</a>
								<div class="bottom-badges">
									{#if item.content.official}
										<span class="project-badge official"><DiamondIcon width="16" height="16" />Official</span>
									{:else}
										<span class="project-badge unofficial"><HexagonIcon width="16" height="16" />Community</span>
									{/if}
									{#if item.content.required_mod}
										<a
											href={item.content.required_mod.url}
											class="required-mod"
											target="_blank"
											rel="noopener noreferrer">
											<HugeiconsBookDownload width="16" height="16" />
											Requires {item.content.required_mod.name}
										</a>
									{/if}
								</div>
							{:else}
								<div class="empty-pack">Pending Modrinth Approval</div>
								<a
									class="materialpack-modrinth-link-overlay"
									href={item.content.url}
									target="_blank"
									rel="noopener noreferrer">
								</a>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>

<CenterModal bind:showModal modalID={0}>
	<div slot="description" class="modal-content">
		<h2>Submit Your Material Pack</h2>
		<div class="submission-steps">
			<p>To submit your material pack for the public list:</p>

			<ol>
				<li>
					Create your material pack using the <a href="/basicweapons/materialpacks/create">Material Pack Creator</a>
				</li>
				<li>Export your material pack as a ZIP file</li>
				<li>Thoroughly test your material pack in-game</li>
				<li>
					Upload your material pack to <a href="https://modrinth.com" target="_blank" rel="noopener noreferrer"
						>Modrinth.</a>
					View the official
					<a href="https://modrinth.com/collection/hVumlzpq" target="_blank" rel="noopener noreferrer">collection</a> for
					example projects that follow the guidelines.
				</li>
				<li>
					Send your Modrinth project URL to @khazoda on Discord via direct message or by <a
						href="https://discord.com/invite/vEZUkSxwR9"
						target="_blank"
						rel="noopener noreferrer">joining the Discord server</a>
				</li>
			</ol>
			<div class="requirements">
				<h3>Modrinth Project Guidelines</h3>
				<ul>
					<li>
						Name your project:<br />
						<kbd
							style="font-size: 0.8rem; font-family: monospace; padding: 0.25rem 0.5rem; background: #2a2a2a; border-radius: 4px; border: 2px solid #3a3a3a; margin: 0.25rem 0; width: 100%; display:block;">
							"(X) Material Pack for Basic Weapons"
						</kbd>
					</li>
					<p style="font-size: 0.8rem; color: #aaa; margin: 0.5rem 0 1rem 0;">
						(x) can be either the name of the material pack, the mod name that the material pack is a compatibility pack
						for, or anything else you think makes sense.
					</p>

					<li>Upload the zip file as a data pack</li>
					<li>Set Basic Weapons as a required dependency:</li>
					<img src={ModrinthBwDependencyExample} alt="Modrinth BW Dependency Example" />
					<h4>Description</h4>
					<li>Include images of your weapons</li>
					<li>List all the materials in your pack, preferably with stats</li>
					<li>If your material pack has a mod dependency, list it at the top of the description</li>
					<li>
						Ideally copy the header of <a
							href="https://modrinth.com/datapack/bwmp_warden_deeper-and-darker"
							target="_blank"
							rel="noopener noreferrer">this description</a
						>, or create a similar one that conveys the same information.
					</li>
				</ul>
			</div>
		</div>
		<div class="modal-actions">
			<a href="https://discord.com/invite/vEZUkSxwR9" target="_blank" rel="noopener noreferrer" class="discord-btn">
				<SimpleIconsDiscord width="1.5rem" height="1.5rem" />
				Join Discord Server
			</a>
		</div>
	</div>
</CenterModal>

<style lang="scss">
	.page-container {
		width: 100%;
		max-width: 1200px;
		min-height: calc(100dvh - 16px);
		margin: 0 auto;
		padding: 2rem;
		@media screen and (max-width: 1000px) {
			padding: 1rem;
			padding-right: calc(1rem + 0.5rem);
		}
	}

	.above-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}

	.content {
		margin-top: 3rem;
		div a,
		div a:hover {
			text-decoration: none;
		}
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 1rem;
		gap: 1rem;

		.search-bar {
			display: flex;
			flex: 1;
			align-items: center;
			padding: 0.5rem 1rem;
			border: 2px solid #3a3a3a;
			border-radius: 8px;
			background: #2a2a2a;

			input {
				flex: 1;
				width: 100%;
				margin-left: 0.5rem;
				border: none;
				background: none;
				color: white;
				&:focus {
					outline: none;
				}
			}
		}

		.filters {
			display: flex;
			gap: 1rem;

			@media screen and (max-width: 499px) {
				flex-direction: column;
			}

			select {
				appearance: none;
				min-width: 140px;
				padding: 0.5rem 2.5rem 0.5rem 1rem;
				border: 2px solid #3a3a3a;
				border-radius: 8px;
				background: #2a2a2a
					url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'%3E%3C/path%3E%3C/svg%3E")
					no-repeat;
				background-position: right 0.75rem center;
				background-size: 16px;
				color: white;
				cursor: pointer;

				&:hover {
					border-color: #4a4a4a;
					background-color: #3a3a3a;
				}

				&:focus {
					border-color: #4a9eff;
					outline: none;
					box-shadow: 0 0 0 1px #4a9eff33;
				}

				option {
					padding: 0.5rem;
					background: #2a2a2a;
					color: white;
				}
			}

			.sort-direction {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 42px;
				min-width: 42px;
				height: 42px;
				border: 2px solid #3a3a3a;
				border-radius: 8px;
				background: #2a2a2a;
				color: white;
				font-size: 1.2rem;
				line-height: 1;
				cursor: pointer;

				&:hover {
					background: #3a3a3a;
				}

				&:focus {
					border-color: #4a9eff;
					outline: none;
				}
			}

			.category-toggle {
				display: flex;
				align-items: center;
				padding: 0.5rem 1rem;
				gap: 0.75rem;
				border: 2px solid #3a3a3a;
				border-radius: 8px;
				background: #2a2a2a;
				color: white;
				cursor: pointer;
				user-select: none;

				&:hover {
					background: #3a3a3a;
				}

				input[type="checkbox"] {
					display: grid;
					appearance: none;
					-webkit-appearance: none;
					place-content: center;
					width: 18px;
					height: 18px;
					margin: 0;
					border: 2px solid #3a3a3a;
					border-radius: 4px;
					cursor: pointer;
					transition: all 0.2s ease;

					&::before {
						width: 10px;
						height: 10px;
						transform: scale(0);
						transform-origin: center;
						box-shadow: inset 1em 1em #4a9eff;
						content: "";
						clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
						transition: transform 0.2s ease;
					}

					&:checked {
						border-color: #4a9eff;
						background: #4a9eff33;

						&::before {
							transform: scale(1);
						}
					}

					&:focus {
						border-color: #4a9eff;
						outline: none;
						box-shadow: 0 0 0 1px #4a9eff33;
					}
				}

				span {
					font-weight: 500;
					font-size: 0.9rem;
				}
			}
		}
	}

	.packs-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
		justify-content: flex-start;
		gap: 0.5rem;
		@media screen and (max-width: 1000px) {
			justify-items: center;
		}
	}

	.pack-card {
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: space-between;
		width: 275px;
		height: 275px;
		margin-bottom: 0.5rem;
		padding: 1rem;
		overflow: hidden;
		border: 2px solid #3a3a3a;
		border-radius: 8px;
		background: #2a2a2a;
		transition: all 0.2s ease;
		.external-link-popup {
			position: absolute;
			top: 0.5rem;
			right: -0.5rem;
			opacity: 0;
			transition: all 0.2s ease;
		}
		&:hover .external-link-popup {
			transform: translateX(-1rem);
			opacity: 1;
		}

		&:hover {
			transform: translateY(-2px);
			border-color: #4a9eff;
			cursor: pointer;
		}
		.pack-header {
			display: flex;
			flex-direction: row;
			margin: 0;
			gap: 0.25rem;
			img {
				aspect-ratio: 1;
				width: 96px;
				height: 96px;
				object-fit: cover;
			}
			span {
				width: 100%;
				padding: 0.5rem 0.25rem;
				h3,
				p {
					margin: 0;
					font-size: 1rem;
				}
				p {
					color: #aaa;
					font-size: 0.8rem;
				}
			}
		}

		.pack-info {
			margin: 1rem 0 auto 0;
			padding: 0.5rem 0;

			.stats {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				gap: 0.1rem;
				color: #aaa;
				font-size: 0.8rem;

				.category {
					text-transform: capitalize;
				}

				span {
					display: flex;
					flex-direction: row;
					align-items: center;
					gap: 0.25rem;
				}
			}
		}

		.bottom-badges {
			display: flex;
			flex-direction: column;
			width: 100%;
			padding: 0.25rem 0;
			gap: 0.25rem;
			font-size: 0.75rem;

			a.required-mod {
				display: inline-flex;
				z-index: 10;
				align-items: center;
				width: auto;
				padding: 0.25rem 0.5rem;
				gap: 0.25rem;
				border: 2px solid #3a3a3a;
				border-radius: 4px;
				background: #2a2a2a;
				color: rgb(143, 238, 255);
				text-decoration: none;

				&:hover {
					border-color: #4a9eff;
					background: #3a3a3a;
				}
			}

			.project-badge {
				display: inline-flex;
				align-items: center;
				width: auto;
				padding: 0.25rem 0.5rem;
				gap: 0.25rem;
				border: 1px solid #3a3a3a;
				border-radius: 4px;
				background: #2a2a2a;
				text-decoration: none;

				&.official {
					border: 1px solid #3a3a3a;
					background: #2a2a2a;
				}
				&.unofficial {
					border: 1px solid #3a3a3a;
					background: #2a2a2a;
					color: #aaa;
				}
			}
		}

		.materialpack-modrinth-link-overlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		.empty-pack {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			border: 2px solid #181818;
			border-radius: 8px;
			background: #252525;
			color: #aaa;
			font-size: 1.25rem;
			text-align: center;
		}
	}

	.category-heading {
		grid-column: 1 / -1;
		margin: 2rem 0 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid #3a3a3a;
		color: #4a9eff;
		text-transform: capitalize;

		&:first-of-type {
			margin-top: 0;
		}
	}

	.submission-steps {
		margin: 1rem 0;

		ol {
			margin: 1rem 0;
			padding-left: 1.5rem;

			li {
				margin-bottom: 0.5rem;
			}
		}

		.requirements {
			margin-top: 1.5rem;
			padding: 1rem;
			border: 1px solid #3a3a3a;
			border-radius: 8px;
			background: #2a2a2a;

			h3 {
				margin: 0 0 0.5rem 0;
				color: #85c0ff;
				font-size: 1rem;
			}

			ul {
				padding-left: 0;
				list-style: inside;

				li {
					margin-bottom: 0.25rem;
					font-size: 0.9rem;
				}
				img {
					width: 100%;
					height: auto;
					margin: 0.5rem 0;
					object-fit: cover;
					border-radius: 12px;
				}
				h4 {
					margin-bottom: 1rem;
				}
			}
		}

		a {
			color: #4a9eff;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		margin-top: 1.5rem;
	}

	.discord-btn {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 250px;
		margin: 0 0 0 auto;
		padding: 0.75rem 1.5rem;
		border-radius: 4px;
		background: #5865f2;
		color: white;
		font-weight: 600;
		text-decoration: none;
		transition: background-color 0.2s ease;
	}

	.discord-btn:hover {
		background: #4752c4;
	}
</style>

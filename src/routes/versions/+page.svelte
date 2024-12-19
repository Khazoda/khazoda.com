<script lang="ts">
	import type { MinecraftVersion, SortOrder } from './types';
	import { minecraftVersions, mods } from './data';

	import IconoirSortDown from 'virtual:icons/iconoir/sort-down';
	import IconoirSortUp from 'virtual:icons/iconoir/sort-up';
	import IconoirSquare from 'virtual:icons/iconoir/square';
	import IconoirCheckSquare from 'virtual:icons/iconoir/check-square';
	import IconoirHomeSimpleDoor from 'virtual:icons/iconoir/home-simple-door';
	import IconoirInfoCircle from 'virtual:icons/iconoir/info-circle';
	import CenterModal from '../../components/CenterModal.svelte';

	var showSupercededVersions = false;
	var sortOrder: SortOrder = 'newest';
	var displayedVersions: MinecraftVersion[] = [];
	var showModal: boolean[] = Array(1).fill(false);

	// Filtering & Sorting
	$: {
		displayedVersions = minecraftVersions
			.filter((v) => showSupercededVersions || v.type !== 'superceded')
			.sort((a, b) => {
				if (sortOrder === 'major') {
					// First sort by type (major > minor > superceded)
					const typeOrder = { major: 0, minor: 1, superceded: 2 };
					const typeDiff = typeOrder[a.type] - typeOrder[b.type];
					if (typeDiff !== 0) return typeDiff;

					// Then sort by date (newest first within each type)
					return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
				} else {
					const dateA = new Date(a.releaseDate);
					const dateB = new Date(b.releaseDate);
					return sortOrder === 'oldest'
						? dateA.getTime() - dateB.getTime()
						: dateB.getTime() - dateA.getTime();
				}
			});
	}

	function toggleSupercededVersions() {
		showSupercededVersions = !showSupercededVersions;
	}

	function toggleSortOrder() {
		if (sortOrder === 'newest') sortOrder = 'oldest';
		else if (sortOrder === 'oldest') sortOrder = 'major';
		else sortOrder = 'newest';
	}

	function openModal() {
		showModal[0] = true;
	}
</script>

<div class="table-container">
	<div class="table-controls">
		<a href="/" class="home-btn">
			<IconoirHomeSimpleDoor width="100%" height="100%" />
		</a>
		<button class="help-btn" on:click={openModal} type="button">
			<IconoirInfoCircle width="100%" height="100%" />
		</button>
		<span>
			<button
				type="button"
				class="control-btn"
				on:click={toggleSortOrder}
				title={sortOrder === 'newest'
					? 'Sort oldest first'
					: sortOrder === 'oldest'
						? 'Sort major versions first'
						: 'Sort newest first'}
			>
				{#if sortOrder === 'newest'}
					<IconoirSortDown />
				{:else if sortOrder === 'oldest'}
					<IconoirSortUp />
				{:else}
					<IconoirSortDown />
				{/if}
				{sortOrder === 'newest'
					? 'Newest First'
					: sortOrder === 'oldest'
						? 'Oldest First'
						: 'Major Versions First'}
			</button>

			<button class="control-btn" on:click={toggleSupercededVersions} type="button">
				{#if showSupercededVersions}
					<IconoirCheckSquare />
				{:else}
					<IconoirSquare />
				{/if}
				Show All Versions
			</button>
		</span>
	</div>

	<div class="table-wrapper">
		<table class="table">
			<thead>
				<tr>
					<th scope="col">Versions</th>
					{#each mods as mod}
						<th class="mod-header">
							<div class="tooltip-container">
								<img src={mod.icon} alt={mod.name} class="mod-icon" />
								<span class="tooltip">{mod.name}</span>
							</div>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each displayedVersions as version, i}
					<tr
						class={version.type}
						data-new-group={i > 0 && version.versionGroup !== displayedVersions[i - 1].versionGroup}
					>
						<th>
							<span class={version.type !== 'major' ? 'non-major-version-text' : ''}>
								{version.version}
							</span>
						</th>
						{#each mods as mod}
							<td>
								<div
									class={`compatibility-indicator ${
										mod.supportedVersions.includes(version.version) ? 'supported' : 'unsupported'
									}`}
								>
									{mod.supportedVersions.includes(version.version) ? '✓' : '✗'}
								</div>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<CenterModal bind:showModal modalID={0}>
	<div slot="description" class="definition-list">
		<h2>Version Types</h2>
		<ul>
			<li>
				<span class="major-text">Major Versions</span> - Minecraft versions that modpacks target for
				a long time as a stable version.
			</li>
			<li>
				<span class="minor-text">Minor Versions</span> - Versions that aren't targeted by large modpacks
				and which mod developers sometimes choose to skip when updating.
			</li>
			<li>
				<span class="superceded-text">Superceded Versions</span> - These versions are usually replaced
				by a hotfix put out by Mojang. (hidden by default)
			</li>
		</ul>
		<h2>Version Support Policy</h2>
		<p>
			I prioritize supporting the latest major Minecraft versions. Going forward this is likely to
			be the major version number or first subsequent patch e.g. 1.20.1, 1.21.1
			<br />
			<br />
			If I have the time and capacity I'll also maintain compatibility with select minor versions where
			possible.
			<br />
			<br />
			Superceded versions may be maintained for archival purposes but usually will not receive updates.
		</p>
	</div>
</CenterModal>

<style lang="scss">
	:root {
		/* Background Colours */
		--v-color-background-dark: #2c2c2c;
		--v-color-background-darker: #1e1e1e;
		--v-color-background-darkest: #121212;
		--v-color-background-light: #2c2c2c;

		/* Text Colours */
		--v-color-text-primary: rgba(255, 255, 255, 0.85);
		--v-color-text-secondary: rgba(255, 255, 255, 0.75);
		--v-color-text-disabled: rgba(255, 255, 255, 0.38);
		--v-color-text-major: #bef7ff;
		--v-color-text-positive: #42df42;
		--v-color-text-negative: #973838;

		/* Border Colors */
		--v-color-border: #1a1a1a;
		--v-color-border-strong: #121212;
	}

	.table-container {
		position: relative;
		max-width: fit-content;
		margin: 2rem auto;
		padding: 1rem;
		border-radius: 0.5rem;
		z-index: 1;
		color: var(--v-color-text-primary);
		background: var(--v-color-background-darkest);

		// Version Group Styling Logic
		tbody {
			tr {
				td,
				th {
					border-top: 1px solid var(--v-color-border);
				}

				// add a gap when version group changes
				&[data-new-group='true'] {
					td,
					th {
						border-top: 0.5rem solid var(--v-color-background-darkest);
					}
				}
			}
		}
	}

	.table-container .table-controls {
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 3.5rem;
		padding: 1rem 1rem 0 1rem;
		display: inline-flex;
		justify-content: flex-end;
		gap: 0.5rem;
		background: var(--v-color-background);

		span {
			display: flex;
			gap: 1rem;
		}
		button,
		a {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.5rem 1rem;
			border: 1px solid var(--v-color-border);
			border-radius: 4px;
			color: var(--v-color-text-primary);

			&:hover {
				cursor: pointer;
			}
		}
		a,
		.help-btn {
			height: 2.5rem;
			width: 2.5rem;
			padding: 0.5rem;
			display: inline-flex;
			justify-content: center;
			align-items: center;
		}

		.home-btn {
			background: #234066;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
			&:hover {
				background: #2d527f;
				box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
			}
		}
		.help-btn {
			background: #8f4422;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
			&:hover {
				background: #a54f28;
				box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
			}
		}
	}

	.table-wrapper {
		overflow: auto;
		padding-top: 3rem;

		// Add custom scrollbar styling
		&::-webkit-scrollbar {
			width: 12px;
			height: 24px;
		}

		&::-webkit-scrollbar-track {
			background: var(--v-color-background-darkest);
		}

		&::-webkit-scrollbar-thumb {
			background: var(--v-color-background-dark);
			border-top: 2px solid var(--v-color-background-darkest);
			border-bottom: 2px solid var(--v-color-background-darkest);
			border-radius: 3px;

			&:hover {
				background: var(--v-color-background-light);
			}
		}
	}

	.table-container table {
		margin: auto;
		border-collapse: separate;
		border-spacing: 0;
	}

	// Cell Outer
	.table-container th,
	.table-container td {
		padding: 0.5rem;
		border: 1px solid var(--v-color-border);
		background: var(--v-color-background-darker);
		vertical-align: middle;
		width: 3rem;
		height: 3rem;
	}

	// Cell Inner
	.table-container th img,
	.table-container td div {
		width: 2rem;
		height: 2rem;
		text-align: center;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.table-container thead th {
		background: var(--v-color-background-dark);
		color: var(--v-color-text-primary);
		position: -webkit-sticky;
		position: sticky;
		top: 0;
	}

	th:first-child {
		position: -webkit-sticky;
		position: sticky;
		vertical-align: middle;
		left: 0;
		z-index: 2;
		background: var(--v-color-background-dark);
		text-align: start;
	}

	thead th:first-child {
		z-index: 5;
	}

	tr {
		&.major {
			color: var(--v-color-text-major);
		}
		&.minor {
			color: var(--v-color-text-secondary);
		}
		&.superceded {
			color: var(--v-color-text-disabled);
		}

		.compatibility-indicator {
			&.supported {
				color: var(--v-color-text-positive);
			}
			&.unsupported {
				color: var(--v-color-text-negative);
				opacity: 0.9;
			}
		}
	}

	// Tooltip Stuff
	.mod-header {
		z-index: 0;
		.tooltip-container {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.tooltip {
			position: fixed;
			top: 1rem;
			left: 1rem;
			background: var(--v-color-background-darkest);
			padding: 0.5rem 1rem;
			border-radius: 8px;
			white-space: nowrap;
			pointer-events: none;
			opacity: 0;
			transition: opacity 0.2s;
			z-index: 1000;
		}

		&:hover .tooltip {
			opacity: 1;
		}
	}

	// Mobile
	@media (max-width: 530px) {
		.table-wrapper {
			margin-top: 1rem;
			padding-top: 5.5rem;
		}
		.table-container {
			margin-top: 0rem;
		}
		.table-container .table-controls {
			gap: 0.5rem;
			height: auto;
			span {
				flex-direction: column;
			}
			> a {
				position: fixed;
				bottom: 0.5rem;
				left: 50%;
				transform: translateX(-50%);
				width: 4rem;
				height: 4rem;
				padding: 0.75rem;
				z-index: 1000;
			}
		}
	}

	.help-btn {
		margin-right: auto;
	}

	@media (max-width: 530px) {
		.table-container .table-controls {
			> .help-btn {
				position: fixed;
				bottom: 0.5rem;
				left: calc(50% - 5rem);
				transform: translateX(-50%);
				width: 4rem;
				height: 4rem;
				padding: 0.75rem;
				z-index: 1000;
			}
		}
	}

	.definition-list {
		ul li {
			margin-bottom: 0.5rem;
		}
		.major-text {
			color: var(--v-color-text-major);
		}
		.minor-text {
			color: var(--v-color-text-secondary);
		}
		.superceded-text {
			color: var(--v-color-text-disabled);
		}
	}
</style>

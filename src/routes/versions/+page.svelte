<script lang="ts">
	import type { MinecraftVersion, SortOrder } from "./types";
	import { minecraftVersions, mods } from "./data";
	import { page } from "$app/stores";

	import IconoirSortDown from "virtual:icons/iconoir/sort-down";
	import IconoirSortUp from "virtual:icons/iconoir/sort-up";
	import IconoirSquare from "virtual:icons/iconoir/square";
	import IconoirCheckSquare from "virtual:icons/iconoir/check-square";
	import IconoirInfoCircle from "virtual:icons/iconoir/info-circle";
	import CenterModal from "../../components/CenterModal.svelte";
	import HomeButton from "../../components/HomeButton.svelte";
	import GenericJSButton from "src/components/GenericJSButton.svelte";

	var showSupercededVersions = false;
	var sortOrder: SortOrder = "major";
	var displayedVersions: MinecraftVersion[] = [];
	var showModal: boolean[] = Array(1).fill(false);

	// Filtering & Sorting
	$: {
		displayedVersions = minecraftVersions
			.filter(v => showSupercededVersions || v.type !== "superceded")
			.sort((a, b) => {
				if (sortOrder === "major") {
					// First sort by type (major > minor > superceded)
					const typeOrder = { major: 0, minor: 1, superceded: 2 };
					const typeDiff = typeOrder[a.type] - typeOrder[b.type];
					if (typeDiff !== 0) return typeDiff;

					// Then sort by date (newest first within each type)
					return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
				} else {
					const dateA = new Date(a.releaseDate);
					const dateB = new Date(b.releaseDate);
					return sortOrder === "oldest" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
				}
			});
	}

	function toggleSupercededVersions() {
		showSupercededVersions = !showSupercededVersions;
	}

	function toggleSortOrder() {
		if (sortOrder === "newest") sortOrder = "oldest";
		else if (sortOrder === "oldest") sortOrder = "major";
		else sortOrder = "newest";
	}

	function openModal() {
		showModal[0] = true;
	}
</script>

<div class="table-container">
	<div class="table-controls">
		<span style="margin-right:auto">
			<HomeButton />
			<GenericJSButton on:click={openModal} colour="rgba(100,25,0,0.9)">
				<IconoirInfoCircle slot="icon" width="100%" height="100%" />
			</GenericJSButton>
		</span>
		<span>
			<button
				type="button"
				class="control-btn"
				on:click={toggleSortOrder}
				title={sortOrder === "newest"
					? "Sort oldest first"
					: sortOrder === "oldest"
						? "Sort major versions first"
						: "Sort newest first"}>
				{#if sortOrder === "newest"}
					<IconoirSortDown />
				{:else if sortOrder === "oldest"}
					<IconoirSortUp />
				{:else}
					<IconoirSortDown />
				{/if}
				{sortOrder === "newest" ? "Newest First" : sortOrder === "oldest" ? "Oldest First" : "Major Versions First"}
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
						data-new-group={i > 0 && version.versionGroup !== displayedVersions[i - 1].versionGroup}>
						<th>
							<span class={version.type !== "major" ? "non-major-version-text" : ""}>
								{version.version}
							</span>
						</th>
						{#each mods as mod}
							<td>
								<div
									class={`compatibility-indicator ${
										mod.supportedVersions.includes(version.version) ? "supported" : "unsupported"
									}`}>
									{mod.supportedVersions.includes(version.version) ? "✓" : "✗"}
								</div>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<CenterModal bind:showModal modalID={0} returnToURL={$page.url.origin + "/versions"}>
	<div slot="description" class="definition-list">
		<h2>Version Types</h2>
		<ul>
			<li>
				<span class="major-text">Major Versions</span> - Minecraft versions that modpacks target for a long time as a stable
				version.
			</li>
			<li>
				<span class="minor-text">Minor Versions</span> - Versions that aren't targeted by large modpacks and which mod developers
				sometimes choose to skip when updating.
			</li>
			<li>
				<span class="superceded-text">Superceded Versions</span> - These versions are usually replaced by a hotfix put out
				by Mojang. (hidden by default)
			</li>
		</ul>
		<h2>Version Support Policy</h2>
		<p>
			I prioritize supporting the latest major Minecraft versions. Going forward this is likely to be the major version
			number or first subsequent patch e.g. 1.20.1, 1.21.1
			<br />
			<br />
			If I have the time and capacity I'll also maintain compatibility with select minor versions where possible.
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
		z-index: 1;
		position: relative;
		max-width: fit-content;
		margin: 2rem auto;
		padding: 1rem;
		border-radius: 0.5rem;
		background: var(--v-color-background-darkest);
		color: var(--v-color-text-primary);

		// Version Group Styling Logic
		tbody {
			tr {
				td,
				th {
					border-top: 1px solid var(--v-color-border);
				}

				// add a gap when version group changes
				&[data-new-group="true"] {
					td,
					th {
						border-top: 0.5rem solid var(--v-color-background-darkest);
					}
				}
			}
		}
	}

	.table-container .table-controls {
		display: inline-flex;
		position: absolute;
		top: 0;
		right: 0;
		justify-content: flex-end;
		width: 100%;
		height: 4rem;
		padding: 1rem 1rem 0 1rem;
		gap: 0.5rem;
		background: var(--v-color-background);

		span {
			display: flex;
			gap: 0.5rem;
		}
		button,
		a {
			display: flex;
			align-items: center;
			padding: 0.5rem 1rem;
			gap: 0.5rem;
			border: 1px solid var(--v-color-border);
			border-radius: 4px;
			color: var(--v-color-text-primary);

			&:hover {
				cursor: pointer;
			}
		}
		a,
		.help-btn {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 2.5rem;
			height: 2.5rem;
			padding: 0.5rem;
		}

		.help-btn {
			background: #bb4500;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
			&:hover {
				background: #df651e;
				box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
			}
		}
	}

	.table-wrapper {
		padding-top: 4rem;
		overflow: auto;

		// Add custom scrollbar styling
		&::-webkit-scrollbar {
			width: 12px;
			height: 24px;
		}

		&::-webkit-scrollbar-track {
			background: var(--v-color-background-darkest);
		}

		&::-webkit-scrollbar-thumb {
			border-top: 2px solid var(--v-color-background-darkest);
			border-bottom: 2px solid var(--v-color-background-darkest);
			border-radius: 3px;
			background: var(--v-color-background-dark);

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
		width: 3rem;
		height: 3rem;
		padding: 0.5rem;
		border: 1px solid var(--v-color-border);
		background: var(--v-color-background-darker);
		vertical-align: middle;
	}

	// Cell Inner
	.table-container th img,
	.table-container td div {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		text-align: center;
	}

	.table-container thead th {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		background: var(--v-color-background-dark);
		color: var(--v-color-text-primary);
	}

	th:first-child {
		z-index: 2;
		position: -webkit-sticky;
		position: sticky;
		left: 0;
		background: var(--v-color-background-dark);
		text-align: start;
		vertical-align: middle;
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
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			img {
				border-radius: 4px;
			}
		}

		.tooltip {
			z-index: 1000;
			position: fixed;
			top: 1rem;
			left: 1rem;
			padding: 0.5rem 1rem;
			border-radius: 8px;
			background: var(--v-color-background-darkest);
			white-space: nowrap;
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.2s;
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
			height: auto;
			gap: 0.5rem;
			span {
				flex-direction: column;
			}
			> a {
				z-index: 1000;
				position: fixed;
				bottom: 0.5rem;
				left: 50%;
				width: 4rem;
				height: 4rem;
				padding: 0.75rem;
				transform: translateX(-50%);
			}
		}
	}

	.help-btn {
		margin-right: auto;
	}

	@media (max-width: 530px) {
		.table-container .table-controls {
			> .help-btn {
				z-index: 1000;
				position: fixed;
				bottom: 0.5rem;
				left: calc(50% - 5rem);
				width: 4rem;
				height: 4rem;
				padding: 0.75rem;
				transform: translateX(-50%);
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

	@media (max-width: 530px) {
		.table-container th,
		.table-container td {
			width: 2.5rem;
			height: 2.5rem;
			padding: 0.35rem;
		}

		.table-container th img,
		.table-container td div {
			width: 1.75rem;
			height: 1.75rem;
		}
	}

	.table-container .table-controls {
		@media (max-width: 530px) {
			display: flex;
			z-index: 1000;
			position: fixed;
			top: auto;
			right: 0;
			bottom: 0;
			left: 0;
			align-items: center;
			justify-content: center;
			height: auto;
			padding: 0.5rem;
			gap: 0.5rem;
			border-top: 1px solid var(--v-color-border);
			background: var(--v-color-background-darkest);
			@media (max-width: 450px) {
				flex-direction: column;
				align-items: flex-start;
			}
			span {
				display: flex;
				flex-direction: row;
				justify-content: center;
				height: 3.25rem;
				gap: 0.5rem;
			}

			button,
			a {
				height: 3.25rem;
				min-height: 2.25rem;
				padding: 0.35rem 0.7rem;
				border: 1px solid var(--v-color-border);
				background: var(--v-color-background-darker);
				font-size: 0.85rem;
				white-space: nowrap;
			}

			.home-btn,
			.help-btn {
				display: flex;
				position: fixed;
				top: 0.5rem;
				align-items: center;
				justify-content: center;
				width: 2.25rem;
				height: 2.25rem;
				padding: 0.4rem;
				background: var(--v-color-background-dark);
			}

			.home-btn {
				left: 2rem;
			}

			.help-btn {
				left: 5rem;
			}

			// Make the control buttons more compact
			.control-btn {
				display: inline-flex;
				align-items: center;
				gap: 0.25rem;

				:global(svg) {
					width: 1.2rem;
					height: 1.2rem;
				}
			}
		}
	}
	@media (max-width: 530px) {
		.table-container {
			margin: 0.5rem auto;
			margin-top: 0;
			padding: 0.5rem 0.5rem 4rem 0.5rem;
		}
		.table-wrapper {
			margin: 0;
			padding-top: 0rem;
			padding-bottom: 0.5rem;
		}
	}
</style>

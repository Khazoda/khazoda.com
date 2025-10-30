<script lang="ts">
	import type { MaterialPack } from "$lib/materialpack/types/materialpackTypes";
	import { MaterialPackBuilder } from "$lib/materialpack/builder/MaterialPackBuilder";
	import { type VersionRange, getVersionRanges } from "$lib/materialpack/builder/utils/template";
	import materialpack_location_example from "$lib/materialpack/media/materialpack_location_example.png";
	import HugeiconsZip01 from "virtual:icons/hugeicons/zip-01";
	import CenterModal from "src/components/CenterModal.svelte";
	import { closeDialog } from "src/components/CenterModal.svelte";

	export let materialPack: MaterialPack;

	let selectedVersion: VersionRange = "1.21 - 1.21.1";
	let showModal = [false];
	let showPackwizInstructions = false;

	async function downloadMaterialPack() {
		const builder = new MaterialPackBuilder(materialPack, selectedVersion);
		const blob = await builder.build();

		const packName = materialPack.pack_name.toLowerCase().replace(/\s+/g, "_");
		const modName = materialPack.mod_dependency_name
			? materialPack.mod_dependency_name.toLowerCase().replace(/\s+/g, "-")
			: "minecraft";
		// Add version suffix; for ranges like "1.21 - 1.21.1" use the upper bound
		const versionSuffix = selectedVersion.includes("-")
			? selectedVersion.split("-")[1].trim()
			: selectedVersion;
		const zipFileName = `bwmp_${packName}_${modName}_${versionSuffix}.zip`;

		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = zipFileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		closeDialog();
	}

	function handleVersionChange(event: Event) {
		const target = event.target as HTMLInputElement;
		selectedVersion = target.value as VersionRange;
	}
</script>

<button class="export-pack-btn" on:click={() => (showModal[0] = true)} title="Download as ZIP">
	<HugeiconsZip01 width="32" height="32" />
</button>

<CenterModal bind:showModal modalID={0}>
	<div slot="description" class="modal-content">
		{#if showPackwizInstructions}
			<h2>Install Material Pack with Packwiz</h2>
			<p>
				1. Set the datapack-folder value in your pack.toml under the [options] heading as "basicweapons_materialpacks/"
			</p>
			<p>2. Run <code>packwiz refresh</code> in your terminal</p>
			<p>3. Run the following command, replacing materialpack_url with the pack's modrinth URL:</p>
			<code>packwiz mr add [materialpack_url]</code>
			<br />
			<p class="faded-text">
				Following those steps should make your modpack auto download materialpacks. If you don't want to set the
				datapack-folder to "basicweapons_materialpacks", you can always move the materialpacks's .pw.toml file to it and
				run <code>packwiz refresh</code>.
			</p>
			<p>
				If you need more help, check out the <a
					href="https://packwiz.infra.link/reference/additional-options/"
					target="_blank">Packwiz docs</a
				>.
			</p>
			<button on:click={() => (showPackwizInstructions = !showPackwizInstructions)} class="packwiz-instructions-btn">
				{showPackwizInstructions ? "Not using Packwiz?" : "Using Packwiz?"}
			</button>
		{:else}
			<h2>Download Material Pack</h2>
			<p>Place the downloaded zip file in the <b>basicweapons_materialpacks</b> folder:</p>
			<img src={materialpack_location_example} alt="Download Pack Example" />
			<div class="version-select">
				<button on:click={() => (showPackwizInstructions = !showPackwizInstructions)} class="packwiz-instructions-btn">
					{showPackwizInstructions ? "Not using Packwiz?" : "Using Packwiz?"}
				</button>
				<span>Choose a Minecraft Version</span>
				<select value={selectedVersion} on:change={handleVersionChange} class="version-dropdown">
					{#each getVersionRanges() as version}
						<option value={version}>{version}</option>
					{/each}
				</select>
			</div>
			<div class="modal-actions">
				<button class="ok-btn" on:click={downloadMaterialPack} disabled={!selectedVersion}>
					Download for Minecraft {selectedVersion || "..."}
				</button>
			</div>
		{/if}
	</div>
</CenterModal>

<style lang="scss">
	.faded-text {
		color: #bbb;
	}
	.export-pack-btn {
		align-items: center;
		background: none;
		border: none;
		border-radius: 4px;
		color: whitesmoke;
		display: inline-flex;
		height: 32px;
		justify-content: center;
		padding: 0;
		transition: transform 0.1s 0.05s ease-out;
		width: 32px;

		&:hover {
			color: rgb(65, 245, 125);
		}
	}

	.version-select {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1rem 0;
		position: relative;
		.packwiz-instructions-btn {
			margin-top: 0;
			position: absolute;
			right: 0;
			top: -0.5rem;
		}
	}
	.packwiz-instructions-btn {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 4px;
		color: white;
		cursor: pointer;
		font-size: 0.9rem;
		margin-top: 1rem;
		padding: 0.4rem 0.8rem;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.packwiz-instructions-btn:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.modal-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 1rem;

		.ok-btn {
			background: #4a9eff;
			border: none;
			border-radius: 4px;
			color: white;
			cursor: pointer;
			font-weight: 600;
			padding: 0.5rem 2rem;
			transition: all 0.2s ease;

			&:hover {
				background: #3b8de6;
			}
		}
	}
	h2 {
		margin: 0;
	}

	img {
		border: 2px solid #3a3a3a;
		border-radius: 8px;
		margin-top: 1rem;
	}

	.version-dropdown {
		appearance: none;
		background: #2a2a2a;
		// Fake dropdown arrow
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-position: right 0.75rem center;
		background-repeat: no-repeat;
		background-size: 1em;
		border: 1px solid #3a3a3a;
		border-radius: 8px;
		color: white;
		cursor: pointer;
		font-size: 1rem;
		padding: 0.75rem;
		padding-right: 2.5rem;
		transition: all 0.2s ease;
		width: 100%;

		&:hover {
			background-color: #3a3a3a;
			border-color: #5bd9ff;
		}

		&:focus {
			border-color: #5bd9ff;
			outline: none;
		}

		option {
			background: #2a2a2a;
			color: white;
			padding: 0.5rem;
		}
	}

	.version-select {
		margin: 1.5rem 0;
	}
</style>

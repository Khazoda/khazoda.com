<script lang="ts">
	import type { MaterialPack } from "$lib/materialpack/types/materialpackTypes";
	import { MaterialPackBuilder } from "$lib/materialpack/builder/MaterialPackBuilder";
	import { getVersionMetadata, VERSION_RANGE, type VersionRange } from "src/config/minecraft-versions";
	import HugeiconsZip01 from "virtual:icons/hugeicons/zip-01";
	import CenterModal from "src/components/CenterModal.svelte";
	import { closeDialog } from "src/components/CenterModal.svelte";
	import { getVersionRanges } from "src/lib/materialpack/builder/utils/template";
	import materialpack_location_example from "$lib/materialpack/media/materialpack_location_example.png";

	export let materialPack: MaterialPack;

	let selectedVersion: VersionRange = VERSION_RANGE.V1_21;
	let showModal = [false];
	let showPackwizInstructions = false;

	async function downloadMaterialPack() {
		const builder = new MaterialPackBuilder(materialPack, selectedVersion);
		const blob = await builder.build();

		const packName = materialPack.pack_name.toLowerCase().replace(/\s+/g, "_");
		const modId = materialPack.mod_dependency_modid
			? materialPack.mod_dependency_modid.toLowerCase().replace(/\s+/g, "-")
			: "minecraft";

		const metadata = getVersionMetadata(selectedVersion);
		const versionSuffix = metadata.filenameSuffix;
		const zipFileName = `bwmp_${packName}_${modId}_${versionSuffix}.zip`;

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
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		padding: 0;
		border: none;
		border-radius: 4px;
		background: none;
		color: whitesmoke;
		transition: transform 0.1s 0.05s ease-out;

		&:hover {
			color: rgb(65, 245, 125);
		}
	}

	.version-select {
		display: flex;
		position: relative;
		flex-direction: column;
		margin: 1rem 0;
		gap: 0.5rem;
		.packwiz-instructions-btn {
			position: absolute;
			top: -0.5rem;
			right: 0;
			margin-top: 0;
		}
	}
	.packwiz-instructions-btn {
		margin-top: 1rem;
		padding: 0.4rem 0.8rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		font-size: 0.9rem;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.packwiz-instructions-btn:hover {
		border-color: rgba(255, 255, 255, 0.3);
		background: rgba(255, 255, 255, 0.15);
	}

	.modal-actions {
		display: flex;
		justify-content: center;
		margin-top: 1rem;
		gap: 1rem;

		.ok-btn {
			padding: 0.5rem 2rem;
			border: none;
			border-radius: 4px;
			background: #4a9eff;
			color: white;
			font-weight: 600;
			cursor: pointer;
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
		margin-top: 1rem;
		border: 2px solid #3a3a3a;
		border-radius: 8px;
	}

	.version-dropdown {
		appearance: none;
		width: 100%;
		padding: 0.75rem;
		padding-right: 2.5rem;
		border: 1px solid #3a3a3a;
		border-radius: 8px;
		background: #2a2a2a;
		// Fake dropdown arrow
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-position: right 0.75rem center;
		background-size: 1em;
		background-repeat: no-repeat;
		color: white;
		font-size: 1rem;
		font-family: monospace;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			border-color: #5bd9ff;
			background-color: #3a3a3a;
		}

		&:focus {
			border-color: #5bd9ff;
			outline: none;
		}

		option {
			padding: 0.5rem;
			background: #2a2a2a;
			color: white;
		}
	}

	.version-select {
		margin: 1.5rem 0;
	}
</style>

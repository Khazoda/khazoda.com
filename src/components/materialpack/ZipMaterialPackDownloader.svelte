<script lang="ts">
	import type { MaterialPack } from '$lib/materialpack/types/materialpackTypes';
	import { MaterialPackBuilder } from '$lib/materialpack/builder/MaterialPackBuilder';
	import { PACK_FORMAT_VERSIONS, getVersionRanges } from '$lib/materialpack/builder/utils/template';
	import materialpack_location_example from '$lib/materialpack/media/materialpack_location_example.png';
	import HugeiconsZip01 from 'virtual:icons/hugeicons/zip-01';
	import CenterModal from 'src/components/CenterModal.svelte';
	import { closeDialog } from 'src/components/CenterModal.svelte';

	export let materialPack: MaterialPack;

	let selectedVersion: keyof typeof PACK_FORMAT_VERSIONS.data = '1.21 - 1.21.1';
	let showModal = [false];

	async function downloadMaterialPack() {
		const builder = new MaterialPackBuilder(materialPack, selectedVersion);
		const blob = await builder.build();

		const packName = materialPack.pack_name.toLowerCase().replace(/\s+/g, '_');
		const modName = materialPack.mod_dependency_modid
			? materialPack.mod_dependency_modid.toLowerCase()
			: 'minecraft';
		const zipFileName = `bwmp_${packName}_${modName}.zip`;

		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
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
		selectedVersion = target.value as keyof typeof PACK_FORMAT_VERSIONS.data;
	}
</script>

<button class="export-pack-btn" on:click={() => (showModal[0] = true)} title="Download as ZIP">
	<HugeiconsZip01 width="32" height="32" />
</button>

<CenterModal bind:showModal modalID={0}>
	<div slot="description" class="modal-content">
		<h2>Download Material Pack</h2>
		<p>Place the downloaded zip file in the <b>basicweapons_materialpacks</b> folder:</p>
		<img src={materialpack_location_example} alt="Download Pack Example" />
		<div class="version-select">
			<select value={selectedVersion} on:change={handleVersionChange} class="version-dropdown">
				<option value="" disabled selected>Choose a Minecraft Version</option>
				{#each getVersionRanges() as version}
					<option value={version}>{version}</option>
				{/each}
			</select>
		</div>
		<div class="modal-actions">
			<button class="ok-btn" on:click={downloadMaterialPack} disabled={!selectedVersion}>
				Download for Minecraft {selectedVersion || '...'}
			</button>
		</div>
	</div>
</CenterModal>

<style lang="scss">
	.export-pack-btn {
		padding: 0;
		width: 32px;
		height: 32px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: whitesmoke;
		background: none;
		border: none;
		border-radius: 4px;
		transition: transform 0.1s 0.05s ease-out;

		&:hover {
			color: rgb(65, 245, 125);
		}
	}

	.version-select {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1rem 0;
	}

	.modal-actions {
		display: flex;
		justify-content: center;
		margin-top: 1rem;
		gap: 1rem;

		.ok-btn {
			background: #4a9eff;
			color: white;
			padding: 0.5rem 2rem;
			border-radius: 4px;
			font-weight: 600;
			border: none;
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
		border-radius: 8px;
		margin-top: 1rem;
		border: 2px solid #3a3a3a;
	}

	.version-dropdown {
		width: 100%;
		padding: 0.75rem;
		background: #2a2a2a;
		border: 1px solid #3a3a3a;
		border-radius: 8px;
		color: white;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			background: #3a3a3a;
			border-color: #5bd9ff;
		}

		&:focus {
			outline: none;
			border-color: #5bd9ff;
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

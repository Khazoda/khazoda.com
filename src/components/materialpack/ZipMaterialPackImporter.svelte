<script lang="ts">
	import JSZip from "jszip";
	import type { MaterialPack } from "$lib/materialpack/types/materialpackTypes";
	import { MaterialPackImporter } from "$lib/materialpack/importer/MaterialPackImporter";
	import { materialPackNameSchema, modDependencySchema } from "$lib/materialpack/validation/materialPackValidation";
	import { z } from "zod";
	import CenterModal from "src/components/CenterModal.svelte";
	import { closeDialog } from "src/components/CenterModal.svelte";
	import { createNewPack } from "$lib/materialpack/stores/materialPackStore";
	import HugeiconsComputerArrowUp from "~icons/hugeicons/computer-arrow-up";

	export let onImportComplete: (pack: MaterialPack, detectedVersion?: string) => void;
	export let showButton: boolean = true;

	let fileInput: HTMLInputElement;
	let showModal = [false];
	let isImporting = false;
	let importError: string | null = null;

	let importedPack: Partial<MaterialPack> | null = null;
	let detectedVersion: string | undefined = undefined;
	let packName = "";
	let packNameError = "";
	let isDragging = false;

	export function triggerFileInput() {
		showModal[0] = true;
	}

	async function processFile(file: File) {
		if (!file.name.toLowerCase().endsWith(".zip")) {
			importError = "Please select a .zip file";
			return;
		}

		isImporting = true;
		importError = null;

		try {
			const importer = new MaterialPackImporter(new JSZip());
			const result = await importer.import(file);

			importedPack = result.pack;
			detectedVersion = result.detectedVersion;
			packName = result.pack.pack_name || "";

			showModal[0] = true;
		} catch (error: any) {
			importError = error.message || "Failed to import materialpack";
			console.error("Import error:", error);
		} finally {
			isImporting = false;
		}
	}

	async function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		await processFile(file);
		input.value = "";
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragging = false;
	}

	async function handleDrop(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragging = false;

		const file = event.dataTransfer?.files[0];
		if (!file) return;

		await processFile(file);
		if (fileInput) {
			fileInput.value = "";
		}
	}

	function validatePackName(value: string) {
		try {
			materialPackNameSchema.parse(value);
			packNameError = "";
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				packNameError = error.errors[0].message;
			}
			return false;
		}
	}

	function handleImport() {
		if (!importedPack) return;

		if (!validatePackName(packName)) return;

		const completePack: MaterialPack = {
			localstorage_id: importedPack.localstorage_id || `pack_${Date.now()}`,
			pack_name: packName,
			mod_dependency_modid: importedPack.mod_dependency_modid || "",
			pack_icon: importedPack.pack_icon || null,
			materials: importedPack.materials || []
		};

		onImportComplete(completePack, detectedVersion);
		closeDialog();
		importedPack = null;
		packName = "";
		importError = null;
	}

	function handleCancel() {
		closeDialog();
		importedPack = null;
		packName = "";
		importError = null;
	}
</script>

{#if showButton}
	<button class="import-btn" on:click={() => (showModal[0] = true)} title="Import Material Pack">
		<HugeiconsComputerArrowUp width="32" height="32" />
	</button>
{/if}

<CenterModal bind:showModal modalID={0}>
	<div slot="description" class="modal-content">
		{#if isImporting}
			<h2>Importing Material Pack...</h2>
			<p>Please wait while we parse the zip file.</p>
		{:else if importError}
			<h2>Import Error</h2>
			<p class="error-text">{importError}</p>
			<div class="modal-actions">
				<button class="cancel-btn" on:click={handleCancel}>Close</button>
			</div>
		{:else if importedPack}
			<h2>Review Imported Pack</h2>
			<p>Please review and edit the pack information below:</p>

			<div class="import-form">
				<div class="form-element">
					<label for="import-pack-name">Pack Name *</label>
					<input
						type="text"
						id="import-pack-name"
						bind:value={packName}
						on:input={() => validatePackName(packName)}
						class:error={packNameError}
						placeholder="Enter pack name" />
					{#if packNameError}
						<small class="error-text">{packNameError}</small>
					{/if}
				</div>

				<div class="form-element">
					<label for="mod-dependency-modid">Mod Dependency ID</label>
					<input type="text" id="mod-dependency-modid" value={importedPack.mod_dependency_modid || "None"} disabled />
				</div>

				{#if detectedVersion}
					<div class="form-element">
						<label for="detected-minecraft-version">Detected Minecraft Version</label>
						<input type="text" id="detected-minecraft-version" value={detectedVersion} disabled />
					</div>
				{/if}

				<div class="form-element">
					<label for="materials-found">Materials Found</label>
					<input type="text" id="materials-found" value={`${importedPack.materials?.length || 0} materials`} disabled />
				</div>
			</div>

			<div class="modal-actions">
				<button class="cancel-btn" on:click={handleCancel}>Cancel</button>
				<button class="import-btn-action" on:click={handleImport} disabled={!!packNameError}> Import Pack </button>
			</div>
		{:else}
			<h2>Import Material Pack</h2>
			<p>Select a materialpack zip file to import or drag and drop it here:</p>
			<div
				class="file-input-wrapper"
				class:dragging={isDragging}
				role="button"
				tabindex="0"
				on:dragover={handleDragOver}
				on:dragleave={handleDragLeave}
				on:drop={handleDrop}>
				<input
					type="file"
					bind:this={fileInput}
					id="zip-file-input"
					accept=".zip"
					on:change={handleFileSelect}
					class="file-input" />
				<label for="zip-file-input" class="file-input-label">
					<span class="zip-file-input-cta-text">
						<span class="zip-file-input-icon"><HugeiconsComputerArrowUp width="36" height="36" /></span>
						<span>Drag & Drop ZIP File</span>
						<span style="font-size: 0.8rem; text-decoration: underline;">or click to choose a file</span>
					</span>
				</label>
			</div>
			<div class="modal-actions">
				<button class="cancel-btn" on:click={handleCancel}>Cancel</button>
			</div>
		{/if}
	</div>
</CenterModal>

<style lang="scss">
	.import-btn {
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
		cursor: pointer;
		transition: transform 0.1s 0.05s ease-out;

		&:hover {
			color: rgb(65, 245, 125);
		}
	}

	.modal-content {
		color: white;
		h2 {
			margin-top: 0;
		}
	}

	.error-text {
		color: #ff4444;
	}

	.import-form {
		display: flex;
		flex-direction: column;
		margin: 1.5rem 0;
		gap: 1rem;
	}



	.zip-file-input-cta-text {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		.zip-file-input-icon {
		position: absolute;
		left: -3rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	}

	.form-element {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		label {
			color: #ffffff;
			font-weight: 500;
			font-size: 0.9rem;
		}

		input {
			width: 100%;
			padding: 0.5rem 1rem;
			border: 1px solid #3c3c3c;
			border-radius: 4px;
			background: #1c1c1c;
			color: #ffffff;

			&:focus {
				border-color: #4c4c4c;
				outline: none;
			}

			&:disabled {
				background: #2c2c2c;
				color: #888;
				cursor: not-allowed;
			}

			&.error {
				border-color: #ff4444;
			}
		}

		small {
			color: #ff4444;
			font-size: 0.8rem;
		}
	}

	.file-input-wrapper {
		margin: 1rem 0;

		&.dragging {
			.file-input-label {
				border-style: solid;
				border-color: #5bd9ff;
				background: #4c4c4c;
			}
		}
	}

	.file-input {
		display: none;
	}

	.file-input-label {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		gap: 0.5rem;
		border: 2px dashed #666;
		border-radius: 4px;
		background: #3c3c3c;
		color: white;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			border-color: #888;
			background: #4c4c4c;
		}
	}

	.modal-actions {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
		gap: 1rem;

		button {
			padding: 0.5rem 1.5rem;
			border: none;
			border-radius: 4px;
			font-weight: 600;
			cursor: pointer;
			transition: all 0.2s ease;

			&.cancel-btn {
				border: 1px solid #ccc;
				background: transparent;
				color: var(--color-text-secondary);

				&:hover {
					background: #2c2c2c;
				}
			}

			&.import-btn-action {
				background: #4caf50;
				color: white;

				&:hover:not(:disabled) {
					background: #45a049;
				}

				&:disabled {
					background: #666;
					cursor: not-allowed;
					opacity: 0.6;
				}
			}
		}
	}
</style>

<script lang="ts">
	import {
		addMaterial,
		materialPacks,
		materialPack,
		createNewPack,
		selectPack,
		deletePack
	} from 'src/lib/materialpack/stores/materialPackStore';
	import HugeiconsPlusSignSquare from 'virtual:icons/hugeicons/plus-sign-square';
	import HugeiconsArrowLeft02 from 'virtual:icons/hugeicons/arrow-left-02';

	import HugeiconsZip01 from 'virtual:icons/hugeicons/zip-01';
	import HugeiconsEdit02 from 'virtual:icons/hugeicons/edit-02';
	import HugeiconsDelete02 from 'virtual:icons/hugeicons/delete-02';
	import HugeiconsInformationSquare from 'virtual:icons/hugeicons/information-square';
	import HugeiconsAdd02 from 'virtual:icons/hugeicons/add-02';
	import HugeiconsFolder01 from 'virtual:icons/hugeicons/folder-01';

	import HomeButton from 'src/components/HomeButton.svelte';
	import ImportantButton from 'src/components/materialpack/ImportantButton.svelte';
	import ImagePicker from 'src/components/materialpack/ImagePicker.svelte';
	import CenterModal from 'src/components/CenterModal.svelte';
	import { closeDialog } from 'src/components/CenterModal.svelte';
	import VersionPicker from 'src/components/materialpack/VersionPicker.svelte';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { blur, crossfade, draw, fade, fly, scale, slide } from 'svelte/transition';

	import {
		materialPackNameSchema,
		modDependencySchema,
		minecraftVersionSchema
	} from '$lib/materialpack/validation/materialPackValidation';

	import { z } from 'zod';
	import { getVersionRanges } from './data';

	// Basic pack information
	let pack_name = '';
	let mod_dependency_name = '';
	let mod_dependency_id = '';
	let minecraft_version = '';

	let materials: Material[] = [];
	let pack_icon: string | null = null; // For pack.png

	let showModal: boolean[] = Array(2).fill(false);
	let packToDelete: string | null = null;

	let show_pack_creator = true;
	let isLoaded = false;
	let isTransitioning = false;

	const versionRanges = getVersionRanges();

	onMount(() => {
		const unsubscribe = materialPacks.subscribe((state) => {
			if (state && state.packs) {
				isLoaded = true;
			}
		});
		return unsubscribe;
	});

	function handlePackSelect(packId: string) {
		selectPack(packId);
		show_pack_creator = true;
	}

	function handleCreateNew() {
		try {
			createNewPack();
			show_pack_creator = true;
		} catch (error: any) {
			alert(error?.message || 'Failed to create new pack');
		}
	}

	async function handleBackTransition() {
		isTransitioning = true;
		isLoaded = false;
		// Wait for the transition to complete before navigating
		await new Promise((resolve) => setTimeout(resolve, 300)); // Match transition duration
		goto('/basicweapons/materialpacks');
	}

	async function handleIconUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file) {
			if (file.size > 1024 * 1024) {
				// 1MB limit
				alert('Image size must be less than 1MB');
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				const base64String = e.target?.result as string;
				materialPack.update((pack) => ({
					...pack,
					pack_icon: base64String
				}));

				// Update in packs store
				materialPacks.update((state) => ({
					...state,
					packs: {
						...state.packs,
						[state.currentPack!]: {
							...state.packs[state.currentPack!],
							pack_icon: base64String
						}
					}
				}));
			};
			reader.readAsDataURL(file);
		}
	}

	function handleDeleteClick(packId: string) {
		packToDelete = packId;
		showModal[0] = true;
	}

	function confirmDelete() {
		if (packToDelete) {
			deletePack(packToDelete);
			closeDialog();
			packToDelete = null;
		}
	}

	function showInfoModal() {
		showModal[1] = true;
	}

	function validateAndUpdateStore(event: Event, schema: z.ZodSchema, field: keyof MaterialPack) {
		const input = event.target as HTMLInputElement;
		try {
			const validatedValue = schema.parse(input.value);
			materialPack.update((pack) => ({
				...pack,
				[field]: validatedValue
			}));

			materialPacks.update((state) => ({
				...state,
				packs: {
					...state.packs,
					[$materialPack.localstorage_id]: {
						...state.packs[$materialPack.localstorage_id],
						[field]: validatedValue
					}
				}
			}));
			input.setCustomValidity('');
		} catch (error) {
			if (error instanceof z.ZodError) {
				input.setCustomValidity(error.errors[0].message);
			}
		}
		input.reportValidity();
	}
</script>

<!-- #region HTML -->
<div class="page-container flex-col">
	<span class="absolute-top-left"><HomeButton /></span>
	{#if isLoaded}
		<div transition:fly={{ x: isTransitioning ? -50 : 50, duration: 300 }}>
			<!-- Select Materialpack to work on -->
			{#if !show_pack_creator}
				<div class="flex-row justify-between">
					<span>
						<ImportantButton
							icon={HugeiconsArrowLeft02}
							label="Back"
							onClick={handleBackTransition}
							color="grey"
						/>
					</span>
					<button class="icon-btn" on:click={showInfoModal}>
						<HugeiconsInformationSquare width="42" height="42" />
					</button>
				</div>
				<div class="pack-list">
					{#each Object.entries($materialPacks.packs) as [packId, pack]}
						<div class="pack-item">
							<div class="pack-inner">
								<div class="actions-container">
									<button
										class="export-pack-btn"
										on:click={() => alert('exporting')}
										title="Download as ZIP"
									>
										<HugeiconsZip01 width="32" height="32" />
									</button>
									<button
										class="edit-pack-btn"
										title="Edit Material Pack"
										on:click={() => handlePackSelect(packId)}
									>
										<HugeiconsEdit02 width="32" height="32" />
									</button>
									<button
										class="delete-pack-btn"
										on:click={() => handleDeleteClick(packId)}
										title="Delete Material Pack"
									>
										<HugeiconsDelete02 width="32" height="32" />
									</button>
								</div>
								<img src={pack.pack_icon || ''} alt="material pack icon" class="no-resample" />
								<span class="pack-label">{pack.pack_name}</span>
							</div>
						</div>
					{/each}
				</div>
				{#if Object.keys($materialPacks.packs).length < 10}
					<span class="create-pack-btn-container">
						<ImportantButton
							icon={HugeiconsPlusSignSquare}
							label="Create New Pack"
							onClick={handleCreateNew}
							color="green"
						/>
						<h1>
							{Object.keys($materialPacks.packs).length} / 10 Material Packs Created
						</h1>
					</span>
				{/if}

				<!-- Materialpack Creator -->
			{:else}
				<span class="back-btn-container">
					<ImportantButton
						icon={HugeiconsArrowLeft02}
						label="Back to Packs"
						onClick={() => (show_pack_creator = false)}
						color="grey"
					/>
				</span>
				<!-- #region Material Tabs -->
				<div class="tabs-container flex-col">
					<button class="pack-settings-tab">Pack Settings</button>
					<div class="material-tabs flex-row">
						<div class="material-tab flex-col">
							<button>Material 1</button>
							<div class="flex-row">
								<button class="stats-tab">Stats</button>
								<button class="assets-tab">Assets</button>
							</div>
						</div>
						<!--  -->
						<div class="material-tab flex-col">
							<button>Material 2</button>
							<div class="flex-row">
								<button class="stats-tab">Stats</button>
								<button class="assets-tab">Assets</button>
							</div>
						</div>
						<!--  -->
						<div class="add-material-tab">
							<button on:click={addMaterial}>
								<HugeiconsAdd02 width="48" height="48" />
							</button>
						</div>
					</div>
				</div>
				<!-- #endregion Material Tabs -->
				<!-- #region Material Pack Settings -->
				<form class="pack-settings-form">
					<h3>
						<span> <HugeiconsFolder01 width="32" height="32" /></span>
						{'bwmp_' +
							$materialPack.pack_name +
							'_' +
							($materialPack.mod_dependency_name
								? $materialPack.mod_dependency_name
								: 'minecraft') +
							'.zip'}
					</h3>
					<div class="form-element imagepicker">
						<ImagePicker
							currentImage={$materialPack.pack_icon}
							accept="image/png"
							onImageSelect={(base64String) => {
								materialPack.update((pack) => ({
									...pack,
									pack_icon: base64String
								}));
								materialPacks.update((state) => ({
									...state,
									packs: {
										...state.packs,
										[$materialPack.localstorage_id]: {
											...state.packs[$materialPack.localstorage_id],
											pack_icon: base64String
										}
									}
								}));
							}}
						/>
					</div>
					<div class="grid-section-general flex-col">
						<div class="form-element text">
							<input
								type="text"
								id="pack_name"
								placeholder=" "
								bind:value={$materialPack.pack_name}
								on:input={(e) => validateAndUpdateStore(e, materialPackNameSchema, 'pack_name')}
								required
							/>
							<label for="pack_name">Material Pack Name</label>
						</div>
						<div class="grid-section-minecraft-version flex-col">
							<VersionPicker />
						</div>
					</div>

					<div class="grid-section-mod-dependency flex-col">
						<h3>Mod Dependency (Optional)</h3>
						<div class="form-element text" style="margin-bottom:0.75rem;">
							<input
								type="text"
								id="mod_dependency_name"
								placeholder=" "
								bind:value={$materialPack.mod_dependency_name}
								on:input={(e) =>
									validateAndUpdateStore(e, modDependencySchema, 'mod_dependency_name')}
							/>
							<label for="mod_dependency_name">Mod Name</label>
						</div>

						<div class="form-element text">
							<input
								type="text"
								id="mod_dependency_modid"
								placeholder=" "
								bind:value={$materialPack.mod_dependency_modid}
								on:input={(e) =>
									validateAndUpdateStore(e, modDependencySchema, 'mod_dependency_modid')}
							/>
							<label for="mod_dependency_modid">
								Mod ID<span class="info-hover-icon"><HugeiconsInformationSquare /></span>
							</label>
						</div>
					</div>
				</form>
			{/if}
		</div>
	{/if}
</div>

<!-- Material Pack Delete Modal -->
<CenterModal bind:showModal modalID={0}>
	<div slot="description" class="modal-content">
		<h2>Delete Material Pack?</h2>
		<p>Are you sure you want to delete this material pack? This action cannot be undone.</p>
		<div class="modal-actions">
			<button class="cancel-btn" on:click={closeDialog}>Cancel</button>
			<button class="delete-btn" on:click={confirmDelete}>Delete</button>
		</div>
	</div>
</CenterModal>

<!-- Add the new info modal -->
<CenterModal bind:showModal modalID={1}>
	<div slot="description" class="modal-content info-modal">
		<h2>Browser Storage Information</h2>
		<p>Material packs are stored locally in your browser using LocalStorage. This means:</p>
		<ul>
			<li>Your packs are saved even when you close your browser</li>
			<li>Packs are only available on this device and browser</li>
			<li>Clearing browser data will delete your saved packs</li>
			<li>
				If you've hit the limit of 10 material packs, you can delete some to make room for new ones
			</li>
			<br />
			<li style="font-weight: bold">
				Always export your material packs to ZIP to avoid losing them! <i>Always</i> back up your hard
				work!
			</li>
		</ul>
		<div class="modal-actions">
			<button class="ok-btn" on:click={closeDialog}>Understood!</button>
		</div>
	</div>
</CenterModal>

<!-- #region CSS -->
<style lang="scss">
	.back-btn-container {
		display: block;
		margin-bottom: 1rem;
	}
	.icon-btn {
		display: inline-flex;
		align-items: flex-start;
		justify-content: flex-end;
		padding: 0;
		width: fit-content;
		height: fit-content;
		background: none;
		border: none;
		cursor: pointer;
		transform: scale(1);
		transition: transform 0.1s ease-in-out;
		&:hover {
			transform: scale(1.05);
		}
	}
	h1 {
		margin: 0;
		font-size: 1rem;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.page-container {
		font-family: 'Quicksand', 'sans-serif';
		width: calc(100dvw - 16px);
		height: calc(100dvh - 16px);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pack-list {
		width: 100%;
		margin-top: 2rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		max-width: 50dvw;
		gap: 2.5rem;
		justify-items: flex-start;
	}

	.pack-item {
		position: relative;
		display: flex;
		width: 128px;
		height: 128px;
		gap: 1rem;
		align-items: center;
		color: var(--pack-item-color);
		&:hover {
			background: var(--pack-item-bg-hover);
		}

		.pack-inner {
			position: relative;
			padding: 0;
			width: 100%;
			height: 100%;
			background: none;
			border: none;
			.pack-label {
				padding: 0.25rem 0.5rem;
				display: inline;
				position: absolute;
				left: 0;
				bottom: -0.5rem;
				width: 100%;
				background: hsl(0, 0%, 95%);
				color: rgb(49, 49, 49);
				box-shadow: 0px 4px 0px 0 hsl(0, 0%, 55%);
				border-radius: 4px;
				font-weight: 600;
				overflow: hidden;
				text-align: center;
				text-overflow: ellipsis;
				text-wrap: nowrap;
				text-transform: uppercase;
				font-size: 1rem;
				letter-spacing: 0.05em;
				line-height: 1;
			}
			&:hover .pack-label {
				display: none;
			}
			.actions-container {
				position: absolute;
				bottom: -3rem;
				left: 0;
				width: 100%;
				height: 48px;
				display: flex;
				justify-content: space-evenly;
				align-items: flex-start;
				opacity: 0;
				transform: translateY(-2rem);
				transition: all 0.1s ease-in-out;

				button {
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
				}

				.export-pack-btn {
					transition: transform 0.1s 0.05s ease-out;
					&:hover {
						color: rgb(65, 245, 125);
					}
				}

				.edit-pack-btn {
					&:hover {
						color: rgb(91, 217, 255);
					}
				}
				.delete-pack-btn {
					transition: transform 0.1s 0.05s ease-out;
					&:hover {
						color: rgb(255, 78, 116);
					}
				}
			}
			&:hover .actions-container {
				opacity: 1;
				transform: translateY(0.5rem);
				.export-pack-btn {
					transform: translateX(-10px);
				}
				.edit-pack-btn {
					transform: translateX(0px);
				}
				.delete-pack-btn {
					transform: translateX(10px);
				}
			}
		}
	}
	.create-pack-btn-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: fit-content;
		margin-top: 3rem;
	}

	.icon-upload {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		input[type='file'] {
			width: 100%;
			padding: 0.5rem;
			border: 1px solid #ccc;
			border-radius: 4px;
		}

		.icon-preview {
			width: 128px;
			height: 128px;
			object-fit: cover;
			border: 1px solid #ccc;
			border-radius: 4px;
		}
	}
	//#region Material Pack Creator Styles
	.tabs-container {
		gap: 1rem;
		margin-bottom: 0.5rem;
		.pack-settings-tab {
			text-decoration: none;
			width: fit-content;
			padding: 0.75rem 1.5rem;
			background: rgb(235, 235, 235);
			color: rgb(31, 31, 31);
			border-radius: 4px;
			font-weight: 600;
			cursor: pointer;
			transition: all 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			&:hover {
				background: rgb(255, 255, 255);
			}
		}

		.material-tabs {
		}

		.add-material-tab {
			padding-top: 4px;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 64px;
			height: 64px;
			button {
				background: none;
				border: none;
				cursor: pointer;
				&:hover {
					transform: scale(1.05);
				}
			}
		}

		.material-tab {
			width: 128px;
			height: 100px;
			padding: 4px;
		}

		.material-tab > button {
			width: 100%;
			height: 64px;
			background: rgb(235, 235, 235);
			color: black;
			border-radius: 4px;
		}
		.material-tab > div > button {
			width: 100%;
			height: 32px;
			background: rgb(235, 235, 235);
			color: black;
			border-radius: 4px;
		}
	}
	// #region Form Sections
	form {
		padding: 2rem;
		background: #2c2c2c;
		border: 2px solid #1c1c1c;
		border-radius: 8px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-rows: min(fit-content, 1fr) 1fr 1fr;
		gap: 1rem;
	}

	h3 {
		grid-column: 1 / 3;
		grid-row: 1 / 2;
		margin: 0 0 2rem 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-overflow: ellipsis;
		font-size: medium;
		span {
			width: 32px;
			height: 32px;
		}
	}
	.form-element {
		position: relative;
		margin-bottom: 2.5rem;
		width: 100%;

		&.text {
			height: 3rem;
			label {
				width: 100%;
				height: 100%;
				display: inline-flex;
				justify-content: flex-start;
				align-items: center;
				position: absolute;
				left: 0.6rem;
				top: 0;
				padding: 0.5rem;
				transform: translateY(0);
				color: rgb(70, 70, 70);
				font-weight: 500;
				pointer-events: none;
				transition: 0.2s ease;
				border-top-right-radius: 4px;
				border-top-left-radius: 4px;
			}
			input {
				width: 100%;
				height: 100%;
				padding: 0.5rem 1rem;
				border-radius: 4px;
				&::placeholder {
					color: transparent;
				}
			}

			input:focus + label,
			input:not(:placeholder-shown) + label {
				transform: translateY(-2.25rem);
				left: -4px;
				color: white;
				font-size: 14px;
			}
		}
		&.imagepicker {
			width: fit-content;
		}

		.info-hover-icon {
			width: 24px;
			height: 24px;
			margin-left: 0.25rem;
			pointer-events: all;
			cursor: pointer;
			color: black;
			&:hover {
				transform: scale(1.05);
			}
		}
	}
	.grid-section-general {
		max-height: 124px;
		gap: 1rem;
		justify-content: space-between;
		div {
			margin: 0;
		}
	}
	.grid-section-mod-dependency {
		gap: 1rem;
		grid-column: 1/3;
		h3 {
			margin-bottom: 1rem;
		}
	}
	//#region Modal Styles
	.modal-actions {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
		gap: 1rem;

		button {
			padding: 0.5rem 1.5rem;
			border-radius: 4px;
			font-weight: 600;
			cursor: pointer;
			transition: all 0.2s ease;
			border: none;

			&.cancel-btn {
				background: transparent;
				border: 1px solid #ccc;
				color: var(--color-text-secondary);

				&:hover {
					background: #2c2c2c;
				}
			}

			&.delete-btn {
				background: #ff4444;
				color: white;

				&:hover {
					background: #ff2222;
				}
			}

			&.ok-btn {
				background: #4a9eff;
				color: white;
				padding: 0.5rem 2rem;

				&:hover {
					background: #3b8de6;
				}
			}
		}
	}
</style>

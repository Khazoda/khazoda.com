<script lang="ts">
	import {
		addMaterial,
		materialPacks,
		materialPack,
		createNewPack,
		selectPack,
		deletePack
	} from '$lib/stores/materialPackStore';
	import HugeiconsPlusSignSquare from 'virtual:icons/hugeicons/plus-sign-square';
	import HugeiconsArrowLeft02 from 'virtual:icons/hugeicons/arrow-left-02';

	import HugeiconsZip01 from 'virtual:icons/hugeicons/zip-01';
	import HugeiconsEdit02 from 'virtual:icons/hugeicons/edit-02';
	import HugeiconsDelete02 from 'virtual:icons/hugeicons/delete-02';
	import HugeiconsInformationSquare from 'virtual:icons/hugeicons/information-square';

	import HomeButton from 'src/components/HomeButton.svelte';
	import ImportantButton from 'src/components/materialpack/ImportantButton.svelte';

	import { blur, crossfade, draw, fade, fly, scale, slide } from 'svelte/transition';

	import CenterModal from 'src/components/CenterModal.svelte';
	import { closeDialog } from 'src/components/CenterModal.svelte';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Basic pack information
	let pack_name = '';
	let mod_dependency_name = '';
	let mod_dependency_id = '';
	let minecraft_version = '';

	let materials: Material[] = [];
	let pack_icon: string | null = null; // For pack.png

	let showModal: boolean[] = Array(2).fill(false);
	let packToDelete: string | null = null;

	let show_pack_creator = false;
	let isLoaded = false;
	let isTransitioning = false;

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
</script>

<!-- #region HTML -->
<div class="page-container flex-col">
	<span class="absolute-top-left"><HomeButton /></span>

	{#if isLoaded}
		<div transition:fly={{ x: isTransitioning ? -50 : 50, duration: 300 }}>
			<!-- Select Materialpack to work on -->
			{#if !show_pack_creator}
				<span>
					<div class="flex-row justify-between align-center">
						<button class="icon-btn" on:click={handleBackTransition}>
							<HugeiconsArrowLeft02 width="42" height="42" />
						</button>
						<h1>
							<button class="icon-btn" on:click={showInfoModal}
								><HugeiconsInformationSquare /></button
							>
							Your Material Packs
						</h1>
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
									<img src={pack.pack_icon || ''} alt="" />
									<span class="pack-label">{pack.pack_name}</span>
								</div>
							</div>
						{/each}
					</div>
					{#if Object.keys($materialPacks.packs).length < 10}
						<span class="important-btn-container">
							<ImportantButton
								icon={HugeiconsPlusSignSquare}
								label="Create New Pack"
								onClick={handleCreateNew}
								color="green"
							/>
						</span>
					{/if}
				</span>
				<!-- Materialpack Creator -->
			{:else}
				<span>
					<div class="header">
						<button class="back" on:click={() => (show_pack_creator = false)}
							>&larr; Back to Packs</button
						>
						<h1>Create Material Pack</h1>
					</div>
					<form>
						<div class="form-group">
							<label for="pack_name">Pack Name</label>
							<input type="text" id="pack_name" bind:value={$materialPack.pack_name} />
						</div>

						<div class="form-group">
							<label for="mod_dependency_name">Mod Dependency Name</label>
							<input
								type="text"
								id="mod_dependency_name"
								bind:value={$materialPack.mod_dependency_name}
							/>
						</div>

						<div class="form-group">
							<label for="mod_dependency_id">Mod Dependency ID</label>
							<input
								type="text"
								id="mod_dependency_id"
								bind:value={$materialPack.mod_dependency_id}
							/>
						</div>

						<div class="form-group">
							<label for="minecraft_version">Minecraft Version</label>
							<input
								type="text"
								id="minecraft_version"
								bind:value={$materialPack.minecraft_version}
							/>
						</div>

						<div class="form-group">
							<label for="pack_icon">Pack Icon (pack.png)</label>
							<div class="icon-upload">
								<input
									type="file"
									id="pack_icon"
									accept="image/png"
									on:change={(e) => handleIconUpload(e)}
								/>
								{#if $materialPack.pack_icon}
									<img src={$materialPack.pack_icon} alt="Pack icon preview" class="icon-preview" />
								{/if}
							</div>
						</div>

						<button type="button" on:click={addMaterial}>Add Material</button>
					</form>
				</span>
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
			<li style="font-weight: bold">
				Export your material packs to ZIP often to avoid losing them!
			</li>
		</ul>
		<div class="modal-actions">
			<button class="ok-btn" on:click={closeDialog}>Understood!</button>
		</div>
	</div>
</CenterModal>

<!-- #region CSS -->
<style lang="scss">
	.icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 54px;
		height: 54px;
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
		font-size: 1.75rem;
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
				overflow: hidden;
				text-overflow: ellipsis;
				position: absolute;
				left: 0;
				bottom: -0.5rem;
				width: 100%;
				font-size: 1.1rem;
				text-align: center;
				font-weight: 600;
				text-wrap: nowrap;
				background: #e6e6e6;
				border: 2px solid white;
				color: rgb(31, 31, 31);
				border-radius: 2px;
				padding: 0.25rem 0.5rem;
				transition: transform 0.1s ease-in-out;
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
					transition: transform 0.1s 0.05s ease-in-out;
					&:hover {
						color: rgb(65, 245, 125);
					}
				}

				.edit-pack-btn {
					transition: transform 0.1s 0.05s ease-in-out;
					&:hover {
						color: rgb(91, 217, 255);
					}
				}
				.delete-pack-btn {
					transition: transform 0.1s 0.05s ease-in-out;
					&:hover {
						color: rgb(255, 78, 116);
					}
				}
			}
			&:hover .actions-container {
				opacity: 1;
				transform: translateY(0rem);
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

			img {
				position: relative;
			}
		}
	}
	.important-btn-container {
		display: block;
		width: fit-content;
		margin-top: 3rem;
		margin-left: auto;
	}
	.header {
		display: flex;
		align-items: center;
		gap: 2rem;
		margin-bottom: 2rem;

		.back {
			padding: 0.5rem 1rem;
			border: 1px solid #ccc;
			border-radius: 4px;
			background: white;
			cursor: pointer;

			&:hover {
				background: #f5f5f5;
			}
		}
	}

	.form-group {
		margin-bottom: 1rem;

		label {
			display: block;
			margin-bottom: 0.5rem;
		}

		input {
			width: 100%;
			padding: 0.5rem;
			border-radius: 4px;
			border: 1px solid #ccc;
		}
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
	//#region Modal Styles
	.modal-content {
		padding: 1rem;
		&:not(.info-modal) {
			text-align: center;
		}
		h2 {
			margin-bottom: 1rem;
			&.delete-modal {
				color: #ff4444;
			}
			&.info-modal {
				color: #4a9eff;
				margin-bottom: 1.5rem;
			}
		}

		p {
			margin-bottom: 2rem;
			color: var(--color-text-secondary);
			line-height: 1.5;
		}

		ul {
			list-style: disc;
			margin-left: 0;
			padding-left: 1.25rem;
			margin-bottom: 2rem;

			li {
				margin-bottom: 0.5rem;
				line-height: 1.4;
				color: var(--color-text-secondary);
			}
		}
	}

	.modal-actions {
		display: flex;
		justify-content: center;
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

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 1.2rem;
		color: var(--color-text-secondary);
	}
</style>

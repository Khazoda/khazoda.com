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
	import TabBookmarks from 'src/components/materialpack/TabBookmarks.svelte';
	import { closeDialog } from 'src/components/CenterModal.svelte';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { blur, crossfade, draw, fade, fly, scale, slide } from 'svelte/transition';

	import {
		materialPackNameSchema,
		modDependencySchema
	} from '$lib/materialpack/validation/materialPackValidation';

	import { z } from 'zod';

	// Basic pack information
	let pack_name = '';
	let mod_dependency_name = '';
	let mod_dependency_id = '';
	let minecraft_version = '';

	let materials: Material[] = [];
	let pack_icon: string | null = null; // For pack.png

	let showModal: boolean[] = Array(3).fill(false);
	let packToDelete: string | null = null;

	let show_pack_creator = true;
	let isLoaded = false;
	let isTransitioning = false;

	// Track selected tabs
	let selectedMainTab = 'settings';
	let selectedSubTabs: Record<string, string> = {};

	let activeTab = 'settings';
	$: tabs = [
		{ id: 'settings', type: 'settings' as const, label: 'Pack Settings' },
		...$materialPack.materials.map((_, index) => ({
			id: `material-${index}`,
			type: 'material' as const,
			label: `Material ${index + 1}`,
			materialIndex: index
		}))
	];

	function handleTabChange(tabId: string, subType?: string) {
		if (subType) {
			activeTab = `${tabId}-${subType}`;
			const [type, indexStr] = tabId.split('-');
			const materialIndex = parseInt(indexStr);
			selectedMainTab = `material-${materialIndex}`;
			selectedSubTabs[selectedMainTab] = subType;
		} else {
			activeTab = tabId;
			selectedMainTab = 'settings';
		}
	}

	function getContentType(tabId: string) {
		if (tabId === 'settings') return 'settings';
		const [_, __, subtype] = tabId.split('-');
		return subtype;
	}

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
		showModal[3] = true;
	}

	function handleStartFresh() {
		try {
			createNewPack();
			show_pack_creator = true;
			closeDialog();
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

	function showBrowserStorageInfoModal() {
		showModal[1] = true;
	}

	function showMaterialPackSettingsInfoModal() {
		showModal[2] = true;
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
		<div
			class="transition-wrapper"
			transition:fly={{ x: isTransitioning ? -50 : 50, duration: 300 }}
		>
			{#key show_pack_creator}
				<div
					class="view-container"
					transition:fly|local={{ y: show_pack_creator ? 15 : -15, duration: 100 }}
				>
					<!-- Materialpack Selector View -->
					{#if !show_pack_creator}
						<div class="flex-row justify-between">
							<span>
								<ImportantButton
									icon={HugeiconsArrowLeft02}
									label="Back"
									onClick={handleBackTransition}
									color="grey"
									backdropCorner="center"
								/>
							</span>
							<button class="info-btn" on:click={showBrowserStorageInfoModal}>
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
										{#if pack.pack_name}
											<span class="pack-label">{pack.pack_name}</span>
										{/if}
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
									backdropCorner="bottom-left"
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
								onClick={() => {
									show_pack_creator = false;
									activeTab = 'settings';
								}}
								color="grey"
								backdropCorner="center"
							/>
						</span>

						<!-- #region Material Pack Settings -->
						<!-- Add content sections that respond to the selected tabs -->
						<div class="form-wrapper">
							<TabBookmarks
								{tabs}
								{activeTab}
								onTabChange={handleTabChange}
								onAddMaterial={() => addMaterial()}
							/>

							<!-- Content area -->
							{#if activeTab}
								{#if getContentType(activeTab) === 'settings'}
									<button on:click={showMaterialPackSettingsInfoModal} class="tab-info-btn"
										><HugeiconsInformationSquare width="32" height="32" /></button
									>
									<!-- Settings form content -->
									<form class="pack-settings-form">
										<div class="pack-settings-header">
											<span>
												<span class="icon"><HugeiconsFolder01 width="32" height="32" /></span>
												<span
													class="pack-name-container"
													title={'bwmp_' +
														$materialPack.pack_name +
														'_' +
														($materialPack.mod_dependency_name
															? $materialPack.mod_dependency_name
															: 'minecraft') +
														'.zip'}
												>
													{'bwmp_' +
														$materialPack.pack_name +
														'_' +
														($materialPack.mod_dependency_name
															? $materialPack.mod_dependency_name
															: 'minecraft') +
														'.zip'}
												</span>
											</span>
										</div>

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
													on:input={(e) =>
														validateAndUpdateStore(e, materialPackNameSchema, 'pack_name')}
													required
												/>
												<label for="pack_name">Material Pack Name</label>
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
												<label for="mod_dependency_modid"> Mod ID </label>
											</div>
										</div>
									</form>
								{:else}
									<!-- Material content -->
									{#each $materialPack.materials as material, index}
										{#if activeTab.startsWith(`material-${index}`)}
											{#if activeTab.endsWith('-stats')}
												<!-- Stats content for material {index} -->
												<form class="material-stats-form">
													Stats content for Material {index + 1}
												</form>
											{:else if activeTab.endsWith('-assets')}
												<!-- Assets content for material {index} -->
												<form class="material-assets-form">
													Assets content for Material {index + 1}
												</form>
											{/if}
										{/if}
									{/each}
								{/if}
							{/if}
						</div>
					{/if}
				</div>
			{/key}
		</div>
	{/if}
</div>

<!-- LocalStorage Info Modal -->
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

<!-- Material Pack Settings Info Modal -->
<CenterModal bind:showModal modalID={2}>
	<div slot="description" class="info-modal">
		<h2>Material Pack Settings</h2>
		<h4>Change the main settings for your material pack here.</h4>
		<div class="modal-content">
			<h4>Pack Icon</h4>
			<p>Recommended size is 32 x 32 pixels. Maximum size is 256 x 256 pixels.</p>
			<p>
				Feel free to download the template image and edit it to display one of your weapon textures
				in.
			</p>
			<h4>Pack Name</h4>
			<p>
				The material pack name should be either the name of your main material (e.g. 'copper',
				'unobtainium'), or in the case of a materialpack with multiple materials, a name that is
				short and makes sense (e.g. 'gems', 'tech-mats', 'all-mats').
			</p>
			<h4>Mod Dependency</h4>
			<p>
				If your material pack uses materials from another mod rather than vanilla, include that
				mod's name (e.g. 'mekanism', 'mythic-metals', 'applied-energistics-2').
			</p>
			<p>
				The mod dependency ID <b>must</b> be the actual id (namespace) of the mod you're depending on
				(e.g. 'mekanism', 'mythicmetals', 'appeng'). Basic Weapons will only load your pack if it detects
				a mod with that id being loaded.
			</p>
		</div>
		<div class="modal-actions">
			<button class="ok-btn" on:click={closeDialog}>Ok 👍</button>
		</div>
	</div>
</CenterModal>

<!-- Pack Creation Options Modal -->
<CenterModal bind:showModal modalID={3}>
	<div slot="description" class="modal-content">
		<h2>Create New Material Pack</h2>
		<p>Choose how you'd like to start your new material pack:</p>
		<div class="creation-options">
			<button class="option-btn" on:click={handleStartFresh}>
				<span class="option-title">Start Fresh</span>
				<span class="option-desc">Begin with a blank material pack</span>
			</button>
			<button class="option-btn disabled" title="Coming soon!">
				<span class="option-title">From Template</span>
				<span class="option-desc">Start from a pre-made template</span>
			</button>
		</div>
	</div>
</CenterModal>

<!-- #region CSS -->
<style lang="scss">
	.back-btn-container {
		display: block;
		margin-bottom: 1rem;
	}

	.page-container {
		font-family: 'Quicksand', 'sans-serif';
		width: calc(100dvw - 16px);
		height: calc(100dvh - 16px);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.transition-wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		max-width: 600px;
	}

	.view-container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
	}

	.info-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem;
		background: #333333;
		border: 2px solid #1c1c1c;
		border-radius: 16px;
		box-shadow: 2px -2px 0px 0px #222222;
		transition: all 0.2s ease;
		&:hover {
			background: rgb(77, 77, 77);
			color: #71b3ff;
			border: 2px solid #1c1c1c;
			box-shadow: 1px -1px 0px 0px #222222;
		}

		&:active {
			background: #1a1a1a;
			box-shadow: 0px 0px 0px 0px #222222;
		}
	}

	h1 {
		margin: 0;
		font-size: 1rem;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
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
				transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			}
			&:hover .pack-label {
				transform: scale(0.9);
			}
			.actions-container {
				position: absolute;
				top: 0;
				right: -3rem;
				width: 48px;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				align-items: flex-start;
				opacity: 0;
				transform: translateY(-1.5rem);
				transition: all 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);

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
				transform: translateY(0rem);
			}
		}
	}
	.create-pack-btn-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: fit-content;
		margin: 3rem 0 0 auto;
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

	//#region Form Sections
	.form-wrapper {
		position: relative;
		width: 600px;
		height: 600px;
		.tab-info-btn {
			position: absolute;
			right: 1.25rem;
			top: -3rem;
			padding: 0.5rem;
			border: none;
			border-radius: 8px 8px 0 0;
		}
		form {
			width: 100%;
			height: 100%;
			position: relative;
			padding: 2rem;
			background: #2c2c2c;
			border: 2px solid #1c1c1c;
			border-radius: 8px;
			display: grid;
			grid-template-columns: 1fr 2fr;
			gap: 1rem;
		}
		.form-info-btn {
			position: absolute;
			right: -3.5rem;
			top: 20.5rem;
			padding: 0.5rem 0.5rem 0.5rem 1.5rem;
			background: #333333;
			border: 2px solid #1c1c1c;
			border-left: none;
			border-radius: 0 6px 6px 0;

			&:hover {
				transform: translateX(4px);
				background: rgb(77, 77, 77);
				color: #71b3ff;
				border: 2px solid #1c1c1c;
			}

			&:active {
				transform: translateX(2px);
				background: #1a1a1a;
			}
		}

		.pack-settings-header {
			grid-column: 1 / 3;
			grid-row: 1 / 2;
			margin: 0 0 2rem 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			font-size: medium;
			width: 500px;
			max-width: 500px;
		}
		.pack-settings-header > span {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
			.pack-name-container {
				max-width: 475px;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 1.1rem;
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
			padding: 1rem 2rem;
			gap: 1rem;
			grid-column: 1/3;
			box-shadow: inset 0px 0px 10px 0px #1c1c1c;
			background: rgba(0, 0, 0, 0.1);
			border-radius: 4px;
			h3 {
				margin-bottom: 1rem;
			}
		}
	}
	//#region Modal Styles
	.modal-content {
		p {
			opacity: 0.8;
			font-size: 0.9rem;
		}
	}
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

	//#region Pack Creation Modal Creation
	.creation-options {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.option-btn {
		width: 100%;
		padding: 1rem;
		background: #2a2a2a;
		border: 1px solid #3a3a3a;
		border-radius: 8px;
		cursor: pointer;
		text-align: left;
		transition: all 0.2s ease;

		&:hover:not(.disabled) {
			background: #3a3a3a;
			border-color: #5bd9ff;
		}

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		.option-title {
			display: block;
			font-size: 1.1rem;
			font-weight: 600;
			margin-bottom: 0.25rem;
		}

		.option-desc {
			display: block;
			font-size: 0.9rem;
			opacity: 0.8;
		}
	}
</style>

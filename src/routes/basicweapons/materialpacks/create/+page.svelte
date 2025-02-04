<script lang="ts">
	import {
		addMaterial,
		materialPacks,
		materialPack,
		createNewPack,
		selectPack,
		deletePack
	} from "src/lib/materialpack/stores/materialPackStore";
	import HugeiconsPlusSignSquare from "virtual:icons/hugeicons/plus-sign-square";
	import HugeiconsArrowLeft02 from "virtual:icons/hugeicons/arrow-left-02";
	import empty_spot from "$lib/materialpack/media/empty_spot.png";

	import HugeiconsZip01 from "virtual:icons/hugeicons/zip-01";
	import HugeiconsEdit02 from "virtual:icons/hugeicons/edit-02";
	import HugeiconsDelete02 from "virtual:icons/hugeicons/delete-02";
	import HugeiconsInformationSquare from "virtual:icons/hugeicons/information-square";
	import HugeiconsAdd02 from "virtual:icons/hugeicons/add-02";
	import HugeiconsFolder01 from "virtual:icons/hugeicons/folder-01";
	import HugeiconsArchive02 from "~icons/hugeicons/archive-02";

	import HomeButton from "src/components/HomeButton.svelte";
	import FeedbackButton from "src/components/materialpack/FeedbackButton.svelte";
	import ImportantButton from "src/components/materialpack/ImportantButton.svelte";
	import ImagePicker from "src/components/materialpack/ImagePicker.svelte";
	import CenterModal from "src/components/CenterModal.svelte";
	import TabBookmarks from "src/components/materialpack/TabBookmarks.svelte";
	import { closeDialog } from "src/components/CenterModal.svelte";

	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	import { blur, crossfade, draw, fade, fly, scale, slide } from "svelte/transition";
	import { flip } from "svelte/animate";

	import { materialPackNameSchema, modDependencySchema } from "$lib/materialpack/validation/materialPackValidation";

	import { z } from "zod";

	import MaterialCreatorStats from "src/components/materialpack/form_views/MaterialCreatorStatsForm.svelte";
	import MaterialCreatorAssets from "src/components/materialpack/form_views/MaterialCreatorAssetsForm.svelte";
	import MaterialCreatorRecipes from "src/components/materialpack/form_views/MaterialCreatorRecipesForm.svelte";
	import type { Material, MaterialPack } from "src/lib/materialpack/types/materialpackTypes";
	import ZipMaterialPackDownloader from "src/components/materialpack/ZipMaterialPackDownloader.svelte";
	import { templates, createPackFromTemplate, type MaterialPackTemplate } from "$lib/materialpack/stores/templateStore";
	import { materialTemplates, type MaterialTemplate } from "$lib/materialpack/stores/materialTemplateStore";
	import {
		isApproachingStorageLimit,
		checkStorageQuota,
		getLocalStorageSize,
		getRemainingStorage
	} from "src/lib/utils/storageUtils";

	import InfoTab from "src/components/materialpack/InfoTab.svelte";
	import { packOrder } from "$lib/materialpack/stores/packOrderStore";
	import assets_tab_example from "$lib/materialpack/media/assets_tab_example.png";
	import stats_tab_example from "$lib/materialpack/media/stats_tab_example.png";
	import DownloadExamplesButton from "src/components/materialpack/DownloadExamplesButton.svelte";

	// Basic pack information
	let pack_name = "";
	let mod_dependency_name = "";
	let mod_dependency_id = "";
	let minecraft_version = "";

	let materials: Material[] = [];
	let pack_icon: string | null = null; // For pack.png

	let showModal: boolean[] = Array(8).fill(false);
	let packToDelete: string | null = null;

	let show_pack_creator = false;
	let isLoaded = false;
	let isTransitioning = false;
	let isMobile = false;

	// Track selected tabs
	let selectedMainTab = "settings";
	let selectedSubTabs: Record<string, string> = {};

	let activeTab = "settings";

	interface Tab {
		id: string;
		type: "settings" | "material";
		label: string;
		materialIndex?: number;
		material?: Material;
	}

	$: tabs = [
		{ id: "settings", type: "settings" as const, label: "Pack Settings" },
		...$materialPack.materials.map((material: Material, index: number) => ({
			id: `material-${index}`,
			label: material.material_name || `Material ${index + 1}`,
			type: "material" as const,
			materialIndex: index,
			material
		}))
	] satisfies Tab[];

	function handleTabChange(tabId: string, subType?: string) {
		if (subType) {
			activeTab = `${tabId}-${subType}`;
			const [type, indexStr] = tabId.split("-");
			const materialIndex = parseInt(indexStr);
			selectedMainTab = `material-${materialIndex}`;
			selectedSubTabs[selectedMainTab] = subType;
		} else {
			activeTab = tabId;
			selectedMainTab = "settings";
		}
	}

	function getContentType(tabId: string) {
		if (tabId === "settings") return "settings";
		const [_, __, subtype] = tabId.split("-");
		return subtype;
	}

	onMount(() => {
		if (typeof window !== "undefined" && window.innerWidth < 1000) {
			isMobile = true;
		}
		const unsubscribe = materialPacks.subscribe(state => {
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
		// Check if there's enough storage space for a new pack
		const { hasSpace, error } = checkStorageQuota();
		if (!hasSpace) {
			alert(error);
			return;
		}

		showModal[3] = true;
	}

	function handleStartFresh() {
		try {
			createNewPack();
			show_pack_creator = true;
			closeDialog();
		} catch (error: any) {
			if (error instanceof Error && error.name === "QuotaExceededError") {
				alert(
					"Available storage space exceeded. Please export and remove some material packs or textures to free up space."
				);
			} else {
				alert(error?.message || "Failed to create new pack");
			}
		}
	}

	async function handleBackTransition() {
		isTransitioning = true;
		isLoaded = false;
		// Wait for the transition to complete before navigating
		await new Promise(resolve => setTimeout(resolve, 300)); // Should match transition duration
		goto("/basicweapons/materialpacks");
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
			materialPack.update(pack => ({
				...pack,
				[field]: validatedValue
			}));

			materialPacks.update(state => ({
				...state,
				packs: {
					...state.packs,
					[$materialPack.localstorage_id]: {
						...state.packs[$materialPack.localstorage_id],
						[field]: validatedValue
					}
				}
			}));
			input.setCustomValidity("");
		} catch (error) {
			if (error instanceof z.ZodError) {
				input.setCustomValidity(error.errors[0].message);
			}
		}
		input.reportValidity();
	}

	function handleAddMaterial() {
		showModal[5] = true;
	}

	function handleAddEmptyMaterial() {
		addMaterial();
		handleTabChange(`material-${$materialPack.materials.length - 1}`, "stats");
		closeDialog();
	}

	function handleTemplateSelect(template: MaterialPackTemplate) {
		const newPack = createPackFromTemplate(template);
		createNewPack();
		// Update after a small delay to ensure the new pack is created
		setTimeout(() => {
			materialPack.update(pack => ({ ...pack, ...newPack }));
			materialPacks.update(state => ({
				...state,
				packs: {
					...state.packs,
					[$materialPack.localstorage_id]: {
						...state.packs[$materialPack.localstorage_id],
						...newPack
					}
				}
			}));
		}, 0);
		show_pack_creator = true;
		closeDialog();
	}

	async function handleMaterialTemplateSelect(template: MaterialTemplate) {
		addMaterial();

		// Create a new material with the template data
		const newMaterial = {
			...template,
			textures: { ...template.textures }
		};

		// Update both stores with validated data
		materialPack.update(pack => {
			const materials = [...pack.materials];
			materials[materials.length - 1] = newMaterial;
			return { ...pack, materials };
		});

		materialPacks.update(state => ({
			...state,
			packs: {
				...state.packs,
				[$materialPack.localstorage_id]: {
					...state.packs[$materialPack.localstorage_id],
					materials: $materialPack.materials.map((m, i) => (i === $materialPack.materials.length - 1 ? newMaterial : m))
				}
			}
		}));

		// Navigate to the new material's stats tab
		handleTabChange(`material-${$materialPack.materials.length - 1}`, "stats");
		closeDialog();
	}

	// Update pack order when packs change
	$: {
		const currentIds = Object.keys($materialPacks.packs);
		// Add any new packs that aren't in the order
		const newIds = currentIds.filter(id => !$packOrder.includes(id));
		if (newIds.length > 0) {
			packOrder.update(order => [...order, ...newIds]);
		}
		// Remove any deleted packs from the order
		packOrder.update(order => order.filter(id => currentIds.includes(id)));
	}

	function handleDragStart(e: DragEvent, id: string) {
		if (!(e.target instanceof HTMLImageElement)) {
			e.preventDefault();
			return;
		}
		e.dataTransfer?.setData("text/plain", id);
		if (e.target instanceof HTMLElement) {
			// Create a custom drag image
			const dragImage = e.target.cloneNode(true) as HTMLElement;
			dragImage.style.width = "96px";
			dragImage.style.height = "96px";
			dragImage.style.opacity = "1";
			dragImage.style.position = "absolute";
			dragImage.style.top = "-1000px"; // Hide to prevent flicker
			document.body.appendChild(dragImage);

			e.dataTransfer?.setDragImage(dragImage, 48, 48);

			// Clean up the drag image after drag ends
			setTimeout(() => document.body.removeChild(dragImage), 0);

			e.target.classList.add("dragging");
		}
	}

	function handleDrop(e: DragEvent, targetId: string) {
		const draggedId = e.dataTransfer?.getData("text/plain");
		if (!draggedId || draggedId === targetId) return;

		packOrder.update(order => {
			const newOrder = [...order];
			const draggedIndex = newOrder.indexOf(draggedId);
			const targetIndex = newOrder.indexOf(targetId);

			// Swap the positions
			[newOrder[draggedIndex], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[draggedIndex]];

			return newOrder;
		});
	}

	function handleDragEnd(e: DragEvent) {
		if (e.target instanceof HTMLElement) {
			e.target.classList.remove("dragging");
		}
	}

	function handleBackToPacks() {
		// Check if there are any invalid inputs
		const invalidInputs = document.querySelectorAll("input:invalid");
		if (invalidInputs.length > 0) {
			// Show the validation error modal instead of an alert
			showModal[7] = true;
			return;
		}

		// If all inputs are valid, proceed with navigation
		show_pack_creator = false;
		activeTab = "settings";
	}
</script>

<!-- #region HTML -->
{#if !isMobile}
	<div class="page-container flex-col">
		{#if isLoaded}
			<div class="transition-wrapper" transition:fly={{ x: isTransitioning ? -50 : 50, duration: 300 }}>
				{#key show_pack_creator}
					<div class="view-container" transition:fly|local={{ y: show_pack_creator ? 15 : -15, duration: 100 }}>
						<!-- Materialpack Selector View -->
						{#if !show_pack_creator}
							<div class="flex-row justify-between">
								<span>
									<ImportantButton
										icon={HugeiconsArrowLeft02}
										label="Back"
										onClick={handleBackTransition}
										color="grey"
										backdropCorner="top-left" />
								</span>
								<span class="create-pack-btn-container">
									{#if Object.keys($materialPacks.packs).length < 9}
										<ImportantButton
											icon={HugeiconsPlusSignSquare}
											label="Create New Pack"
											onClick={handleCreateNew}
											color="green"
											backdropCorner="top-center" />
									{:else}
										<span class="number-of-packs-created">
											{Object.keys($materialPacks.packs).length} / 9 Material Packs Created.
										</span>
									{/if}
								</span>
								<ImportantButton
									icon={HugeiconsInformationSquare}
									label="Storage"
									onClick={showBrowserStorageInfoModal}
									color="blue"
									backdropCorner="top-right" />
							</div>
							<div class="pack-list-container">
								<div class="pack-list">
									{#each $packOrder as packId (packId)}
										<div
											class="pack-item"
											draggable="true"
											role="button"
											tabindex="0"
											aria-label="Draggable material pack"
											on:dragstart={e => handleDragStart(e, packId)}
											on:dragend={handleDragEnd}
											on:dragover|preventDefault
											on:drop|preventDefault={e => handleDrop(e, packId)}
											animate:flip={{ duration: 300 }}>
											<div class="pack-inner">
												<div class="actions-container">
													<ZipMaterialPackDownloader materialPack={$materialPacks.packs[packId]} />
													<button
														class="edit-pack-btn"
														title="Edit Material Pack"
														on:click={() => handlePackSelect(packId)}>
														<HugeiconsEdit02 width="32" height="32" />
													</button>
													<button
														class="delete-pack-btn"
														on:click={() => handleDeleteClick(packId)}
														title="Delete Material Pack">
														<HugeiconsDelete02 width="32" height="32" />
													</button>
												</div>
												<img
													src={$materialPacks.packs[packId].pack_icon || ""}
													alt="material pack icon"
													class="no-resample" />
												{#if $materialPacks.packs[packId].pack_name}
													<span class="pack-label">{$materialPacks.packs[packId].pack_name}</span>
												{/if}
											</div>
										</div>
									{/each}
									{#each Array(9 - $packOrder.length).fill(null) as _ (Math.random())}
										<div class="pack-item placeholder" animate:flip={{ duration: 300 }} role="gridcell">
											<div class="pack-inner">
												<img src={empty_spot} alt="empty pack slot" class="no-resample" />
											</div>
										</div>
									{/each}
								</div>
							</div>
							<!-- Materialpack Creator -->
						{:else}
							<span class="back-btn-container">
								<div class="flex-row gap-2">
									<ImportantButton
										icon={HugeiconsArrowLeft02}
										label="Back to Packs"
										onClick={handleBackToPacks}
										color="grey"
										backdropCorner="center" />
								</div>
							</span>

							<!-- #region Material Pack Settings -->
							<!-- Add content sections that respond to the selected tabs -->
							<div class="form-wrapper">
								<TabBookmarks {tabs} {activeTab} onTabChange={handleTabChange} onAddMaterial={handleAddMaterial} />
								<!-- Content area -->
								{#if activeTab}
									{#if getContentType(activeTab) === "settings"}
										<!-- Use indices of 100+ for InfoTabs, just incase :) -->
										<InfoTab title="Material Pack Settings" modalID={100}>
											<h4 class="blurb">Change the main settings for your material pack</h4>
											<div class="modal-content">
												<h4>Pack Icon</h4>
												<p>Recommended size is 32 x 32 pixels. Maximum size is 256 x 256 pixels.</p>
												<p>
													Feel free to download the template image (right click and save) and edit it to display one of
													your weapon textures in.
												</p>
												<h4>Pack Name</h4>
												<p>
													The material pack name should be either the name of your main material (e.g. 'copper',
													'unobtainium'), or in the case of a materialpack with multiple materials, a name that is short
													and makes sense (e.g. 'gems', 'tech-mats', 'all-mats').
												</p>
												<h4>Mod Dependency</h4>
												<p>
													If your material pack uses materials from another mod rather than vanilla, include that mod's
													name (e.g. 'mekanism', 'mythic-metals', 'applied-energistics-2').
												</p>
												<p>
													The mod dependency ID <b>must</b> be the actual id (namespace) of the mod you're depending on (e.g.
													'mekanism', 'mythicmetals', 'appeng'). Basic Weapons will only load your pack if it detects a mod
													with that id being loaded.
												</p>
												<h4>Adding materials</h4>
												<p>
													Materials are added via the little '+' tab sticking out the right of the main view. You can
													choose to start fresh, or pick from a template material based on Basic Weapon's vanilla
													material weapons.
												</p>
												<h4>Exporting your Material Pack</h4>
												<p>
													You can export your material pack to any Minecraft version that the materialpack system
													supports. Look for this icon:
												</p>
												<div style="margin-top: 1rem;">
													<HugeiconsZip01 width="48" height="48" />
												</div>
											</div>
										</InfoTab>
										<!-- Settings form content -->
										<form class="pack-settings-form">
											<div class="pack-settings-header">
												<span>
													<span class="icon">
														{#if $materialPack}
															<ZipMaterialPackDownloader materialPack={$materialPack} />
														{/if}</span>
													<span
														class="pack-name-container"
														title={"bwmp_" +
															$materialPack.pack_name +
															"_" +
															($materialPack.mod_dependency_name ? $materialPack.mod_dependency_name : "minecraft") +
															".zip"}>
														{"bwmp_" +
															$materialPack.pack_name +
															"_" +
															($materialPack.mod_dependency_name ? $materialPack.mod_dependency_name : "minecraft") +
															".zip"}
													</span>
												</span>
											</div>
											<div class="form-element imagepicker">
												<ImagePicker
													currentImage={$materialPack.pack_icon}
													accept="image/png"
													onImageSelect={base64String => {
														materialPack.update(pack => ({
															...pack,
															pack_icon: base64String
														}));
														materialPacks.update(state => ({
															...state,
															packs: {
																...state.packs,
																[$materialPack.localstorage_id]: {
																	...state.packs[$materialPack.localstorage_id],
																	pack_icon: base64String
																}
															}
														}));
													}} />
											</div>
											<div class="grid-section-general flex-col">
												<div class="form-element text">
													<input
														type="text"
														id="pack_name"
														placeholder=" "
														bind:value={$materialPack.pack_name}
														on:input={e => validateAndUpdateStore(e, materialPackNameSchema, "pack_name")}
														required />
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
														on:input={e => validateAndUpdateStore(e, modDependencySchema, "mod_dependency_name")} />
													<label for="mod_dependency_name">Mod Name</label>
												</div>

												<div class="form-element text">
													<input
														type="text"
														id="mod_dependency_modid"
														placeholder=" "
														bind:value={$materialPack.mod_dependency_modid}
														on:input={e => validateAndUpdateStore(e, modDependencySchema, "mod_dependency_modid")} />
													<label for="mod_dependency_modid"> Mod ID </label>
												</div>
											</div>
											<span class="download-frame-templates-container">
												<DownloadExamplesButton
													downloadOptions={{
														frame: {
															url: "/files/materialpack-frame-templates.zip",
															displayName: "Download Templates"
														}
													}}>
													<h2>Download Frame Templates</h2>
													<p>
														You can use these frame backgrounds for your materialpack icons if you wish. If you're not
														sure which one to use, check out the materialpack templates when creating a new one.
													</p>
												</DownloadExamplesButton>
											</span>
										</form>
									{:else}
										<!-- Material content -->
										{#each $materialPack.materials as material, index}
											{#if activeTab.startsWith(`material-${index}-`)}
												<InfoTab
													title="Edit Weapon Stats"
													modalID={101}
													offset={9}
													disabled={!activeTab.endsWith("-stats")}>
													<h4 class="blurb">Set a material's various weapon stats</h4>
													<div class="modal-content">
														<h4>Foreword</h4>
														<p>
															If you're unsure what values to set, try adding a template material. They show you the
															values for weapons with vanilla materials.
														</p>
														<h4>Material Name</h4>
														<p>
															A material's name dictates what it'll be registered as and what its default translation
															will be. For example, a 'copper' hammer will be registered as 'basicweapons:copper_hammer'
															with the name 'Copper Hammer'
														</p>
														<h4>Durability</h4>
														<p>Denotes how much you can use a weapon for before it breaks.</p>
														<h4>Attack Damage, Speed & Reach bonuses</h4>
														<p>
															These values are added to a weapon's base stats. If you want a material to make a weapon
															weaker than its base stats, enter negative values (e.g. -1, -5.5)
														</p>
														<h4>Enchantability</h4>
														<p>
															Enchantability affects the level and quantity of enchantments that are randomly applied in
															an enchanting table. Higher values mean the item will receive a greater quantity of high
															tier enchantments.
														</p>
													</div>
												</InfoTab>
												<InfoTab
													title="Weapon Recipes"
													modalID={102}
													offset={5}
													disabled={!activeTab.endsWith("-recipes")}>
													<h4 class="blurb">Choose a recipe type and tweak weapons' recipes</h4>

													<div class="modal-content">
														<h4>Crafting vs. Smithing Recipes</h4>
														<p>
															Crafting recipes are standard Minecraft crafting table recipes, and smithing recipes use
															the smithing table. In vanilla Minecraft, only Netherite uses smithing recipes for
															weapons.
														</p>
														<h4>Handle Ingredient</h4>
														<p>
															Only used in crafting recipes. This ingredient will usually be a minecraft:stick, but you
															can set it to any item or item tag that you like.
														</p>
														<h4>Main Ingredient / <span style="color: #00ff4f;">Upgrade Material</span></h4>
														<p>
															This field can take either an item identifier (minecraft:cobblestone) or an item tag
															(#minecraft:stone_tool_materials). <br /> In addition to being used in recipes for your weapons,
															this item is used to repair them.
														</p>
														<h4 style="color: #00e5ff;">Smithing Template</h4>
														<p>
															Only used in smithing recipes. This ingredient can only be an item identifier, and will
															usually be minecraft:netherite_upgrade_smithing_template or a modded template. See the
															warden materialpack template for an example of that.
														</p>
														<h4 style="color: #ff4444;">Weapon Material</h4>
														<p>
															Only used in smithing recipes. This material must be a a string (not an item identifier!).
															For example, if you want iron weapons to be upgraded, you would enter "iron". <br />
															<br /> It's important not to enter "iron_ingot" or "minecraft:iron_ingot", or "minecraft:iron_sword".
															It must be the prefix for the weapons.
														</p>
													</div>
												</InfoTab>
												<InfoTab
													title="Weapon Textures"
													modalID={103}
													offset={1}
													disabled={!activeTab.endsWith("-assets")}>
													<h4 class="blurb">Set the weapon textures for your material</h4>
													<div class="modal-content">
														<h4>Downloading Examples</h4>
														<p>
															How you make your textures is totally up to you, but if you want a template to follow,
															feel free to download and use the example textures using the button that looks like this:
														</p>
														<span><HugeiconsArchive02 width="24" height="24" /></span>
														<h4>Recommended Software</h4>
														<p>
															You can use any method you like for creating textures, but my recommendation is <a
																href="https://www.aseprite.org/">Aseprite</a
															>.
														</p>
														<h4>Held vs. Standard</h4>
														<p>
															You might wonder why the spear, quarterstaff and glaive have _held textures. Simply put,
															non-held textures are shown in GUIs like the player's inventory, containers, item frames,
															and _held textures are shown when the weapons are held.
														</p>
														<h4>Modifying item model files / 3D weapons</h4>
														<p>
															This materialpack generator only supports 2d textures, but you are more than welcome to
															modify the item models for weapons manually. They're located in
															'/assets/basicweapons/models/item'.
														</p>
													</div></InfoTab>
												{#if activeTab.endsWith("-stats")}
													<MaterialCreatorStats
														{material}
														{index}
														bind:activeTab
														onTabChange={newTab => (activeTab = newTab)} />
												{:else if activeTab.endsWith("-recipes")}
													<MaterialCreatorRecipes
														{material}
														{index}
														bind:activeTab
														onTabChange={newTab => (activeTab = newTab)} />
												{:else if activeTab.endsWith("-assets")}
													<MaterialCreatorAssets
														{material}
														{index}
														bind:activeTab
														onTabChange={newTab => (activeTab = newTab)} />
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
{/if}

<!-- Mobile Warning -->
{#if isMobile}
	<div class="mobile-warning">
		<p>To use the Material Pack Creator, please use a device with a screen width of at least 1000px.</p>
		<span class="flex-row">
			<button on:click={() => window.location.reload()}>Refresh Page</button>
			<button on:click={() => (window.location.href = "/basicweapons/materialpacks")}>Exit Pack Creator</button>
		</span>
	</div>
{/if}

<!-- LocalStorage Info Modal -->
<CenterModal bind:showModal modalID={1}>
	<div slot="description" class="modal-content info-modal">
		<h2>Browser Storage Information</h2>
		<!-- Storage usage meter -->
		<div class="storage-meter">
			<h3>Storage Usage</h3>
			<span class="storage-disclaimer">5MB is a pessimistic guess. Your browser may allow more.</span>
			{#key showModal[1]}
				{#if typeof window !== "undefined"}
					{@const usedStorage = getLocalStorageSize()}
					{@const totalStorage = 5 * 1024 * 1024}
					<!-- 5MB -->
					{@const usagePercentage = (usedStorage / totalStorage) * 100}
					<div class="meter-bar">
						<div
							class="meter-fill"
							style="width: {usagePercentage}%; background-color: {usagePercentage > 80 ? '#ff4444' : '#4a9eff'}" />
					</div>
					<div class="meter-labels">
						<span>Used: {(usedStorage / 1024 / 1024).toFixed(2)}MB</span>
						<span>Available: {(getRemainingStorage() / 1024 / 1024).toFixed(2)}MB</span>
					</div>
				{/if}
			{/key}
		</div>
		<p>Material packs are stored locally in your browser using LocalStorage.</p>

		<h4>Persistent</h4>
		<p>Your packs are saved even when you close your browser</p>
		<h4>Local</h4>
		<p>Packs are only available on this device and browser</p>
		<h4>Fragile</h4>
		<p>Clearing browser data will delete your saved packs</p>
		<span style="display:block;width:100%; height:1px; background: #3a3a3a; margin: 1rem 0;"></span>
		<p>
			Local Storage is limited to 5MB on most browsers. If you're making a materialpack with many materials that have
			high resolution textures I would recommend generating only the materials with their stats and then adding textures
			manually.
		</p>
		<p>
			<b>
				Always export your material packs to ZIP to avoid losing them! <i>Always</i> back up your hard work!
			</b>
		</p>
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

<!-- Material Pack Creation Options Modal -->
<CenterModal bind:showModal modalID={3}>
	<div slot="description" class="modal-content">
		<h2>Create New Material Pack</h2>
		<p>Choose how you'd like to start your new material pack:</p>
		<div class="creation-options">
			<button class="option-btn" on:click={handleStartFresh}>
				<span class="option-title">Start Fresh</span>
				<span class="option-desc">Begin with a blank material pack</span>
			</button>
			<button class="option-btn" on:click={() => (showModal[4] = true)}>
				<span class="option-title">From Template</span>
				<span class="option-desc">Start from a pre-made template</span>
			</button>
		</div>
	</div>
</CenterModal>
<!-- Material Pack Template Selection Modal -->
<CenterModal bind:showModal modalID={4}>
	<div slot="description" class="modal-content">
		<h2>Choose a Template</h2>
		<div class="template-options">
			{#each $templates as template}
				<button class="template-btn" on:click={() => handleTemplateSelect(template)}>
					<div class="template-preview">
						<img src={template.pack_icon} alt="{template.name} icon" class="no-resample" />
					</div>
					<div class="template-info">
						<span class="template-title">{template.name}</span>
						<span class="template-desc">{template.description}</span>
					</div>
				</button>
			{/each}
		</div>
	</div>
</CenterModal>
<!-- Material Creation Options Modal -->
<CenterModal bind:showModal modalID={5}>
	<div slot="description" class="modal-content">
		<h2>Create New Material</h2>
		<div class="creation-options">
			<button class="option-btn" on:click={handleAddEmptyMaterial}>
				<span class="option-title">Empty Material</span>
				<span class="option-desc">Begin with a blank material</span>
			</button>
			<button class="option-btn" on:click={() => (showModal[6] = true)}>
				<span class="option-title">From Template</span>
				<span class="option-desc">Use a vanilla material's stats as a starting point</span>
			</button>
		</div>
	</div>
</CenterModal>

<!-- Add Material Template Selection Modal -->
<CenterModal bind:showModal modalID={6}>
	<div slot="description" class="modal-content">
		<h2>Choose a Template</h2>
		<div class="template-options">
			{#each $materialTemplates as template}
				<button class="template-btn" on:click={() => handleMaterialTemplateSelect(template)}>
					<div class="template-preview">
						<img src={template.exampleTexture || empty_spot} alt="{template.name} sword" class="no-resample" />
					</div>
					<div class="template-info">
						<span class="template-title">{template.name}</span>
						<span class="template-desc">{template.description}</span>
					</div>
				</button>
			{/each}
		</div>
	</div>
</CenterModal>

<!-- Add this new modal at the bottom with the other modals -->
<CenterModal bind:showModal modalID={7}>
	<div slot="description" class="modal-content">
		<h2>Invalid Fields Detected</h2>
		<p>Are you sure you want to leave this page? Invalid fields may be saved.</p>
		<div class="modal-actions">
			<button class="ok-btn" on:click={closeDialog}>Fix Fields</button>
			<button
				on:click={() => {
					show_pack_creator = false;
					activeTab = "settings";
					closeDialog();
				}}>Leave Page</button>
		</div>
	</div>
</CenterModal>

<!-- #region CSS -->
<style lang="scss">
	.back-btn-container {
		display: block;
		height: 50px;
		margin-bottom: 1rem;
		div {
			height: 100%;
		}
	}

	.page-container {
		align-items: center;
		display: flex;
		font-family: "Quicksand", "sans-serif";
		height: calc(100dvh - 16px);
		justify-content: center;
		width: 100%;
	}

	.transition-wrapper {
		align-items: center;
		display: flex;
		height: 100%;
		justify-content: center;
		max-width: 600px;
		position: relative;
		width: 100%;
	}

	.view-container {
		display: flex;
		flex-direction: column;
		height: fit-content;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
	}

	.info-btn {
		align-items: center;
		background: #333333;
		border: 2px solid #1c1c1c;
		border-radius: 16px;
		box-shadow: 2px -2px 0px 0px #222222;
		display: inline-flex;
		justify-content: center;
		padding: 0.25rem;
		transition: all 0.2s ease;
		&:hover {
			background: rgb(77, 77, 77);
			border: 2px solid #1c1c1c;
			box-shadow: 1px -1px 0px 0px #222222;
			color: #71b3ff;
		}

		&:active {
			background: #1a1a1a;
			box-shadow: 0px 0px 0px 0px #222222;
		}
	}

	h1 {
		align-items: center;
		display: inline-flex;
		font-size: 1rem;
		gap: 0.5rem;
		margin: 0;
	}

	.pack-list-container {
		align-items: center;
		background: rgba(40, 40, 40, 1);
		border: 10px solid #353535;
		border-radius: 8px;
		box-shadow: inset 0px 0px 10px 0px #1c1c1c;
		display: flex;
		flex-direction: column;
		margin: 2rem auto 0 auto;
		padding: 3rem;
		width: fit-content;
	}

	.pack-list {
		display: grid;
		gap: 3rem;
		grid-template-columns: repeat(3, 128px);
		grid-template-rows: repeat(3, 128px);
		height: fit-content;
		justify-content: center;
		max-height: calc(3 * 128px + 2 * 3rem); // 3 rows + 2 gaps
		width: calc(3 * 128px + 2 * 3rem); // 3 items + 2 gaps
		& > * {
			transition:
				transform 0.2s ease,
				opacity 0.2s ease;
		}
	}

	.pack-item {
		display: flex;
		gap: 1rem;
		height: 128px;
		position: relative;
		width: 128px;

		&:not(.dragging):not(.placeholder) {
			transition: all 0.2s ease;

			img {
				cursor: grab;
				transition: all 0.2s ease;

				&:hover {
					opacity: 0.9;
				}

				&:active {
					cursor: grabbing;
					opacity: 0.5;
					transform: scale(0.75);
				}
			}
		}

		// Add drop target indicator
		&:not(.dragging):not(.placeholder)[data-dragging-over="true"] {
			position: relative;

			&::after {
				border: 2px dashed rgba(91, 217, 255, 0.5);
				border-radius: 12px;
				content: "";
				inset: -8px;
				pointer-events: none;
				position: absolute;
			}
		}

		&.placeholder {
			opacity: 0.5;
			pointer-events: none;
			user-select: none;
		}

		.pack-inner {
			background: none;
			border: none;
			height: 100%;
			padding: 0;
			position: relative;
			width: 100%;
			.pack-label {
				background: hsl(0, 0%, 95%);
				border-radius: 4px;
				bottom: -0.5rem;
				box-shadow: 0px 4px 0px 0 hsl(0, 0%, 55%);
				color: rgb(49, 49, 49);
				display: inline;
				font-size: 1rem;
				font-weight: 600;
				left: 0;
				letter-spacing: 0.05em;
				line-height: 1;
				overflow: hidden;
				padding: 0.25rem 0.5rem;
				position: absolute;
				text-align: center;
				text-overflow: ellipsis;
				text-transform: uppercase;
				text-wrap: nowrap;
				transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
				width: 100%;
			}

			&:hover .pack-label {
				opacity: 0;
				transform: scale(0.9);
			}
			.actions-container {
				align-items: flex-start;
				bottom: -3.25rem;
				display: flex;
				flex-direction: row;
				height: 48px;
				justify-content: space-evenly;
				left: 0;
				opacity: 0;
				position: absolute;
				transform: translateY(-1.5rem);
				transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
				width: 100%;

				button {
					align-items: center;
					background: none;
					border: none;
					border-radius: 4px;
					color: whitesmoke;
					display: inline-flex;
					height: 32px;
					justify-content: center;
					padding: 0;
					width: 32px;
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
		.pack-inner:has(img:active) .actions-container {
			visibility: hidden;
		}
	}
	.create-pack-btn-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		justify-content: center;
		width: fit-content;
	}
	.number-of-packs-created {
		color: #7e7e7e;
		font-weight: 600;
	}

	.icon-upload {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		input[type="file"] {
			border: 1px solid #ccc;
			border-radius: 4px;
			padding: 0.5rem;
			width: 100%;
		}

		.icon-preview {
			border: 1px solid #ccc;
			border-radius: 4px;
			height: 128px;
			object-fit: cover;
			width: 128px;
		}
	}

	//#region Form Sections
	.form-wrapper {
		height: 600px;
		position: relative;
		width: 600px;
		.tab-info-btn {
			border: none;
			border-radius: 8px 8px 0 0;
			padding: 0.5rem;
			position: absolute;
			right: 1.25rem;
			top: -3rem;
		}
		form {
			background: #2c2c2c;
			border: 2px solid #1c1c1c;
			border-radius: 8px;
			display: grid;
			gap: 1rem;
			grid-template-columns: 1fr 2fr;
			height: 100%;
			padding: 2rem;
			position: relative;
			width: 100%;
		}

		.pack-settings-header {
			align-items: center;
			display: flex;
			font-size: medium;
			gap: 1rem;
			grid-column: 1 / 3;
			grid-row: 1 / 2;
			justify-content: space-between;
			margin: 0 0 0.5rem 0;
			max-width: 500px;
			width: 500px;
		}
		.pack-settings-header > span {
			align-items: center;
			display: inline-flex;
			gap: 0.5rem;
			.pack-name-container {
				font-size: 1.1rem;
				max-width: 475px;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.form-element {
			margin-bottom: 2.5rem;
			position: relative;
			width: 100%;

			&.text {
				height: 3rem;
				label {
					align-items: center;
					border-top-left-radius: 4px;
					border-top-right-radius: 4px;
					color: rgb(70, 70, 70);
					display: inline-flex;
					font-weight: 500;
					height: 100%;
					justify-content: flex-start;
					left: 0.6rem;
					padding: 0.5rem;
					pointer-events: none;
					position: absolute;
					top: 0;
					transform: translateY(0);
					transition: 0.2s ease;
					width: 100%;
				}
				input {
					border-radius: 4px;
					height: 100%;
					padding: 0.5rem 1rem;
					width: 100%;
					&::placeholder {
						color: transparent;
					}
				}

				input:focus + label,
				input:not(:placeholder-shown) + label {
					color: white;
					font-size: 14px;
					left: -4px;
					transform: translateY(-2.25rem);
				}
			}
			&.imagepicker {
				height: fit-content;
				margin: auto auto 1rem 0;
				position: relative;
				width: fit-content;
			}
		}

		.grid-section-general {
			gap: 1rem;
			justify-content: space-between;
			margin: auto 0 1rem 0;
			max-height: 124px;
			div {
				margin: 0;
			}
		}
		.grid-section-mod-dependency {
			background: rgba(0, 0, 0, 0.1);
			border-radius: 4px;
			box-shadow: inset 0px 0px 10px 0px #1c1c1c;
			gap: 1rem;
			grid-column: 1/3;
			padding: 1rem 2rem;
			h3 {
				margin-bottom: 1rem;
			}
		}
	}
	//#region Modal Styles
	.modal-content {
		p {
			font-size: 0.9rem;
			opacity: 0.8;
		}
	}
	.modal-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 2rem;

		button {
			border: none;
			border-radius: 4px;
			cursor: pointer;
			font-weight: 600;
			padding: 0.5rem 1.5rem;
			transition: all 0.2s ease;

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
	.image-example {
		border: 2px solid #3a3a3a;
		border-radius: 8px;
		margin-top: 1rem;
	}
	.blurb {
		color: #85c0ff;
	}

	//#region Pack Creation Modal Creation
	.creation-options {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.option-btn {
		background: #2a2a2a;
		border: 1px solid #3a3a3a;
		border-radius: 8px;
		cursor: pointer;
		padding: 1rem;
		text-align: left;
		transition: all 0.2s ease;
		width: 100%;

		&:hover:not(.disabled) {
			background: #3a3a3a;
			border-color: #5bd9ff;
		}

		&.disabled {
			cursor: not-allowed;
			opacity: 0.5;
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

	.template-options {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.template-btn {
		align-items: center;
		background: #2a2a2a;
		border: 1px solid #3a3a3a;
		border-radius: 8px;
		cursor: pointer;
		display: flex;
		gap: 1rem;
		padding: 1rem;
		text-align: left;
		transition: all 0.2s ease;
		width: 100%;

		&:hover {
			background: #3a3a3a;
			border-color: #5bd9ff;
		}

		.template-preview {
			height: 64px;
			width: 64px;
			img {
				height: 100%;
				object-fit: contain;
				width: 100%;
			}
		}

		.template-info {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			text-transform: capitalize;
		}

		.template-title {
			font-size: 1.1rem;
			font-weight: 600;
		}

		.template-desc {
			font-size: 0.9rem;
			opacity: 0.8;
		}
	}

	.storage-meter {
		background: rgba(92, 92, 92, 0.2);
		border: 1px solid #3a3a3a;
		border-radius: 8px;
		margin: 1rem 0 1rem 0;
		padding: 1rem;
		position: relative;

		.storage-disclaimer {
			align-items: center;
			color: #a7a7a7;
			display: inline-flex;
			font-size: 0.6rem;
			justify-content: center;
			position: absolute;
			top: 4px;
			width: 100%;
		}
		h3 {
			margin-bottom: 1rem;
		}

		.meter-bar {
			background: rgba(0, 0, 0, 0.5);
			border-radius: 12px;
			height: 24px;
			margin-bottom: 0.5rem;
			overflow: hidden;
			width: 100%;
		}

		.meter-fill {
			height: 100%;
			transition:
				width 0.3s ease,
				background-color 0.3s ease;
		}

		.meter-labels {
			display: flex;
			font-size: 0.9rem;
			justify-content: space-between;
			opacity: 0.8;
		}
	}

	.back-btn-container {
		.flex-row {
			align-items: center;
			display: flex;

			.export-pack-btn {
				align-items: center;
				background: #333333;
				border: 2px solid #1c1c1c;
				border-radius: 8px;
				box-shadow: 2px -2px 0px 0px #222222;
				color: whitesmoke;
				display: inline-flex;
				height: 42px;
				justify-content: center;
				transition: all 0.2s ease;
				width: 42px;

				&:hover {
					background: rgb(77, 77, 77);
					border: 2px solid #1c1c1c;
					box-shadow: 1px -1px 0px 0px #222222;
					color: rgb(65, 245, 125);
				}

				&:active {
					background: #1a1a1a;
					box-shadow: 0px 0px 0px 0px #222222;
				}

				&.big {
					border: 2px solid rgb(145, 145, 145);
					border-radius: 6px;
					cursor: pointer;

					display: flex;
					font-family: "Quicksand", "sans-serif";
					font-size: 1.1rem;
					font-weight: 600;
					gap: 0.5rem;
					height: 50px;
					padding: 0;
					padding: 0.75rem 1.5rem;

					text-decoration: none;
					transition: all 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
					width: 100px;
					width: fit-content;
				}
			}
		}
	}

	.gap-2 {
		gap: 0.5rem;
	}

	.download-frame-templates-container {
		position: absolute;
		right: 1rem;
		top: 1rem;
	}

	//#region Mobile Warning
	.mobile-warning {
		align-items: center;
		background-color: rgba(14, 14, 14, 0.95);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100vh;

		justify-content: center;
		left: 0;
		overflow: hidden;
		padding: 1rem 0.5rem;
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 1000;
		p {
			max-width: 500px;
			text-align: center;
		}

		button {
			border: none;
			border-radius: 8px;
			font-size: 1rem;
			font-weight: 700;
			margin: 0.5rem;
			padding: 0.5rem 1rem;
		}
	}
</style>

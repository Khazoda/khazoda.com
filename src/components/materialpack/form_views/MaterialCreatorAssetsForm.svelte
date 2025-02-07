<script lang="ts">
	import type { Material } from "$lib/materialpack/types/materialpackTypes";
	import ImagePicker from "src/components/materialpack/ImagePicker.svelte";
	import { materialPack, materialPacks } from "$lib/materialpack/stores/materialPackStore";
	import HugeiconsDelete02 from "virtual:icons/hugeicons/delete-02";
	import HugeiconsArchive02 from "~icons/hugeicons/archive-02";
	import CenterModal from "src/components/CenterModal.svelte";
	import { closeDialog } from "src/components/CenterModal.svelte";
	import minecraft_gui from "$lib/materialpack/media/minecraft_gui.png";
	import club from "$lib/materialpack/media/weapon_outlines/club.png";
	import dagger from "$lib/materialpack/media/weapon_outlines/dagger.png";
	import hammer from "$lib/materialpack/media/weapon_outlines/hammer.png";
	import glaive from "$lib/materialpack/media/weapon_outlines/glaive.png";
	import quarterstaff from "$lib/materialpack/media/weapon_outlines/quarterstaff.png";
	import spear from "$lib/materialpack/media/weapon_outlines/spear.png";
	import spear_held from "$lib/materialpack/media/weapon_outlines/spear_held.png";
	import quarterstaff_held from "$lib/materialpack/media/weapon_outlines/quarterstaff_held.png";
	import glaive_held from "$lib/materialpack/media/weapon_outlines/glaive_held.png";

	import { z } from "zod";
	import { isApproachingStorageLimit, checkStorageQuota } from "$lib/utils/storageUtils";
	import DownloadExamplesButton from "../DownloadExamplesButton.svelte";

	export let material: Material;
	export let index: number;
	export let activeTab: string;
	export let onTabChange: (newTab: string) => void;

	const VALID_SIZES = [8, 16, 32, 64, 128, 256] as const;
	type ValidSize = (typeof VALID_SIZES)[number];
	const WEAPON_TEXTURES: Array<{
		id: keyof Material["textures"];
		label: string;
		placeholderBackground: string;
	}> = [
		{ id: "dagger", label: "dagger.png", placeholderBackground: dagger },
		{ id: "hammer", label: "hammer.png", placeholderBackground: hammer },
		{ id: "club", label: "club.png", placeholderBackground: club },
		{ id: "spear", label: "spear.png", placeholderBackground: spear },
		{ id: "quarterstaff", label: "quarterstaff.png", placeholderBackground: quarterstaff },
		{ id: "glaive", label: "glaive.png", placeholderBackground: glaive },
		{ id: "spear_held", label: "spear_held.png", placeholderBackground: spear_held },
		{
			id: "quarterstaff_held",
			label: "quarterstaff_held.png",
			placeholderBackground: quarterstaff_held
		},
		{ id: "glaive_held", label: "glaive_held.png", placeholderBackground: glaive_held }
	];

	const downloadOptions = {
		metallic: {
			url: "/files/texture_examples_metal.zip",
			displayName: "Metallic Textures"
		},
		"non-metallic": {
			url: "/files/texture_examples_nonmetal.zip",
			displayName: "Non-Metallic Textures"
		}
	};

	let showModal: boolean[] = Array(1).fill(false);

	// Zod schema for texture validation
	const textureSchema = z
		.object({
			width: z.number().refine((val): val is ValidSize => VALID_SIZES.includes(val as ValidSize), {
				message: `Texture width and height must be one of: ${VALID_SIZES.join(", ")}px`
			}),
			height: z.number().refine((val): val is ValidSize => VALID_SIZES.includes(val as ValidSize), {
				message: `Texture height and width must be one of: ${VALID_SIZES.join(", ")}px`
			}),
			format: z.string().refine(val => val === "image/png", {
				message: "Texture must be a PNG image"
			})
		})
		.refine(data => data.width === data.height, {
			message: "Texture must be square (equal width and height)"
		});

	function validateTexture(image: HTMLImageElement, format: string): { isValid: boolean; message: string } {
		try {
			textureSchema.parse({
				width: image.width,
				height: image.height,
				format: format
			});
			return { isValid: true, message: "" };
		} catch (error) {
			if (error instanceof z.ZodError) {
				return { isValid: false, message: error.errors[0].message };
			}
			return { isValid: false, message: "Invalid texture format or dimensions" };
		}
	}

	async function handleTextureUpdate(textureId: keyof Material["textures"], base64: string | null) {
		if (base64 === null) {
			// Handle texture removal
			material.textures[textureId] = null;
		} else {
			// Validate the image before updating
			const img = new Image();
			const validationPromise = new Promise<{ isValid: boolean; message: string }>(resolve => {
				img.onload = () => {
					const validation = validateTexture(img, "image/png");
					resolve(validation);
				};
				img.onerror = () => {
					resolve({ isValid: false, message: "Failed to load image" });
				};
			});

			img.src = base64;
			const validation = await validationPromise;

			if (!validation.isValid) {
				alert(validation.message);
				return;
			}

			// Check if there's enough storage space
			const { hasSpace, error } = checkStorageQuota(base64);
			if (!hasSpace) {
				alert(error);
				return;
			}
		}

		// Only update if validation passed or we're removing the texture
		material.textures[textureId] = base64;

		try {
			// Update both stores
			materialPack.update(pack => {
				const updatedMaterials = [...pack.materials];
				updatedMaterials[index] = { ...material };
				return { ...pack, materials: updatedMaterials };
			});

			materialPacks.update(state => ({
				...state,
				packs: {
					...state.packs,
					[$materialPack.localstorage_id]: {
						...state.packs[$materialPack.localstorage_id],
						materials: $materialPack.materials.map((m, i) => (i === index ? material : m))
					}
				}
			}));
		} catch (e) {
			alert(
				"Failed to save changes: Available storage space exceeded. Please export and remove some material packs or textures to free up space."
			);
			// Revert the change
			material.textures[textureId] = null;
		}
	}

	function deleteMaterial() {
		const currentMaterials = $materialPack.materials;
		const newMaterials = currentMaterials.filter((_, i) => i !== index);
		materialPack.update(pack => ({
			...pack,
			materials: newMaterials
		}));
		materialPacks.update(state => ({
			...state,
			packs: {
				...state.packs,
				[$materialPack.localstorage_id]: {
					...state.packs[$materialPack.localstorage_id],
					materials: newMaterials
				}
			}
		}));
		const remainingMaterials = newMaterials.length;
		if (remainingMaterials === 0) {
			onTabChange("settings");
		} else {
			const newIndex = index === 0 ? 0 : index - 1;
			onTabChange(`material-${newIndex}-assets`);
		}
		closeDialog();
	}
</script>

<form class="material-assets-form">
	<button class="delete-material-btn" on:click={() => (showModal[0] = true)} type="button">
		<HugeiconsDelete02 width="24" height="24" />
	</button>
	<span class="download-examples-button-container">
		<DownloadExamplesButton {downloadOptions} />
	</span>
	<h2 class="grid-wide">
		{material.material_name ? `${material.material_name} Material Textures` : `Textures for Material ${index + 1}`}
	</h2>

	<div class="textures-grid">
		{#each WEAPON_TEXTURES as texture}
			<div class="form-element">
				<ImagePicker
					currentImage={material.textures[texture.id]}
					accept="image/png"
					imgSize="96px"
					padding="0.5rem"
					placeholderBackground={texture.placeholderBackground}
					backgroundImage={minecraft_gui}
					onImageSelect={base64String => handleTextureUpdate(texture.id, base64String)} />
				<label for="texture_{texture.id}_{index}">{texture.label}</label>
			</div>
		{/each}
	</div>
</form>

<!-- Delete Material Modal -->
<CenterModal modalID={0} bind:showModal>
	<div slot="description" class="modal-content">
		<h2>Delete Material?</h2>
		<p>
			Are you sure you want to delete {material.material_name || `Material ${index + 1}`}? This action cannot be undone.
		</p>
		<div class="modal-actions">
			<button class="cancel-btn" on:click={closeDialog}>Cancel</button>
			<button class="delete-btn" on:click={deleteMaterial}>Delete</button>
		</div>
	</div>
</CenterModal>

<style lang="scss">
	.material-assets-form {
		background: #2c2c2c;
		border: 2px solid #1c1c1c;
		border-radius: 8px;
		height: 100%;
		padding: 2rem;
		position: relative;
		width: 100%;

		h2 {
			color: #ffffff;
			margin: 0 0 1.5rem 0;
			overflow: hidden;
			text-overflow: ellipsis;
			text-transform: capitalize;
			text-wrap: nowrap;
		}
	}

	.textures-grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(3, minmax(64px, 1fr));
		width: 100%;
	}

	.form-element {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		label {
			color: #ffffff;
			font-size: 0.75rem;
			font-weight: 400;
			letter-spacing: 0.05rem;
		}
	}

	.grid-wide {
		grid-column: 1 / 3;
	}

	.delete-material-btn {
		align-items: center;
		background: none;
		border: none;
		border-radius: 8px;
		color: #ff4444;
		cursor: pointer;
		display: inline-flex;
		justify-content: center;
		padding: 0.5rem;
		position: absolute;
		right: 1rem;
		top: 1rem;
		transition: all 0.2s ease;

		&:hover {
			background: rgba(255, 68, 68, 0.1);
		}
	}

	.download-examples-button-container {
		position: absolute;
		right: 4rem;
		top: 1rem;
	}
</style>

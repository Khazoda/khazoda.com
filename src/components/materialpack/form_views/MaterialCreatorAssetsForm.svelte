<script lang="ts">
	import type { Material } from "$lib/materialpack/types/materialpackTypes";
	import ImagePicker from "src/components/materialpack/ImagePicker.svelte";
	import { materialPack, materialPacks } from "$lib/materialpack/stores/materialPackStore";
	import HugeiconsDelete02 from "virtual:icons/hugeicons/delete-02";
	import HugeiconsArchive02 from "~icons/hugeicons/archive-02";
	import CenterModal from "src/components/CenterModal.svelte";
	import { closeDialog } from "src/components/CenterModal.svelte";
	import minecraft_gui from "$lib/materialpack/media/minecraft_gui.png";
	import empty_spot from "$lib/materialpack/media/empty_spot.png";
	import { z } from "zod";
	import { isApproachingStorageLimit, checkStorageQuota } from "$lib/utils/storageUtils";
	import DownloadExamplesButton from "../DownloadExamplesButton.svelte";
	import { WEAPON_TEXTURES } from "$lib/materialpack/constants/weaponTextures";

	export let material: Material;
	export let index: number;
	export let activeTab: string;
	export let onTabChange: (newTab: string) => void;

	const VALID_SIZES = [8, 16, 32, 64, 128, 256] as const;
	type ValidSize = (typeof VALID_SIZES)[number];

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
	<DownloadExamplesButton {downloadOptions} />
	<h2 class="grid-wide">
		{material.material_name ? `${material.material_name} Material Textures` : `Textures for Material ${index + 1}`}
	</h2>

	<div class="textures-grid">
		{#each WEAPON_TEXTURES as texture}
			<div class="form-element">
				<ImagePicker
					currentImage={material.textures[texture.id]}
					accept="image/png"
					imgSize="72px"
					padding="0.2rem"
					innerPadding="4px"
					placeholderBackground={texture.placeholderBackground}
					backgroundImage={minecraft_gui}
					onImageSelect={base64String => handleTextureUpdate(texture.id, base64String)} />
				<span class="label-container">
					<label for="texture_{texture.id}_{index}">{texture.label}</label>
					{#if texture.id === "pike" || texture.id === "pike_held"}
						<span class="extra-signifier version" title="only available in minecraft 1.21.11 and later">1.21.11 »</span>
					{/if}
					{#if texture.id === "spear" || texture.id === "spear_held"}
						<span
							class="extra-signifier version"
							title="only available in minecraft 1.21.10 and earlier. deprecated since december 2025">« 1.21.10</span>
					{/if}
					{#if texture.id === "sword" || texture.id === "axe"}
						<span class="extra-signifier version" title="only available in minecraft 1.21.10 and later">1.21.10 »</span>
						<span class="extra-signifier optional" title="not required">optional</span>
					{/if}
				</span>
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
		position: relative;
		width: 100%;
		height: 100%;
		padding: 2rem;
		border-radius: 8px;
		outline: 2px solid #1c1c1c;
		background: #2c2c2c;

		h2 {
			margin: 0 0 1.5rem 0;
			overflow: hidden;
			color: #ffffff;
			text-overflow: ellipsis;
			text-transform: capitalize;
			text-wrap: nowrap;
		}
	}

	.textures-grid {
		display: grid;
		grid-template-columns: repeat(6, minmax(64px, 1fr));
		width: 100%;
		gap: 1rem;
	}

	.form-element {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		.label-container {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;
			width: 100%;
			max-width: 85px;
			color: #ffffff;
			font-weight: 400;
			font-size: 0.75rem;
			line-height: 1rem;
			letter-spacing: 0.05rem;
			overflow-wrap: anywhere;
		}
		.extra-signifier {
			cursor: help;
			&.optional {
				color: #44baff;
			}
			&.version {
				color: #ffae44;
			}
		}
	}

	.grid-wide {
		grid-column: 1 / 3;
	}

	.delete-material-btn {
		display: inline-flex;
		position: absolute;
		top: 1rem;
		right: 1rem;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		border: none;
		border-radius: 8px;
		background: none;
		color: #ff4444;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			background: rgba(255, 68, 68, 0.1);
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

			&.delete-btn {
				background: #ff4444;
				color: white;

				&:hover {
					background: #ff2222;
				}
			}
		}
	}
</style>

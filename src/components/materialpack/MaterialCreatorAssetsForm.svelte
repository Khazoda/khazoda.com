<script lang="ts">
	import type { Material } from '$lib/materialpack/types/materialpackTypes';
	import ImagePicker from 'src/components/materialpack/ImagePicker.svelte';
	import { materialPack, materialPacks } from '$lib/materialpack/stores/materialPackStore';
	import HugeiconsDelete02 from 'virtual:icons/hugeicons/delete-02';
	import HugeiconsArchive02 from '~icons/hugeicons/archive-02';
	import CenterModal from 'src/components/CenterModal.svelte';
	import { closeDialog } from 'src/components/CenterModal.svelte';
	import minecraft_gui from '$lib/materialpack/media/minecraft_gui.png';
	import club from '$lib/materialpack/media/weapon_outlines/club.png';
	import dagger from '$lib/materialpack/media/weapon_outlines/dagger.png';
	import hammer from '$lib/materialpack/media/weapon_outlines/hammer.png';
	import glaive from '$lib/materialpack/media/weapon_outlines/glaive.png';
	import quarterstaff from '$lib/materialpack/media/weapon_outlines/quarterstaff.png';
	import spear from '$lib/materialpack/media/weapon_outlines/spear.png';
	import spear_held from '$lib/materialpack/media/weapon_outlines/spear_held.png';
	import quarterstaff_held from '$lib/materialpack/media/weapon_outlines/quarterstaff_held.png';
	import glaive_held from '$lib/materialpack/media/weapon_outlines/glaive_held.png';

	import { z } from 'zod';
	import { isApproachingStorageLimit, checkStorageQuota } from '$lib/utils/storageUtils';

	export let material: Material;
	export let index: number;
	export let activeTab: string;
	export let onTabChange: (newTab: string) => void;

	const VALID_SIZES = [8, 16, 32, 64, 128, 256] as const;
	type ValidSize = (typeof VALID_SIZES)[number];
	const WEAPON_TEXTURES: Array<{
		id: keyof Material['textures'];
		label: string;
		placeholderBackground: string;
	}> = [
		{ id: 'dagger', label: 'dagger.png', placeholderBackground: dagger },
		{ id: 'hammer', label: 'hammer.png', placeholderBackground: hammer },
		{ id: 'club', label: 'club.png', placeholderBackground: club },
		{ id: 'spear', label: 'spear.png', placeholderBackground: spear },
		{ id: 'quarterstaff', label: 'quarterstaff.png', placeholderBackground: quarterstaff },
		{ id: 'glaive', label: 'glaive.png', placeholderBackground: glaive },
		{ id: 'spear_held', label: 'spear_held.png', placeholderBackground: spear_held },
		{
			id: 'quarterstaff_held',
			label: 'quarterstaff_held.png',
			placeholderBackground: quarterstaff_held
		},
		{ id: 'glaive_held', label: 'glaive_held.png', placeholderBackground: glaive_held }
	];

	let showModal: boolean[] = Array(2).fill(false);

	// Zod schema for texture validation
	const textureSchema = z
		.object({
			width: z.number().refine((val): val is ValidSize => VALID_SIZES.includes(val as ValidSize), {
				message: `Texture width and height must be one of: ${VALID_SIZES.join(', ')}px`
			}),
			height: z.number().refine((val): val is ValidSize => VALID_SIZES.includes(val as ValidSize), {
				message: `Texture height and width must be one of: ${VALID_SIZES.join(', ')}px`
			}),
			format: z.string().refine((val) => val === 'image/png', {
				message: 'Texture must be a PNG image'
			})
		})
		.refine((data) => data.width === data.height, {
			message: 'Texture must be square (equal width and height)'
		});

	function validateTexture(
		image: HTMLImageElement,
		format: string
	): { isValid: boolean; message: string } {
		try {
			textureSchema.parse({
				width: image.width,
				height: image.height,
				format: format
			});
			return { isValid: true, message: '' };
		} catch (error) {
			if (error instanceof z.ZodError) {
				return { isValid: false, message: error.errors[0].message };
			}
			return { isValid: false, message: 'Invalid texture format or dimensions' };
		}
	}

	async function handleTextureUpdate(textureId: keyof Material['textures'], base64: string | null) {
		if (base64 === null) {
			// Handle texture removal
			material.textures[textureId] = null;
		} else {
			// Validate the image before updating
			const img = new Image();
			const validationPromise = new Promise<{ isValid: boolean; message: string }>((resolve) => {
				img.onload = () => {
					const validation = validateTexture(img, 'image/png');
					resolve(validation);
				};
				img.onerror = () => {
					resolve({ isValid: false, message: 'Failed to load image' });
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

			// Show warning if approaching limit
			if (isApproachingStorageLimit()) {
				const proceed = confirm(
					"Warning: You're approaching the browser's storage limit. " +
						'Consider exporting and removing some material packs to free up space. ' +
						'Continue anyway?'
				);
				if (!proceed) return;
			}
		}

		// Only update if validation passed or we're removing the texture
		material.textures[textureId] = base64;

		try {
			// Update both stores
			materialPack.update((pack) => {
				const updatedMaterials = [...pack.materials];
				updatedMaterials[index] = { ...material };
				return { ...pack, materials: updatedMaterials };
			});

			materialPacks.update((state) => ({
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
				'Failed to save changes: Storage quota exceeded. Please export and remove some material packs to free up space.'
			);
			// Revert the change
			material.textures[textureId] = null;
		}
	}

	function deleteMaterial() {
		const currentMaterials = $materialPack.materials;
		const newMaterials = currentMaterials.filter((_, i) => i !== index);
		materialPack.update((pack) => ({
			...pack,
			materials: newMaterials
		}));
		materialPacks.update((state) => ({
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
			onTabChange('settings');
		} else {
			const newIndex = index === 0 ? 0 : index - 1;
			onTabChange(`material-${newIndex}-assets`);
		}
		closeDialog();
	}

	function downloadExampleTextures(type: 'metallic' | 'non-metallic') {
		// This is a placeholder - you'll need to provide the actual zip file URLs
		const files = {
			metallic: '/files/texture_examples_metal.zip',
			'non-metallic': '/files/texture_examples_nonmetal.zip'
		};

		const link = document.createElement('a');
		link.href = files[type];
		link.download = `${type}-weapon-textures.zip`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<form class="material-assets-form">
	<button class="delete-material-btn" on:click={() => (showModal[0] = true)} type="button">
		<HugeiconsDelete02 width="24" height="24" />
	</button>
	<button class="download-examples-btn" on:click={() => (showModal[1] = true)} type="button">
		<HugeiconsArchive02 width="24" height="24" />
	</button>
	<h2 class="grid-wide">
		{material.material_name
			? `${material.material_name} Material Textures`
			: `Textures for Material ${index + 1}`}
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
					onImageSelect={(base64String) => handleTextureUpdate(texture.id, base64String)}
				/>
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
			Are you sure you want to delete {material.material_name || `Material ${index + 1}`}? This
			action cannot be undone.
		</p>
		<div class="modal-actions">
			<button class="cancel-btn" on:click={closeDialog}>Cancel</button>
			<button class="delete-btn" on:click={deleteMaterial}>Delete</button>
		</div>
	</div>
</CenterModal>

<!-- Download Examples Modal -->
<CenterModal modalID={1} bind:showModal>
	<div slot="description" class="modal-content">
		<h2>Download Example Textures</h2>
		<p>
			Feel free to use these as a starting point for your own weapon textures. Other good examples
			can be found on the <a
				target="_blank"
				href="https://github.com/Khazoda/basic-weapons/tree/latest-stable/common/src/main/resources/assets/basicweapons/textures/item"
				>GitHub repository</a
			>.
		</p>
		<div class="modal-actions left-aligned">
			<button class="download-btn metallic" on:click={() => downloadExampleTextures('metallic')}>
				Metallic Weapons
			</button>
			<button
				class="download-btn non-metallic"
				on:click={() => downloadExampleTextures('non-metallic')}
			>
				Non-Metallic Weapons
			</button>
		</div>
	</div>
</CenterModal>

<style lang="scss">
	.material-assets-form {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 2rem;
		background: #2c2c2c;
		border: 2px solid #1c1c1c;
		border-radius: 8px;

		h2 {
			margin: 0 0 1.5rem 0;
			color: #ffffff;
			text-transform: capitalize;
		}
	}

	.textures-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(64px, 1fr));
		gap: 2rem;
		width: 100%;
	}

	.form-element {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		label {
			color: #ffffff;
			font-weight: 400;
			letter-spacing: 0.05rem;
			font-size: 0.75rem;
		}
	}

	.grid-wide {
		grid-column: 1 / 3;
	}

	.delete-material-btn {
		position: absolute;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		color: #ff4444;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 8px;
		transition: all 0.2s ease;

		&:hover {
			background: rgba(255, 68, 68, 0.1);
		}
	}

	.download-examples-btn {
		position: absolute;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		top: 1rem;
		right: 4rem;
		background: none;
		border: none;
		color: #ffffff;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 8px;
		transition: all 0.2s ease;

		&:hover {
			background: rgba(255, 255, 255, 0.1);
		}
	}

	.modal-content h2 {
		margin: 0;
	}
	.modal-actions {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
		gap: 1rem;

		&.left-aligned {
			justify-content: flex-start;
		}

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
		}
	}

	.download-btn {
		padding: 0.5rem 1.5rem;
		border-radius: 4px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
		background: #4444ff;
		color: white;

		&:hover {
			background: #2222ff;
		}

		&.metallic {
			background: #3d6469;
			&:hover {
				background: #2c828d;
			}
		}

		&.non-metallic {
			background: #617744;
			&:hover {
				background: #679629;
			}
		}
	}
</style>

<script lang="ts">
	import { z } from "zod";
	import { materialPackNameSchema, modDependencySchema } from "$lib/materialpack/validation/materialPackValidation";
	import type { MaterialPack } from "src/lib/materialpack/types/materialpackTypes";
	import { materialPack, materialPacks } from "$lib/materialpack/stores/materialPackStore";
	import ImagePicker from "src/components/materialpack/ImagePicker.svelte";
	import ZipMaterialPackDownloader from "src/components/materialpack/ZipMaterialPackDownloader.svelte";
	import DownloadExamplesButton from "../DownloadExamplesButton.svelte";
	import { WEAPON_TEXTURES } from "$lib/materialpack/constants/weaponTextures";

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
</script>

<form class="pack-settings-form">
	<!-- Main Info -->
	<div class="pack-settings-top flex-row">
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
		<div class="flex-col w-100">
			<span class="text-input-container">
				<input
					type="text"
					id="pack_name"
					placeholder=" "
					bind:value={$materialPack.pack_name}
					on:input={e => validateAndUpdateStore(e, materialPackNameSchema, "pack_name")}
					required />
				<label for="pack_name">Material Pack Name</label>
			</span>
			<span class="text-input-container">
				<input
					type="text"
					id="mod_dependency_modid"
					placeholder=" "
					bind:value={$materialPack.mod_dependency_modid}
					on:input={e => validateAndUpdateStore(e, modDependencySchema, "mod_dependency_modid")} />
				<label for="mod_dependency_modid">Optional Mod Dependency ID</label>
				<small> e.g. 'plushables', 'mekanism'</small>
			</span>
		</div>
	</div>
	<!-- Pack Name Display -->
	<div class="pack-settings-middle flex-row">
		<span class="icon">
			{#if $materialPack}
				<ZipMaterialPackDownloader materialPack={$materialPack} />
			{/if}
		</span>
		<span
			class="pack-name-display"
			title={"bwmp_" +
				$materialPack.pack_name +
				"_" +
				($materialPack.mod_dependency_modid ? $materialPack.mod_dependency_modid : "minecraft") +
				"_1.21.x.zip"}>
			{"bwmp_" +
				$materialPack.pack_name +
				"_" +
				($materialPack.mod_dependency_modid ? $materialPack.mod_dependency_modid : "minecraft") +
				"_1.21.x.zip"}
		</span>
	</div>
	<!-- Weapon Sprites -->
	<div class="pack-settings-bottom">
		<div class="weapon-texture-preview-container flex-row">
			{#each $materialPack.materials as material}
				{#each WEAPON_TEXTURES as weaponTexture}
					<div class="weapon-texture-preview">
						<img
							src={material.textures[weaponTexture.id] || weaponTexture.placeholderBackground}
							alt={weaponTexture.label}
							class="texture-image" />
					</div>
				{/each}
			{/each}
		</div>
	</div>
</form>

<!-- Absolutely Positioned relative to form container: -->
<span class="frame-templates-download">
	<DownloadExamplesButton
		downloadOptions={{
			frame: {
				url: "/files/materialpack-frame-templates.zip",
				displayName: "Download Templates"
			}
		}}>
		<h2>Download Frame Templates</h2>
		<p>
			You can use these frame backgrounds for your materialpack icons if you wish. If you're not sure which one to use,
			check out the materialpack templates when creating a new one.
		</p>
	</DownloadExamplesButton>
</span>

<style lang="scss">
	// Container
	.pack-settings-form {
		display: flex;
		position: relative;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 2rem;
		gap: 1rem;
		outline: 2px solid #1c1c1c;
		border-radius: 8px;
		background: #303030;
	}
	// One Level Below Container
	.pack-settings-top {
		height: 128px;
		gap: 1rem;
	}
	.pack-settings-middle {
		align-items: flex-start;
		height: 48px;
		min-height: 48px;
		gap: 0.5rem;
	}

	.pack-settings-bottom {
		max-height: 328px;
		margin-top: auto;
		padding: 0.5rem;
		overflow-y: hidden;
		outline: 2px solid #1c1c1c;
		border-radius: 16px;
		background: linear-gradient(150deg, #373737 0%, #373737 45%, #8b8b8b 50%, #aaaaaa 55%, #aaaaaa 100%);
		.weapon-texture-preview-container {
			flex-wrap: wrap;
			height: 100%;
			overflow-y: auto;
			gap: 0.15rem;
			border-radius: 8px;
			background: #8b8b8b;
			&::-webkit-scrollbar {
				width: 10px;
				height: 10px;
			}
			&::-webkit-scrollbar-track {
				border-radius: 0px 5px 5px 0px;
				background: #8b8b8b;
			}
			&::-webkit-scrollbar-thumb {
				border: 0;
				border-radius: 25px;
				background: #adc4ca;
			}
			&::-webkit-scrollbar-thumb:hover {
				background: #a3a3a3;
			}
		}
	}

	.weapon-texture-preview {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0.4rem;
		.texture-image {
			width: 48px;
			height: 48px;
			object-fit: contain;
			border-radius: 2px;
			image-rendering: pixelated;
		}
	}

	// Specific Styles
	.text-input-container {
		position: relative;
		width: 100%;
		height: 48px;
		&:first-child {
			margin-top: 1rem;
			margin-bottom: 0.5rem;
		}
		&:last-child {
			margin-top: 1rem;
		}

		label {
			position: absolute;
			top: 0.85rem;
			left: 1rem;
			color: rgb(70, 70, 70);
			font-weight: 500;
			pointer-events: none;
			transition: all 0.2s ease;
		}

		input {
			width: 100%;
			height: 100%;
			padding: 0.5rem 1rem;
			border: 1px solid #3c3c3c;
			border-radius: 4px;
			background: #1c1c1c;
			color: #ffffff;

			&::placeholder {
				color: transparent;
			}

			&:focus {
				border-color: #4c4c4c;
				outline: none;
			}

			&:invalid {
				border-color: #ff4444;
			}

			&:focus + label,
			&:not(:placeholder-shown) + label {
				top: -1rem;
				left: 0.25rem;
				color: white;
				font-size: 12px;
			}
		}
	}

	.pack-name-display {
		position: relative;
		overflow-wrap: anywhere;
		width: 100%;
		&:after {
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(to left, #303030 0%, rgba(25, 25, 25, 0) 10%);
			content: "";
		}
	}

	// General Styles
	.w-100 {
		width: 100%;
	}
	.flex-row {
		display: flex;
		flex-direction: row;
	}
	.flex-col {
		display: flex;
		flex-direction: column;
	}
	small {
		display: block;
		position: absolute;
		top: -1.2rem;
		right: 0;
		color: #888888;
		font-size: 12px;
		pointer-events: none;
	}
</style>

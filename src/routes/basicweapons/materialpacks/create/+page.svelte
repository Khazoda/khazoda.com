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

	import HomeButton from 'src/components/HomeButton.svelte';

	import { blur, crossfade, draw, fade, fly, scale, slide } from 'svelte/transition';

	// Basic pack information
	let pack_name = '';
	let mod_dependency_name = '';
	let mod_dependency_id = '';
	let minecraft_version = '';

	let materials: Material[] = [];
	let pack_icon: string | null = null; // For pack.png

	let show_pack_creator = false;

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

	function handleBack() {
		show_pack_creator = false;
		selectPack(null);
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
</script>

<div class="page-container flex-col">
	<span class="absolute-top-left"><HomeButton /></span>

	<!-- Select Materialpack to work on -->
	{#if !show_pack_creator}
		<span>
			<a class="back-btn" href="/basicweapons/materialpacks"
				><HugeiconsArrowLeft02 width="42" height="42" /></a
			>
			<h1>Your Material Packs</h1>
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
								<button class="edit-pack-btn" title="Edit Material Pack">
									<HugeiconsEdit02
										width="32"
										height="32"
										on:click={() => handlePackSelect(packId)}
									/>
								</button>
								<button
									class="delete-pack-btn"
									on:click={() => deletePack(packId)}
									title="Delete Material Pack"
								>
									<HugeiconsDelete02 width="32" height="32" />
								</button>
							</div>
							<img src={pack.pack_icon || ''} alt="" />
							<span>{pack.pack_name}</span>
						</div>
					</div>
				{/each}
			</div>
			{#if Object.keys($materialPacks.packs).length < 10}
				<button class="new-pack-btn" on:click={handleCreateNew}>
					<HugeiconsPlusSignSquare />
					Create New Pack
				</button>
			{/if}
		</span>
		<!-- Materialpack Creator -->
	{:else}
		<span>
			<div class="header">
				<button class="back" on:click={handleBack}>&larr; Back to Packs</button>
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
					<input type="text" id="mod_dependency_id" bind:value={$materialPack.mod_dependency_id} />
				</div>

				<div class="form-group">
					<label for="minecraft_version">Minecraft Version</label>
					<input type="text" id="minecraft_version" bind:value={$materialPack.minecraft_version} />
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

<style lang="scss">
	.back-btn {
		display: block;
		width: 42px;
		height: 42px;
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
			span {
				position: absolute;
				left: 0;
				bottom: -0.5rem;
				width: 100%;
				font-size: 1.1rem;
				text-align: center;
				font-weight: 600;
				background: #ffffff;
				color: rgb(31, 31, 31);
				border-radius: 2px;
				padding: 0.25rem 0.5rem;
				transform: scale(1);
				transition: transform 0.1s ease-in-out;
			}
			&:hover span {
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

					&:hover {
						background: #b6b4b4;
					}
				}

				.export-pack-btn {
					transition: transform 0.1s 0.05s ease-in-out;
				}

				.edit-pack-btn {
					transition: transform 0.1s 0.05s ease-in-out;
				}
				.delete-pack-btn {
					transition: transform 0.1s 0.05s ease-in-out;
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
	.new-pack-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem;
		margin-top: 2rem;
		color: var(--new-pack-btn-color);
		background: var(--new-pack-btn-bg);
		border: var(--new-pack-btn-border);
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			background: var(--new-pack-btn-bg-hover);
		}
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
</style>

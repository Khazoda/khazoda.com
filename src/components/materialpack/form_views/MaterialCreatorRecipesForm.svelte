<script lang="ts">
	import { materialPack, materialPacks } from "$lib/materialpack/stores/materialPackStore";
	import CenterModal from "src/components/CenterModal.svelte";
	import type { Material, RecipeType } from "src/lib/materialpack/types/materialpackTypes";
	import { closeDialog } from "src/components/CenterModal.svelte";
	import { RecipeTypes } from "src/lib/materialpack/types/materialpackTypes";

	import HugeiconsDelete02 from "virtual:icons/hugeicons/delete-02";
	import HugeiconsGrid from "virtual:icons/hugeicons/grid";
	import LucideAnvil from "virtual:icons/lucide/anvil";
	import HugeiconsTriangle from "virtual:icons/hugeicons/triangle";
	import HugeiconsCircle from "virtual:icons/hugeicons/circle";
	import HugeiconsSquare from "virtual:icons/hugeicons/square";

	import smithingRecipeExample from "$lib/materialpack/media/recipe_examples/smithing_recipe_shapes_example.webp";
	import daggerRecipeExample from "$lib/materialpack/media/recipe_examples/dagger_recipe_example.webp";
	import clubRecipeExample from "$lib/materialpack/media/recipe_examples/club_recipe_example.webp";
	import hammerRecipeExample from "$lib/materialpack/media/recipe_examples/hammer_recipe_example.webp";
	import spearRecipeExample from "$lib/materialpack/media/recipe_examples/spear_recipe_example.webp";
	import quarterstaffRecipeExample from "$lib/materialpack/media/recipe_examples/quarterstaff_recipe_example.webp";
	import glaiveRecipeExample from "$lib/materialpack/media/recipe_examples/glaive_recipe_example.webp";
	import stickRecipeExampleIngredient from "$lib/materialpack/media/recipe_examples/stick_example.webp";
	import ingotRecipeExampleIngredient from "$lib/materialpack/media/recipe_examples/ingot_example.webp";

	import {
		itemMaterialInSmithingRecipeSchema,
		itemOrTagSchema,
		itemSchema,
		recipeTypeSchema
	} from "src/lib/materialpack/validation/materialPackValidation";
	import { z } from "zod";
	import ImportantButton from "../ImportantButton.svelte";

	export let material: Material;
	export let index: number;
	export let activeTab: string;
	export let onTabChange: (newTab: string) => void;

	let showModal: boolean[] = Array(1).fill(false);

	type ValidFields = keyof Omit<
		Material,
		| "textures"
		| "material_name"
		| "durability"
		| "attack_damage_bonus"
		| "attack_speed_bonus"
		| "reach_bonus"
		| "enchantability"
	>;
	type SchemaMap = {
		[K in ValidFields]: z.ZodSchema;
	};
	const schemas: SchemaMap = {
		repair_ingredient: itemOrTagSchema,
		recipe_type: recipeTypeSchema,
		handle_ingredient: itemOrTagSchema,
		upgrade_smithing_template_ingredient: itemSchema,
		smithing_weapon_material_prefix: itemMaterialInSmithingRecipeSchema
	};

	function validateAndUpdate<K extends ValidFields>(event: Event, schema: z.ZodSchema, field: K) {
		const input = event.target as HTMLInputElement;
		try {
			const value =
				field.includes("bonus") || field.includes("durability") || field.includes("enchantability")
					? parseFloat(input.value)
					: input.value;

			const validatedValue = schema.parse(value) as Material[K];
			material[field] = validatedValue;

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

			input.setCustomValidity("");
			input.reportValidity();
		} catch (error) {
			if (error instanceof z.ZodError) {
				input.setCustomValidity(error.errors[0].message);
				input.reportValidity();
			}
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
			onTabChange(`material-${newIndex}-stats`);
		}
		closeDialog();
	}

	// When a new material is created, ensure recipe_type defaults to 'crafting'
	// and handle_ingredient defaults to minecraft:stick
	if (!material.recipe_type) {
		material.recipe_type = RecipeTypes.crafting;
		material.handle_ingredient = "minecraft:stick";

		// Update both stores with the default values
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
	}

	function handleRecipeTypeChange(newType: RecipeType) {
		// Creates mock event that matches what validateAndUpdate needs parameter-wise
		const mockEvent = new Event("change");
		Object.defineProperty(mockEvent, "target", { value: { value: newType } });
		validateAndUpdate(mockEvent, schemas.recipe_type, "recipe_type");

		// Update stores with cleared fields
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
	}

	// Create an array of recipe examples with their labels
	const craftingRecipes = [
		{ image: daggerRecipeExample, label: "Dagger Recipe" },
		{ image: clubRecipeExample, label: "Club Recipe" },
		{ image: hammerRecipeExample, label: "Hammer Recipe" },
		{ image: spearRecipeExample, label: "Spear Recipe" },
		{ image: quarterstaffRecipeExample, label: "Quarterstaff Recipe" },
		{ image: glaiveRecipeExample, label: "Glaive Recipe" }
	];

	let currentRecipeIndex = 0;

	function nextRecipe() {
		currentRecipeIndex = (currentRecipeIndex + 1) % craftingRecipes.length;
	}
</script>

<form class="material-recipes-form">
	<button class="delete-material-btn" on:click={() => (showModal[0] = true)} type="button">
		<HugeiconsDelete02 width="24" height="24" />
	</button>
	<h2 class="grid-wide">
		{material.material_name ? `${material.material_name} Material Recipes` : `Recipes for Material ${index + 1}`}
	</h2>
	<!--  -->
	<div class="flex-row gap-4 align-center justify-between">
		<ImportantButton
			icon={HugeiconsGrid}
			label="Crafting Recipe"
			backdropCorner="center"
			color="blue"
			faded={material.recipe_type === RecipeTypes.crafting}
			onClick={() => handleRecipeTypeChange(RecipeTypes.crafting)} />
		<span>OR</span>
		<ImportantButton
			icon={LucideAnvil}
			label="Smithing Recipe"
			backdropCorner="center"
			color="blue"
			faded={material.recipe_type === RecipeTypes.smithing}
			onClick={() => handleRecipeTypeChange(RecipeTypes.smithing)} />
	</div>

	{#if material.recipe_type === "crafting"}
		<!-- Main Ingredient -->
		<div class="form-element element-repair-ingredient text grid-wide margin-top-12">
			<input
				type="text"
				id="repair_ingredient_{index}"
				name="repair_ingredient"
				bind:value={material.repair_ingredient}
				on:input={e => validateAndUpdate(e, schemas.repair_ingredient, "repair_ingredient")}
				required
				placeholder=" " />
			<label for="repair_ingredient_{index}">
				<img src={ingotRecipeExampleIngredient} alt="" width="16" height="16" />
				Main Ingredient
			</label>
			<small style="padding-left: 0.2rem; top:-1.75rem; right:0; pointer-events: none;">
				namespace:itemname or #namespace:tagname</small>
		</div>
		<!-- Crafting-specific fields -->
		<div class="form-element text grid-wide">
			<input
				type="text"
				id="handle_ingredient_{index}"
				name="handle_ingredient"
				bind:value={material.handle_ingredient}
				on:input={e => validateAndUpdate(e, schemas.handle_ingredient, "handle_ingredient")}
				required
				placeholder=" " />
			<label for="handle_ingredient_{index}">
				<img src={stickRecipeExampleIngredient} alt="" width="16" height="16" />
				Handle Ingredient
			</label>
			<small style="padding-left: 0.2rem; top:-1.75rem; right:0; pointer-events: none;">
				namespace:itemname or #namespace:tagname</small>
		</div>

		<!-- Recipe Example Carousel -->
		<div class="recipe-carousel grid-wide">
			<img
				src={craftingRecipes[currentRecipeIndex].image}
				alt={craftingRecipes[currentRecipeIndex].label}
				class="framed-image no-resample" />
			<button class="next-recipe-btn" on:click={nextRecipe}>
				Next Recipe
				<span class="recipe-counter">
					{currentRecipeIndex + 1}/{craftingRecipes.length}
				</span>
			</button>
		</div>
	{/if}
	{#if material.recipe_type === "smithing"}
		<!-- Main Ingredient but stylized as Upgrade Material -->
		<div class="form-element element-repair-ingredient text grid-wide margin-top-12">
			<input
				type="text"
				id="repair_ingredient_{index}"
				name="repair_ingredient"
				bind:value={material.repair_ingredient}
				on:input={e => validateAndUpdate(e, schemas.repair_ingredient, "repair_ingredient")}
				required
				placeholder=" " />
			<label for="repair_ingredient_{index}" class="circle">
				<HugeiconsCircle width="16" height="16" />
				Upgrade Material
			</label>
			<small style="padding-left: 0.2rem; top:-1.75rem; right:0; pointer-events: none;">
				namespace:itemname or #namespace:tagname</small>
		</div>
		<!-- Smithing-specific fields -->
		<div class="grid">
			<div class="form-element text">
				<input
					title="namespace:itemname or #namespace:tagname"
					type="text"
					id="upgrade_smithing_template_{index}"
					name="upgrade_smithing_template_ingredient"
					bind:value={material.upgrade_smithing_template_ingredient}
					on:input={e =>
						validateAndUpdate(e, schemas.upgrade_smithing_template_ingredient, "upgrade_smithing_template_ingredient")}
					required
					placeholder=" " />
				<label for="upgrade_smithing_template_{index}" class="square">
					<HugeiconsSquare width="16" height="16" />
					Smithing Template
				</label>
			</div>

			<div class="form-element text">
				<input
					title="namespace:itemname or #namespace:tagname"
					type="text"
					id="smithing_weapon_{index}"
					name="smithing_weapon_material_prefix"
					bind:value={material.smithing_weapon_material_prefix}
					on:input={e =>
						validateAndUpdate(e, schemas.smithing_weapon_material_prefix, "smithing_weapon_material_prefix")}
					required
					placeholder=" " />
				<label for="smithing_weapon_{index}" class="triangle">
					<HugeiconsTriangle width="16" height="16" />
					Weapon Material
				</label>
			</div>
			<img src={smithingRecipeExample} alt="Smithing Recipe Example" class="framed-image smithing grid-wide" />
		</div>
	{/if}
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
	.material-recipes-form {
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
	.grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		.form-element {
			margin-bottom: 0.75rem;
		}
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
		}
	}

	.form-element {
		margin-bottom: 2rem;
		position: relative;
		width: 100%;

		&.text {
			height: 3rem;

			label {
				align-items: center;
				align-items: center;
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
				color: rgb(70, 70, 70);
				display: inline-flex;
				display: flex;
				font-weight: 500;
				font-weight: 600;
				gap: 0.5rem;
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
				background: #1c1c1c;
				border: 1px solid #3c3c3c;
				border-radius: 4px;
				color: #ffffff;
				height: 100%;
				padding: 0.5rem 1rem;
				width: 100%;

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
			}

			input:focus + label,
			input:not(:placeholder-shown) + label {
				color: white;
				font-size: 14px;
				left: -4px;
				transform: translateY(-2.25rem);
				img {
					filter: brightness(0) invert(1); // This makes the image white
				}

				&.square {
					color: #00e5ff;
				}

				&.triangle {
					color: #ff3b3b;
				}

				&.circle {
					color: #00ff4f;
				}
			}
		}

		small {
			bottom: -1.5rem;
			color: #888888;
			display: block;
			font-size: 0.9rem;
			margin-top: 0.25rem;
			position: absolute;
		}
	}

	.grid-wide {
		grid-column: 1 / 3;
	}

	.recipe-carousel {
		margin-top: 1rem;
		position: relative;
		width: fit-content;
	}

	.framed-image {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}

	.next-recipe-btn {
		align-items: center;
		background: #3c3c3c;
		border: none;
		border-radius: 4px;
		bottom: 0.5rem;
		color: white;
		cursor: pointer;
		display: flex;
		font-family: inherit;
		font-size: 0.9rem;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		position: absolute;
		right: 0.5rem;
		transition: background-color 0.2s ease;
		width: fit-content;

		&:hover {
			background-color: #4c4c4c;
		}

		.recipe-counter {
			font-size: 0.8rem;
			opacity: 0.7;
		}
	}
</style>

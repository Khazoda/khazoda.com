<script lang="ts">
	import { z } from "zod";
	import {
		materialNameSchema,
		numberSchema,
		durabilitySchema,
		enchantabilitySchema,

		itemSchema

	} from "$lib/materialpack/validation/materialPackValidation";
	import type { Material } from "src/lib/materialpack/types/materialpackTypes";
	import { materialPack, materialPacks } from "$lib/materialpack/stores/materialPackStore";
	import HugeiconsDelete02 from "virtual:icons/hugeicons/delete-02";
	import CenterModal from "src/components/CenterModal.svelte";
	import { closeDialog } from "src/components/CenterModal.svelte";
	import { onMount } from "svelte";

	export let material: Material;
	export let index: number;
	export let activeTab: string;
	export let onTabChange: (newTab: string) => void;

	let activeModal: string | null = null;

	// Define valid field types to help TypeScript
	type ValidFields = keyof Omit<
		Material,
		| "textures"
		| "repair_ingredient"
		| "recipe_type"
		| "handle_ingredient"
		| "upgrade_smithing_template_ingredient"
		| "smithing_weapon_material_prefix"
	>;
	type SchemaMap = {
		[K in ValidFields]: z.ZodSchema;
	};

	// Map fields to their schemas
	const schemas: SchemaMap = {
		material_name: materialNameSchema,
		durability: durabilitySchema,
		mining_speed: numberSchema,
		attack_damage_bonus: numberSchema,
		attack_speed_bonus: numberSchema,
		reach_bonus: numberSchema,
		enchantability: enchantabilitySchema,
		smelts_into: itemSchema
	};

	// Function to validate a field without an event
	function validateField<K extends ValidFields>(field: K, value: any, inputElement: HTMLInputElement) {
		try {
			const schema = schemas[field];
			const parsedValue =
				field.includes("bonus") || field.includes("durability") || field.includes("enchantability") || field.includes("mining_speed")
					? parseFloat(value)
					: value;

			const validatedValue = schema.parse(parsedValue) as Material[K];
			material[field] = validatedValue;
			inputElement.setCustomValidity("");
		} catch (error) {
			if (error instanceof z.ZodError) {
				inputElement.setCustomValidity(error.errors[0].message);
			}
		}
		inputElement.reportValidity();
	}

	// Existing validateAndUpdate function remains the same
	function validateAndUpdate<K extends ValidFields>(event: Event, schema: z.ZodSchema, field: K) {
		const input = event.target as HTMLInputElement;
		try {
			const value =
				field.includes("bonus") || field.includes("durability") || field.includes("enchantability") || field.includes("mining_speed")
					? parseFloat(input.value)
					: input.value;

			const validatedValue = schema.parse(value) as Material[K];
			material[field] = validatedValue;

			// Update both stores like in the page component
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
		} catch (error) {
			if (error instanceof z.ZodError) {
				input.setCustomValidity(error.errors[0].message);
			}
		}
		input.reportValidity();
	}

	// Add onMount to validate all number fields on initial render
	onMount(() => {
		const numberFields: ValidFields[] = [
			"durability",
			"mining_speed",
			"attack_damage_bonus",
			"attack_speed_bonus",
			"reach_bonus",
			"enchantability"
		];

		numberFields.forEach(field => {
			const input = document.getElementById(`${field}_${index}`) as HTMLInputElement;
			if (input) {
				validateField(field, material[field], input);
			}
		});
	});

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
</script>

<form class="material-stats-form">
	<button class="delete-material-btn" on:click={() => (activeModal = "0")} type="button">
		<HugeiconsDelete02 width="24" height="24" />
	</button>
	<h2 class="grid-wide">
		{material.material_name ? `${material.material_name} Material Stats` : `Stats for Material ${index + 1}`}
	</h2>

	<div class="form-element text">
		<input
			type="text"
			id="material_name_{index}"
			name="material_name"
			bind:value={material.material_name}
			on:input={e => validateAndUpdate(e, schemas.material_name, "material_name")}
			required
			placeholder=" " />
		<label for="material_name_{index}">Material Name</label>
	</div>

	<div class="form-element text">
		<input
			type="number"
			id="durability_{index}"
			name="durability"
			bind:value={material.durability}
			on:input={e => validateAndUpdate(e, schemas.durability, "durability")}
			required
			placeholder=" " />
		<label for="durability_{index}">Durability</label>
	</div>

	<div class="form-element text">
		<input
			type="number"
			id="mining_speed_{index}"
			name="mining_speed"
			bind:value={material.mining_speed}
			step="0.01"
			on:input={e => validateAndUpdate(e, schemas.mining_speed, "mining_speed")}
			placeholder=" " />
		<label for="mining_speed_{index}">Mining Speed</label>
	</div>

	<div class="form-element text">
		<input
			type="number"
			id="attack_damage_bonus_{index}"
			name="attack_damage_bonus"
			bind:value={material.attack_damage_bonus}
			step="0.01"
			on:input={e => validateAndUpdate(e, schemas.attack_damage_bonus, "attack_damage_bonus")}
			placeholder=" " />
		<label for="attack_damage_bonus_{index}">Attack Damage Bonus</label>
	</div>

	<div class="form-element text">
		<input
			type="number"
			id="attack_speed_bonus_{index}"
			name="attack_speed_bonus"
			bind:value={material.attack_speed_bonus}
			step="0.01"
			on:input={e => validateAndUpdate(e, schemas.attack_speed_bonus, "attack_speed_bonus")}
			placeholder=" " />
		<label for="attack_speed_bonus_{index}">Attack Speed Bonus</label>
	</div>

	<div class="form-element text">
		<input
			type="number"
			id="reach_bonus_{index}"
			name="reach_bonus"
			bind:value={material.reach_bonus}
			step="0.01"
			on:input={e => validateAndUpdate(e, schemas.reach_bonus, "reach_bonus")}
			placeholder=" " />
		<label for="reach_bonus_{index}">Reach Bonus</label>
	</div>

	<div class="form-element text">
		<input
			type="number"
			id="enchantability_{index}"
			name="enchantability"
			bind:value={material.enchantability}
			on:input={e => validateAndUpdate(e, schemas.enchantability, "enchantability")}
			required
			placeholder=" " />
		<label for="enchantability_{index}">Enchantability</label>
	</div>
</form>

<!-- Delete Material Modal -->
<CenterModal modalID="0" bind:activeModal>
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
	.material-stats-form {
		background: #2c2c2c;
		outline: 2px solid #1c1c1c;
		border-radius: 8px;
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr;
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

	.form-element {
		margin-bottom: 2rem;
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
	.grid-wide {
		grid-column: 1 / 3;
	}
</style>

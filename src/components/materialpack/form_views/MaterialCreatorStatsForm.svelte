<script lang="ts">
	import { z } from 'zod';
	import {
		materialNameSchema,
		numberSchema,
		durabilitySchema,
		enchantabilitySchema
	} from '$lib/materialpack/validation/materialPackValidation';
	import type { Material } from 'src/lib/materialpack/types/materialpackTypes';
	import { materialPack, materialPacks } from '$lib/materialpack/stores/materialPackStore';
	import HugeiconsDelete02 from 'virtual:icons/hugeicons/delete-02';
	import CenterModal from 'src/components/CenterModal.svelte';
	import { closeDialog } from 'src/components/CenterModal.svelte';
	import { onMount } from 'svelte';

	export let material: Material;
	export let index: number;
	export let activeTab: string;
	export let onTabChange: (newTab: string) => void;

	let showModal: boolean[] = Array(1).fill(false);

	// Define valid field types to help TypeScript
	type ValidFields = keyof Omit<
		Material,
		| 'textures'
		| 'repair_ingredient'
		| 'recipe_type'
		| 'handle_ingredient'
		| 'upgrade_smithing_template_ingredient'
		| 'smithing_weapon_material_ingredient'
		| 'smithing_upgrade_material_ingredient'
	>;
	type SchemaMap = {
		[K in ValidFields]: z.ZodSchema;
	};

	// Map fields to their schemas
	const schemas: SchemaMap = {
		material_name: materialNameSchema,
		durability: durabilitySchema,
		attack_damage_bonus: numberSchema,
		attack_speed_bonus: numberSchema,
		reach_bonus: numberSchema,
		enchantability: enchantabilitySchema
	};

	// Function to validate a field without an event
	function validateField<K extends ValidFields>(
		field: K,
		value: any,
		inputElement: HTMLInputElement
	) {
		try {
			const schema = schemas[field];
			const parsedValue =
				field.includes('bonus') || field.includes('durability') || field.includes('enchantability')
					? parseFloat(value)
					: value;

			const validatedValue = schema.parse(parsedValue) as Material[K];
			material[field] = validatedValue;
			inputElement.setCustomValidity('');
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
				field.includes('bonus') || field.includes('durability') || field.includes('enchantability')
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

			input.setCustomValidity('');
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
			'durability',
			'attack_damage_bonus',
			'attack_speed_bonus',
			'reach_bonus',
			'enchantability'
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
			onTabChange('settings');
		} else {
			const newIndex = index === 0 ? 0 : index - 1;
			onTabChange(`material-${newIndex}-stats`);
		}
		closeDialog();
	}
</script>

<form class="material-stats-form">
	<button class="delete-material-btn" on:click={() => (showModal[0] = true)} type="button">
		<HugeiconsDelete02 width="24" height="24" />
	</button>
	<h2 class="grid-wide">
		{material.material_name
			? `${material.material_name} Material Stats`
			: `Stats for Material ${index + 1}`}
	</h2>

	<div class="form-element text">
		<input
			type="text"
			id="material_name_{index}"
			name="material_name"
			bind:value={material.material_name}
			on:input={e => validateAndUpdate(e, schemas.material_name, 'material_name')}
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
			on:input={e => validateAndUpdate(e, schemas.durability, 'durability')}
			required
			placeholder=" " />
		<label for="durability_{index}">Durability</label>
	</div>

	<div class="form-element text">
		<input
			type="number"
			id="attack_damage_bonus_{index}"
			name="attack_damage_bonus"
			bind:value={material.attack_damage_bonus}
			step="0.01"
			on:input={e => validateAndUpdate(e, schemas.attack_damage_bonus, 'attack_damage_bonus')}
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
			on:input={e => validateAndUpdate(e, schemas.attack_speed_bonus, 'attack_speed_bonus')}
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
			on:input={e => validateAndUpdate(e, schemas.reach_bonus, 'reach_bonus')}
			placeholder=" " />
		<label for="reach_bonus_{index}">Reach Bonus</label>
	</div>

	<div class="form-element text">
		<input
			type="number"
			id="enchantability_{index}"
			name="enchantability"
			bind:value={material.enchantability}
			on:input={e => validateAndUpdate(e, schemas.enchantability, 'enchantability')}
			required
			placeholder=" " />
		<label for="enchantability_{index}">Enchantability</label>
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

<style lang="scss">
	.material-stats-form {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		width: 100%;
		height: 100%;
		padding: 2rem;
		background: #2c2c2c;
		border: 2px solid #1c1c1c;
		border-radius: 8px;

		h2 {
			margin: 0 0 2.5rem 0;
			color: #ffffff;
			text-transform: capitalize;
		}
	}

	.form-element {
		position: relative;
		margin-bottom: 2rem;
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
				background: #1c1c1c;
				border: 1px solid #3c3c3c;
				border-radius: 4px;
				color: #ffffff;

				&::placeholder {
					color: transparent;
				}

				&:focus {
					outline: none;
					border-color: #4c4c4c;
				}

				&:invalid {
					border-color: #ff4444;
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

		small {
			display: block;
			margin-top: 0.25rem;
			color: #888888;
			font-size: 0.9rem;
			position: absolute;
			bottom: -1.5rem;
		}
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
		}
	}
	.grid-wide {
		grid-column: 1 / 3;
	}
</style>

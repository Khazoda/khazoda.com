<script lang="ts">
	import { getVersionRanges } from '../../routes/basicweapons/materialpacks/create/data';
	import { materialPack, materialPacks } from '$lib/materialpack/stores/materialPackStore';
	import { minecraftVersionSchema } from '$lib/materialpack/validation/materialPackValidation';
	import { z } from 'zod';

	const versionRanges = getVersionRanges();

	function validateAndUpdateStore(event: Event) {
		const input = event.target as HTMLSelectElement;
		try {
			const validatedValue = minecraftVersionSchema.parse(input.value);
			materialPack.update((pack) => ({
				...pack,
				minecraft_version: validatedValue
			}));

			materialPacks.update((state) => ({
				...state,
				packs: {
					...state.packs,
					[$materialPack.localstorage_id]: {
						...state.packs[$materialPack.localstorage_id],
						minecraft_version: validatedValue
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

<div class="form-element select">
	<select
		id="minecraft_version"
		bind:value={$materialPack.minecraft_version}
		on:change={validateAndUpdateStore}
		required
	>
		<option value="" disabled selected>Minecraft Version</option>
		{#each versionRanges as version}
			<option value={version}>{version}</option>
		{/each}
	</select>
</div>

<style lang="scss">
	.form-element {
		&.select {
			height: 3rem;
			position: relative;

			select {
				width: 100%;
				height: 100%;
				padding: 0.5rem 1rem;
				border-radius: 4px;
				background: white;
				cursor: pointer;
				appearance: none;

				&:required:invalid {
					color: gray;
				}

				option {
					color: black;

					&[value=''][disabled] {
						display: none;
					}
				}
			}

			&::after {
				content: '▼';
				font-size: 0.8rem;
				position: absolute;
				right: 1rem;
				top: 50%;
				transform: translateY(-50%);
				pointer-events: none;
				color: black;
			}

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
				color: black;
				font-weight: 500;
				pointer-events: none;
				transition: 0.2s ease;
			}

			select:focus + label,
			select:valid + label {
				transform: translateY(-2.25rem);
				left: -4px;
				color: white;
				font-size: 14px;
			}
		}
	}
</style>

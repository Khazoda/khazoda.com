<script lang="ts">
	// Basic pack information
	let pack_name = '';
	let mod_dependency_name = '';
	let mod_dependency_id = '';
	let minecraft_version = '';

	// Material properties
	type Material = {
		name: string;
		durability: number;
		attack_damage_bonus: number;
		attack_speed_bonus: number;
		reach_bonus: number;
		enchantability: number;
		repair_ingredient: string;
		textures: {
			dagger: string | null;
			hammer: string | null;
			club: string | null;
			spear: string | null;
			spear_held: string | null;
			quarterstaff: string | null;
			quarterstaff_held: string | null;
			glaive: string | null;
			glaive_held: string | null;
		};
	};

	let materials: Material[] = [];
	let pack_icon: string | null = null; // For pack.png

	// Function to add new material
	function addMaterial() {
		materials = [
			...materials,
			{
				name: '',
				durability: 0,
				attack_damage_bonus: 0,
				attack_speed_bonus: 0,
				reach_bonus: 0,
				enchantability: 0,
				repair_ingredient: '',
				textures: {
					dagger: null,
					hammer: null,
					club: null,
					spear: null,
					spear_held: null,
					quarterstaff: null,
					quarterstaff_held: null,
					glaive: null,
					glaive_held: null
				}
			}
		];
	}

	let show_pack_creator = false;
</script>

<div class="page-container">
	{#if !show_pack_creator}
		<h1>Packs</h1>
	{:else if show_pack_creator}
		<h1>Create Material Pack</h1>
	{/if}
</div>

<style lang="scss">
	.page-container {
		width: calc(100dvw - 16px);
		height: calc(100dvh - 16px);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

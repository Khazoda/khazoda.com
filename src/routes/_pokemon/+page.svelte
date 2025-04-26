<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import PokemonPage from "src/pokemon/PokemonPage.svelte";

	let showSecret = false;

	onMount(() => {
		if (sessionStorage.getItem("secret_pokemon") === "1") {
			showSecret = true;
			sessionStorage.removeItem("secret_pokemon"); // Prevent reuse
		} else {
			goto("/", { replaceState: true });
		}
	});
</script>

<svelte:head>
	<!-- Prevent Indexing -->
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if showSecret}
	<PokemonPage />
{/if}

<style>
	:global(body) {
		padding: 0 !important;
	}
</style>

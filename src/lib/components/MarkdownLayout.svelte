<script>
	import MarkdownSideNav from "./MarkdownSideNav.svelte";

	// Props
	export let showSideNav = true;
</script>

<div class="page-container">
	{#if showSideNav}
		<div class="side-nav-container">
			<MarkdownSideNav />
		</div>
	{/if}
	<div class="markdown-body">
		<slot />
	</div>
</div>

<style>
	.page-container {
		display: flex;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		gap: 2rem;
	}

	.side-nav-container {
		display: none;
	}

	/* Show side nav on larger screens */
	@media (min-width: 1024px) {
		.side-nav-container {
			display: block;
			flex-shrink: 0;
			width: 250px;
		}

		.markdown-body {
			flex: 1;
		}
	}

	/* When side nav is hidden */
	:global(.page-container:not(:has(.side-nav-container)) .markdown-body) {
		max-width: 60rem;
		margin: 0 auto;
	}
</style>

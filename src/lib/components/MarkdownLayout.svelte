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
	<div class="content-container">
		<div class="markdown-body">
			<slot />
		</div>
	</div>
</div>

<style>
	.page-container {
		position: relative;
		width: 100%;
	}

	.side-nav-container {
		display: none;
	}

	.content-container {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	/* Show side nav on larger screens */
	@media (min-width: 1200px) {
		.side-nav-container {
			display: block;
			z-index: 10;
			position: fixed;
			top: 0;
			left: calc((100vw - 1200px) / 2);
			width: 250px;
			height: 100vh;
			padding-top: 2rem;
		}

		/* Adjust when viewport is smaller than expected */
		@media (max-width: 1300px) {
			.side-nav-container {
				left: 1rem;
			}
		}
	}
</style>

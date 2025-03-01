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
		display: flex;
		position: relative;
		justify-content: center;
		width: 100%;
	}

	.side-nav-container {
		display: none;
	}

	.content-container {
		display: flex;
		justify-content: center;
		width: 100%;
		max-width: 800px;
	}

	/* Show side nav on larger screens */
	@media (min-width: 1340px) {
		.side-nav-container {
			display: block;
			position: fixed;
			top: 0;
			left: max(calc(50% - 650px), 1rem);
			width: 250px;
			height: 100vh;
		}

		.content-container {
			margin: 0 auto;
		}
	}

	/* Medium screens */
	@media (min-width: 768px) and (max-width: 1199px) {
		.content-container {
			padding: 0 2rem;
		}
	}

	/* Small screens */
	@media (max-width: 767px) {
		.content-container {
			padding: 0 1rem;
		}
	}
</style>

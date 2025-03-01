<script lang="ts">
	import { onMount } from "svelte";

	// Props
	export let contentSelector = ".markdown-body";
	export let headerSelectors = "h1, h2, h3, h4";
	export let activeClass = "active";
	export let offset = 80;

	interface HeaderItem {
		id: string;
		text: string;
		level: number;
	}

	let headers: HeaderItem[] = [];
	let activeId = "";

	onMount(() => {
		const contentElement = document.querySelector(contentSelector);
		if (!contentElement) return;

		const headerElements = contentElement.querySelectorAll(headerSelectors);

		// Process headers to create navigation items
		headers = Array.from(headerElements).map((header, index) => {
			// If header doesn't have an id, create one
			if (!header.id) {
				const headerText = header.textContent || `header-${index}`;
				header.id = `header-${index}-${headerText
					.toLowerCase()
					.replace(/\s+/g, "-")
					.replace(/[^\w-]/g, "")}`;
			}

			return {
				id: header.id,
				text: header.textContent || `Header ${index}`,
				level: parseInt(header.tagName.substring(1))
			};
		});

		// Set up intersection observer to track active section
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				});
			},
			{
				rootMargin: `-${offset}px 0px -80% 0px`
			}
		);

		headerElements.forEach(header => observer.observe(header));

		return () => {
			headerElements.forEach(header => observer.unobserve(header));
		};
	});

	function getIndentation(level: number): string {
		return (level - 1) * 1 + "rem";
	}
</script>

<div class="markdown-side-nav">
	<nav>
		<ul>
			{#each headers as header}
				<li style="padding-left: {getIndentation(header.level)}">
					<a href="#{header.id}" class={activeId === header.id ? activeClass : ""}>
						{header.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style>
	.markdown-side-nav {
		position: sticky;
		top: 2rem;
		width: 250px;
		max-height: calc(100vh - 4rem);
		padding-right: 1rem;
		overflow-y: auto;
		font-size: 0.9rem;
	}

	nav {
		border-left: 1px solid var(--color-divider, #474b54);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	li {
		margin-bottom: 0.5rem;
	}

	a {
		display: block;
		margin-left: -1px;
		padding: 0.25rem 0.5rem;
		border-left: 2px solid transparent;
		color: var(--color-text-secondary, #96a2b0);
		line-height: 1.2;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	a:hover {
		color: var(--color-link, #4f9cff);
		text-decoration: none;
	}

	a.active {
		border-left: 2px solid var(--color-link, #4f9cff);
		color: var(--color-link, #4f9cff);
		font-weight: 500;
	}
</style>

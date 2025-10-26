<script lang="ts">
	import HomeButton from "src/components/HomeButton.svelte";
import { onMount } from "svelte";

	// Props
	export let contentSelector = ".markdown-body";
	export let headerSelectors = "h1, h2, h3, h4";
	export let activeClass = "active";
	export let offset = 80;
	export let homePath = "/";

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
		<div class="home-button">
			<a href={homePath}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
					<polyline points="9 22 9 12 15 12 15 22"></polyline>
				</svg>
				<span>Home</span>
			</a>
		</div>
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
<div class="mobile-homebutton">
	<HomeButton/>
</div>


<style>
	.markdown-side-nav {
		position: sticky;
		top: 2.5rem;
		width: 250px;
		height: calc(100vh - 4rem);
		padding-right: 1.5rem;
		overflow-y: auto;
		scrollbar-color: var(--color-divider) transparent;
		scrollbar-width: thin;
	}

	@media (max-width: 1340px) {
		.markdown-side-nav {
			display: none;
		}
	}

	.markdown-side-nav::-webkit-scrollbar {
		width: 4px;
	}

	.markdown-side-nav::-webkit-scrollbar-track {
		background: transparent;
	}

	.markdown-side-nav::-webkit-scrollbar-thumb {
		border-radius: 3px;
		background-color: var(--color-divider);
	}

	nav ul {
		margin-top: 1.5rem;
		padding: 0.5rem 0;
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

	.home-button a {
		display: flex;
		align-items: center;
		padding: 0.5rem 0.75rem;
		gap: 0.5rem;
		background-color: var(--color-hover-bg, rgba(75, 125, 150, 0.1));
		font-weight: 500;
		font-size: 1rem;
	}

	.home-button a:hover {
		background-color: var(--color-active-bg, rgba(79, 156, 255, 0.2));
	}

	.nav-divider {
		height: 1px;
		margin: 0.75rem 0;
	}

	a {
		display: block;
		margin-left: -1px;
		padding: 0.25rem 0.75rem;
		overflow: hidden;
		border-left: 2px solid transparent;
		color: var(--color-text-secondary, #96a2b0);
		font-size: 0.95rem;
		line-height: 1.4;
		text-decoration: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		transition: all 0.2s ease;
	}

	a:hover {
		background-color: var(--color-hover-bg, rgba(79, 156, 255, 0.1));
		color: var(--color-link, #4f9cff);
		text-decoration: none;
	}

	a.active {
		border-left: 2px solid var(--color-link, #4f9cff);
		background-color: var(--color-active-bg, rgba(79, 156, 255, 0.1));
		color: var(--color-link, #4f9cff);
		font-weight: 500;
	}

	.mobile-homebutton {
		position: fixed;
		bottom:1.5rem;
		right:1.5rem;
	}

	@media screen and (min-width: 1340px) {
		.mobile-homebutton {
			display: none;
		}
	}
</style>

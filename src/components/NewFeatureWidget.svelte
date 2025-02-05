<script lang="ts">
	import { SHOW_NEW_FEATURE_BANNER } from "src/config/general-config";

	export let title: string = "New Feature";
	export let showBadge: boolean = true;
	export let icon: string | undefined = undefined;
	export let href: string | undefined = undefined;
</script>

{#if SHOW_NEW_FEATURE_BANNER}
	<div class="feature-widget">
		{#if showBadge}
			<span class="badge">NEW</span>
		{/if}
		{#if icon}
			<div class="icon-wrapper">
				<img src={icon} alt="" class="no-resample" />
			</div>
		{/if}
		<div class="content-wrapper">
			<h3>{title}</h3>
			<div class="content">
				<slot />
			</div>
		</div>
		{#if href}
			<!-- svelte-ignore a11y-missing-content -->
			<a {href} class="link-overlay" />
		{/if}
	</div>
{/if}

<style lang="scss">
	.feature-widget {
		background: #2c2c2c;
		border: 2px solid #1c1c1c;
		border-radius: 8px;
		box-shadow:
			0 8px 16px rgba(0, 0, 0, 0.25),
			0 2px 4px rgba(0, 0, 0, 0.1);
		left: 2rem;
		max-width: 400px;
		padding: 1rem 1.25rem 1rem 3rem;
		position: fixed;
		top: 2rem;
		transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		z-index: 1000;

		@media screen and (max-width: 999px) {
			display: none;
		}

		&:hover {
			border-color: #51ebff;
			box-shadow:
				0 12px 20px rgba(0, 0, 0, 0.3),
				0 4px 6px rgba(0, 0, 0, 0.15);
			transform: translateY(-2px);

			.icon-wrapper img {
				transform: translateY(-1px);
			}
		}
	}

	.icon-wrapper {
		align-items: center;
		display: flex;
		height: 64px;
		justify-content: center;
		left: -1.5rem;
		position: absolute;
		top: -1.5rem;
		width: 64px;

		img {
			filter: drop-shadow(4px 4px 0px rgba(20, 20, 20, 0.4));
			height: 100%;
			object-fit: contain;
			transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			width: 100%;
		}
	}

	.badge {
		background: #51ebff;
		border-radius: 1rem;
		box-shadow: 0 2px 4px rgba(81, 235, 255, 0.3);
		color: #1a1a1a;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.025em;
		padding: 0.35rem 0.75rem;
		position: absolute;
		right: -0.75rem;
		text-transform: uppercase;
		top: -0.75rem;
	}

	.content-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 48px;
	}

	.content {
		color: #e9e9ec;
		font-size: 0.95rem;
		line-height: 1.5;
		margin-top: 0.5rem;
	}

	h3 {
		color: #51ebff;
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
	}

	.link-overlay {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}
</style>

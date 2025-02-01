<script lang="ts">
	import { SHOW_NEW_FEATURE_BANNER } from 'src/config/general-config';

	export let title: string = 'New Feature';
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
		position: fixed;
		top: 2rem;
		left: 2rem;
		padding: 1rem 1.25rem 1rem 3rem;
		background: #2c2c2c;
		border: 2px solid #1c1c1c;
		border-radius: 8px;
		max-width: 400px;
		box-shadow:
			0 8px 16px rgba(0, 0, 0, 0.25),
			0 2px 4px rgba(0, 0, 0, 0.1);
		transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		z-index: 1000;

		@media screen and (max-width: 999px) {
			display: none;
		}

		&:hover {
			transform: translateY(-2px);
			box-shadow:
				0 12px 20px rgba(0, 0, 0, 0.3),
				0 4px 6px rgba(0, 0, 0, 0.15);
			border-color: #51ebff;

			.icon-wrapper img {
				transform: translateY(-1px);
			}
		}
	}

	.icon-wrapper {
		position: absolute;
		left: -1.5rem;
		top: -1.5rem;
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.3));
			transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}

	.badge {
		position: absolute;
		top: -0.75rem;
		right: -0.75rem;
		background: #51ebff;
		color: #1a1a1a;
		padding: 0.35rem 0.75rem;
		border-radius: 1rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.025em;
		box-shadow: 0 2px 4px rgba(81, 235, 255, 0.3);
		text-transform: uppercase;
	}

	.content-wrapper {
		min-height: 48px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.content {
		margin-top: 0.5rem;
		line-height: 1.5;
		color: #e9e9ec;
		font-size: 0.95rem;
	}

	h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #51ebff;
		margin: 0;
		filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.3));
	}

	.link-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>

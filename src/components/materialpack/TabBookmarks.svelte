<script lang="ts">
	import HugeiconsImage01 from 'virtual:icons/hugeicons/image-01';
	import HugeiconsAbacus from 'virtual:icons/hugeicons/abacus';
	import HugeiconsPlusSignSquare from 'virtual:icons/hugeicons/plus-sign-square';
	import type { Material } from '$lib/materialpack/types/materialpackTypes';

	export let tabs: Tab[];
	export let activeTab: string;
	export let onTabChange: (tabId: string, subType?: string) => void;
	export let onAddMaterial: () => void;

	// Keep track of last selected subtab for each material to switch back to easily for users
	let materialLastSubTabs: Record<number, 'stats' | 'assets'> = {};

	interface Tab {
		id: string;
		type: 'settings' | 'material';
		label: string;
		icon?: any;
		materialIndex?: number;
		material?: Material;
	}

	function getFirstTexture(material: Material): string | null {
		const textureKeys = Object.keys(material.textures) as Array<keyof Material['textures']>;
		return textureKeys.reduce<string | null>((first, key) => {
			return first || material.textures[key];
		}, null);
	}

	function handleMaterialSubTabClick(materialIndex: number, subType: 'stats' | 'assets') {
		materialLastSubTabs[materialIndex] = subType;
		onTabChange(`material-${materialIndex}`, subType);
	}

	function handleMaterialTabClick(materialIndex: number) {
		const subType = materialLastSubTabs[materialIndex] || 'stats';
		handleMaterialSubTabClick(materialIndex, subType);
	}

	function handleAddMaterialClick() {
		onAddMaterial();
	}
</script>

<div class="bookmark-container">
	<!-- Settings tab at the top -->
	{#each tabs.filter((tab) => tab.type === 'settings') as tab}
		<button
			class="bookmark-tab"
			class:active={activeTab === tab.id}
			on:click={() => onTabChange(tab.id)}
			title={tab.label}
		>
			{#if tab.icon}
				<span class="icon">
					<svelte:component this={tab.icon} width="24" height="24" />
				</span>
			{/if}
			<span class="label">{tab.label}</span>
		</button>
	{/each}

	<!-- Scrollable material tabs container -->
	<div class="material-tabs-container">
		{#each tabs.filter((tab) => tab.type === 'material') as tab}
			<button
				class="material-bookmark-tab"
				class:active={activeTab.startsWith(`material-${tab.materialIndex}-`)}
				on:click={() =>
					tab.materialIndex !== undefined && handleMaterialTabClick(tab.materialIndex)}
				type="button"
			>
				<button
					class="sub-tab stats"
					class:active={activeTab === `material-${tab.materialIndex}-stats`}
					on:click|stopPropagation={() =>
						tab.materialIndex !== undefined &&
						handleMaterialSubTabClick(tab.materialIndex, 'stats')}
					title="Stats"
				>
					<HugeiconsAbacus width="32" height="32" />
				</button>
				<button
					class="sub-tab assets"
					class:active={activeTab === `material-${tab.materialIndex}-assets`}
					on:click|stopPropagation={() =>
						tab.materialIndex !== undefined &&
						handleMaterialSubTabClick(tab.materialIndex, 'assets')}
					title="Assets"
				>
					{#if tab.material && getFirstTexture(tab.material)}
						<img
							src={getFirstTexture(tab.material)}
							alt="Material Texture"
							width="24"
							height="24"
						/>
					{:else}
						<HugeiconsImage01 width="24" height="24" />
					{/if}
				</button>
				<span class="material-label">{tab.label}</span>
			</button>
		{/each}
	</div>

	<!-- Add material button at the bottom -->
	<button
		class="bookmark-tab add-material-btn"
		on:click={handleAddMaterialClick}
		title="Add New Material"
	>
		<HugeiconsPlusSignSquare width="24" height="24" />
	</button>
</div>

<style lang="scss">
	.bookmark-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		position: absolute;
		left: calc(100% - 1.5rem);
		top: 1rem;
		width: fit-content;
	}

	.bookmark-tab {
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
		gap: 0.5rem;
		padding: 0.5rem 1rem 0.5rem 2rem;
		background: #333333;
		border: 2px solid #1c1c1c;
		border-left: none;
		border-radius: 0 6px 6px 0;
		cursor: pointer;
		transition: all 0.1s ease;
		width: fit-content;
		text-wrap: nowrap;

		&:hover {
			background: rgb(77, 77, 77);
			color: #71b3ff;
		}

		&.active {
			background: #2c2c2c;
			color: #5bd9ff;
			transform: translateX(0.5rem);
		}

		.icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		.label {
			font-weight: 600;
			user-select: none;
		}
	}

	.material-bookmark-tab {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.75rem 0.25rem 2rem;
		background: #333333;
		border: 2px solid #1c1c1c;
		border-left: none;
		border-radius: 0 6px 6px 0;
		transition: all 0.1s ease;
		width: fit-content;

		&.active {
			background: #2c2c2c;
			transform: translateX(0.5rem);
		}

		.sub-tab {
			width: 32px;
			height: 32px;
			padding: 1px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			background: #404040;
			border: 1px solid #1c1c1c;
			border-radius: 4px;
			transition: all 0.1s ease;
			img {
				filter: drop-shadow(2.5px 2.5px 0px rgba(25, 25, 25, 0.5));
			}
			&:hover {
				background: #505050;
				color: #71b3ff;
			}

			&.active {
				background: #2c2c2c;
				color: #5bd9ff;
			}
		}

		.material-label {
			font-weight: 600;
			user-select: none;
			text-wrap: nowrap;
			max-width: 150px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.add-material-btn {
		margin-top: 0.5rem;
		padding: 0.5rem 0.5rem 0.5rem 2rem;
		opacity: 0.7;

		&:hover {
			opacity: 1;
			background: #404040;
			color: #5bd9ff;
		}
	}

	.material-tabs-container {
		display: flex;
		position: relative;
		flex-direction: column;
		gap: 0.5rem;
		max-height: 450px;
		overflow-y: auto;
		overflow-x: visible;
		padding-right: 0.5rem;
		margin-right: -0.5rem;

		// Scrollbar styling
		&::-webkit-scrollbar {
			width: 6px;
		}

		&::-webkit-scrollbar-track {
			background: #1c1c1c;
			border-radius: 3px;
		}

		&::-webkit-scrollbar-thumb {
			background: #404040;
			border-radius: 3px;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: #505050;
		}
	}

	/* Add style for the texture image */
	.sub-tab img {
		object-fit: contain;
		width: 24px;
		height: 24px;
	}
</style>

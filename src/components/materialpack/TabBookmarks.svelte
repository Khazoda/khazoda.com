<script lang="ts">
	import HugeiconsImage01 from 'virtual:icons/hugeicons/image-01';
	import HugeiconsAbacus from 'virtual:icons/hugeicons/abacus';
	import HugeiconsPlusSignSquare from 'virtual:icons/hugeicons/plus-sign-square';

	export let tabs:
		| Array<{
				id: string;
				label: string;
				type: 'settings' | 'material';
				materialIndex?: number;
				icon?: any;
		  }>
		| any;
	export let activeTab: string;
	export let onTabChange: (tabId: string, subType?: string) => void;
	export let onAddMaterial: () => void;

	// Keep track of last selected subtab for each material
	let materialLastSubTabs: Record<number, 'stats' | 'assets'> = {};

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
		// Get the new material's index (will be the length of current tabs minus 1, which excludes the "Add Material" button)
		const newMaterialIndex = tabs.filter((tab: { type: string }) => tab.type === 'material').length;
		// Switch to newly created material tab
		handleMaterialSubTabClick(newMaterialIndex, 'stats');
	}
</script>

<div class="bookmark-container">
	{#each tabs as tab}
		{#if tab.type === 'settings'}
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
		{:else}
			<button
				class="material-bookmark-tab"
				class:active={activeTab.startsWith(`material-${tab.materialIndex}`)}
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
					<HugeiconsImage01 width="24" height="24" />
				</button>
				<span class="material-label">{tab.label}</span>
			</button>
		{/if}
	{/each}

	<button
		class="bookmark-tab add-material-btn"
		on:click={handleAddMaterialClick}
		title="Add Material"
	>
		<span class="icon">
			<HugeiconsPlusSignSquare width="24" height="24" />
		</span>
		<span class="label">Add Material</span>
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
		opacity: 0.7;

		&:hover {
			opacity: 1;
			background: #404040;
			color: #5bd9ff;
		}
	}
</style>

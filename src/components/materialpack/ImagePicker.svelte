<script lang="ts">
	export let currentImage: string | null = null;
	export let accept: string = 'image/png';
	export let onImageSelect: (base64: string) => void;
	export let imgSize: string = '128px';
	export let maxUploadSize: number = 256 * 256;
	export let padding: string = '0rem';
	export let backgroundImage: string = '';
	export let placeholderBackground: string = '';

	let inputRef: HTMLInputElement;

	function handleClick() {
		inputRef.click();
	}

	async function handleChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const base64String = e.target?.result as string;
				onImageSelect(base64String);
			};
			reader.readAsDataURL(file);
		}
	}
</script>

<div class="image-picker" style={`padding: ${padding};`}>
	<input
		type="file"
		{accept}
		bind:this={inputRef}
		on:change={handleChange}
		style="display: none;"
	/>

	<button
		class="picker-button"
		on:click={handleClick}
		title="Click to change image"
		style={`width: ${imgSize}; height: ${imgSize}; padding: ${padding};`}
	>
		{#if currentImage}
			{#if backgroundImage}
				<img src={backgroundImage} alt="Background image" class="background-image" />
			{/if}
			<img src={currentImage} alt="Selected image" class="preview-image no-resample" />
		{:else}
			<div class="placeholder">
				{#if placeholderBackground}
					<img
						src={placeholderBackground}
						alt="Placeholder outline"
						class="placeholder-background"
					/>
				{:else}
					<svg viewBox="0 0 24 24" width="32" height="32">
						<path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
					</svg>
				{/if}
			</div>
		{/if}
	</button>
</div>

<style lang="scss">
	.image-picker {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: fit-content;
		border: 2px dashed #ccc;
		&:hover {
			border: 2px dashed #fff;
		}
	}

	.picker-button {
		width: 128px;
		height: 128px;
		position: relative;
		border: none;
		border-radius: 4px;
		background: none;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			border-color: #fff;
			.placeholder {
				color: #fff;
			}
		}
	}

	.preview-image {
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: drop-shadow(3.5px 3.5px 0px rgba(25, 25, 25, 0.3));
	}

	.placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ccc;
	}

	.background-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		image-rendering: pixelated;
		filter: blur(0px);
	}

	.placeholder-background {
		width: 100%;
		height: 100%;
		object-fit: contain;
		opacity: 0.4;
		filter: brightness(0.5);
		image-rendering: pixelated;
	}
</style>

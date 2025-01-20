<script lang="ts">
	export let currentImage: string | null = null;
	export let accept: string = 'image/png';
	export let onImageSelect: (base64: string) => void;

	let inputRef: HTMLInputElement;

	function handleClick() {
		inputRef.click();
	}

	async function handleChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file) {
			if (file.size > 256 * 256) {
				alert('Image dimensions must be 256 x 256 pixels or less (32x32 is recommended)');
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				const base64String = e.target?.result as string;
				onImageSelect(base64String);
			};
			reader.readAsDataURL(file);
		}
	}
</script>

<div class="image-picker">
	<input
		type="file"
		{accept}
		bind:this={inputRef}
		on:change={handleChange}
		style="display: none;"
	/>

	<button class="picker-button" on:click={handleClick} title="Click to change image">
		{#if currentImage}
			<img src={currentImage} alt="Selected image" class="preview no-resample" />
		{:else}
			<div class="placeholder">
				<svg viewBox="0 0 24 24" width="32" height="32">
					<path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
				</svg>
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
	}

	.picker-button {
		width: 128px;
		height: 128px;
		padding: 0;
		border: 2px dashed #ccc;
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

	.preview {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ccc;
	}
</style>

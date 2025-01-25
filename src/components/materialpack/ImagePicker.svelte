<script lang="ts">
	export let currentImage: string | null = null;
	export let accept: string = 'image/png';
	export let onImageSelect: (base64: string | null) => void;
	export let imgSize: string = '128px';
	export let padding: string = '0rem';
	export let backgroundImage: string = '';
	export let placeholderBackground: string = '';

	let inputRef: HTMLInputElement;
	let isDragging = false;

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

	function handleDragEnter(event: DragEvent) {
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		isDragging = false;
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	async function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragging = false;

		const file = event.dataTransfer?.files[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const base64String = e.target?.result as string;
				onImageSelect(base64String);
			};
			reader.readAsDataURL(file);
		}
	}
	function handleDelete() {
		onImageSelect(null);
	}
</script>

<div
	class="image-picker"
	class:dragging={isDragging}
	style={`padding: ${padding};`}
	on:dragenter={handleDragEnter}
	on:dragleave={handleDragLeave}
	on:dragover={handleDragOver}
	on:drop={handleDrop}
	role="button"
	aria-label="Image upload drop zone"
	tabindex="0"
>
	<input
		type="file"
		{accept}
		bind:this={inputRef}
		on:change={handleChange}
		style="display: none;"
		aria-hidden="true"
	/>

	<button
		class="picker-button"
		on:click={handleClick}
		title="Click to change image"
		style={`width: ${imgSize}; height: ${imgSize}; padding: ${padding};`}
		aria-label="Select or drop an image"
	>
		{#if currentImage}
			<div class="actions-container">
				<button class="delete-btn" on:click|stopPropagation={handleDelete} title="Delete image">
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							fill="currentColor"
							d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
						/>
					</svg>
				</button>
			</div>
			{#if backgroundImage}
				<img src={backgroundImage} alt="Background" class="background-image" draggable="false" />
			{/if}
			<img src={currentImage} alt="Selected" class="preview-image no-resample" draggable="false" />
		{:else}
			<div class="placeholder">
				{#if placeholderBackground}
					<img
						src={placeholderBackground}
						alt="Placeholder"
						class="placeholder-background"
						draggable="false"
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
		transition: all 0.2s ease;

		&:hover {
			border: 2px dashed #fff;
		}

		&.dragging {
			border: 2px dashed #fff;
			background-color: rgba(255, 255, 255, 0.1);
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

	.actions-container {
		position: absolute;
		right: -1.5rem;
		top: -1.5rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		opacity: 0;
		transform: translateX(-1rem);
		transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		z-index: 10;

		.delete-btn {
			padding: 0.25rem;
			background: rgba(50, 50, 50, 0.75);
			border: 2px solid rgba(25, 25, 25, 1);
			color: #ff4444;
			cursor: pointer;
			border-radius: 6px;
			transition: all 0.2s ease;

			&:hover {
				background: rgba(50, 50, 50, 1);
			}
		}
	}

	.picker-button:hover .actions-container {
		opacity: 1;
		transform: translateX(0);
	}

	// Prevent actions from showing while dragging
	.picker-button:has(img:active) .actions-container {
		visibility: hidden;
	}
</style>

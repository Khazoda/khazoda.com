<div class="spinner-container">
	<div class="spinner"></div>
	<span class="loading-text">Loading material packs...</span>
</div>

<style lang="scss">
	.spinner-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem;
	}

	.loading-text {
		color: #4a9eff;
		font-weight: 600;
	}

	.spinner {
		width: 64px;
		height: 64px;
		border: 3px solid #2a2a2a;
		border-top: 3px solid #4a9eff;
		border-radius: 50%;
		animation: spin 1s cubic-bezier(0.67, 0.25, 0.33, 0.8) infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

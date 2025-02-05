<div class="spinner-container">
	<div class="spinner"></div>
	<span class="loading-text">Loading...</span>
</div>

<style lang="scss">
	.spinner-container {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem;
	}

	.loading-text {
		color: #4a9eff;
		font-weight: 600;
	}

	.spinner {
		animation: spin 1s cubic-bezier(0.67, 0.25, 0.33, 0.8) infinite;
		border: 3px solid #2a2a2a;
		border-radius: 50%;
		border-top: 3px solid #4a9eff;
		height: 64px;
		width: 64px;
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

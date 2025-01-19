<script>
	import IconoirHomeSimpleDoor from 'virtual:icons/iconoir/home-simple-door';
</script>

<a href="/" class="home-btn">
	<IconoirHomeSimpleDoor width="100%" height="100%" />
</a>

<style>
	.home-btn {
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.4rem;
		display: flex;
		align-items: center;
		justify-content: center;

		border: 1px solid var(--v-color-border);
		border-radius: 4px;

		color: var(--v-color-text-primary);
		background: #234066;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
	.home-btn:hover {
		background: #2d527f;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
	}
</style>

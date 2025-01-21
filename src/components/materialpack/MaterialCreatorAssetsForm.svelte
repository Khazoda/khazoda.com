<script lang="ts">
	export let material: Material;
	export let index: number;
</script>

<form class="material-assets-form">
	<h2>Material {index + 1} Assets</h2>
	<!-- We'll add the form content in the next step -->
</form>

<style lang="scss">
	.material-assets-form {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 2rem;
		background: #2c2c2c;
		border: 2px solid #1c1c1c;
		border-radius: 8px;
	}
</style>

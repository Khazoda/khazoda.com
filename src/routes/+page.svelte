<div class="page-container">
	<div class="center-container">
		<h1>Khazoda's Mods</h1>
		<div class="project-grid">
			<span>one</span>
			<span>two</span>
			<span>three</span>
			<span>four</span>
			<span>five</span>
			<span>six</span>
		</div>
	</div>
</div>

<style lang="scss">
	.page-container {
		position: static;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.center-container {
		position: static;
		width: fit-content;
		width: -moz-fit-content;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 5px;
		grid-row-gap: 0px;
		justify-items: center;
	}
</style>

<script>
	// @ts-nocheck

	import { page } from "$app/stores";
</script>

<head>
	<link rel="stylesheet" href="/global.css" />
</head>
<div class="center">
	<h1 style="font-family: monospace;">ಥ_ಥ</h1>
	<h1>Error {$page.status}</h1>
	<h1>{$page.error.message}</h1>
	<a href="/">Return to safety</a>
</div>

<style>
	.center {
		align-items: center;
		display: inline-flex;
		flex-direction: column;
		font-size: larger;
		height: fit-content;
		inset: 0;
		justify-content: center;
		margin: auto;
		position: absolute;
		width: fit-content;
	}
	a {
		color: rgb(133, 255, 255);
		margin-top: 2rem;
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
</style>

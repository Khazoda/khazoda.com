<script>
	// @ts-nocheck

	import { page } from '$app/stores';
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
		position: absolute;
		margin: auto;
		inset: 0;
		width: fit-content;
		height: fit-content;
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: larger;
	}
	a {
		margin-top: 2rem;
		color: rgb(133, 255, 255);
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}
</style>

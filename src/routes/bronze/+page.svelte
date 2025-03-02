<script>
	import BronzeDescription from "$lib/mod_descriptions/bronze.md";
	import MarkdownLayout from "$lib/components/MarkdownLayout.svelte";
	import HomeButton from "src/components/HomeButton.svelte";
</script>

<head>
	<link rel="stylesheet" href="/markdown.css" />
</head>

<HomeButton />
<MarkdownLayout showSideNav={false}>
	<BronzeDescription />
</MarkdownLayout>

<script>
	import HomeButton from "src/components/HomeButton.svelte";
	import FeedbackButton from "src/components/materialpack/FeedbackButton.svelte";
</script>

<slot></slot>
<span class="fixed-top-left" style="z-index: 1000;"><HomeButton /></span>
<span class="fixed-top-right" style="z-index: 1000;"><FeedbackButton /></span>

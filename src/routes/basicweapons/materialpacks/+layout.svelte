<script>
	import HomeButton from 'src/components/HomeButton.svelte';
	import FeedbackButton from 'src/components/materialpack/FeedbackButton.svelte';
</script>

<span class="fixed-top-left"><HomeButton /></span>
<span class="fixed-top-right"><FeedbackButton /></span>
<slot></slot>

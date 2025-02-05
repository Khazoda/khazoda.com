<script>
	import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
	import { inject } from "@vercel/analytics";

	injectSpeedInsights();
	inject();
</script>

<slot></slot>

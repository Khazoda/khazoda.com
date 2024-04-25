import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'


export default defineConfig({
	plugins: [sveltekit(), StaticHMR(),
		Icons({
		compiler: 'svelte',
	  })],
	
});

function StaticHMR() {
	return {
		name: 'static-hmr',
		enforce: 'post' as const,
		handleHotUpdate({ file, server }: any) {
			if (file.endsWith('.css')) {
				server.ws.send({
					type: 'full-reload',
					path: '*'
				});
			}
		}
	};
}
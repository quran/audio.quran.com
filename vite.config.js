import devtoolsJson from 'vite-plugin-devtools-json'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import domain from 'vite-plugin-domain'

export default defineConfig({
	plugins: [domain({ tld: 'localhost' }), tailwindcss(), sveltekit(), devtoolsJson()],
	server: {
		proxy: {
			'/api': { target: 'https://quranicaudio.com', changeOrigin: true }
		}
	}
})

import { dev } from '$app/environment'

/** @type {import('@sveltejs/kit').HandleFetch} */
export function handleFetch({ event, request, fetch }) {
	if (dev && request.url.startsWith(`${event.url.origin}/api/`)) {
		request = new Request(
			request.url.replace(event.url.origin, 'https://quranicaudio.com'),
			request
		)
	}
	return fetch(request)
}

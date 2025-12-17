const API_ORIGIN = process.env.API_ORIGIN || 'https://quranicaudio.com'
const api = (path) => new URL(`/api${path}`, API_ORIGIN)

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch }) {
	const [sections, qaris, surahs] = await Promise.all([
		fetch(api('/sections')).then((r) => r.json()),
		fetch(api('/qaris')).then((r) => r.json()),
		fetch(api('/surahs')).then((r) => r.json())
	])

	qaris.sort((a, b) => a.id - b.id)
	surahs.sort((a, b) => a.id - b.id)

	return { sections, qaris, surahs }
}

const API_ORIGIN = process.env.API_ORIGIN
const api = (path) => (API_ORIGIN ? new URL(`/api${path}`, API_ORIGIN) : `/api${path}`)

const normalize = (value, allowed, fallback) => {
	const v = String(value ?? '')
		.toLowerCase()
		.trim()
	return allowed.includes(v) ? v : fallback
}

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch }) {
	const [sections, qaris, surahs] = await Promise.all([
		fetch(api('/sections')).then((r) => r.json()),
		fetch(api('/qaris')).then((r) => r.json()),
		fetch(api('/surahs')).then((r) => r.json())
	])

	qaris.sort((a, b) => a.id - b.id)
	surahs.sort((a, b) => a.id - b.id)

	const config = {
		audio: {
			streamDefault: normalize(process.env.AUDIO_STREAM_DEFAULT, ['auto', 'opus', 'mp3'], 'auto')
		}
	}

	return { sections, qaris, surahs, config }
}

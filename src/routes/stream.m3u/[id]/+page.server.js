const API_ORIGIN = process.env.API_ORIGIN || 'https://quranicaudio.com'
const api = (path) => new URL(`/api${path}`, API_ORIGIN)

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch, parent }) {
	const main_id = Number(params.id)
	const audioFile = await fetch(api(`/audio_files/download/${main_id}`)).then((r) => r.json())
	const { qaris, surahs } = await parent()

	return { audioFile, qaris, surahs }
}

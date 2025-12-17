const API_ORIGIN = process.env.API_ORIGIN || 'https://quranicaudio.com'
const api = (path) => new URL(`/api${path}`, API_ORIGIN)

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch, parent }) {
	const id = Number(params.id)
	const { qaris, surahs } = await parent()
	const qari = qaris.find((q) => q.id === id)
	const [files, relatedIds] = await Promise.all([
		fetch(api(`/qaris/${id}/audio_files/mp3`)).then((r) => r.json()),
		fetch(api(`/qaris/related/${id}`)).then((r) => r.json())
	])

	const related =
		relatedIds?.length > 0
			? relatedIds.map((x) => qaris.find((q) => q.id === x.id)).filter(Boolean)
			: []

	return { id, qari, files, surahs, related }
}

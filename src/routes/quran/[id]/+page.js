/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const id = Number(params.id)
	const [qari, files, surahs] = await Promise.all([
		fetch(`/api/qaris/${id}`).then((r) => r.json()),
		fetch(`/api/qaris/${id}/audio_files/mp3`).then((r) => r.json()),
		fetch('/api/surahs').then((r) => r.json())
	])

	return { id, qari, files, surahs }
}

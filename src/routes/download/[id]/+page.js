/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const main_id = Number(params.id)
	const audioFile = await fetch(`/api/audio_files/download/${main_id}`).then((r) => r.json())
	const [qaris, surahs] = await Promise.all([
		fetch('/api/qaris').then((r) => r.json()),
		fetch('/api/surahs').then((r) => r.json())
	])

	return { audioFile, qaris, surahs }
}

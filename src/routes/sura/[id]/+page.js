import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const id = Number(params.id)
	if (!id || id < 1 || id > 114) throw redirect(302, '/')

	const [qaris, surahs] = await Promise.all([
		fetch('/api/qaris').then((r) => r.json()),
		fetch('/api/surahs').then((r) => r.json())
	])

	const surah = surahs.find((s) => s.id === id)
	if (!surah) throw redirect(302, '/')

	qaris.sort((a, b) => a.id - b.id)

	return { id, surah, qaris }
}

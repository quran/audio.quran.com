import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	const id = Number(params.id)
	if (!id || id < 1 || id > 114) throw redirect(302, '/')

	const { qaris, surahs } = await parent()
	const surah = surahs.find((s) => s.id === id)
	if (!surah) throw redirect(302, '/')

	return { id, surah, qaris }
}

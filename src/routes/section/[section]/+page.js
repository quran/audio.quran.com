import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	const section = Number(params.section) || 1
	if (section === 1) throw redirect(307, '/')

	const { sections, qaris } = await parent()
	return { section, sections, qaris }
}

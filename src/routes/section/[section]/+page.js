import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const section = Number(params.section) || 1
	if (section === 1) throw redirect(307, '/')

	const [sections, qaris] = await Promise.all([
		fetch('/api/sections').then((r) => r.json()),
		fetch('/api/qaris').then((r) => r.json())
	])

	qaris.sort((a, b) => a.id - b.id)

	return { section, sections, qaris }
}

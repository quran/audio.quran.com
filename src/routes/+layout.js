/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch }) {
	const [sections, qaris, surahs] = await Promise.all([
		fetch('/api/sections').then((r) => r.json()),
		fetch('/api/qaris').then((r) => r.json()),
		fetch('/api/surahs').then((r) => r.json())
	])

	qaris.sort((a, b) => a.id - b.id)
	surahs.sort((a, b) => a.id - b.id)

	return { sections, qaris, surahs }
}

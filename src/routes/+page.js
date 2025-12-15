/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const [sections, qaris] = await Promise.all([
		fetch('/api/sections').then((r) => r.json()),
		fetch('/api/qaris').then((r) => r.json())
	])

	qaris.sort((a, b) => a.id - b.id)

	return { section: 1, sections, qaris }
}

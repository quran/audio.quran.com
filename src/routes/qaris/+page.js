/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const [sections, qaris] = await Promise.all([
		fetch('/api/sections').then((r) => r.json()),
		fetch('/api/qaris').then((r) => r.json())
	])

	return { section: 1, sections, qaris }
}

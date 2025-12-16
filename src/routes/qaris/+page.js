/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const { sections, qaris } = await parent()
	return { section: 1, sections, qaris }
}

import { json } from '@sveltejs/kit'
import { query } from '$lib/server/db.js'

export async function GET({ params }) {
	const id = Number(params.id)
	if (!Number.isInteger(id) || id < 1) {
		return json({ error: 'Invalid qari id.' }, { status: 400 })
	}

	const { rows } = await query(
		`select qaris.id
		from related
		join qaris on qaris.id = related.related
		where related.qari = $1
		order by qaris.name`,
		[id]
	)

	return json(rows.map((row) => ({ id: Number(row.id) })))
}

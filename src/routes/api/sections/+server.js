import { json } from '@sveltejs/kit'
import { query } from '$lib/server/db.js'

export async function GET() {
	const { rows } = await query('select id, name from sections order by id')
	return json(rows)
}

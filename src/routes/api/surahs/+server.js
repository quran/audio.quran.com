import { json } from '@sveltejs/kit'
import { query } from '$lib/server/db.js'
import { serializeSurah } from '$lib/server/serializers.js'

export async function GET() {
	const { rows } = await query(
		`select surah_id, ayat, bismillah_pre, revelation_order, revelation_place, page,
			name_complex, name_simple, name_english, name_arabic
		from surahs
		order by surah_id`
	)

	return json(rows.map(serializeSurah))
}

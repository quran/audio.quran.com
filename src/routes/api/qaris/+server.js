import { json } from '@sveltejs/kit'
import { query } from '$lib/server/db.js'
import { serializeQari } from '$lib/server/serializers.js'

export async function GET() {
	const { rows } = await query(
		`select id, name, arabic_name, relative_path, file_formats, section_id, home, description,
			torrent_filename, torrent_info_hash, torrent_seeders, torrent_leechers
		from qaris
		order by id`
	)

	return json(rows.map(serializeQari))
}

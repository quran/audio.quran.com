import { json } from '@sveltejs/kit'
import { query } from '$lib/server/db.js'
import { serializeAudioFile } from '$lib/server/serializers.js'

export async function GET({ params }) {
	const id = Number(params.id)
	const format = String(params.format || '').toLowerCase()
	if (!Number.isInteger(id) || id < 1) {
		return json({ error: 'Invalid qari id.' }, { status: 400 })
	}
	if (!format) {
		return json({ error: 'Invalid format.' }, { status: 400 })
	}

	const { rows } = await query(
		`select id, qari_id, surah_id, filenum, file_name, extension, stream_count,
			download_count, format, metadata, recitation_id
		from audio_files
		where qari_id = $1 and extension = $2
		order by surah_id, filenum nulls first, file_name`,
		[id, format]
	)

	return json(rows.map(serializeAudioFile))
}

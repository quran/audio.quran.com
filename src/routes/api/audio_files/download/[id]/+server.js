import { json } from '@sveltejs/kit'
import { query } from '$lib/server/db.js'
import { serializeAudioFile } from '$lib/server/serializers.js'

export async function GET({ params }) {
	const id = Number(params.id)
	if (!Number.isInteger(id) || id < 1) {
		return json({ error: 'Invalid audio file id.' }, { status: 400 })
	}

	const { rows } = await query(
		`select id, qari_id, surah_id, filenum, file_name, extension, stream_count,
			download_count, format, metadata, recitation_id
		from audio_files
		where id = $1`,
		[id]
	)

	if (rows.length === 0) {
		return json({ error: 'Audio file not found.' }, { status: 404 })
	}

	return json(serializeAudioFile(rows[0]))
}

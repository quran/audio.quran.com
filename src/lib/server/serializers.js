const asNumber = (value) => (value == null ? null : Number(value))
const asIntArray = (value) => (Array.isArray(value) ? value.map(Number) : value)

export const serializeQari = (row) => ({
	id: asNumber(row.id),
	name: row.name,
	arabic_name: row.arabic_name,
	relative_path: row.relative_path,
	file_formats: row.file_formats,
	section_id: asNumber(row.section_id),
	home: row.home == null ? null : Number(row.home),
	description: row.description,
	torrent_filename: row.torrent_filename,
	torrent_info_hash: row.torrent_info_hash,
	torrent_seeders: asNumber(row.torrent_seeders),
	torrent_leechers: asNumber(row.torrent_leechers)
})

export const serializeSurah = (row) => ({
	id: asNumber(row.surah_id ?? row.id),
	ayah: asNumber(row.ayat),
	bismillah_pre: row.bismillah_pre,
	revelation_order: asNumber(row.revelation_order),
	revelation_place: row.revelation_place,
	pages: asIntArray(row.page),
	name: {
		complex: row.name_complex,
		simple: row.name_simple,
		english: row.name_english,
		arabic: row.name_arabic
	}
})

export const serializeAudioFile = (row) => ({
	id: asNumber(row.id),
	qari_id: asNumber(row.qari_id),
	surah_id: asNumber(row.surah_id),
	filenum: asNumber(row.filenum),
	file_name: row.file_name,
	extension: row.extension,
	stream_count: asNumber(row.stream_count),
	download_count: asNumber(row.download_count),
	format: row.format,
	metadata: row.metadata,
	recitation_id: asNumber(row.recitation_id)
})

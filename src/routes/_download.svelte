<script>
	let { audioFile, qaris, surahs } = $props()

	let qariById = $derived.by(() => new Map(qaris.map((q) => [q.id, q])))
	let surahById = $derived.by(() => new Map(surahs.map((s) => [s.id, s])))

	let qari = $derived(qariById.get(audioFile?.qari_id))
	let surah = $derived(surahById.get(audioFile?.surah_id))

	let ok = $derived(qari && surah)
</script>

<div class="qa-container qa-downloadPage">
	{#if ok}
		<h1 class="qa-downloadTitle">Surat {surah.name.simple} by {qari.name}</h1>
		<a
			class="qa-downloadLink"
			href="https://download.quranicaudio.com/quran/{qari.relative_path}{audioFile.file_name}"
			>Download</a
		>
	{:else}
		<h1 class="qa-downloadTitle">Not Found</h1>
	{/if}
</div>

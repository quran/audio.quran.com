<BrandHeader />

<div class="relative m-0 w-full bg-white px-[15px] md:mx-auto md:mb-[50px] md:max-w-[1170px]">
	<div class="px-[15px] py-[40px] text-center">
		{#if ok}
			<h1 class="mt-[10px] mb-[30px] px-[10px] text-[26px] font-[300] md:px-0 md:text-[32px]">
				Surat {surah.name.simple} by {qari.name}
			</h1>
			<a
				class="inline-block w-full max-w-full min-w-0 border border-brand px-[16px] py-[14px] font-bold text-brand no-underline hover:bg-brand hover:text-white md:w-auto md:min-w-[520px]"
				{...{ href: mp3Href }}>Download</a
			>
		{:else}
			<h1 class="mt-[10px] mb-[30px] px-[10px] text-[26px] font-[300] md:px-0 md:text-[32px]">
				Not Found
			</h1>
		{/if}
	</div>
</div>

<script>
import BrandHeader from '$lib/BrandHeader.svelte'

let { audioFile, qaris, surahs } = $props()

let qariById = $derived(Object.fromEntries(qaris.map((q) => [q.id, q])))
let surahById = $derived(Object.fromEntries(surahs.map((s) => [s.id, s])))

let qari = $derived(qariById[audioFile?.qari_id])
let surah = $derived(surahById[audioFile?.surah_id])

let ok = $derived(!!(qari && surah))
let mp3Href = $derived(
	ok ? `https://download.quranicaudio.com/quran/${qari.relative_path}${audioFile.file_name}` : ''
)
</script>

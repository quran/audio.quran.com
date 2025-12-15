<script>
	let { audioFile, qaris, surahs } = $props()

	let qariById = $derived.by(() => new Map(qaris.map((q) => [q.id, q])))
	let surahById = $derived.by(() => new Map(surahs.map((s) => [s.id, s])))

	let qari = $derived(qariById.get(audioFile?.qari_id))
	let surah = $derived(surahById.get(audioFile?.surah_id))

	let ok = $derived(qari && surah)
</script>

<header
	class="h-[300px] bg-[#2ca4ab] bg-[url('https://quranicaudio.com/public/images/background.jpg')] bg-cover bg-center bg-no-repeat pt-[10px] pb-[10px] text-center text-white"
>
	<h1
		class="relative top-[115px] left-[40px] mt-[20px] inline-block font-['Montserrat-Bold'] text-[40px] leading-[1.1] font-medium md:top-[100px] md:text-[48px]"
	>
		QuranicAudio
	</h1>
</header>

<div class="relative m-0 w-full bg-white px-[15px] md:mx-auto md:mb-[50px] md:max-w-[1170px]">
	<div class="px-[15px] py-[40px] text-center">
		{#if ok}
			<h1 class="mt-[10px] mb-[30px] px-[10px] text-[26px] font-[300] md:px-0 md:text-[32px]">
				Surat {surah.name.simple} by {qari.name}
			</h1>
			<a
				class="inline-block w-full max-w-full min-w-0 border border-[#2ca4ab] px-[16px] py-[14px] font-bold text-[#2ca4ab] no-underline hover:bg-[#2ca4ab] hover:text-white md:w-auto md:min-w-[520px]"
				href="https://download.quranicaudio.com/quran/{qari.relative_path}{audioFile.file_name}"
				>Download</a
			>
		{:else}
			<h1 class="mt-[10px] mb-[30px] px-[10px] text-[26px] font-[300] md:px-0 md:text-[32px]">
				Not Found
			</h1>
		{/if}
	</div>
</div>

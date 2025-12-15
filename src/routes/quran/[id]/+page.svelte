<script>
	let { data } = $props()

	let shuffling = $state(false)

	let surahById = $derived.by(() => new Map(data.surahs.map((s) => [s.id, s])))
	let sortedFiles = $derived.by(() => [...data.files].sort((a, b) => a.surah_id - b.surah_id))

	const formatSeconds = (seconds) => {
		const total = Math.round(seconds)
		const h = Math.floor(total / 3600)
		const m = Math.floor((total % 3600) / 60)
		const s = total % 60
		const pad2 = (n) => String(n).padStart(2, '0')
		return h ? `${pad2(h)}:${pad2(m)}:${pad2(s)}` : `${pad2(m)}:${pad2(s)}`
	}

	const toggleShuffle = () => {
		shuffling = !shuffling
		if (!shuffling) return

		const f = sortedFiles[Math.floor(Math.random() * sortedFiles.length)]
		if (!f) return

		window.open(
			`https://download.quranicaudio.com/quran/${data.qari.relative_path}${f.file_name}`,
			'_blank',
			'noopener'
		)
	}
</script>

<svelte:head>
	<title>Holy Quran Recitation by {data.qari?.name} - QuranicAudio.com</title>
</svelte:head>

<div class="bg-[#2ca4ab] pt-[70px] pb-[40px] text-white">
	<div class="mx-auto max-w-[1170px] px-[15px] text-center">
		<h1 class="m-0 text-[32px] font-bold">{data.qari?.name}</h1>

		<button
			class="mt-[14px] inline-flex cursor-pointer items-center rounded-full border border-[#e7e7e7] bg-transparent px-[18px] py-[8px] text-[14px] text-white hover:bg-[rgba(255,255,255,0.12)]"
			type="button"
			onclick={toggleShuffle}
		>
			<i
				class="fa {shuffling ? 'fa-stop' : 'fa-play'} relative top-[1px] pr-[8px] text-[18px]"
				aria-hidden="true"
			></i>
			<span>Shuffle Play</span>
		</button>
	</div>
</div>

<div class="mt-0 md:mt-[-30px]">
	<div class="relative m-0 w-full bg-white px-[15px] md:mx-auto md:mb-[50px] md:max-w-[1170px]">
		<ul class="m-0 list-none p-0">
			{#each sortedFiles as f (f.surah_id)}
				{@const s = surahById.get(f.surah_id)}
				<li class="border-b border-b-[#f0f0f0]">
					<a
						class="flex items-baseline gap-[12px] px-[10px] py-[14px] text-[#2e2e2e] no-underline hover:bg-[#f7f7f7]"
						href="https://download.quranicaudio.com/quran/{data.qari.relative_path}{f.file_name}"
						target="_blank"
						rel="noreferrer"
					>
						<span class="min-w-[34px] text-right text-[#2e2e2e]">{f.surah_id}.</span>
						<span class="flex-1">Surat {s?.name?.simple || 'Surah ' + f.surah_id}</span>
						<span class="whitespace-nowrap text-[#2e2e2e] opacity-70"
							>{formatSeconds(Number(f.format?.duration))}</span
						>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

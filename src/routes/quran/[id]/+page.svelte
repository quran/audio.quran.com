<script>
	import { Book, CirclePlay, Download, Network, Shuffle, Square, Users } from '@lucide/svelte'
	import { player, setQueue, toggleRandom } from '../../../stores/audio.js'
	import { resolve } from '$app/paths'

	let { data } = $props()

	let surahById = $derived(Object.fromEntries(data.surahs.map((s) => [s.id, s])))
	let relatedOpen = $state(false)

	const partNumber = (fileName) => Number(fileName.match(/\[part_(\d+)_of_\d+\]/)?.[1]) || 0
	const pad3 = (n) => String(n).padStart(3, '0')

	let surahGroups = $derived.by(() => {
		const bySurah = Object.create(null)
		for (const f of data.files) {
			if (!f.surah_id) continue
			const existing = bySurah[f.surah_id]
			if (existing) existing.push(f)
			else bySurah[f.surah_id] = [f]
		}

		const groups = []
		let startIndex = 0
		for (const surahId of Object.keys(bySurah).map(Number).sort((a, b) => a - b)) {
			const sorted = [...bySurah[surahId]].sort(
				(a, b) => partNumber(a.file_name) - partNumber(b.file_name) || a.file_name.localeCompare(b.file_name)
			)
			const duration = Math.max(...sorted.map((f) => Number(f.format?.duration) || 0))
			groups.push({ surahId, files: sorted, startIndex, duration })
			startIndex += sorted.length
		}
		return groups
	})

	let flatQueue = $derived(
		surahGroups.flatMap((g) =>
			g.files.map((f) => {
				const s = surahById[f.surah_id]
				const simple = s?.name?.simple || `Surah ${f.surah_id}`
				const english = s?.name?.english
				const src = `https://download.quranicaudio.com/quran/${data.qari.relative_path}${f.file_name}`
				return {
					key: `qari:${data.id}:${f.surah_id}:${f.file_name}`,
					surahId: f.surah_id,
					qariId: data.id,
					src,
					title: english ? `${data.qari.name} ${simple} (${english})` : `${data.qari.name} ${simple}`,
					duration: Number(f.format?.duration) || 0,
					simple
				}
			})
		)
	)

	let descriptionParts = $derived.by(() => {
		const html = String(data.qari?.description || '').replaceAll('\\', '')
		const re = /<a href="([^"]+)">([^<]+)<\/a>/g
		const parts = []
		let lastIndex = 0
		for (const m of html.matchAll(re)) {
			if (m.index > lastIndex) parts.push({ text: html.slice(lastIndex, m.index) })
			const href = m[1]
			const text = m[2]
			if (href) parts.push({ href, text })
			lastIndex = m.index + m[0].length
		}
		if (lastIndex < html.length) parts.push({ text: html.slice(lastIndex) })
		return parts
	})

	let queue = $derived(
		surahGroups.map((g) => {
			const s = surahById[g.surahId]
			const simple = s?.name?.simple || `Surah ${g.surahId}`
			const english = s?.name?.english
			const downloadHref = `https://download.quranicaudio.com/quran/${data.qari.relative_path}${pad3(g.surahId)}.mp3`
			return {
				key: `qari:${data.id}:${g.surahId}`,
				surahId: g.surahId,
				qariId: data.id,
				startIndex: g.startIndex,
				downloadHref,
				readHref: `https://www.quran.com/${g.surahId}`,
				title: english ? `${data.qari.name} ${simple} (${english})` : `${data.qari.name} ${simple}`,
				duration: g.duration,
				simple
			}
		})
	)

	const isActive = (track) => {
		const current = $player.queue[$player.index]
		return current?.qariId === track.qariId && current?.surahId === track.surahId
	}

	const formatSeconds = (seconds) => {
		const total = Math.round(seconds)
		const h = Math.floor(total / 3600)
		const m = Math.floor((total % 3600) / 60)
		const s = total % 60
		const pad2 = (n) => String(n).padStart(2, '0')
		return h ? `${pad2(h)}:${pad2(m)}:${pad2(s)}` : `${pad2(m)}:${pad2(s)}`
	}

	const toggleShuffle = () => {
		if ($player.random) {
			toggleRandom()
			return
		}

		toggleRandom()
		const index = Math.floor(Math.random() * queue.length)
		if (queue[index]) setQueue(flatQueue, queue[index].startIndex, true)
	}

	const play = (index) => setQueue(flatQueue, queue[index].startIndex, true)
</script>

<svelte:head>
	<title>Holy Quran Recitation by {data.qari?.name} - QuranicAudio.com</title>
</svelte:head>

<div class="min-h-[350px] bg-[#2ca4ab] pt-[128px] pb-[80px] text-white">
	<div class="text-center">
		<h1 class="m-0 mt-[20px] mb-[10px] text-[36px] leading-[39.6px] font-medium">
			{data.qari?.name}
		</h1>

		{#if data.qari?.description}
			<p class="m-0 mb-[10px] mx-auto w-full px-[15px] break-words md:w-[70%] md:px-[50px]">
				{#each descriptionParts as p, i (i)}
					{#if p.href}
						<a
							class="text-white underline"
							{...{
								href: p.href.startsWith('/') ? resolve(/** @type {any} */ (p.href)) : p.href
							}}
						>
							{p.text}
						</a>
					{:else}
						{p.text}
					{/if}
				{/each}
			</p>
		{/if}

		<button
			class="mt-[14px] inline-flex cursor-pointer items-center rounded-full border border-[#e7e7e7] bg-transparent px-[18px] py-[8px] text-[14px] text-white hover:bg-[rgba(255,255,255,0.12)]"
			type="button"
			onclick={toggleShuffle}
		>
			{#if $player.random}
				<Square size={18} class="relative top-[1px] pr-[8px]" aria-hidden="true" />
			{:else}
				<Shuffle size={18} class="relative top-[1px] pr-[8px]" aria-hidden="true" />
			{/if}
			<span>Shuffle Play</span>
		</button>

		{#if data.related?.length}
			<button
				class="mt-[14px] ml-[10px] inline-flex cursor-pointer items-center rounded-full border border-[#e7e7e7] bg-transparent px-[18px] py-[8px] text-[14px] text-white hover:bg-[rgba(255,255,255,0.12)]"
				type="button"
				onclick={() => (relatedOpen = !relatedOpen)}
			>
				<Network size={18} class="relative top-[1px] pr-[8px]" aria-hidden="true" />
				<span>Other Recitations</span>
			</button>
			<ul
				class="m-0 mt-[10px] h-0 list-none p-0 opacity-0 transition-[height,opacity] duration-500 {relatedOpen
					? 'h-[15px] opacity-100'
					: ''}"
			>
				{#each data.related as r (r.id)}
					<li class="inline pr-[5px]">
						<a class="text-white underline" href={resolve('/quran/[id]', { id: String(r.id) })}
							>{r.name}</a
						>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<div class="relative bottom-[60px] mx-auto w-full px-[15px] md:w-[75%] md:px-0">
	<div class="mb-[10px] bg-white p-[10px]">
		<ul class="m-0 list-none p-0">
			{#each queue as t, index (t.key)}
				<li class="group border-b border-b-[#f0f0f0] {isActive(t) ? 'bg-[#f7f7f7]' : ''}">
					<div
						class="flex flex-wrap items-center gap-y-[6px] px-[10px] py-[14px] hover:bg-[#f7f7f7]"
					>
						<button
							type="button"
							aria-label="Play Surat {t.simple}"
							class="flex w-full flex-wrap items-center md:w-[50%]"
							onclick={() => play(index)}
						>
							<div class="flex w-full flex-wrap items-center md:w-[66.6667%]">
								<div class="w-[52px] text-center md:w-[60px]">
									<span class="text-[#2e2e2e] {isActive(t) ? 'text-[#2ca4ab]' : ''}">
										<span class="index {isActive(t) ? 'hidden' : 'inline'} md:group-hover:hidden"
											>{t.surahId}.</span
										>
										<CirclePlay
											size={24}
											class={
												isActive(t)
													? 'inline-block md:group-hover:inline-block'
													: 'hidden md:group-hover:inline-block'
											}
											aria-hidden="true"
										/>
									</span>
								</div>
								<div class="w-[calc(100%-52px)] md:w-[calc(100%-60px)]">
									<span class="text-[#2e2e2e] {isActive(t) ? 'text-[#2ca4ab]' : ''}"
										>Surat {t.simple}</span
									>
								</div>
							</div>

							<div class="w-full text-right md:w-[33.3333%]">
								<span
									class="whitespace-nowrap text-[#2e2e2e] opacity-70 {isActive(t)
										? 'text-[#2ca4ab] opacity-100'
										: ''}"
								>
									{isActive(t) && $player.currentTime
										? `${formatSeconds($player.currentTime)} / `
										: ''}
									{formatSeconds(t.duration)}
								</span>
							</div>
						</button>

						<div class="hidden w-[50%] justify-end gap-[5px] md:flex">
							<a
								class="invisible h-[35px] min-w-[121px] whitespace-nowrap rounded-full border border-[#e7e7e7] bg-transparent px-[12px] text-center leading-[31px] text-[#2ca4ab] no-underline hover:bg-[#2ca4ab] hover:text-white md:group-hover:visible {isActive(
									t
								)
									? 'visible'
									: ''}"
								href={resolve('/')}
							>
								<Users size={16} class="relative top-[2px] mr-[6px] inline-block" aria-hidden="true" />
								Other Qaris
							</a>
							<a
								class="invisible h-[35px] min-w-[121px] whitespace-nowrap rounded-full border border-[#e7e7e7] bg-transparent px-[12px] text-center leading-[31px] text-[#2ca4ab] no-underline hover:bg-[#2ca4ab] hover:text-white md:group-hover:visible {isActive(
									t
								)
									? 'visible'
									: ''}"
								{...{ href: t.readHref }}
								target="_blank"
								rel="noreferrer"
							>
								<Book size={16} class="relative top-[2px] mr-[6px] inline-block" aria-hidden="true" />
								Read
							</a>
							<a
								class="invisible h-[35px] min-w-[121px] whitespace-nowrap rounded-full border border-[#e7e7e7] bg-transparent px-[12px] text-center leading-[31px] text-[#2ca4ab] no-underline hover:bg-[#2ca4ab] hover:text-white md:group-hover:visible {isActive(
									t
								)
									? 'visible'
									: ''}"
								{...{ href: t.downloadHref }}
								target="_blank"
								rel="noreferrer"
							>
								<Download size={16} class="relative top-[2px] mr-[6px] inline-block" aria-hidden="true" />
								Download
							</a>
						</div>
					</div>

					{#if isActive(t)}
						<div class="relative bottom-[-5px] h-[2px] w-full bg-transparent">
							<div
								class="h-full bg-[#2ca4ab]"
								style="width: {($player.duration
									? ($player.currentTime / $player.duration) * 100
									: 0
								).toFixed(4)}%"
							></div>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>

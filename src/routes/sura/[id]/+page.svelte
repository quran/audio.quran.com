<script>
	import { Book, CirclePlay, Download } from '@lucide/svelte'
	import { resolve } from '$app/paths'
	import { player, setQueue } from '../../../stores/audio.js'

	let { data } = $props()

	const pad3 = (n) => String(n).padStart(3, '0')
	const title = $derived(
		data.surah.name.english
			? `${data.surah.name.simple} (${data.surah.name.english})`
			: data.surah.name.simple
	)
	const readHref = $derived(`https://quran.com/${data.surah.id}`)

	const queue = $derived(
		data.qaris.map((q) => {
			const src = `https://download.quranicaudio.com/quran/${q.relative_path}${pad3(data.surah.id)}.mp3`
			return {
				key: `sura:${data.surah.id}:${q.id}`,
				qariId: q.id,
				surahId: data.surah.id,
				src,
				title: `${q.name} ${title}`,
				downloadHref: src
			}
		})
	)

	const isActive = (track) => $player.queue[$player.index]?.key === track.key
	const play = (index) => setQueue(queue, index, true)
</script>

<svelte:head>
	<title>Surah {data.surah.name.simple} - QuranicAudio.com</title>
</svelte:head>

<div class="mb-[20px] min-h-[350px] bg-[#2ca4ab] pt-[80px] pb-[50px] text-white">
	<div class="mx-auto max-w-[1170px] px-[15px] text-center">
		<h1 class="m-0 text-[32px] font-bold">Surat {data.surah.name.simple}</h1>

		<a
			class="relative top-[10px] mt-[10px] inline-flex min-w-[220px] cursor-pointer items-center justify-center rounded-full border border-[#e7e7e7] bg-transparent px-[42px] py-[8px] text-[14px] text-white no-underline hover:bg-[rgba(255,255,255,0.12)]"
			{...{ href: readHref }}
			target="_blank"
			rel="noreferrer"
		>
			<Book size={18} class="relative top-[1px] pr-[8px]" aria-hidden="true" />
			<span>Read</span>
		</a>
	</div>
</div>

<div class="mt-0">
	<div class="relative m-0 w-full bg-white px-[15px] md:mx-auto md:mb-[50px] md:max-w-[1170px]">
		<ul
			class="m-0 list-none p-0 md:mx-auto md:max-w-[970px] md:rounded-[4px] md:border md:border-[#ddd] md:bg-white"
		>
			{#each queue as t, index (t.key)}
				{@const q = data.qaris[index]}
				<li
					class="group relative cursor-pointer border-b border-b-[#f0f0f0] hover:bg-[#f7f7f7] {isActive(t)
						? 'bg-[#f7f7f7]'
						: ''}"
				>
					<button
						type="button"
						aria-label="Play {q.name}"
						class="absolute inset-0 z-0"
						onclick={() => play(index)}
					></button>

					<div class="pointer-events-none relative z-10 flex items-center gap-[14px] px-[10px] py-[12px]">
						<span
							class="flex min-w-[52px] items-center justify-end gap-[6px] text-right opacity-70 md:min-w-[64px] {isActive(
								t
							)
								? 'text-[#2ca4ab] opacity-100'
								: ''}"
						>
							<span class="index">{q.id}.</span>
							<CirclePlay
								size={24}
								class={isActive(t) ? 'text-[#2ca4ab]' : ''}
								aria-hidden="true"
							/>
						</span>

						<span class="flex-1 text-left text-[#2e2e2e] {isActive(t) ? 'text-[#2ca4ab]' : ''}">
							<a
								class="pointer-events-auto inline no-underline"
								href={resolve('/quran/[id]', { id: String(q.id) })}
							>
								{q.name}
							</a>
						</span>

						<a
							class="pointer-events-auto hidden whitespace-nowrap rounded-full border border-[#e7e7e7] px-[12px] py-[6px] text-[#2ca4ab] no-underline hover:bg-[#2ca4ab] hover:text-white md:invisible md:inline-flex md:group-hover:visible"
							{...{ href: t.downloadHref }}
							target="_blank"
							rel="noreferrer"
						>
							<Download size={16} class="relative top-[2px] mr-[6px] inline-block" aria-hidden="true" />
							Download
						</a>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

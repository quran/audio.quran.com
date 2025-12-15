<script>
	import { resolve } from '$app/paths'

	let { data } = $props()

	const pad3 = (n) => String(n).padStart(3, '0')
</script>

<svelte:head>
	<title>Surah {data.surah.name.simple} - QuranicAudio.com</title>
</svelte:head>

<div class="bg-[#2ca4ab] pt-[80px] pb-[50px] text-white">
	<div class="mx-auto max-w-[1170px] px-[15px] text-center">
		<h1 class="m-0 text-[32px] font-bold">Surat {data.surah.name.simple}</h1>

		<a
			class="mt-[14px] inline-flex cursor-pointer items-center rounded-full border border-[#e7e7e7] bg-transparent px-[18px] py-[8px] text-[14px] text-white no-underline hover:bg-[rgba(255,255,255,0.12)]"
			href="https://quran.com/{data.surah.id}"
			target="_blank"
			rel="noreferrer"
		>
			<i class="fa fa-book relative top-[1px] pr-[8px] text-[18px]" aria-hidden="true"></i>
			<span>Read</span>
		</a>
	</div>
</div>

<div class="mt-0 md:mt-[-30px]">
	<div class="relative m-0 w-full bg-white px-[15px] md:mx-auto md:mb-[50px] md:max-w-[1170px]">
		<ul class="m-0 list-none p-0">
			{#each data.qaris as q (q.id)}
				<li
					class="group flex items-center gap-[14px] border-b border-b-[#f0f0f0] px-[10px] py-[12px] hover:bg-[#f7f7f7]"
				>
					<span class="min-w-[52px] text-right opacity-70 md:min-w-[64px]">
						{q.id}. <i class="fa fa-play" aria-hidden="true"></i>
					</span>
					<a
						class="flex-1 text-[#2e2e2e] no-underline"
						href={resolve('/quran/[id]', { id: String(q.id) })}>{q.name}</a
					>
					<a
						class="visible rounded-full border border-[#e7e7e7] px-[12px] py-[6px] whitespace-nowrap text-[#2ca4ab] no-underline hover:bg-[#2ca4ab] hover:text-white md:invisible md:group-hover:visible"
						href="https://download.quranicaudio.com/quran/{q.relative_path}{pad3(
							data.surah.id
						)}.mp3"
						target="_blank"
						rel="noreferrer"
					>
						<i class="fa fa-arrow-circle-down" aria-hidden="true"></i> Download
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

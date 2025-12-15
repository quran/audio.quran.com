<script>
	import { resolve } from '$app/paths'

	let { data } = $props()

	const pad3 = (n) => String(n).padStart(3, '0')
</script>

<svelte:head>
	<title>Surah {data.surah.name.simple} - QuranicAudio.com</title>
</svelte:head>

<div class="qa-reciterBackground qa-suraHeader">
	<div class="qa-reciterInner">
		<h1 class="qa-suraName">Surat {data.surah.name.simple}</h1>

		<a
			class="qa-reciterButton qa-suraRead"
			href="https://quran.com/{data.surah.id}"
			target="_blank"
			rel="noreferrer"
		>
			<i class="fa fa-book qa-reciterButtonIcon" aria-hidden="true"></i>
			<span>Read</span>
		</a>
	</div>
</div>

<div class="qa-suraList">
	<div class="qa-container">
		<ul class="qa-suraRows">
			{#each data.qaris as q (q.id)}
				<li class="qa-suraRow">
					<span class="qa-suraRowNumber">
						{q.id}. <i class="fa fa-play" aria-hidden="true"></i>
					</span>
					<a class="qa-suraQari" href={resolve(`/quran/${q.id}`)}>{q.name}</a>
					<a
						class="qa-suraDownload"
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

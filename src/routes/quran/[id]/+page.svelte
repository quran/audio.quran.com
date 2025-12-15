<script>
	let { data } = $props();

	let shuffling = $state(false);

	let surahById = $derived.by(() => new Map(data.surahs.map((s) => [s.id, s])));
	let sortedFiles = $derived.by(() => [...data.files].sort((a, b) => a.surah_id - b.surah_id));

	const formatSeconds = (seconds) => {
		const total = Math.round(seconds);
		const h = Math.floor(total / 3600);
		const m = Math.floor((total % 3600) / 60);
		const s = total % 60;
		const pad2 = (n) => String(n).padStart(2, '0');
		return h ? `${pad2(h)}:${pad2(m)}:${pad2(s)}` : `${pad2(m)}:${pad2(s)}`;
	};

	const toggleShuffle = () => {
		shuffling = !shuffling;
		if (!shuffling) return;

		const f = sortedFiles[Math.floor(Math.random() * sortedFiles.length)];
		if (!f) return;

		window.open(
			`https://download.quranicaudio.com/quran/${data.qari.relative_path}${f.file_name}`,
			'_blank',
			'noopener'
		);
	};
</script>

<svelte:head>
	<title>Holy Quran Recitation by {data.qari?.name} - QuranicAudio.com</title>
</svelte:head>

<div class="qa-reciterBackground">
	<div class="qa-reciterInner">
		<h1 class="qa-reciterName">{data.qari?.name}</h1>

		<button class="qa-reciterButton" type="button" onclick={toggleShuffle}>
			<i class="fa {shuffling ? 'fa-stop' : 'fa-play'} qa-reciterButtonIcon" aria-hidden="true"></i>
			<span>Shuffle Play</span>
		</button>
	</div>
</div>

<div class="qa-qariList">
	<div class="qa-container">
		<ul class="qa-surahList">
			{#each sortedFiles as f (f.surah_id)}
				{@const s = surahById.get(f.surah_id)}
				<li class="qa-surahListItem">
					<a
						class="qa-surahLink"
						href="https://download.quranicaudio.com/quran/{data.qari.relative_path}{f.file_name}"
						target="_blank"
						rel="noreferrer"
					>
						<span class="qa-surahNumber">{f.surah_id}.</span>
						<span class="qa-surahName">Surat {s?.name?.simple || `Surah ${f.surah_id}`}</span>
						<span class="qa-surahDuration">{formatSeconds(Number(f.format?.duration))}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

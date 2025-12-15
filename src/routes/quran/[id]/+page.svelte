<script>
	let { data } = $props();

	let surahById = $derived.by(() => new Map(data.surahs.map((s) => [s.id, s])));
</script>

<div class="qa-container" style="padding: 40px 15px;">
	<h1 style="font-size: 28px; font-weight: 700;">{data.qari?.name}</h1>
	{#if data.qari?.arabic_name}
		<p style="margin-top: 6px; color: var(--brand-primary); font-size: 18px;">{data.qari.arabic_name}</p>
	{/if}
	{#if data.qari?.description}
		<p style="margin-top: 10px;">{data.qari.description.replaceAll('\\', '')}</p>
	{/if}

	<ul style="margin-top: 20px; padding-left: 0; list-style: none;">
		{#each data.files as f (f.surah_id)}
			{@const s = surahById.get(f.surah_id)}
			<li style="padding: 10px 0; border-bottom: 1px solid var(--border-color);">
				<a
					href="https://download.quranicaudio.com/quran/{data.qari.relative_path}{f.file_name}"
					style="text-decoration: none; color: var(--black);"
					rel="noreferrer"
				>
					{s?.name?.simple || `Surah ${f.surah_id}`} {s?.name?.english ? `— ${s.name.english}` : ''}
				</a>
			</li>
		{/each}
	</ul>
</div>

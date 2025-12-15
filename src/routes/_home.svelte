<script>
	let { sections, qaris, section } = $props();

	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

	let haramain = $derived.by(() => {
		const list = qaris.filter((q) => q.section_id === 2 && q.home);
		return {
			makkah: list.filter((q) => q.name.includes('Makkah')),
			madinah: list.filter((q) => q.name.includes('Madinah'))
		};
	});

	let grouped = $derived.by(() =>
		letters
			.map((letter) => ({
				letter,
				qaris: qaris.filter((q) => q.section_id === section && q.home && q.name?.[0] === letter)
			}))
			.filter((g) => g.qaris.length)
	);
</script>

<div>
	<header class="qa-header">
		<h1 class="qa-heading">QuranicAudio</h1>
	</header>

	<ul class="qa-pills">
		{#each sections as s (s.id)}
			<li>
				{#if s.id === 1}
					<a class="qa-pill {s.id === section ? 'qa-pillActive' : ''}" href="/">{s.name}</a>
				{:else}
					<a class="qa-pill {s.id === section ? 'qa-pillActive' : ''}" href="/section/{s.id}">{s.name}</a>
				{/if}
			</li>
		{/each}
	</ul>

	<div class="qa-container">
		<div class="qa-qariContainer">
			{#if section === 2}
				<div class="qa-letterBlock">
					<h2 class="qa-sectionSplitName">Makkah</h2>
					<ul class="qa-list" style="left: 0;">
						{#each haramain.makkah as q (q.id)}
							<li class="qa-listItem"><a href="/quran/{q.id}">{q.name}</a></li>
						{/each}
					</ul>
					<h2 class="qa-sectionSplitName">Madinah</h2>
					<ul class="qa-list" style="left: 0;">
						{#each haramain.madinah as q (q.id)}
							<li class="qa-listItem"><a href="/quran/{q.id}">{q.name}</a></li>
						{/each}
					</ul>
				</div>
			{:else}
				{#each grouped as g (g.letter)}
					<div class="qa-letterBlock">
						<span class="qa-letter">{g.letter}</span>
						<ul class="qa-list">
							{#each g.qaris as q (q.id)}
								<li class="qa-listItem"><a href="/quran/{q.id}">{q.name}</a></li>
							{/each}
						</ul>
					</div>
				{/each}
			{/if}
		</div>

		<button type="button" class="qa-goTop" onclick={() => window.scrollTo(0, 0)}>
			Go to the top <i class="fa fa-chevron-up"></i>
		</button>
	</div>
</div>

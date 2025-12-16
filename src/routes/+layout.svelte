<script>
	import './layout.css'
	import { page } from '$app/state'
	import { resolve } from '$app/paths'
	import { Book, House } from '@lucide/svelte'
	import AudioPlayer from '$lib/AudioPlayer.svelte'

	let { children } = $props()
</script>

<svelte:head>
	<title>Quran Mp3 and Audio Downloads in High Quality - QuranicAudio.com</title>
	<meta
		name="description"
		content="QuranicAudio is your source for high quality recitations of the Quran. Stream or download all the Quran recitations"
	/>
	<meta
		name="keyword"
		content="quran, quran mp3, quran audio, quranic audio, islam audio, quran play, quran recitation, islam"
	/>
	<meta
		property="og:site_name"
		content="Quran Mp3 and Audio Downloads in High Quality - QuranicAudio.com"
	/>
	<meta property="og:image" content="/images/QuranicAudio.png" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content="Quran Mp3 and Audio Downloads in High Quality" />
	<meta
		property="og:description"
		content="QuranicAudio is your source for high quality recitations of the Quran. Stream or download all the Quran recitations"
	/>
	<meta property="og:card" content="summary" />
	<meta property="og:site" content="@quran" />
	<meta property="og:creator" content="@quran" />
	<meta property="og:image:width" content="200" />
	<meta property="og:image:height" content="200" />
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<div class="absolute top-[10px] left-[15vw] right-[15vw] z-[11] flex items-center md:left-[5vw] md:right-[5vw]">
	<a
		class="text-[30px] text-white"
		href={resolve('/')}
		title="Select from your favourite recriters"
		aria-label="Home"
	>
		{#if page.url.pathname !== '/' && !page.url.pathname.startsWith('/section/')}
			<House size={30} aria-hidden="true" />
		{/if}
	</a>

	<ul class="ml-auto flex list-none items-center gap-[20px] p-0 text-[16px] leading-[20px]">
		<li><a class="text-white" href={resolve('/about')}>About</a></li>
		<li>
			<a class="text-white" href="https://quran.zendesk.com/hc/en-us/requests/new">Contact Us</a>
		</li>
		<li>
			<a
				class="text-[30px] text-white"
				href="https://quran.com"
				title="Read the holy Quran, on quran.com"
				aria-label="Quran.com"
			>
				<Book size={30} aria-hidden="true" />
			</a>
		</li>
	</ul>
</div>

<div class="mt-[-75px]">
	{@render children()}
</div>

<AudioPlayer />

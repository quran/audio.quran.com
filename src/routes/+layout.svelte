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
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://quranicaudio.com{page.url.pathname}" />
	<meta property="og:image" content="/ogimage.jpg" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content="Quran Mp3 and Audio Downloads in High Quality" />
	<meta
		property="og:description"
		content="QuranicAudio is your source for high quality recitations of the Quran. Stream or download all the Quran recitations"
	/>
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:site" content="@quran" />
	<meta property="twitter:creator" content="@quran" />
	<meta property="og:image:width" content="1536" />
	<meta property="og:image:height" content="1024" />
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

	<div class="absolute top-[10px] left-[5vw] right-[5vw] z-[11] flex items-center md:left-[2vw] md:right-[2vw]">
		<a
			class="text-white"
			href={resolve('/')}
			title="Select from your favourite recriters"
			aria-label="Home"
		>
			{#if page.url.pathname !== '/' && !page.url.pathname.startsWith('/section/')}
				<House class="h-[26px] w-[26px] md:h-[30px] md:w-[30px]" aria-hidden="true" />
			{/if}
		</a>

		<ul
			class="ml-auto flex flex-wrap list-none items-center gap-x-[12px] gap-y-[6px] p-0 text-[14px] leading-[20px] md:gap-x-[20px] md:gap-y-0 md:text-[16px]"
		>
			<li><a class="text-white" href={resolve('/about')}>About</a></li>
			<li>
				<a class="text-white" href="https://quran.zendesk.com/hc/en-us/requests/new">Contact Us</a>
			</li>
			<li>
				<a
					class="text-white"
					href="https://quran.com"
					title="Read the holy Quran, on quran.com"
					aria-label="Quran.com"
				>
					<Book class="h-[26px] w-[26px] md:h-[30px] md:w-[30px]" aria-hidden="true" />
				</a>
			</li>
		</ul>
	</div>

<div class="mt-[-75px] pb-[90px]">
	{@render children()}
</div>

<AudioPlayer />

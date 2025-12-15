<script>
	import './layout.css'
	import { page } from '$app/state'
	import { resolve } from '$app/paths'

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
	<link
		href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<ul
	class="absolute top-[10px] right-[15vw] z-10 w-full pl-[40px] text-right text-[14px] leading-[20px] md:right-[5vw]"
>
	<li class="mx-[10px] inline"><a class="text-white" href={resolve('/about')}>About</a></li>
	<li class="mx-[10px] inline">
		<a class="text-white" href="https://quran.zendesk.com/hc/en-us/requests/new">Contact Us</a>
	</li>
</ul>

<div class="mb-0">
	<a
		class="relative right-[20px] z-[11] ml-[30px] text-[30px] text-white"
		href={resolve('/')}
		title="Select from your favourite recriters"
		aria-label="Home"
	>
		{#if page.url.pathname !== '/' && !page.url.pathname.startsWith('/section/')}
			<i class="fa fa-home" aria-hidden="true"></i>
		{/if}
	</a>
	<a
		class="relative right-[20px] z-[11] float-right mr-[30px] ml-[30px] text-[30px] text-white"
		href="https://quran.com"
		title="Read the holy Quran, on quran.com"
		aria-label="Quran.com"
	>
		<i class="fa fa-book" aria-hidden="true"></i>
	</a>
</div>

{@render children()}

<script>
	import { page } from '$app/state'
	import { resolve } from '$app/paths'
</script>

<header
	class="h-[300px] bg-[#2ca4ab] bg-[url('https://quranicaudio.com/public/images/background.jpg')] bg-cover bg-center bg-no-repeat pt-[115px] pb-[10px] text-center text-white md:pt-[100px]"
>
	<h1
		class="mt-[20px] mb-[10px] inline-block font-['Montserrat-Bold'] text-[40px] leading-[1.1] md:text-[48px]"
	>
		QuranicAudio
	</h1>
</header>

<div
	class="relative m-0 w-full bg-white px-[15px] pb-[35px] md:mx-auto md:mb-[50px] md:max-w-[1170px]"
>
	{#if page.status === 404}
		<h1 class="mt-[20px] mb-[10px] text-[36px] leading-[39.6px] text-[#444]">Page not found</h1>
		<p class="m-0 mb-[10px] text-[14px] leading-[20px] text-[#444]">
			Sorry, we couldn’t find that page.
		</p>
		<a class="text-[#2ca4ab]" href={resolve('/')}>Go back home</a>
	{:else}
		<h1 class="mt-[20px] mb-[10px] text-[36px] leading-[39.6px] text-[#444]">
			Something went wrong
		</h1>
		<p class="m-0 mb-[10px] text-[14px] leading-[20px] text-[#444]">Please try again.</p>
		<a class="text-[#2ca4ab]" href={resolve('/')}>Go back home</a>
	{/if}
</div>

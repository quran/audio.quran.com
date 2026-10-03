<header class="overflow-hidden bg-[#621d03] pt-[75px]">
	<div
		class="flex flex-col items-center bg-linear-to-b from-[#621d03] to-[#270d03] px-[15px] pt-[76px] pb-[58px]"
	>
		<h1 class="m-0 flex">
			<img
				src="/branding/banner/logo.svg"
				alt="Quran Audio"
				width="150"
				height="192"
				class="block h-auto w-[min(32vw,150px)]"
				fetchpriority="high"
			/>
		</h1>
		<p
			class="m-0 mt-[30px] max-w-[520px] text-center text-[17px] leading-[1.5] tracking-[0.5px] text-pretty text-[#f1d6c6]"
		>
			High quality recitations of the Quran. Stream or download all the Quran recitations.
		</p>
		<!-- On desktop the store badges live in the top nav (see +layout.svelte) -->
		<div class="mt-[22px] flex gap-[10px] sm:hidden">
			<StoreBadges />
		</div>
	</div>
</header>

<script>
import StoreBadges from '$lib/StoreBadges.svelte'
</script>

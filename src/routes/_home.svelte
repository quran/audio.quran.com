<script>
	import { ChevronUp } from '@lucide/svelte'
	import { resolve } from '$app/paths'

	let { sections, qaris, section } = $props()

	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

	let haramainList = $derived(qaris.filter((q) => q.section_id === 2 && q.home))
	let haramain = $derived({
		makkah: haramainList.filter((q) => q.name.includes('Makkah')),
		madinah: haramainList.filter((q) => q.name.includes('Madinah'))
	})

	let grouped = $derived(
		letters
			.map((letter) => ({
				letter,
				qaris: qaris.filter((q) => q.section_id === section && q.home && q.name?.[0] === letter)
			}))
			.filter((g) => g.qaris.length)
	)
</script>

<div>
	<header
		class="h-[300px] bg-[#2ca4ab] bg-[url('https://quranicaudio.com/public/images/background.jpg')] bg-cover bg-center bg-no-repeat pt-[115px] pb-[10px] text-center text-white md:pt-[100px]"
	>
		<h1
			class="mt-[20px] mb-[10px] inline-block font-['Montserrat-Bold'] text-[40px] leading-[1.1] md:text-[48px]"
		>
			QuranicAudio
		</h1>
	</header>

	<ul
		class="m-0 mb-[10px] flex w-full min-w-[230px] list-none flex-col bg-white p-0 px-[10px] md:flex-row md:justify-center md:px-0"
	>
		{#each sections as s (s.id)}
			<li class="mb-[5px] list-none p-0 text-center tracking-[1px] hover:bg-[#f7f7f7]">
				{#if s.id === 1}
					<a
						class="block border-b-2 bg-transparent px-[15px] py-[25px] text-[16px] text-[#2ca4ab] no-underline {s.id ===
						section
							? 'border-b-[#2ca4ab]'
							: 'border-b-[#f0f0f0]'}"
						href={resolve('/')}>{s.name}</a
					>
				{:else}
					<a
						class="block border-b-2 bg-transparent px-[15px] py-[25px] text-[16px] text-[#2ca4ab] no-underline {s.id ===
						section
							? 'border-b-[#2ca4ab]'
							: 'border-b-[#f0f0f0]'}"
						href={resolve('/section/[section]', { section: String(s.id) })}>{s.name}</a
					>
				{/if}
			</li>
		{/each}
	</ul>

	<div
		class="relative m-0 w-full bg-white px-[15px] pb-[35px] md:mx-auto md:mb-[50px] md:max-w-[1170px]"
	>
		<div class="-mx-[15px] bg-white md:mx-0">
			{#if section === 2}
				<div class="relative flex min-h-[100px] flex-wrap items-start justify-start">
					<h2
						class="my-[10px] w-full border-b-2 border-b-[#2ca4ab] bg-[#2ca4ab] py-[5px] pl-[20px] text-[26px] leading-[33px] text-white md:mt-[20px] md:mb-[10px] md:w-fit md:bg-transparent md:py-0 md:pl-0 md:text-[30px] md:text-[#2e2e2e]"
					>
						Makkah
					</h2>
					<ul
						class="relative left-0 z-[1] m-0 flex w-full list-none flex-wrap overflow-hidden p-0 px-[10px] after:block after:w-full after:content-[''] md:left-[40px] md:mt-[10px] md:px-0 md:after:border-b md:after:border-b-[#f0f0f0]"
					>
						{#each haramain.makkah as q (q.id)}
							<li
								class="w-full border-b border-b-[#f0f0f0] text-[14px] leading-[1.5em] tracking-[1px] md:w-[370px] md:border-b-0 last:[&>a]:pb-[20px] md:last:[&>a]:pb-[15px]"
							>
								<a
									class="block cursor-pointer pt-[20px] pb-[15px] pl-[20px] text-[#2e2e2e] no-underline hover:bg-[#f7f7f7] md:py-[15px]"
									href={resolve('/quran/[id]', { id: String(q.id) })}>{q.name}</a
								>
							</li>
						{/each}
					</ul>
					<h2
						class="my-[10px] w-full border-b-2 border-b-[#2ca4ab] bg-[#2ca4ab] py-[5px] pl-[20px] text-[26px] leading-[33px] text-white md:mt-[20px] md:mb-[10px] md:w-fit md:bg-transparent md:py-0 md:pl-0 md:text-[30px] md:text-[#2e2e2e]"
					>
						Madinah
					</h2>
					<ul
						class="relative left-0 z-[1] m-0 flex w-full list-none flex-wrap overflow-hidden p-0 px-[10px] after:block after:w-full after:content-[''] md:left-[40px] md:mt-[10px] md:px-0 md:after:border-b md:after:border-b-[#f0f0f0]"
					>
						{#each haramain.madinah as q (q.id)}
							<li
								class="w-full border-b border-b-[#f0f0f0] text-[14px] leading-[1.5em] tracking-[1px] md:w-[370px] md:border-b-0 last:[&>a]:pb-[20px] md:last:[&>a]:pb-[15px]"
							>
								<a
									class="block cursor-pointer pt-[20px] pb-[15px] pl-[20px] text-[#2e2e2e] no-underline hover:bg-[#f7f7f7] md:py-[15px]"
									href={resolve('/quran/[id]', { id: String(q.id) })}>{q.name}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			{:else}
				{#each grouped as g (g.letter)}
					<div class="relative flex min-h-[100px] flex-wrap items-start justify-start">
						<span
							class="relative left-0 w-full rounded-none border-0 bg-[#2ca4ab] pt-[7px] pr-[13px] pb-[6px] pl-[20px] text-left text-[26px] leading-[22.8571px] font-normal text-white md:absolute md:left-[17px] md:z-10 md:mt-[10px] md:w-fit md:rounded-full md:border-[1.66667px] md:border-[#f0f0f0] md:bg-transparent md:pl-[13px] md:text-[16px] md:text-[#2e2e2e] {g.letter ===
							'I'
								? 'md:pl-[15px]'
								: ''}"
						>
							{g.letter}{#if g.letter === 'I'}<span class="invisible">I</span>{/if}
						</span>
						<ul
							class="relative left-0 z-[1] m-0 flex w-full list-none flex-wrap overflow-hidden p-0 px-[10px] after:block after:w-full after:content-[''] md:left-[40px] md:mt-[10px] md:px-0 md:after:border-b md:after:border-b-[#f0f0f0]"
						>
							{#each g.qaris as q (q.id)}
								<li
									class="w-full border-b border-b-[#f0f0f0] text-[14px] leading-[1.5em] tracking-[1px] md:w-[370px] md:border-b-0 last:[&>a]:pb-[20px] md:last:[&>a]:pb-[15px]"
								>
									<a
										class="block cursor-pointer pt-[20px] pb-[15px] pl-[20px] text-[#2e2e2e] no-underline hover:bg-[#f7f7f7] md:py-[15px]"
										href={resolve('/quran/[id]', { id: String(q.id) })}>{q.name}</a
									>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			{/if}
		</div>

		<button
			type="button"
			class="float-right mr-[10px] w-full cursor-pointer text-center text-[20px] hover:underline md:text-[15px]"
			onclick={() => window.scrollTo(0, 0)}
		>
			Go to the top <ChevronUp size={18} class="ml-[4px] inline-block" aria-hidden="true" />
		</button>
	</div>
</div>

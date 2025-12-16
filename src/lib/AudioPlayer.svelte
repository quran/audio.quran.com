<script>
	import { CirclePause, CirclePlay, Repeat, Shuffle, SkipBack, SkipForward } from '@lucide/svelte'
	import {
		next,
		player,
		previous,
		setPlaying,
		setTiming,
		togglePlaying,
		toggleRandom,
		toggleRepeat
	} from '../stores/audio.js'

	/** @type {HTMLAudioElement | null} */
	let audio = null

	const current = $derived($player.queue[$player.index])

	const pad2 = (n) => String(n).padStart(2, '0')
	const formatSeconds = (seconds) => {
		const total = Math.floor(Number(seconds) || 0)
		const h = Math.floor(total / 3600)
		const m = Math.floor((total % 3600) / 60)
		const s = total % 60
		return h ? `${pad2(h)}:${pad2(m)}:${pad2(s)}` : `${pad2(m)}:${pad2(s)}`
	}

	const syncTiming = () => {
		if (!audio) return
		setTiming(audio.currentTime || 0, audio.duration || 0)
	}

	/** @param {MouseEvent} e */
	const onTrackClick = (e) => {
		if (!audio?.duration) return
		const rect = /** @type {HTMLElement} */ (e.currentTarget).getBoundingClientRect()
		const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
		audio.currentTime = pct * audio.duration
		syncTiming()
	}

	const attachAudio = (node) => {
		audio = node
		let lastKey = ''
		let lastPlaying = false
		let lastRepeat = false

		const unsub = player.subscribe((state) => {
			const track = state.queue[state.index]
			if (!track) return

			if (track.key !== lastKey) {
				node.src = track.src
				node.currentTime = 0
				lastKey = track.key
			}

			if (state.repeat !== lastRepeat) {
				node.loop = state.repeat
				lastRepeat = state.repeat
			}

			if (state.playing !== lastPlaying) {
				if (state.playing) node.play()
				else node.pause()
				lastPlaying = state.playing
			}
		})
		return () => {
			unsub()
			if (audio === node) audio = null
		}
	}
</script>

{#if current}
	<div class="fixed inset-x-0 bottom-0 z-[11] bg-white">
		<button
			type="button"
			aria-label="Seek"
			class="h-[14px] w-full cursor-pointer bg-[#f7f7f7]"
			onclick={onTrackClick}
		>
			<div
				class="relative h-full bg-[#2ca4ab] pl-[12px] after:absolute after:top-[-4px] after:right-[-5px] after:block after:h-[20px] after:w-[20px] after:rounded-full after:bg-white after:shadow-[0_1px_2px_rgba(0,0,0,0.45)] after:content-['']"
				style="width: {($player.duration
					? ($player.currentTime / $player.duration) * 100
					: 0
				).toFixed(4)}%"
			></div>
		</button>

		<div class="mx-auto max-w-[1170px] px-[15px]">
			<div class="flex flex-wrap items-center gap-x-[20px] gap-y-[10px] py-[10px]">
				<div class="flex items-center gap-[20px]">
					<button
						type="button"
						aria-label="Previous"
						class="cursor-pointer text-[#2e2e2e] disabled:cursor-not-allowed disabled:opacity-50"
						onclick={previous}
						disabled={$player.index <= 0}
					>
						<SkipBack size={24} aria-hidden="true" />
					</button>

					<button
						type="button"
						aria-label={$player.playing ? 'Pause' : 'Play'}
						class="cursor-pointer text-[#2ca4ab] disabled:cursor-not-allowed disabled:opacity-50"
						onclick={togglePlaying}
					>
						{#if $player.playing}
							<CirclePause size={48} aria-hidden="true" />
						{:else}
							<CirclePlay size={48} aria-hidden="true" />
						{/if}
					</button>

					<button
						type="button"
						aria-label="Next"
						class="cursor-pointer text-[#2e2e2e] disabled:cursor-not-allowed disabled:opacity-50"
						onclick={next}
						disabled={$player.index >= $player.queue.length - 1 && !$player.random}
					>
						<SkipForward size={24} aria-hidden="true" />
					</button>

					<div class="pl-[5px]">
						<h4 class="m-0 leading-[1.2] text-[#2e2e2e]">
							{current.title}
						</h4>
					</div>
				</div>

				<div class="ml-auto flex items-center gap-[12px] text-[14px]">
					{#if $player.duration}
						<span class="text-[#2e2e2e] opacity-70"
							>{formatSeconds($player.currentTime)} / {formatSeconds($player.duration)}</span
						>
					{/if}

					<button
						type="button"
						aria-label="Toggle random"
						class="cursor-pointer {$player.random ? 'text-[#2ca4ab]' : 'text-[#2e2e2e]'}"
						onclick={toggleRandom}
					>
						<Shuffle size={20} aria-hidden="true" />
					</button>
					<button
						type="button"
						aria-label="Toggle repeat"
						class="cursor-pointer {$player.repeat ? 'text-[#2ca4ab]' : 'text-[#2e2e2e]'}"
						onclick={toggleRepeat}
					>
						<Repeat size={20} aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>

		<audio
			{@attach attachAudio}
			preload="auto"
			ontimeupdate={syncTiming}
			onloadedmetadata={syncTiming}
			onplay={() => setPlaying(true)}
			onpause={() => setPlaying(false)}
			onended={() => (!$player.repeat ? next() : undefined)}
		></audio>
	</div>
{/if}

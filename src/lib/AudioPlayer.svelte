<script>
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
		const unsub = player.subscribe((state) => {
			const track = state.queue[state.index]
			if (!track) return

			if (node.src !== track.src) {
				node.src = track.src
				node.currentTime = 0
			}

			if (state.playing && node.paused) node.play()
			if (!state.playing && !node.paused) node.pause()
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
			class="h-[7px] w-full cursor-pointer bg-[#f7f7f7] transition-[height] duration-100 hover:h-[14px]"
			onclick={onTrackClick}
		>
			<div
				class="h-full bg-[#2ca4ab]"
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
						<i class="fa fa-fast-backward fa-lg" aria-hidden="true"></i>
					</button>

					<button
						type="button"
						aria-label={$player.playing ? 'Pause' : 'Play'}
						class="cursor-pointer text-[#2ca4ab] disabled:cursor-not-allowed disabled:opacity-50"
						onclick={togglePlaying}
					>
						<i
							class="fa {$player.playing ? 'fa-pause-circle' : 'fa-play-circle'} fa-3x"
							aria-hidden="true"
						></i>
					</button>

					<button
						type="button"
						aria-label="Next"
						class="cursor-pointer text-[#2e2e2e] disabled:cursor-not-allowed disabled:opacity-50"
						onclick={next}
						disabled={$player.index >= $player.queue.length - 1 && !$player.random}
					>
						<i class="fa fa-fast-forward fa-lg" aria-hidden="true"></i>
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
						<i class="fa fa-random" aria-hidden="true"></i>
					</button>
					<button
						type="button"
						aria-label="Toggle repeat"
						class="cursor-pointer {$player.repeat ? 'text-[#2ca4ab]' : 'text-[#2e2e2e]'}"
						onclick={toggleRepeat}
					>
						<i class="fa fa-repeat" aria-hidden="true"></i>
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
			onended={() => {
				if (!audio) return
				if ($player.repeat) {
					audio.currentTime = 0
					audio.play()
					return
				}
				next()
			}}
		></audio>
	</div>
{/if}

import { get, writable } from 'svelte/store'

/** @typedef {{ key: string, src: string, title: string, qariId?: number, surahId?: number, qariName?: string, surahTitle?: string, downloadHref?: string, readHref?: string }} Track */
/** @typedef {{ queue: Track[], index: number, playing: boolean, repeat: boolean, random: boolean, currentTime: number, duration: number }} PlayerState */

/** @type {import('svelte/store').Writable<PlayerState>} */
export const player = writable({
	queue: /** @type {Track[]} */ ([]),
	index: -1,
	playing: false,
	repeat: false,
	random: false,
	currentTime: 0,
	duration: 0
})

/** @param {Track[]} queue */
export const setQueue = (queue, index = 0, autoplay = true) => {
	player.update((state) => ({
		...state,
		queue,
		index,
		playing: autoplay,
		currentTime: 0,
		duration: 0
	}))
}

export const setPlaying = (playing) => {
	player.update((state) => ({ ...state, playing }))
}

export const togglePlaying = () => {
	player.update((state) => ({ ...state, playing: !state.playing }))
}

export const toggleRepeat = () => {
	player.update((state) => ({ ...state, repeat: !state.repeat }))
}

export const toggleRandom = () => {
	player.update((state) => ({ ...state, random: !state.random }))
}

export const setTiming = (currentTime, duration) => {
	player.update((state) => ({ ...state, currentTime, duration }))
}

export const next = () => {
	player.update((state) => {
		if (!state.queue.length) return state
		if (state.random) {
			const nextIndex = Math.floor(Math.random() * state.queue.length)
			return { ...state, index: nextIndex, currentTime: 0, duration: 0, playing: true }
		}

		const nextIndex = Math.min(state.index + 1, state.queue.length - 1)
		return { ...state, index: nextIndex, currentTime: 0, duration: 0, playing: true }
	})
}

export const previous = () => {
	player.update((state) => {
		if (!state.queue.length) return state
		const nextIndex = Math.max(state.index - 1, 0)
		return { ...state, index: nextIndex, currentTime: 0, duration: 0, playing: true }
	})
}

export const playTrack = (track) => {
	const state = get(player)
	const index = state.queue.findIndex((t) => t.key === track.key)
	if (index === -1) return
	player.update((s) => ({ ...s, index, playing: true, currentTime: 0, duration: 0 }))
}

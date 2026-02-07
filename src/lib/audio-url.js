const splitUrlSuffix = (url) => {
	const match = String(url).match(/^(.*?)([?#].*)?$/)
	return { base: match?.[1] ?? String(url), suffix: match?.[2] ?? '' }
}

export const toOpusUrl = (mp3Url) => {
	const { base, suffix } = splitUrlSuffix(mp3Url)
	if (!base.endsWith('.mp3')) return mp3Url

	const lastSlash = base.lastIndexOf('/')
	if (lastSlash === -1) return mp3Url

	const prefix = base.slice(0, lastSlash + 1)
	const file = base.slice(lastSlash + 1)
	if (!file.endsWith('.mp3')) return mp3Url

	const opusPrefix = prefix.endsWith('/mp3/')
		? prefix.replace(/\/mp3\/$/, '/opus/')
		: `${prefix}opus/`
	const opusFile = file.replace(/\.mp3$/, '.opus')

	return `${opusPrefix}${opusFile}${suffix}`
}

let cachedOpusSupport = null
export const canPlayOpus = () => {
	if (cachedOpusSupport != null) return cachedOpusSupport
	if (typeof window === 'undefined') return (cachedOpusSupport = false)

	try {
		// Prefer runtime detection over UA sniffing.
		// `audio/ogg; codecs="opus"` is widely used for Opus-in-Ogg.
		const audio = typeof Audio !== 'undefined' ? new Audio() : null
		const result = audio?.canPlayType?.('audio/ogg; codecs="opus"') || ''
		cachedOpusSupport = result === 'probably' || result === 'maybe'
		return cachedOpusSupport
	} catch {
		cachedOpusSupport = false
		return cachedOpusSupport
	}
}

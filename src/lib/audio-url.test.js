import assert from 'node:assert/strict'
import test from 'node:test'
import { toOpusUrl } from './audio-url.js'

test('toOpusUrl: standard path', () => {
	assert.equal(
		toOpusUrl('https://download.quranicaudio.com/quran/ibrahim_walk/090.mp3'),
		'https://download.quranicaudio.com/quran/ibrahim_walk/opus/090.opus'
	)
})

test('toOpusUrl: /mp3/ becomes sibling /opus/', () => {
	assert.equal(
		toOpusUrl('https://download.quranicaudio.com/quran/alijon_qari/mp3/090.mp3'),
		'https://download.quranicaudio.com/quran/alijon_qari/opus/090.opus'
	)
})

test('toOpusUrl: preserves querystring', () => {
	assert.equal(
		toOpusUrl('https://download.quranicaudio.com/quran/ibrahim_walk/090.mp3?x=1'),
		'https://download.quranicaudio.com/quran/ibrahim_walk/opus/090.opus?x=1'
	)
})

test('toOpusUrl: non-mp3 unchanged', () => {
	assert.equal(toOpusUrl('https://example.com/x.ogg'), 'https://example.com/x.ogg')
})

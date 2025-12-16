const API_ORIGIN = process.env.API_ORIGIN || 'https://quranicaudio.com'

/** @param {import('./$types').RequestEvent} event */
const proxy = async ({ request, params, fetch }) => {
	const url = new URL(request.url)
	const target = new URL(`/api/${params.path || ''}`, API_ORIGIN)
	target.search = url.search

	const headers = new Headers(request.headers)
	headers.delete('host')
	headers.delete('connection')

	const res = await fetch(target, {
		method: request.method,
		headers,
		body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
		redirect: 'manual'
	})

	const outHeaders = new Headers(res.headers)
	outHeaders.delete('content-encoding')
	outHeaders.delete('content-length')

	return new Response(res.body, { status: res.status, headers: outHeaders })
}

export const GET = proxy
export const POST = proxy
export const PUT = proxy
export const PATCH = proxy
export const DELETE = proxy
export const OPTIONS = proxy
export const HEAD = proxy

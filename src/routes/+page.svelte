<script>
	import Home from './_home.svelte'

	let { data } = $props()
</script>

<Home section={data.section} sections={data.sections} qaris={data.qaris} />

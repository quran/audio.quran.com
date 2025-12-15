<script>
	import Download from '../../_download.svelte'

	let { data } = $props()
</script>

<Download audioFile={data.audioFile} qaris={data.qaris} surahs={data.surahs} />

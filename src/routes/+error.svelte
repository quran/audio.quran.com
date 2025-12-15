<script>
	import { page } from '$app/state'
</script>

<div class="qa-container" style="padding: 40px 15px;">
	{#if page.status === 404}
		<h1>Doh! 404!</h1>
		<p>These are <em>not</em> the droids you are looking for!</p>
	{:else}
		<h1>Error {page.status}</h1>
	{/if}
</div>

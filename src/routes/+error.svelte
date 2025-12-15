<script>
	import { page } from '$app/state'
</script>

<div
	class="relative m-0 w-full bg-white px-[15px] py-[40px] md:mx-auto md:mb-[50px] md:max-w-[1170px]"
>
	{#if page.status === 404}
		<h1>Doh! 404!</h1>
		<p>These are <em>not</em> the droids you are looking for!</p>
	{:else}
		<h1>Error {page.status}</h1>
	{/if}
</div>

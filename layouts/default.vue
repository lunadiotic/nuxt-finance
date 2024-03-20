<script setup>
useHead({
	link: [
		{
			rel: 'preconnect',
			href: 'https://fonts.googleapis.com',
		},
		{
			rel: 'preconnect',
			href: 'https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:wght@100..900&display=swap',
		},
	],
});
</script>

<template>
	<div class="container mx-auto max-w-4xl">
		<main class="my-10">
			<slot />
		</main>
	</div>
</template>

<style>
body {
	font-family: 'Inter', sans-serif;
}

body {
	@apply bg-white dark:bg-gray-900;
}
</style>

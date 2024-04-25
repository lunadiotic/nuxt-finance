<script setup>
const success = ref(false);
</script>

<template>
	<UCard v-if="!success">
		<template #header>
			<div class="flex items-center justify-between">
				<h3
					class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
				>
					Sign in to your account.
				</h3>
			</div>
		</template>
		<form>
			<UFormGroup
				label="Email"
				:required="true"
				name="email"
				class="mb-4"
				help="You will receive an email with a link to confirm your account."
			>
				<UInput type="email" placeholder="Email" v-model="email" />
			</UFormGroup>
			<UButton type="submit" color="primary" @click="success = true"
				>Login</UButton
			>
		</form>
	</UCard>
	<UCard v-else>
		<template #header>
			<h3
				class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
			>
				Email has been sent.
			</h3>
		</template>
		<div class="text-center">
			<p class="text-gray-500 dark:text-gray-400">
				Please check your email for the confirmation link.
			</p>
		</div>
	</UCard>
</template>

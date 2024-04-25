<script setup>
const success = ref(false);
const email = ref('');
const pending = ref(false);
const toast = useToast();
const supabase = useSupabaseClient();

const handleLogin = async () => {
	try {
		pending.value = true;
		const { error } = await supabase.auth.signInWithOtp({
			email: email.value,
			options: { emailRedirectTo: 'http://localhost:3000' },
		});
		if (error) throw error;
		toast.add({
			title: 'Check your email for the login link!',
			color: 'green',
		});
		success.value = true;
	} catch (error) {
		toast.add({ title: error.message, color: 'red' });
	} finally {
		pending.value = false;
	}
};
</script>

<template>
	<UCard v-if="!success">
		<template #header>
			<div class="flex items-center justify-between">
				<h3
					class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
				>
					Sign up for an account.
				</h3>
			</div>
		</template>
		<form @submit.prevent="handleLogin">
			<UFormGroup
				label="Email"
				:required="true"
				name="email"
				class="mb-4"
				help="You will receive an email with a link to confirm your account."
			>
				<UInput type="email" placeholder="Email" v-model="email" />
			</UFormGroup>
			<UButton
				type="submit"
				color="primary"
				:loading="pending"
				:disabled="pending"
				>Sign up</UButton
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

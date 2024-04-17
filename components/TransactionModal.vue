<script setup>
const props = defineProps({
	modelValue: Boolean,
});
const emit = defineEmits(['update:modelValue']);
const isModalOpen = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});
</script>

<template>
	<UModal v-model="isModalOpen" prevent-close>
		<UCard>
			<template #header>
				<div class="flex items-center justify-between">
					<h3
						class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
					>
						Add Transaction
					</h3>
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-x-mark-20-solid"
						class="-my-1"
						@click="isModalOpen = false"
					/>
				</div>
			</template>

			<Placeholder class="h-32" />
		</UCard>
	</UModal>
</template>

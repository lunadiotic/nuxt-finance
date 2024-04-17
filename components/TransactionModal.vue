<script setup>
import { transactionTypeOptions } from '~~/constants';
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

			<UFormGroup label="Date" :required="true" name="created_at" class="mb-4">
				<UInput
					type="date"
					placeholder="Date"
					icon="i-heroicons-calendar-20-solid"
				/>
			</UFormGroup>

			<UFormGroup
				label="Description"
				:required="true"
				name="description"
				class="mb-4"
			>
				<UInput type="text" placeholder="Description" />
			</UFormGroup>

			<UFormGroup label="Type" :required="true" name="type" class="mb-4">
				<USelect
					type="text"
					placeholder="type of transaction"
					:options="transactionTypeOptions"
				/>
			</UFormGroup>

			<UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
				<UInput type="number" placeholder="Amount" />
			</UFormGroup>

			<UButton type="submit" color="black" variant="solid">Submit</UButton>
		</UCard>
	</UModal>
</template>
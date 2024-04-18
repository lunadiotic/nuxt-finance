<script setup>
import { z } from 'zod';
import { transactionTypeOptions } from '~~/constants';
const props = defineProps({
	modelValue: Boolean,
});
const emit = defineEmits(['update:modelValue', 'saved']);
const isModalOpen = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		if (!value) {
			resetForm();
		}
		emit('update:modelValue', value);
	},
});
const initialState = {
	created_at: new Date().toISOString().split('T')[0],
	description: undefined,
	type: transactionTypeOptions[0],
	amount: 0,
};

const state = reactive({
	...initialState,
});

const schema = z.object({
	created_at: z.string(),
	description: z.string(),
	type: z.enum(transactionTypeOptions),
	amount: z.number().positive(),
});

const form = ref();
const isLoading = ref(false);
const toast = useToast();
const supabase = useSupabaseClient();

const resetForm = () => {
	Object.assign(state, initialState);
	form.value.clear();
};

async function addTransaction(event) {
	if (form.value.errors.length) return;
	try {
		isLoading.value = true;
		const { error } = await supabase.from('transactions').upsert({ ...state });

		if (!error) {
			toast.add({
				title: 'Success',
				icon: 'i-heroicons-check-circle',
				color: 'green',
			});
			isModalOpen.value = false;
			emit('saved');
		}
	} catch (error) {
		console.log(error);
		toast.add({
			title: error.message,
			icon: 'i-heroicons-exclamation-circle',
			color: 'red',
		});
	} finally {
		isLoading.value = false;
	}
}
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

			<UForm
				:state="state"
				:schema="schema"
				ref="form"
				@submit="addTransaction"
			>
				<UFormGroup
					label="Date"
					:required="true"
					name="created_at"
					class="mb-4"
				>
					<UInput
						type="date"
						placeholder="Date"
						icon="i-heroicons-calendar-20-solid"
						v-model="state.created_at"
					/>
				</UFormGroup>

				<UFormGroup
					label="Description"
					:required="true"
					name="description"
					class="mb-4"
				>
					<UInput
						type="text"
						placeholder="Description"
						v-model="state.description"
					/>
				</UFormGroup>

				<UFormGroup label="Type" :required="true" name="type" class="mb-4">
					<USelect
						type="text"
						placeholder="type of transaction"
						:options="transactionTypeOptions"
						v-model="state.type"
					/>
				</UFormGroup>

				<UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
					<UInput type="number" placeholder="Amount" v-model="state.amount" />
				</UFormGroup>

				<UButton
					type="submit"
					color="black"
					variant="solid"
					:loading="isLoading"
					>Submit</UButton
				>
			</UForm>
		</UCard>
	</UModal>
</template>

<script setup>
const props = defineProps({
	transaction: Object,
});
const emit = defineEmits(['delete']);

const { currency: amount } = useCurrency(props.transaction.amount);

const isIncome = computed(() => props.transaction.type === 'income');
const icon = computed(() => {
	if (isIncome.value) {
		return 'i-heroicons-arrow-up-right';
	} else {
		return 'i-heroicons-arrow-down-left';
	}
});
const iconColor = computed(() => {
	if (isIncome.value) {
		return 'text-green-500';
	} else {
		return 'text-red-500';
	}
});

const isLoading = ref(false);
const toast = useToast();
const supabase = useSupabaseClient();

const deleteTransaction = async (id) => {
	isLoading.value = true;
	try {
		await supabase.from('transactions').delete().eq('id', props.transaction.id);
		toast.add({
			title: 'Success',
			icon: 'i-heroicons-check-circle',
			color: 'green',
		});
		emit('delete', props.transaction.id);
	} catch (error) {
		toast.add({
			title: 'Error',
			icon: 'i-heroicons-exclamation-circle',
			color: 'red',
		});
	} finally {
		isLoading.value = false;
	}
};

const actions = [
	[
		{
			label: 'Edit',
			icon: 'i-heroicons-pencil-square-20-solid',
			click: () => console.log('Edit'),
		},
		{
			label: 'Delete',
			icon: 'i-heroicons-trash-20-solid',
			click: deleteTransaction,
		},
	],
];
</script>

<template>
	<div
		class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
	>
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-1">
				<UIcon :name="icon" :class="[iconColor]" />
				<div>{{ transaction.description }}</div>
			</div>
			<div>
				<UBadge color="white">{{ transaction.type }}</UBadge>
			</div>
		</div>
		<div class="flex items-center justify-end space-x-2">
			<div>{{ amount }}</div>
			<div>
				<UDropdown :items="actions" :popper="{ placement: 'bottom-start' }">
					<UButton
						size="sm"
						color="white"
						variant="ghost"
						trailing-icon="i-heroicons-ellipsis-horizontal"
						:loading="isLoading"
					/>
				</UDropdown>
			</div>
		</div>
	</div>
</template>

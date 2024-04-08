<script setup>
const props = defineProps({
	transaction: Object,
});
const { currency: amount } = useCurrency(props.transaction.amount);
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
			click: () => console.log('Delete'),
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
				<UIcon name="i-heroicons-arrow-up-right" class="text-green-500" />
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
					/>
				</UDropdown>
			</div>
		</div>
	</div>
</template>

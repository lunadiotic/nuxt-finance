<script setup>
import { transactionViewOptions } from '~/constants';

const supabase = useSupabaseClient();
const selectedView = ref(transactionViewOptions[1]);
const transactions = ref([]);

const { data, pending } = await useAsyncData('transactions', async () => {
	const { data, error } = await supabase
		.from('transactions')
		.select()
		.order('created_at', { ascending: false });
	if (error) return [];
	return data;
});
transactions.value = data.value;

const transactionsGroupedByDate = computed(() => {
	let grouped = {};

	for (const transaction of transactions.value) {
		const date = new Date(transaction.created_at).toISOString().split('T')[0];

		if (!grouped[date]) {
			grouped[date] = [];
		}

		grouped[date].push(transaction);
	}

	return grouped;
});
</script>

<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">Summary</h1>
		<div>
			<USelectMenu v-model="selectedView" :options="transactionViewOptions" />
		</div>
	</section>

	<section
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
	>
		<Trend title="Income" :amount="1000" :lastAmount="500" :loading="false" />
		<Trend title="Expense" :amount="1000" :lastAmount="3000" :loading="false" />
		<Trend title="Savings" :amount="1000" :lastAmount="1500" :loading="false" />
		<Trend title="Budget" :amount="1000" :lastAmount="500" :loading="true" />
	</section>

	<section>
		<div
			v-for="(transactionOnDay, date) in transactionsGroupedByDate"
			:key="date"
			class="mb-10"
		>
			<TransactionDailySummary :date="date" :transactions="transactionOnDay" />
			<Transaction
				v-for="(transaction, index) in transactionOnDay"
				:key="index"
				:transaction="transaction"
			/>
		</div>
	</section>
</template>

<script setup>
import { transactionViewOptions } from '~/constants';

const supabase = useSupabaseClient();
const selectedView = ref(transactionViewOptions[1]);
const transactions = ref([]);
const isLoading = ref(false);

const income = computed(() => {
	return transactions.value.filter(
		(transaction) => transaction.type === 'income'
	);
});
const expense = computed(() => {
	return transactions.value.filter(
		(transaction) => transaction.type === 'expense'
	);
});

const incomeTotal = computed(() => {
	return income.value.reduce((total, transaction) => {
		return total + transaction.amount;
	}, 0);
});
const expenseTotal = computed(() => {
	return expense.value.reduce((total, transaction) => {
		return total + transaction.amount;
	}, 0);
});

const fetchTransactions = async () => {
	isLoading.value = true;
	try {
		const { data } = await useAsyncData('transactions', async () => {
			const { data, error } = await supabase
				.from('transactions')
				.select()
				.order('created_at', { ascending: false });
			if (error) return [];
			return data;
		});

		return data.value;
	} finally {
		isLoading.value = false;
	}
};

const refreshTransactions = async () => {
	transactions.value = await fetchTransactions();
};

await refreshTransactions();

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
		<Trend
			title="Income"
			:amount="incomeTotal"
			:lastAmount="500"
			:loading="isLoading"
		/>
		<Trend
			title="Expense"
			:amount="expenseTotal"
			:lastAmount="3000"
			:loading="isLoading"
		/>
		<Trend
			title="Savings"
			:amount="1000"
			:lastAmount="1500"
			:loading="isLoading"
		/>
		<Trend
			title="Budget"
			:amount="1000"
			:lastAmount="500"
			:loading="isLoading"
		/>
	</section>

	<section class="flex justify-between mb-10">
		<div>
			<h2 class="text-2xl font-extrabold">Transactions</h2>
			<div class="text-gray-500 dark:text-gray-400">
				You have {{ income.length }} incomes and {{ expense.length }} expenses
				this period
			</div>
		</div>
		<div>
			<UButton
				icon="i-heroicons-plus-circle"
				color="white"
				variant="solid"
				label="Add"
			/>
		</div>
	</section>

	<section v-if="!isLoading">
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
				@delete="refreshTransactions()"
			/>
		</div>
	</section>
	<section v-else>
		<USkeleton v-for="i in 3" :key="i" class="h-8 w-full mb-2" />
	</section>
</template>

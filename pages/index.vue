<script setup>
import { transactionViewOptions } from '~/constants';

const selectedView = ref(transactionViewOptions[1]);
const isModalOpen = ref(false);

const dates = useSelectedTimePeriod(selectedView);

const {
	pending,
	refresh,
	transactions: {
		income,
		expense,
		incomeTotal,
		expenseTotal,
		grouped: { byDate },
	},
} = useFetchTransactions();

await refresh();
</script>

<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">Summary</h1>
		<div>
			<USelectMenu v-model="selectedView" :options="transactionViewOptions" />
		</div>
	</section>

	<section class="grid grid-cols-1 sm:grid-cols-2 mb-10 text-center">
		<Trend
			title="Income"
			:amount="incomeTotal"
			:lastAmount="500"
			:loading="pending"
		/>
		<Trend
			title="Expense"
			:amount="expenseTotal"
			:lastAmount="3000"
			:loading="pending"
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
			<TransactionModal v-model="isModalOpen" @saved="refresh()" />
			<UButton
				icon="i-heroicons-plus-circle"
				color="white"
				variant="solid"
				label="Add"
				@click="isModalOpen = true"
			/>
		</div>
	</section>

	<section v-if="!pending">
		<div v-for="(transactionOnDay, date) in byDate" :key="date" class="mb-10">
			<TransactionDailySummary :date="date" :transactions="transactionOnDay" />
			<Transaction
				v-for="(transaction, index) in transactionOnDay"
				:key="index"
				:transaction="transaction"
				@delete="refresh()"
			/>
		</div>
	</section>
	<section v-else>
		<USkeleton v-for="i in 3" :key="i" class="h-8 w-full mb-2" />
	</section>
</template>

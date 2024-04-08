<script setup>
import { transactionViewOptions } from '~/constants';

const supabase = useSupabaseClient();

const selectedView = ref(transactionViewOptions[1]);
const transactions = ref([]);

const { data, pending } = await useAsyncData('transactions', async () => {
	const { data, error } = await supabase.from('transactions').select();
	if (error) return [];
	return data;
});
transactions.value = data.value;
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
		<Transaction
			v-for="transaction in transactions"
			:key="transaction.id"
			:transaction="transaction"
		/>
	</section>
</template>

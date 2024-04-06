<script setup>
import { transactionViewOptions } from '~/constants';
const selectedView = ref(transactionViewOptions[1]);

const supabase = useSupabaseClient();
// const { data, error } = await supabase.from('transactions').select();

// const { count, error } = await supabase
//   .from('transactions')
//   .select('*', { count: 'exact', head: true })

// const { data, error } = await supabase
// 	.from('transactions')
// 	.select()
// 	.eq('type', 'expense');

const { data, error } = await supabase
	.from('transactions')
	.select('description')
	.gte('amount', 2000);

console.log(error, data);
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
		<Transaction />
		<Transaction />
		<Transaction />
		<Transaction />
	</section>
</template>

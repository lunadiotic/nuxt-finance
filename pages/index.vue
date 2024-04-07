<script setup>
import { transactionViewOptions } from '~/constants';

const selectedView = ref(transactionViewOptions[1]);
const transactions = ref([]);
const loading = ref(true);

const supabase = useSupabaseClient();

const fetchData = async () => {
	try {
		const { data, error } = await supabase
			.from('transactions')
			.select('*')
			.order('created_at', { ascending: false });
		if (error) {
			throw new Error('Failed to fetch data');
		}
		transactions.value = data;
	} catch (error) {
		console.error(error);
	} finally {
		loading.value = false;
	}
};

onMounted(fetchData);
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

	<section v-if="loading">
		<USkeleton class="h-6 w-full" />
	</section>
	<section v-else>
		<Transaction
			v-for="(t, index) in transactions"
			:key="index"
			:transaction="t"
		/>
	</section>
</template>

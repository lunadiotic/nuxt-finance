<script setup>
import { transactionViewOptions } from '~/constants';
const selectedView = ref(transactionViewOptions[1]);
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
			:amount="1000"
			:lastAmount="500"
			color="green"
			:loading="false"
		/>
		<Trend
			title="Expense"
			:amount="1000"
			:lastAmount="500"
			color="red"
			:loading="false"
		/>
		<Trend
			title="Savings"
			:amount="1000"
			:lastAmount="500"
			color="green"
			:loading="false"
		/>
		<Trend
			title="Budget"
			:amount="1000"
			:lastAmount="500"
			color="red"
			:loading="true"
		/>
	</section>
</template>

<script setup>
const props = defineProps({
	title: String,
	amount: Number,
	lastAmount: Number,
	loading: Boolean,
});

const { amount } = toRefs(props);

const trendingUp = computed(() => props.amount >= props.lastAmount);
const icon = computed(() =>
	trendingUp.value
		? 'i-heroicons-arrow-trending-up'
		: 'i-heroicons-arrow-trending-down'
);

const color = computed(() => (trendingUp.value ? 'green' : 'red'));

const { currency } = useCurrency(amount);

const percentageTrending = computed(() => {
	if (props.lastAmount === 0 || props.amount === 0) {
		return '∞%';
	}

	const bigger = Math.max(props.amount, props.lastAmount);
	const lower = Math.min(props.amount, props.lastAmount);

	const ratio = ((bigger - lower) / bigger) * 100;

	return `${Math.ceil(ratio)}%`;
});
</script>

<template>
	<div class="mb-4">
		<div class="font-bold" :class="[color]">{{ title }}</div>
		<div class="text-2xl font-extrabold text-black dark:text-white mb-2">
			<USkeleton class="h-8 w-full" v-if="loading" />
			<span v-else>{{ currency }}</span>
		</div>
		<div>
			<USkeleton class="h-6 w-full" v-if="loading" />
			<div
				v-else
				class="flex justify-center space-x-1 items-center text-sm text-center"
			>
				<UIcon :name="icon" class="w-6 h-6" :class="color" />
				<span class="text-gray-500 dark:text-gray-400">
					{{ percentageTrending }} vs last periode
				</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.green {
	@apply text-green-600 dark:text-green-400;
}

.red {
	@apply text-red-600 dark:text-red-400;
}
</style>

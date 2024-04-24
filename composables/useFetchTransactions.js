export const useFetchTransactions = (period) => {
	const supabase = useSupabaseClient();
	const transactions = ref([]);
	const pending = ref(false);

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
		pending.value = true;
		try {
			const { data } = await useAsyncData(
				`transactions-${period.value.start.toDateString()}-${period.value.end.toDateString()}`,
				async () => {
					const { data, error } = await supabase
						.from('transactions')
						.select()
						.gte('created_at', period.value.start.toISOString())
						.lte('created_at', period.value.end.toISOString())
						.order('created_at', { ascending: false });
					if (error) return [];
					return data;
				}
			);

			return data.value;
		} finally {
			pending.value = false;
		}
	};

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

	const refresh = async () => {
		transactions.value = await fetchTransactions();
	};

	watch(period, async () => await refresh());

	return {
		transactions: {
			all: transactions,
			grouped: {
				byDate: transactionsGroupedByDate,
			},
			income,
			expense,
			incomeTotal,
			expenseTotal,
		},
		pending,
		refresh,
	};
};

export const useCurrency = (amount) => {
	const currency = computed(() => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(isRef(amount) ? amount.value : amount);
	});

	return {
		currency,
	};
};

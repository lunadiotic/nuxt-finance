import {
	endOfDay,
	endOfMonth,
	endOfYear,
	startOfDay,
	startOfMonth,
	startOfYear,
	sub,
} from 'date-fns';

export const useSelectedTimePeriod = (period) => {
	const dates = computed(() => {
		switch (period.value) {
			case 'Yearly':
				return {
					current: {
						start: startOfYear(new Date()),
						end: new Date(),
					},
					previous: {
						start: startOfYear(sub(new Date(), { years: 1 })),
						end: endOfYear(sub(new Date(), { years: 1 })),
					},
				};
			case 'Monthly':
				return {
					current: {
						start: startOfMonth(new Date()),
						end: new Date(),
					},
					previous: {
						start: startOfMonth(sub(new Date(), { months: 1 })),
						end: endOfMonth(sub(new Date(), { months: 1 })),
					},
				};
			case 'Daily':
				return {
					current: {
						start: startOfDay(new Date()),
						end: new Date(),
					},
					previous: {
						start: startOfDay(sub(new Date(), { days: 1 })),
						end: endOfDay(sub(new Date(), { days: 1 })),
					},
				};
		}
	});

	return dates;
};

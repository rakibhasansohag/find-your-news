'use client';

import { useState, useCallback } from 'react';
import { AdvancedFilterValues } from '@/components/news/AdvancedFilters';

export interface NewsFilters {
	country: string;
	category?: string;
	advancedFilters: AdvancedFilterValues;
	viewMode: 'dropdown' | 'cards';
	dataSource: 'api' | 'db';
	page: number;
}

export interface UseNewsFiltersReturn {
	filters: NewsFilters;
	setCountry: (country: string) => void;
	setCategory: (category?: string) => void;
	setAdvancedFilters: (filters: AdvancedFilterValues) => void;
	setViewMode: (mode: 'dropdown' | 'cards') => void;
	setDataSource: (source: 'api' | 'db') => void;
	setPage: (page: number) => void;
	resetFilters: () => void;
	resetAdvancedFilters: () => void;
}

const DEFAULT_FILTERS: NewsFilters = {
	country: 'us',
	category: undefined,
	advancedFilters: {},
	viewMode: 'dropdown',
	dataSource: 'api',
	page: 1,
};

/**
 * Custom hook to manage all news filters
 * Centralizes filter state management
 */
export function useNewsFilters(
	initialFilters?: Partial<NewsFilters>,
): UseNewsFiltersReturn {
	const [filters, setFilters] = useState<NewsFilters>({
		...DEFAULT_FILTERS,
		...initialFilters,
	});

	const setCountry = useCallback((country: string) => {
		setFilters((prev) => ({ ...prev, country, page: 1 }));
	}, []);

	const setCategory = useCallback((category?: string) => {
		setFilters((prev) => ({ ...prev, category, page: 1 }));
	}, []);

	const setAdvancedFilters = useCallback(
		(advancedFilters: AdvancedFilterValues) => {
			setFilters((prev) => ({ ...prev, advancedFilters, page: 1 }));
		},
		[],
	);

	const setViewMode = useCallback((viewMode: 'dropdown' | 'cards') => {
		setFilters((prev) => ({ ...prev, viewMode }));
	}, []);

	const setDataSource = useCallback((dataSource: 'api' | 'db') => {
		setFilters((prev) => ({ ...prev, dataSource, page: 1 }));
	}, []);

	const setPage = useCallback((page: number) => {
		setFilters((prev) => ({ ...prev, page }));
	}, []);

	const resetFilters = useCallback(() => {
		setFilters(DEFAULT_FILTERS);
	}, []);

	const resetAdvancedFilters = useCallback(() => {
		setFilters((prev) => ({ ...prev, advancedFilters: {}, page: 1 }));
	}, []);

	return {
		filters,
		setCountry,
		setCategory,
		setAdvancedFilters,
		setViewMode,
		setDataSource,
		setPage,
		resetFilters,
		resetAdvancedFilters,
	};
}

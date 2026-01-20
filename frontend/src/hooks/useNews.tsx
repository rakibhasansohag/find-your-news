'use client';

import { useState, useEffect, useCallback } from 'react';
import { newsApi } from '@/lib/api';
import { NewsArticle, IArticle } from '@/types/news.types';

export interface UseNewsParams {
	country?: string;
	category?: string;
	language?: string;
	from?: string;
	to?: string;
	sources?: string;
	search?: string;
	page?: number;
	pageSize?: number;
	dataSource?: 'api' | 'db';
}

export interface UseNewsReturn {
	articles: (NewsArticle | IArticle)[];
	loading: boolean;
	error: string | null;
	totalResults: number;
	pagination: {
		currentPage: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
	};
	refetch: () => void;
}

export function useNews(params: UseNewsParams = {}): UseNewsReturn {
	// 1. Destructure params with defaults
	const {
		country = 'us',
		category,
		language,
		from,
		to,
		sources,
		search,
		page = 1,
		pageSize = 20,
		dataSource = 'api',
	} = params;

	const [articles, setArticles] = useState<(NewsArticle | IArticle)[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [totalResults, setTotalResults] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(false);
	const [hasPrevPage, setHasPrevPage] = useState(false);

	// 2. Fetch logic using 'page' from params directly
	const fetchNews = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			if (dataSource === 'api') {
				const data = await newsApi.getTopHeadlines({
					country,
					category,
					language,
					from,
					to,
					sources,
					q: search,
					page,
					pageSize,
				});

				setArticles(data.articles);
				setTotalResults(data.totalResults);

				const calculatedTotalPages = Math.ceil(data.totalResults / pageSize);
				setTotalPages(calculatedTotalPages);
				setHasNextPage(page < calculatedTotalPages);
				setHasPrevPage(page > 1);
			} else {
				const response = await newsApi.getArticlesFromDB({
					country,
					category,
					language,
					from,
					to,
					search,
					page,
					pageSize,
				});

				setArticles(response.data);
				setTotalResults(response.pagination.totalResults);
				setTotalPages(response.pagination.totalPages);
				setHasNextPage(response.pagination.hasNextPage);
				setHasPrevPage(response.pagination.hasPrevPage);
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fetch news');
			setArticles([]);
			setTotalResults(0);
			setTotalPages(1);
			setHasNextPage(false);
			setHasPrevPage(false);
		} finally {
			setLoading(false);
		}
	}, [
		country,
		category,
		language,
		from,
		to,
		sources,
		search,
		page,
		pageSize,
		dataSource,
	]);

	// 3. Trigger fetch when any parameter changes
	useEffect(() => {
		fetchNews();
	}, [fetchNews]);

	return {
		articles,
		loading,
		error,
		totalResults,
		pagination: {
			currentPage: page,
			totalPages,
			hasNextPage,
			hasPrevPage,
		},
		refetch: fetchNews,
	};
}

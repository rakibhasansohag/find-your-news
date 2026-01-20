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
	setPage: (page: number) => void;
}

export function useNews(params: UseNewsParams = {}): UseNewsReturn {
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
	const [currentPage, setCurrentPage] = useState(page);
	const [totalPages, setTotalPages] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(false);
	const [hasPrevPage, setHasPrevPage] = useState(false);

	const fetchNews = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			if (dataSource === 'api') {
				// Fetch from NewsAPI (also stores in DB)
				const data = await newsApi.getTopHeadlines({
					country,
					category,
					language,
					from,
					to,
					sources,
					q: search,
					page: currentPage,
					pageSize,
				});

				setArticles(data.articles);
				setTotalResults(data.totalResults);

				const calculatedTotalPages = Math.ceil(data.totalResults / pageSize);
				setTotalPages(calculatedTotalPages);
				setHasNextPage(currentPage < calculatedTotalPages);
				setHasPrevPage(currentPage > 1);
			} else {
				// Fetch from MongoDB
				const response = await newsApi.getArticlesFromDB({
					country,
					category,
					language,
					from,
					to,
					search,
					page: currentPage,
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
		currentPage,
		pageSize,
		dataSource,
	]);

	useEffect(() => {
		fetchNews();
	}, [fetchNews]);

	const setPage = useCallback((newPage: number) => {
		setCurrentPage(newPage);
	}, []);

	return {
		articles,
		loading,
		error,
		totalResults,
		pagination: {
			currentPage,
			totalPages,
			hasNextPage,
			hasPrevPage,
		},
		refetch: fetchNews,
		setPage,
	};
}

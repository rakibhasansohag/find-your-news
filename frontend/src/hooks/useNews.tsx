'use client';

import { useState, useEffect, useCallback } from 'react';
import { newsApi } from '@/lib/api';
import { NewsArticle } from '@/types/news.types';

interface UseNewsReturn {
	articles: NewsArticle[];
	loading: boolean;
	error: string | null;
	totalResults: number;
	refetch: () => void;
}

export function useNews(country: string, category?: string): UseNewsReturn {
	const [articles, setArticles] = useState<NewsArticle[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [totalResults, setTotalResults] = useState(0);

	const fetchNews = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const data = await newsApi.getTopHeadlines(country, category);

			setArticles(data.articles);
			setTotalResults(data.totalResults);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fetch news');
			setArticles([]);
		} finally {
			setLoading(false);
		}
	}, [country, category]);

	useEffect(() => {
		fetchNews();
	}, [fetchNews]);

	return {
		articles,
		loading,
		error,
		totalResults,
		refetch: fetchNews,
	};
}

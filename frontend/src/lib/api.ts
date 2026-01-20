import axios from 'axios';
import {
	NewsApiResponse,
	Country,
	Category,
	Language,
	ApiResponse,
	PaginatedResponse,
	IArticle,
	NewsSourceOption,
} from '@/types/news.types';

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 15000,
	headers: {
		'Content-Type': 'application/json',
	},
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error('API Error:', error.response?.data || error.message);
		return Promise.reject(error);
	},
);

export const newsApi = {
	/**
	 * Fetch top headlines from NewsAPI (stores in DB)
	 */
	getTopHeadlines: async (params: {
		country?: string;
		category?: string;
		page?: number;
		pageSize?: number;
		from?: string;
		to?: string;
		language?: string;
		sources?: string;
		q?: string;
	}): Promise<NewsApiResponse> => {
		const response = await apiClient.get<ApiResponse<NewsApiResponse>>(
			'/news/top-headlines',
			{
				params: {
					country: params.country || 'us',
					category: params.category,
					page: params.page || 1,
					pageSize: params.pageSize || 20,
					from: params.from,
					to: params.to,
					language: params.language,
					sources: params.sources,
					q: params.q,
				},
			},
		);
		return response.data.data!;
	},

	/**
	 * Get articles from MongoDB with filters
	 */
	getArticlesFromDB: async (params: {
		country?: string;
		category?: string;
		language?: string;
		from?: string;
		to?: string;
		page?: number;
		pageSize?: number;
		search?: string;
	}): Promise<PaginatedResponse<IArticle>> => {
		const response = await apiClient.get<PaginatedResponse<IArticle>>(
			'/news/articles',
			{
				params,
			},
		);
		return response.data;
	},

	/**
	 * Get available sources
	 */
	getSources: async (params?: {
		country?: string;
		category?: string;
		language?: string;
	}): Promise<NewsSourceOption[]> => {
		const response = await apiClient.get<ApiResponse<[]>>('/news/sources', {
			params,
		});
		return response.data.data!;
	},

	/**
	 * Get available countries
	 */
	getCountries: async (): Promise<Country[]> => {
		const response = await apiClient.get<ApiResponse<Country[]>>(
			'/news/countries',
		);
		return response.data.data!;
	},

	/**
	 * Get available categories
	 */
	getCategories: async (): Promise<Category[]> => {
		const response = await apiClient.get<ApiResponse<Category[]>>(
			'/news/categories',
		);
		return response.data.data!;
	},

	/**
	 * Get available languages
	 */
	getLanguages: async (): Promise<Language[]> => {
		const response = await apiClient.get<ApiResponse<Language[]>>(
			'/news/languages',
		);
		return response.data.data!;
	},
};

export default apiClient;
import axios from 'axios';
import {
	NewsApiResponse,
	Country,
	Category,
	ApiResponse,
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

// Request interceptor
apiClient.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error('API Error:', error.response?.data || error.message);
		return Promise.reject(error);
	},
);

export const newsApi = {
	/**
	 * Fetch top headlines
	 */
	getTopHeadlines: async (
		country: string = 'us',
		category?: string,
		page: number = 1,
	): Promise<NewsApiResponse> => {
		const response = await apiClient.get<ApiResponse<NewsApiResponse>>(
			'/news/top-headlines',
			{
				params: {
					country,
					category,
					page,
					pageSize: 20,
				},
			},
		);
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
};

export default apiClient;

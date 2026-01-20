import axios from 'axios';
import {
	NewsApiResponse,
	TopHeadlinesParams,
	COUNTRIES,
	CATEGORIES,
} from '../types/news.types';

class NewsService {
	private readonly baseUrl = 'https://newsapi.org/v2';
	private readonly apiKey: string;

	constructor() {
		this.apiKey = process.env.NEWS_API_KEY || '';
		if (!this.apiKey) {
			throw new Error('NEWS_API_KEY is not defined in environment variables');
		}
	}

	/**
	 * Fetch top headlines from NewsAPI
	 */
	async getTopHeadlines(params: TopHeadlinesParams): Promise<NewsApiResponse> {
		try {
			const { country = 'us', category, page = 1, pageSize = 20 } = params;

			const response = await axios.get<NewsApiResponse>(
				`${this.baseUrl}/top-headlines`,
				{
					params: {
						country,
						category,
						page,
						pageSize,
						apiKey: this.apiKey,
					},
					timeout: 10000,
				},
			);

			// Add category to each article if category was specified
			if (category && response.data.articles) {
				response.data.articles = response.data.articles.map((article) => ({
					...article,
					category,
				}));
			}

			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new Error(
					error.response?.data?.message || 'Failed to fetch news from NewsAPI',
				);
			}
			throw error;
		}
	}

	/**
	 * Get list of available countries
	 */
	getCountries() {
		return COUNTRIES;
	}

	/**
	 * Get list of available categories
	 */
	getCategories() {
		return CATEGORIES;
	}

	/**
	 * Validate country code
	 */
	isValidCountry(countryCode: string): boolean {
		return COUNTRIES.some((country) => country.code === countryCode);
	}

	/**
	 * Validate category
	 */
	isValidCategory(categoryId: string): boolean {
		return CATEGORIES.some((category) => category.id === categoryId);
	}
}

export default new NewsService();

import axios from 'axios';
import {
	NewsApiResponse,
	TopHeadlinesParams,
	COUNTRIES,
	CATEGORIES,
} from '../types/news.types';

class NewsService {
	private readonly baseUrl = 'https://newsapi.org/v2';

	// We use a getter to retrieve the key only when needed
	private get apiKey(): string {
		const key = process.env.NEWS_API_KEY;
		if (!key) {
			throw new Error(
				'NEWS_API_KEY is not defined in environment variables. Check your .env file.',
			);
		}
		return key;
	}

	/**
	 * Fetch top headlines from NewsAPI
	 */
	async getTopHeadlines(params: TopHeadlinesParams): Promise<NewsApiResponse> {
		try {
			const { country = 'us', category, page = 1, pageSize = 20 } = params;

			const response = await axios.get<NewsApiResponse>(
				`${this.baseUrl}/top-headlines/`,
				{
					params: {
						country,
						category,
						page,
						pageSize,
						apiKey: this.apiKey, // This calls the getter above
					},
					timeout: 10000,
				},
			);

			console.log(response.data);

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

	getCountries() {
		return COUNTRIES;
	}
	getCategories() {
		return CATEGORIES;
	}

	isValidCountry(countryCode: string): boolean {
		return COUNTRIES.some((country) => country.code === countryCode);
	}

	isValidCategory(categoryId: string): boolean {
		return CATEGORIES.some((category) => category.id === categoryId);
	}
}

// Export the class itself or a singleton instance
export const newsService = new NewsService();
export default newsService;

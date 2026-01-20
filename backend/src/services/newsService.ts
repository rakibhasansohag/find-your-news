import axios from 'axios';
import {
	NewsApiResponse,
	TopHeadlinesParams,
	COUNTRIES,
	CATEGORIES,
	LANGUAGES,
	PaginatedResponse,
	IArticle,
} from '../types/news.types';
import { Article } from '../models/Article';

class NewsService {
	private readonly baseUrl = 'https://newsapi.org/v2';

	private get apiKey(): string {
		const key = process.env.NEWS_API_KEY;
		if (!key) {
			throw new Error('NEWS_API_KEY is not defined in environment variables');
		}
		return key;
	}

	/**
	 * Fetch top headlines from NewsAPI and store in MongoDB
	 */
	async getTopHeadlines(params: TopHeadlinesParams): Promise<NewsApiResponse> {
		try {
			const {
				country = 'us',
				category,
				page = 1,
				pageSize = 20,
				from,
				to,
				language,
				sources,
				q,
			} = params;

			// Build API params
			const apiParams: any = {
				page,
				pageSize,
				apiKey: this.apiKey,
			};

			// Note: NewsAPI doesn't allow mixing sources with country/category
			if (sources) {
				apiParams.sources = sources;
			} else {
				if (country) apiParams.country = country;
				if (category) apiParams.category = category;
			}

			if (from) apiParams.from = from;
			if (to) apiParams.to = to;
			if (language) apiParams.language = language;
			if (q) apiParams.q = q;

			const response = await axios.get<NewsApiResponse>(
				`${this.baseUrl}/top-headlines`,
				{
					params: apiParams,
					timeout: 10000,
				},
			);

			// Store articles in MongoDB
			if (response.data.articles && response.data.articles.length > 0) {
				await this.storeArticles(response.data.articles, {
					category,
					country,
					language,
				});
			}

			// Add category to articles if specified
			if (category && response.data.articles) {
				response.data.articles = response.data.articles.map((article) => ({
					...article,
					category,
				}));
			}

			console.log(response.data);


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
	 * Store articles in MongoDB (upsert to avoid duplicates)
	 */
	private async storeArticles(
		articles: any[],
		metadata: { category?: string; country?: string; language?: string },
	): Promise<void> {
		try {
			const operations = articles.map((article) => ({
				updateOne: {
					filter: { url: article.url },
					update: {
						$set: {
							source: article.source,
							author: article.author,
							title: article.title,
							description: article.description,
							url: article.url,
							urlToImage: article.urlToImage,
							publishedAt: new Date(article.publishedAt),
							content: article.content,
							category: metadata.category || article.category,
							country: metadata.country,
							language: metadata.language,
							fetchedAt: new Date(),
						},
					},
					upsert: true,
				},
			}));

			await Article.bulkWrite(operations);
			console.log(`✅ Stored/Updated ${articles.length} articles in database`);
		} catch (error) {
			console.error('❌ Error storing articles:', error);
			// Don't throw - we still want to return the API response even if DB fails
		}
	}

	/**
	 * Get articles from MongoDB with advanced filtering and pagination
	 */
	async getArticlesFromDB(
		params: TopHeadlinesParams & { search?: string },
	): Promise<PaginatedResponse<IArticle>> {
		const {
			country,
			category,
			language,
			from,
			to,
			page = 1,
			pageSize = 20,
			search,
		} = params;

		// Build query
		const query: any = {};

		if (country) query.country = country;
		if (category) query.category = category;
		if (language) query.language = language;

		// Date range filter
		if (from || to) {
			query.publishedAt = {};
			if (from) query.publishedAt.$gte = new Date(from);
			if (to) query.publishedAt.$lte = new Date(to);
		}

		// Text search
		if (search) {
			query.$text = { $search: search };
		}

		// Calculate pagination
		const skip = (page - 1) * pageSize;

		// Execute query
		const [articles, totalResults] = await Promise.all([
			Article.find(query)
				.sort({ publishedAt: -1 })
				.skip(skip)
				.limit(pageSize)
				.lean(),
			Article.countDocuments(query),
		]);

		const totalPages = Math.ceil(totalResults / pageSize);

		return {
			success: true,
			data: articles as IArticle[],
			pagination: {
				page,
				pageSize,
				totalResults,
				totalPages,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1,
			},
		};
	}

	/**
	 * Get available sources from NewsAPI
	 */
	async getSources(params?: {
		country?: string;
		category?: string;
		language?: string;
	}) {
		try {
			const response = await axios.get(`${this.baseUrl}/sources`, {
				params: {
					...params,
					apiKey: this.apiKey,
				},
			});

			return response.data.sources;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new Error(
					error.response?.data?.message || 'Failed to fetch sources',
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

	getLanguages() {
		return LANGUAGES;
	}

	isValidCountry(countryCode: string): boolean {
		return COUNTRIES.some((country) => country.code === countryCode);
	}

	isValidCategory(categoryId: string): boolean {
		return CATEGORIES.some((category) => category.id === categoryId);
	}

	isValidLanguage(languageCode: string): boolean {
		return LANGUAGES.some((lang) => lang.code === languageCode);
	}
}

export const newsService = new NewsService();
export default newsService;

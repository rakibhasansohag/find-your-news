import { Request, Response, NextFunction } from 'express';
import newsService from '../services/newsService';
import { TopHeadlinesParams } from '../types/news.types';

export class NewsController {
	/**
	 * GET /api/news/top-headlines
	 * Fetch top headlines from NewsAPI (stores in DB automatically)
	 */
	async getTopHeadlines(req: Request, res: Response, next: NextFunction) {
		try {
			const {
				country,
				category,
				page,
				pageSize,
				from,
				to,
				language,
				sources,
				q,
			} = req.query;

			// Validate country
			if (
				country &&
				typeof country === 'string' &&
				!newsService.isValidCountry(country)
			) {
				return res.status(400).json({
					success: false,
					error: 'Invalid country code',
				});
			}

			// Validate category
			if (
				category &&
				typeof category === 'string' &&
				!newsService.isValidCategory(category)
			) {
				return res.status(400).json({
					success: false,
					error: 'Invalid category',
				});
			}

			// Validate language
			if (
				language &&
				typeof language === 'string' &&
				!newsService.isValidLanguage(language)
			) {
				return res.status(400).json({
					success: false,
					error: 'Invalid language code',
				});
			}

			const params: TopHeadlinesParams = {
				country: country as string,
				category: category as string,
				page: page ? parseInt(page as string) : 1,
				pageSize: pageSize ? parseInt(pageSize as string) : 20,
				from: from as string,
				to: to as string,
				language: language as string,
				sources: sources as string,
				q: q as string,
			};

			const newsData = await newsService.getTopHeadlines(params);

			res.json({
				success: true,
				data: newsData,
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * GET /api/news/articles
	 * Get articles from MongoDB with advanced filtering
	 */
	async getArticlesFromDB(req: Request, res: Response, next: NextFunction) {
		try {
			const { country, category, language, from, to, page, pageSize, search } =
				req.query;

			const params: TopHeadlinesParams & { search?: string } = {
				country: country as string,
				category: category as string,
				language: language as string,
				from: from as string,
				to: to as string,
				page: page ? parseInt(page as string) : 1,
				pageSize: pageSize ? parseInt(pageSize as string) : 20,
				search: search as string,
			};

			const result = await newsService.getArticlesFromDB(params);

			res.json(result);
		} catch (error) {
			next(error);
		}
	}

	/**
	 * GET /api/news/sources
	 * Get available news sources
	 */
	async getSources(req: Request, res: Response, next: NextFunction) {
		try {
			const { country, category, language } = req.query;

			const sources = await newsService.getSources({
				country: country as string,
				category: category as string,
				language: language as string,
			});

			res.json({
				success: true,
				data: sources,
			});
		} catch (error) {
			next(error);
		}
	}

	/**
	 * GET /api/news/countries
	 * Get list of available countries
	 */
	getCountries(req: Request, res: Response) {
		res.json({
			success: true,
			data: newsService.getCountries(),
		});
	}

	/**
	 * GET /api/news/categories
	 * Get list of available categories
	 */
	getCategories(req: Request, res: Response) {
		res.json({
			success: true,
			data: newsService.getCategories(),
		});
	}

	/**
	 * GET /api/news/languages
	 * Get list of available languages
	 */
	getLanguages(req: Request, res: Response) {
		res.json({
			success: true,
			data: newsService.getLanguages(),
		});
	}
}

export default new NewsController();

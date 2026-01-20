import { Request, Response, NextFunction } from 'express';
import newsService from '../services/newsService';
import { TopHeadlinesParams } from '../types/news.types';

export class NewsController {
	/**
	 * GET /api/news/top-headlines
	 * Fetch top headlines for a country
	 */
	async getTopHeadlines(req: Request, res: Response, next: NextFunction) {
		try {
			const { country, category, page, pageSize } = req.query;

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

			const params: TopHeadlinesParams = {
				country: (country as string) || 'us',
				category: category as string,
				page: page ? parseInt(page as string) : 1,
				pageSize: pageSize ? parseInt(pageSize as string) : 20,
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
}

export default new NewsController();

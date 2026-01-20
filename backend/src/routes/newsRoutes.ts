import { Router } from 'express';
import newsController from '../controllers/newsController';

const router = Router();

// Get top headlines from NewsAPI (stores in DB)
router.get(
	'/top-headlines',
	newsController.getTopHeadlines.bind(newsController),
);

// Get articles from MongoDB with filters
router.get('/articles', newsController.getArticlesFromDB.bind(newsController));

// Get available sources
router.get('/sources', newsController.getSources.bind(newsController));

// Get metadata
router.get('/countries', newsController.getCountries.bind(newsController));
router.get('/categories', newsController.getCategories.bind(newsController));
router.get('/languages', newsController.getLanguages.bind(newsController));

export default router;

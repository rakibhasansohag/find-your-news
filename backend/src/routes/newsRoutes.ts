import { Router } from 'express';
import newsController from '../controllers/newsController';

const router = Router();

// Get top headlines
router.get(
	'/top-headlines',
	newsController.getTopHeadlines.bind(newsController),
);

// Get countries
router.get('/countries', newsController.getCountries.bind(newsController));

// Get categories
router.get('/categories', newsController.getCategories.bind(newsController));

export default router;

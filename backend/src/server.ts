import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

console.log('port', PORT);
console.log(process.env.NEWS_API_KEY);

import newsRoutes from './routes/newsRoutes';
// Middleware
app.use(helmet()); // Security headers
app.use(
	cors({
		origin: process.env.FRONTEND_URL || 'http://localhost:3000',
		credentials: true,
	}),
);
app.use(morgan('dev')); // Logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
	res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/news', newsRoutes);

// 404 handler
app.use((req, res) => {
	res.status(404).json({
		success: false,
		error: 'Route not found',
	});
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
	console.log(`📰 News API ready at http://localhost:${PORT}/api/news`);
});

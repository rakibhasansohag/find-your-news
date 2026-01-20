import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
import newsRoutes from './routes/newsRoutes';

const app: Application = express();
const PORT = process.env.PORT || 5000;

// connect to the mongodb
connectDatabase();

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
	res.json({
		status: 'OK',
		timestamp: new Date().toISOString(),
		database: 'Connected',
	});
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

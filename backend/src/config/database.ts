import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
	try {
		const mongoUri =
			process.env.MONGODB_URI || 'mongodb://localhost:27017/news_aggregator';

		await mongoose.connect(mongoUri);

		console.log('✅ MongoDB connected successfully');
		console.log(`📊 Database: ${mongoose.connection.name}`);

		// Handle connection events
		mongoose.connection.on('error', (error) => {
			console.error('❌ MongoDB connection error:', error);
		});

		mongoose.connection.on('disconnected', () => {
			console.warn('⚠️  MongoDB disconnected');
		});

		// Graceful shutdown
		process.on('SIGINT', async () => {
			await mongoose.connection.close();
			console.log('👋 MongoDB connection closed due to app termination');
			process.exit(0);
		});
	} catch (error) {
		console.error('❌ Failed to connect to MongoDB:', error);
		process.exit(1);
	}
};

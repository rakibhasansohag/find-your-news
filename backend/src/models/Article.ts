import mongoose, { Schema, Document } from 'mongoose';
import { IArticle } from '../types/news.types';

const ArticleSchema = new Schema<IArticle>(
	{
		source: {
			id: { type: String, default: null },
			name: { type: String, required: true },
		},
		author: { type: String, default: null },
		title: { type: String, required: true, index: true },
		description: { type: String, default: null },
		url: { type: String, required: true, unique: true, index: true },
		urlToImage: { type: String, default: null },
		publishedAt: { type: Date, required: true, index: true },
		content: { type: String, default: null },
		category: { type: String, index: true },
		country: { type: String, index: true },
		language: { type: String, index: true },
		fetchedAt: { type: Date, default: Date.now, index: true },
	},
	{
		timestamps: true,
		collection: 'articles',
	},
);

// Compound indexes for common queries
ArticleSchema.index({ country: 1, category: 1, publishedAt: -1 });
ArticleSchema.index({ language: 1, publishedAt: -1 });
ArticleSchema.index({ category: 1, publishedAt: -1 });

// Text index for search functionality
ArticleSchema.index({ title: 'text', description: 'text', content: 'text' });

export const Article = mongoose.model<IArticle>('Article', ArticleSchema);

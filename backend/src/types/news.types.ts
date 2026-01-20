export interface NewsSource {
	id: string | null;
	name: string;
}

export interface NewsArticle {
	source: NewsSource;
	author: string | null;
	title: string;
	description: string | null;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	content: string | null;
	category?: string;
}

export interface NewsApiResponse {
	status: string;
	totalResults: number;
	articles: NewsArticle[];
}

export interface TopHeadlinesParams {
	country?: string;
	category?: string;
	page?: number;
	pageSize?: number;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface Country {
	code: string;
	name: string;
	flag: string;
}

export interface Category {
	id: string;
	name: string;
	color: string;
}

export const COUNTRIES: Country[] = [
	{ code: 'us', name: 'United States', flag: '🇺🇸' },
	{ code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
	{ code: 'ca', name: 'Canada', flag: '🇨🇦' },
	{ code: 'au', name: 'Australia', flag: '🇦🇺' },
	{ code: 'in', name: 'India', flag: '🇮🇳' },
	{ code: 'de', name: 'Germany', flag: '🇩🇪' },
	{ code: 'fr', name: 'France', flag: '🇫🇷' },
	{ code: 'jp', name: 'Japan', flag: '🇯🇵' },
	{ code: 'br', name: 'Brazil', flag: '🇧🇷' },
	{ code: 'mx', name: 'Mexico', flag: '🇲🇽' },
];

export const CATEGORIES: Category[] = [
	{ id: 'general', name: 'General', color: 'bg-gray-500' },
	{ id: 'business', name: 'Business', color: 'bg-blue-500' },
	{ id: 'technology', name: 'Technology', color: 'bg-purple-500' },
	{ id: 'entertainment', name: 'Entertainment', color: 'bg-pink-500' },
	{ id: 'sports', name: 'Sports', color: 'bg-green-500' },
	{ id: 'science', name: 'Science', color: 'bg-cyan-500' },
	{ id: 'health', name: 'Health', color: 'bg-red-500' },
];

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

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface Language {
	code: string;
	name: string;
}

export interface NewsSourceOption {
	id: string;
	name: string;
	country: string;
	category: string;
}

export interface IArticle {
	_id?: string;
	source: NewsSource;
	author: string | null;
	title: string;
	description: string | null;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	content: string | null;
	category?: string;
	country?: string;
	language?: string;
	fetchedAt: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface PaginatedResponse<T> {
	success: boolean;
	data: T[];
	pagination: {
		page: number;
		pageSize: number;
		totalResults: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
	};
}

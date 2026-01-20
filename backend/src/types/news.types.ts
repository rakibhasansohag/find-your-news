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
	{ code: 'ae', name: 'United Arab Emirates', flag: '🇦🇪' },
	{ code: 'ar', name: 'Argentina', flag: '🇦🇷' },
	{ code: 'at', name: 'Austria', flag: '🇦🇹' },
	{ code: 'au', name: 'Australia', flag: '🇦🇺' },
	{ code: 'be', name: 'Belgium', flag: '🇧🇪' },
	{ code: 'bg', name: 'Bulgaria', flag: '🇧🇬' },
	{ code: 'br', name: 'Brazil', flag: '🇧🇷' },
	{ code: 'ca', name: 'Canada', flag: '🇨🇦' },
	{ code: 'ch', name: 'Switzerland', flag: '🇨🇭' },
	{ code: 'cn', name: 'China', flag: '🇨🇳' },
	{ code: 'co', name: 'Colombia', flag: '🇨🇴' },
	{ code: 'cu', name: 'Cuba', flag: '🇨🇺' },
	{ code: 'cz', name: 'Czech Republic', flag: '🇨🇿' },
	{ code: 'de', name: 'Germany', flag: '🇩🇪' },
	{ code: 'eg', name: 'Egypt', flag: '🇪🇬' },
	{ code: 'fr', name: 'France', flag: '🇫🇷' },
	{ code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
	{ code: 'gr', name: 'Greece', flag: '🇬🇷' },
	{ code: 'hk', name: 'Hong Kong', flag: '🇭🇰' },
	{ code: 'hu', name: 'Hungary', flag: '🇭🇺' },
	{ code: 'id', name: 'Indonesia', flag: '🇮🇩' },
	{ code: 'ie', name: 'Ireland', flag: '🇮🇪' },
	{ code: 'il', name: 'Israel', flag: '🇮🇱' },
	{ code: 'in', name: 'India', flag: '🇮🇳' },
	{ code: 'it', name: 'Italy', flag: '🇮🇹' },
	{ code: 'jp', name: 'Japan', flag: '🇯🇵' },
	{ code: 'kr', name: 'South Korea', flag: '🇰🇷' },
	{ code: 'lt', name: 'Lithuania', flag: '🇱🇹' },
	{ code: 'lv', name: 'Latvia', flag: '🇱🇻' },
	{ code: 'ma', name: 'Morocco', flag: '🇲🇦' },
	{ code: 'mx', name: 'Mexico', flag: '🇲🇽' },
	{ code: 'my', name: 'Malaysia', flag: '🇲🇾' },
	{ code: 'ng', name: 'Nigeria', flag: '🇳🇬' },
	{ code: 'nl', name: 'Netherlands', flag: '🇳🇱' },
	{ code: 'no', name: 'Norway', flag: '🇳🇴' },
	{ code: 'nz', name: 'New Zealand', flag: '🇳🇿' },
	{ code: 'ph', name: 'Philippines', flag: '🇵🇭' },
	{ code: 'pl', name: 'Poland', flag: '🇵🇱' },
	{ code: 'pt', name: 'Portugal', flag: '🇵🇹' },
	{ code: 'ro', name: 'Romania', flag: '🇷🇴' },
	{ code: 'rs', name: 'Serbia', flag: '🇷🇸' },
	{ code: 'ru', name: 'Russia', flag: '🇷🇺' },
	{ code: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
	{ code: 'se', name: 'Sweden', flag: '🇸🇪' },
	{ code: 'sg', name: 'Singapore', flag: '🇸🇬' },
	{ code: 'si', name: 'Slovenia', flag: '🇸🇮' },
	{ code: 'sk', name: 'Slovakia', flag: '🇸🇰' },
	{ code: 'th', name: 'Thailand', flag: '🇹🇭' },
	{ code: 'tr', name: 'Turkey', flag: '🇹🇷' },
	{ code: 'tw', name: 'Taiwan', flag: '🇹🇼' },
	{ code: 'ua', name: 'Ukraine', flag: '🇺🇦' },
	{ code: 'us', name: 'United States', flag: '🇺🇸' },
	{ code: 've', name: 'Venezuela', flag: '🇻🇪' },
	{ code: 'za', name: 'South Africa', flag: '🇿🇦' },
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

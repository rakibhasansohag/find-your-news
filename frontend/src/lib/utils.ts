import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
	try {
		const date = parseISO(dateString);
		return formatDistanceToNow(date, { addSuffix: true });
	} catch (error) {
		return dateString;
	}
}

/**
 * Get category color class
 */
export function getCategoryColor(category?: string): string {
	const colors: Record<string, string> = {
		general: 'bg-gray-500',
		business: 'bg-blue-500',
		technology: 'bg-purple-500',
		entertainment: 'bg-pink-500',
		sports: 'bg-green-500',
		science: 'bg-cyan-500',
		health: 'bg-red-500',
	};

	return category ? colors[category] || 'bg-gray-500' : 'bg-gray-500';
}

/**
 * Truncate text to a specific length
 */
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength).trim() + '...';
}

/**
 * Generate placeholder image URL
 */
export function getPlaceholderImage(): string {
	return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop';
}

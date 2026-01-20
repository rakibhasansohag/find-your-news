'use client';

import { NewsArticle } from '@/types/news.types';
import { NewsCard } from './NewsCard';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface NewsListProps {
	articles: NewsArticle[];
	loading: boolean;
	error: string | null;
}

export function NewsList({ articles, loading, error }: NewsListProps) {
	if (loading) {
		return (
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{[...Array(6)].map((_, i) => (
					<div key={i} className='space-y-3'>
						<Skeleton className='h-48 w-full' />
						<Skeleton className='h-4 w-3/4' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-2/3' />
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
				<AlertCircle className='w-12 h-12 text-destructive mb-4' />
				<h3 className='text-lg font-semibold mb-2'>Failed to load news</h3>
				<p className='text-muted-foreground max-w-md'>{error}</p>
			</div>
		);
	}

	if (articles.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
				<AlertCircle className='w-12 h-12 text-muted-foreground mb-4' />
				<h3 className='text-lg font-semibold mb-2'>No articles found</h3>
				<p className='text-muted-foreground max-w-md'>
					Try selecting a different country or category.
				</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
			{articles.map((article, index) => (
				<NewsCard key={`${article.url}-${index}`} article={article} />
			))}
		</div>
	);
}

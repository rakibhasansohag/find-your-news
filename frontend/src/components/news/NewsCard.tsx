'use client';

import Link from 'next/link';
import { NewsArticle } from '@/types/news.types';
import {
	formatRelativeTime,
	getCategoryColor,
	getPlaceholderImage,
} from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Calendar, ExternalLink } from 'lucide-react';

interface NewsCardProps {
	article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
	const imageUrl = article.urlToImage || getPlaceholderImage();
	const categoryColor = getCategoryColor(article.category);

	console.log('article', article);

	return (
		<Card className='overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col pt-0 gap-3'>
			{/* Image */}
			<div className='relative w-full h-48 bg-muted'>
				{/* <Image
					src={imageUrl}
					alt={article.title}
					fill
					className='object-cover'
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						target.src = getPlaceholderImage();
					}}
				/> */}

				<img
					src={imageUrl}
					alt={article.title}
					className='object-cover w-full h-full'
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						target.src = getPlaceholderImage();
					}}
				/>

				{/* Category Badge */}
				{article.category && (
					<div className='absolute top-3 right-3'>
						<Badge className={`${categoryColor} text-white capitalize`}>
							{article.category}
						</Badge>
					</div>
				)}
			</div>

			<CardHeader className='grow'>
				{/* Title */}
				<CardTitle className='line-clamp-2 text-lg hover:text-primary transition-colors'>
					<Link
						href={article.url}
						target='_blank'
						rel='noopener noreferrer'
						className='hover:underline'
					>
						{article.title}
					</Link>
				</CardTitle>

				{/* Description */}
				<CardDescription className='line-clamp-3 text-sm mt-0'>
					{article.description || 'No description available'}
				</CardDescription>
			</CardHeader>

			<CardContent className='space-y-3 pt-0'>
				{/* Source and Date */}
				<div className='flex items-center justify-between text-xs text-muted-foreground flex-wrap'>
					<div className='flex items-center gap-1 font-medium'>
						<span className='truncate'>{article.source.name}</span>
					</div>

					<div className='flex items-center gap-2'>
						<Calendar className='w-3 h-3' />
						<time>{formatRelativeTime(article.publishedAt)}</time>
					</div>
				</div>

				{/* Read More Link */}
				<Link
					href={article.url}
					target='_blank'
					rel='noopener noreferrer'
					className='inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline'
				>
					Read full article
					<ExternalLink className='w-3 h-3' />
				</Link>
			</CardContent>
		</Card>
	);
}

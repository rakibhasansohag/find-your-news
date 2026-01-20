'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/types/news.types';
import { newsApi } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoryFilterProps {
	selectedCategory?: string;
	onCategoryChange: (category?: string) => void;
}

export function CategoryFilter({
	selectedCategory,
	onCategoryChange,
}: CategoryFilterProps) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const data = await newsApi.getCategories();
				setCategories(data);
			} catch (error) {
				console.error('Failed to fetch categories:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	if (loading) {
		return (
			<div className='flex flex-wrap gap-2'>
				{[...Array(7)].map((_, i) => (
					<Skeleton key={i} className='h-7 w-20' />
				))}
			</div>
		);
	}

	return (
		<div className='flex flex-wrap gap-2'>
			{/* All categories */}
			<Badge
				variant={!selectedCategory ? 'default' : 'outline'}
				className='cursor-pointer hover:bg-primary/90 transition-colors'
				onClick={() => onCategoryChange(undefined)}
			>
				All
			</Badge>

			{/* Individual categories */}
			{categories.map((category) => (
				<Badge
					key={category.id}
					variant={selectedCategory === category.id ? 'default' : 'outline'}
					className={`cursor-pointer transition-colors capitalize ${
						selectedCategory === category.id
							? category.color + ' text-white'
							: 'hover:bg-muted'
					}`}
					onClick={() => onCategoryChange(category.id)}
				>
					{category.name}
				</Badge>
			))}
		</div>
	);
}

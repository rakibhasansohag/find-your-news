'use client';

import { useState, useEffect } from 'react';
import { newsApi } from '@/lib/api';
import { Language, NewsSourceOption } from '@/types/news.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, Search, Globe2, Filter, X } from 'lucide-react';

export interface AdvancedFilterValues {
	language?: string;
	from?: string;
	to?: string;
	search?: string;
	sources?: string;
}

interface AdvancedFiltersProps {
	filters: AdvancedFilterValues;
	onFiltersChange: (filters: AdvancedFilterValues) => void;
}

export function AdvancedFilters({
	filters,
	onFiltersChange,
}: AdvancedFiltersProps) {
	const [languages, setLanguages] = useState<Language[]>([]);
	const [sources, setSources] = useState<NewsSourceOption[]>([]);
	const [isExpanded, setIsExpanded] = useState(false);

	console.log({ filters, onFiltersChange });

	useEffect(() => {
		const fetchMetadata = async () => {
			try {
				const [langs, srcs] = await Promise.all([
					newsApi.getLanguages(),
					newsApi.getSources(),
				]);
				setLanguages(langs);
				setSources(srcs);
			} catch (error) {
				console.error('Failed to fetch metadata:', error);
			}
		};

		fetchMetadata();
	}, []);

	const handleFilterChange = (
		key: keyof AdvancedFilterValues,
		value: string | undefined,
	) => {
		const finalValue = value === 'all' ? undefined : value;

		onFiltersChange({
			...filters,
			[key]: finalValue,
		});
	};

	const clearFilters = () => {
		onFiltersChange({});
	};

	const hasActiveFilters = Object.values(filters).some((v) => v);

	return (
		<Card>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<Filter className='w-5 h-5' />
						<CardTitle>Advanced Filters</CardTitle>
						{hasActiveFilters && (
							<span className='text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full'>
								Active
							</span>
						)}
					</div>
					<div className='flex gap-2'>
						{hasActiveFilters && (
							<Button variant='ghost' size='sm' onClick={clearFilters}>
								<X className='w-4 h-4 mr-1' />
								Clear
							</Button>
						)}
						<Button
							variant='outline'
							size='sm'
							onClick={() => setIsExpanded(!isExpanded)}
						>
							{isExpanded ? 'Hide' : 'Show'}
						</Button>
					</div>
				</div>
			</CardHeader>

			{isExpanded && (
				<CardContent className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{/* Language Filter */}
					<div className='space-y-2'>
						<Label className='flex items-center gap-2'>
							<Globe2 className='w-4 h-4' />
							Language
						</Label>
						<Select
							value={filters.language || 'all'}
							onValueChange={(value) => handleFilterChange('language', value)}
						>
							<SelectTrigger className='h-96'>
								<SelectValue placeholder='All languages' />
							</SelectTrigger>
							<SelectContent className='h-96'>
								<SelectItem value='all'>All languages</SelectItem>
								{languages.map((lang) => (
									<SelectItem key={lang.code} value={lang.code}>
										{lang.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Date From */}
					<div className='space-y-2'>
						<Label className='flex items-center gap-2'>
							<Calendar className='w-4 h-4' />
							From Date
						</Label>
						<Input
							type='date'
							value={filters.from || ''}
							onChange={(e) =>
								handleFilterChange('from', e.target.value || undefined)
							}
							max={new Date().toISOString().split('T')[0]}
						/>
					</div>

					{/* Date To */}
					<div className='space-y-2'>
						<Label className='flex items-center gap-2'>
							<Calendar className='w-4 h-4' />
							To Date
						</Label>
						<Input
							type='date'
							value={filters.to || ''}
							onChange={(e) =>
								handleFilterChange('to', e.target.value || undefined)
							}
							max={new Date().toISOString().split('T')[0]}
						/>
					</div>

					{/* Search Query */}
					<div className='space-y-2 md:col-span-2'>
						<Label className='flex items-center gap-2'>
							<Search className='w-4 h-4' />
							Search Keywords
						</Label>
						<Input
							type='text'
							placeholder='Search in title, description, content...'
							value={filters.search || ''}
							onChange={(e) =>
								handleFilterChange('search', e.target.value || undefined)
							}
						/>
					</div>

					{/* Sources Filter */}
					<div className='space-y-2'>
						<Label>News Source</Label>
						<Select
							value={filters.sources || 'all'}
							onValueChange={(value) => handleFilterChange('sources', value)}
						>
							<SelectTrigger className='h-96'>
								<SelectValue placeholder='All sources' />
							</SelectTrigger>
							<SelectContent className='h-96'>
								<SelectItem value='all'>All sources</SelectItem>
								{sources.map((source) => (
									<SelectItem key={source.id} value={source.id}>
										{source.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			)}
		</Card>
	);
}

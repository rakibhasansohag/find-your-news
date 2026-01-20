'use client';

import { useState } from 'react';
import { CountrySelector } from '@/components/news/CountrySelector';
import { CategoryFilter } from '@/components/news/CategoryFilter';
import { NewsList } from '@/components/news/NewsList';
import { useNews } from '@/hooks/useNews';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Newspaper, RefreshCw } from 'lucide-react';

export default function HomePage() {
	const [selectedCountry, setSelectedCountry] = useState('us');
	const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
		undefined,
	);
	const [viewMode, setViewMode] = useState<'dropdown' | 'cards'>('dropdown');

	const { articles, loading, error, totalResults, refetch } = useNews(
		selectedCountry,
		selectedCategory,
	);

	return (
		<div className='min-h-screen bg-background'>
			{/* Header */}
			<header className='border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<Newspaper className='w-6 h-6 text-primary' />
							<h1 className='text-2xl font-bold'>News Aggregator</h1>
						</div>

						<Button
							variant='outline'
							size='sm'
							onClick={refetch}
							disabled={loading}
						>
							<RefreshCw
								className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`}
							/>
							Refresh
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className='container mx-auto px-4 py-8'>
				{/* Filters Section */}
				<div className='space-y-6 mb-8'>
					{/* Country Selection Mode Toggle */}
					<Tabs
						value={viewMode}
						onValueChange={(v) => setViewMode(v as 'cards' | 'dropdown')}
					>
						<TabsList>
							<TabsTrigger value='dropdown'>Dropdown View</TabsTrigger>
							<TabsTrigger value='cards'>Card View</TabsTrigger>
						</TabsList>
					</Tabs>

					{/* Country Selector */}
					<div>
						<h2 className='text-lg font-semibold mb-3'>Select Country</h2>
						<CountrySelector
							selectedCountry={selectedCountry}
							onCountryChange={setSelectedCountry}
							view={viewMode}
						/>
					</div>

					{/* Category Filter */}
					<div>
						<h2 className='text-lg font-semibold mb-3'>Filter by Category</h2>
						<CategoryFilter
							selectedCategory={selectedCategory}
							onCategoryChange={setSelectedCategory}
						/>
					</div>

					{/* Results Count */}
					{!loading && !error && (
						<div className='text-sm text-muted-foreground'>
							Showing {articles.length} of {totalResults} articles
						</div>
					)}
				</div>

				{/* News List */}
				<NewsList articles={articles} loading={loading} error={error} />
			</main>

			{/* Footer */}
			<footer className='border-t mt-16 py-8 bg-card/50'>
				<div className='container mx-auto px-4 text-center text-sm text-muted-foreground'>
					<p>Powered by NewsAPI.org • Built with Next.js & shadcn/ui</p>
				</div>
			</footer>
		</div>
	);
}

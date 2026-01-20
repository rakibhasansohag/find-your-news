'use client';

import { CountrySelector } from '@/components/news/CountrySelector';
import { CategoryFilter } from '@/components/news/CategoryFilter';
import { AdvancedFilters } from '@/components/news/AdvancedFilters';
import { NewsList } from '@/components/news/NewsList';
import { Pagination } from '@/components/news/Pagination';
import { useNews } from '@/hooks/useNews';
import { useNewsFilters } from '@/hooks/useNewsFilters';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Newspaper, RefreshCw, Database, Cloud } from 'lucide-react';
import { NewsArticle } from '../types/news.types';

export default function HomePage() {
	// Manage all filters with custom hook
	const {
		filters,
		setCountry,
		setCategory,
		setAdvancedFilters,
		setViewMode,
		setDataSource,
		setPage,
	} = useNewsFilters();

	// Fetch news with custom hook
	const { articles, loading, error, totalResults, pagination, refetch } =
		useNews({
			country: filters.country,
			category: filters.category,
			dataSource: filters.dataSource,
			page: filters.page,
			...filters.advancedFilters,
		});

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

						<div className='flex items-center gap-3'>
							{/* Data Source Toggle */}
							<Tabs
								value={filters.dataSource}
								onValueChange={(v) => setDataSource(v as 'db' | 'api')}
							>
								<TabsList>
									<TabsTrigger value='api' className='flex items-center gap-1'>
										<Cloud className='w-4 h-4' />
										Live API
									</TabsTrigger>
									<TabsTrigger value='db' className='flex items-center gap-1'>
										<Database className='w-4 h-4' />
										Database
									</TabsTrigger>
								</TabsList>
							</Tabs>

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
				</div>
			</header>

			{/* Main Content */}
			<main className='container mx-auto px-4 py-8'>
				{/* Filters Section */}
				<div className='space-y-6 mb-8'>
					{/* Country Selection Mode Toggle */}
					<Tabs
						value={filters.viewMode}
						onValueChange={(v) => setViewMode(v as 'dropdown' | 'cards')}
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
							selectedCountry={filters.country}
							onCountryChange={setCountry}
							view={filters.viewMode}
						/>
					</div>

					{/* Category Filter */}
					<div>
						<h2 className='text-lg font-semibold mb-3'>Filter by Category</h2>
						<CategoryFilter
							selectedCategory={filters.category}
							onCategoryChange={setCategory}
						/>
					</div>

					{/* Advanced Filters */}
					<AdvancedFilters
						filters={filters.advancedFilters}
						onFiltersChange={setAdvancedFilters}
					/>

					{/* Results Count */}
					{!loading && !error && (
						<div className='flex items-center justify-between'>
							<div className='text-sm text-muted-foreground'>
								Showing {articles.length} of {totalResults} articles
								{filters.dataSource === 'db' && ' from database'}
							</div>
							<div className='text-sm text-muted-foreground'>
								Page {pagination.currentPage} of {pagination.totalPages}
							</div>
						</div>
					)}
				</div>

				{/* News List */}
				<NewsList
					articles={articles as NewsArticle[]}
					loading={loading}
					error={error}
				/>

				{/* Pagination */}
				<Pagination
					currentPage={pagination.currentPage}
					totalPages={pagination.totalPages}
					onPageChange={setPage}
					hasNextPage={pagination.hasNextPage}
					hasPrevPage={pagination.hasPrevPage}
				/>
			</main>

			{/* Footer */}
			<footer className='border-t mt-16 py-8 bg-card/50'>
				<div className='container mx-auto px-4 text-center text-sm text-muted-foreground'>
					<p>
						Powered by NewsAPI.org • Built with Next.js, MongoDB & shadcn/ui
					</p>
				</div>
			</footer>
		</div>
	);
}

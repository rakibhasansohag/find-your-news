'use client';

import { Button } from '@/components/ui/button';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	hasNextPage,
	hasPrevPage,
}: PaginationProps) {
	const renderPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxPagesToShow = 5;

		if (totalPages <= maxPagesToShow) {
			// Show all pages if total is less than max
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Always show first page
			pages.push(1);

			// Calculate range around current page
			const startPage = Math.max(2, currentPage - 1);
			const endPage = Math.min(totalPages - 1, currentPage + 1);

			// Add ellipsis after first page if needed
			if (startPage > 2) {
				pages.push('...');
			}

			// Add pages around current
			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			// Add ellipsis before last page if needed
			if (endPage < totalPages - 1) {
				pages.push('...');
			}

			// Always show last page
			pages.push(totalPages);
		}

		return pages;
	};

	if (totalPages <= 1) return null;

	return (
		<div className='flex items-center justify-center gap-2 mt-8'>
			{/* First Page */}
			<Button
				variant='outline'
				size='sm'
				onClick={() => onPageChange(1)}
				disabled={!hasPrevPage}
			>
				<ChevronsLeft className='w-4 h-4' />
			</Button>

			{/* Previous Page */}
			<Button
				variant='outline'
				size='sm'
				onClick={() => onPageChange(currentPage - 1)}
				disabled={!hasPrevPage}
			>
				<ChevronLeft className='w-4 h-4' />
			</Button>

			{/* Page Numbers */}
			<div className='flex gap-1'>
				{renderPageNumbers().map((page, index) => (
					<Button
						key={index}
						variant={page === currentPage ? 'default' : 'outline'}
						size='sm'
						onClick={() => typeof page === 'number' && onPageChange(page)}
						disabled={page === '...'}
						className='min-w-[40px]'
					>
						{page}
					</Button>
				))}
			</div>

			{/* Next Page */}
			<Button
				variant='outline'
				size='sm'
				onClick={() => onPageChange(currentPage + 1)}
				disabled={!hasNextPage}
			>
				<ChevronRight className='w-4 h-4' />
			</Button>

			{/* Last Page */}
			<Button
				variant='outline'
				size='sm'
				onClick={() => onPageChange(totalPages)}
				disabled={!hasNextPage}
			>
				<ChevronsRight className='w-4 h-4' />
			</Button>
		</div>
	);
}

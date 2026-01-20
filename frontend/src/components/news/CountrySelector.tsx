'use client';

import { useState, useEffect } from 'react';
import { Country } from '@/types/news.types';
import { newsApi } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

interface CountrySelectorProps {
	selectedCountry: string;
	onCountryChange: (country: string) => void;
	view?: 'dropdown' | 'cards';
}

export function CountrySelector({
	selectedCountry,
	onCountryChange,
	view = 'dropdown',
}: CountrySelectorProps) {
	const [countries, setCountries] = useState<Country[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const data = await newsApi.getCountries();
				setCountries(data);
			} catch (error) {
				console.error('Failed to fetch countries:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCountries();
	}, []);

	if (loading) {
		return <div className='h-10 bg-muted animate-pulse rounded-md' />;
	}

	if (view === 'dropdown') {
		return (
			<Select value={selectedCountry} onValueChange={onCountryChange}>
				<SelectTrigger className='w-70 h-96'>
					<Globe className='w-4 h-4 mr-2' />
					<SelectValue placeholder='Select a country' />
				</SelectTrigger>
				<SelectContent className='h-96'>
					{countries.map((country) => (
						<SelectItem key={country.code} value={country.code}>
							<span className='mr-2'>{country.flag}</span>
							{country.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		);
	}

	// Card view
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3'>
			{countries.map((country) => (
				<Card
					key={country.code}
					className={`cursor-pointer transition-all hover:shadow-md ${
						selectedCountry === country.code
							? 'ring-2 ring-primary shadow-md'
							: 'hover:border-primary/50'
					}`}
					onClick={() => onCountryChange(country.code)}
				>
					<CardContent className='p-4 text-center'>
						<div className='text-4xl mb-2'>{country.flag}</div>
						<div className='text-sm font-medium truncate'>{country.name}</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { ProductCategories } from '@/app/(main)/lib/definitions';
import './Filter.css';

type FilterProps = {
  query?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  rating?: string;
};

export default function ProductFilters({
  query,
  minPrice,
  maxPrice,
  category,
  rating,
}: FilterProps) {
  const router = useRouter();

  const [filters, setFilters] = useState({
    q: query || '',
    minPrice: minPrice || '',
    maxPrice: maxPrice || '',
    category: category || '',
    rating: rating || '',
  });

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();

    // Create new URLSearchParams
    const params = new URLSearchParams();

    // Add non-empty values
    if (filters.q) params.set('q', filters.q);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.category) params.set('category', filters.category);
    if (filters.rating) params.set('rating', filters.rating);

    // Navigate with new search params (no page refresh!)
    router.push(`/?${params.toString()}`);
  };

  const handleClear = () => {
    setFilters({
      q: '',
      minPrice: '',
      maxPrice: '',
      category: '',
      rating: '',
    });
    router.push('/'); // Clear all filters
  };

  return (
    <section aria-label='filters heading'>
      <form className="product-filters__form" onSubmit={handleSubmit} aria-label="Product Filters" role='search'>
        <div className="product-filters__container">
          <div className="product-filters__row">
            <label className="product-filters__field" htmlFor="q">
              <span className="product-filters__label">Search</span>
              <input
                className="product-filters__input"
                id="q"
                name="q"
                type="text"
                value={filters.q}
                onChange={(e) => handleFilterChange('q', e.target.value)}
                placeholder="Search products..."
              />
            </label>
            <label className="product-filters__field" htmlFor="minPrice">
              <span className="product-filters__label">Min Price</span>
              <input
                className="product-filters__input"
                id="minPrice"
                name="minPrice"
                type="number"
                min="0"
                step="0.01"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                aria-label='Minimum price in dollars'
              />
            </label>
            <label className="product-filters__field" htmlFor="maxPrice">
              <span className="product-filters__label">Max Price</span>
              <input
                className="product-filters__input"
                id="maxPrice"
                name="maxPrice"
                type="number"
                min="0"
                step="0.01"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                aria-label='Maximum price in dollars'
              />
            </label>
            <label className="product-filters__field" htmlFor="rating">
              <span className="product-filters__label">Star Rating</span>
              <select
                className="product-filters__input"
                id="rating"
                name="rating"
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="">All Ratings</option>
                <option value="5">5★</option>
                <option value="4">4★</option>
                <option value="3">3★</option>
                <option value="2">2★</option>
                <option value="1">1★</option>
              </select>
            </label>
            <label className="product-filters__field" htmlFor="category">
              <span className="product-filters__label">Category</span>
              <select
                className="product-filters__input"
                id="category"
                name="category"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {ProductCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="product-filters__actions">
            <button type="submit" className="product-filters__submit">
              Filter
            </button>
            <button
              type="button"
              className="product-filters__clear"
              onClick={handleClear}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

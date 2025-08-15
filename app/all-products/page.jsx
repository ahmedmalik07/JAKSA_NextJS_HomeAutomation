'use client';
import ProductCard from '../../components/ProductCard';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAppContext } from '../../context/AppContext';

import React, { useState } from 'react';
import Link from 'next/link';

const PAGE_SIZE = 6;

const AllProducts = () => {
  const { products } = useAppContext();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Build category counts
  const categoryCount = {};
  products.forEach((p) => {
    if (!categoryCount[p.category]) categoryCount[p.category] = 0;
    categoryCount[p.category]++;
  });
  const categories = Object.entries(categoryCount);

  // Filter products by category and price
  const filteredProducts = products.filter((p) => {
    const inCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    const price = p.offerPrice ?? p.price;
    const aboveMin = minPrice === '' || price >= parseFloat(minPrice);
    const belowMax = maxPrice === '' || price <= parseFloat(maxPrice);
    return inCategory && aboveMin && belowMax;
  });
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginated = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setPage(1);
  }, [selectedCategory, minPrice, maxPrice]);

  // Reset to page 1 when category changes
  React.useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  return (
    <div className='min-h-screen flex flex-col bg-[#f7f9fc]'>
      <Navbar />
      <main className='flex-1 max-w-7xl mx-auto w-full px-2 md:px-6 py-10 flex flex-col md:flex-row gap-8'>
        {/* Sidebar */}
        <aside className='w-full md:w-64 mb-8 md:mb-0'>
          <div className='bg-white rounded-xl shadow p-6 sticky top-24'>
            <h3 className='text-lg font-semibold text-[#1A3578] mb-4'>
              Categories
            </h3>
            <ul className='space-y-2 text-[#4B6584] text-sm'>
              <li key='all'>
                <label className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name='category'
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className='accent-[#1A3578]'
                  />
                  All Products ({products.length})
                </label>
              </li>
              {categories.map(([cat, count]) => (
                <li key={cat}>
                  <label className='flex items-center gap-2'>
                    <input
                      type='radio'
                      name='category'
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className='accent-[#1A3578]'
                    />
                    {cat} ({count})
                  </label>
                </li>
              ))}
            </ul>
            <div className='mt-6'>
              <label className='block text-xs font-semibold text-[#1A3578] mb-2'>
                Range
              </label>
              <div className='flex gap-2'>
                <input
                  type='number'
                  className='w-1/2 border border-[#bfcbe3] rounded px-2 py-1 text-xs'
                  placeholder='Min'
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type='number'
                  className='w-1/2 border border-[#bfcbe3] rounded px-2 py-1 text-xs'
                  placeholder='Max'
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <section className='flex-1'>
          <h2 className='text-2xl font-bold text-[#1A3578] mb-6'>
            All Products
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8'>
            {paginated.map((product) => (
              <Link
                href={`/product/${product._id}`}
                key={product._id}
                className='group rounded-xl bg-white shadow hover:shadow-lg transition overflow-hidden flex flex-col cursor-pointer'
              >
                <div className='relative w-full aspect-square bg-[#f7f9fc] flex items-center justify-center'>
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className='object-contain p-8 w-full h-full group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <div className='p-4 flex-1 flex flex-col'>
                  <p className='text-[#1A3578] text-sm font-medium mb-2 line-clamp-2'>
                    {product.name}
                  </p>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='text-[#1A3578] font-bold text-lg'>
                      Rs. {product.offerPrice ?? product.price}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-[#4B6584]'>
                    <span>★ 4.5</span>
                    <span>(21 reviews)</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Pagination */}
          <div className='flex justify-center items-center gap-2 mt-8'>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className='px-3 py-1 rounded border text-[#1A3578] disabled:opacity-40'
            >
              &laquo;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded border ${
                  page === i + 1 ? 'bg-[#1A3578] text-white' : 'text-[#1A3578]'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className='px-3 py-1 rounded border text-[#1A3578] disabled:opacity-40'
            >
              &raquo;
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllProducts;

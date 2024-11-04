import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

const categories = [...new Set(products.map(p => p.category))];

export const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Our Products</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg capitalize ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

export const Wishlist: React.FC = () => {
  const { state } = useShop();

  if (state.wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Wishlist</h1>
        <p className="text-gray-600">Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {state.wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
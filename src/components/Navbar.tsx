import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Store } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const { state } = useShop();
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Store className="w-6 h-6" />
            <span>Shop</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/wishlist"
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <Heart className="w-6 h-6" />
              {state.wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {state.wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
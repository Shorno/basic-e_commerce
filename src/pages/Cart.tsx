import React from 'react';
import { CartItem } from '../components/CartItem';
import { useShop } from '../context/ShopContext';

export const Cart: React.FC = () => {
  const { state } = useShop();
  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="divide-y">
          {state.cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-6 text-right">
          <p className="text-lg font-semibold">
            Total: ${total.toFixed(2)}
          </p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
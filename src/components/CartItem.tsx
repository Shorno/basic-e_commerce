import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useShop } from '../context/ShopContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { dispatch } = useShop();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            dispatch({
              type: 'UPDATE_QUANTITY',
              payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) },
            })
          }
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() =>
            dispatch({
              type: 'UPDATE_QUANTITY',
              payload: { id: item.id, quantity: item.quantity + 1 },
            })
          }
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
          className="p-1 hover:bg-gray-100 rounded ml-2"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
};
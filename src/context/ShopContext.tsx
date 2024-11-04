import React, { createContext, useContext, useReducer } from 'react';
import { Product, CartItem } from '../types';

interface ShopState {
  cart: CartItem[];
  wishlist: Product[];
}

type ShopAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'TOGGLE_WISHLIST'; payload: Product };

const initialState: ShopState = {
  cart: [],
  wishlist: [],
};

const shopReducer = (state: ShopState, action: ShopAction): ShopState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.some(item => item.id === action.payload.id);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter(item => item.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      };
    }
    default:
      return state;
  }
};

const ShopContext = createContext<{
  state: ShopState;
  dispatch: React.Dispatch<ShopAction>;
} | null>(null);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
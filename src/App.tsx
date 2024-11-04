import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';

function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;
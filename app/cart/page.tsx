'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { getStorageUrl, apiFetch } from '../utils/api';

interface CartItem {
  id: string;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string | null;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

       const response = await apiFetch('/api/cart', {
         credentials: 'include',
         headers,
       });
      if (response.ok) {
        const data = await response.json();
        setItems((data.items || []).map((item: CartItem) => ({
          ...item,
          price: Number(item.price),
          total: Number(item.total)
        })));
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setUpdating(true);
    try {
      const token = localStorage.getItem('auth_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

       const response = await apiFetch(`/api/cart?id=${itemId}`, {
         method: 'PUT',
         headers,
         credentials: 'include',
         body: JSON.stringify({ quantity: newQuantity }),
       });
      if (response.ok) {
        setItems(items.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity, total: item.price * newQuantity } : item
        ));
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        console.error('Failed to update cart, response not ok');
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (itemId: string) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('auth_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

       const response = await apiFetch(`/api/cart?id=${itemId}`, {
         method: 'DELETE',
         headers,
         credentials: 'include',
       });
      if (response.ok) {
        setItems(items.filter(item => item.id !== itemId));
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setUpdating(false);
    }
  };

  const clearCart = async () => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('auth_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

       const response = await apiFetch('/api/cart', {
         method: 'DELETE',
         headers,
         credentials: 'include',
       });
      if (response.ok) {
        setItems([]);
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
    } finally {
      setUpdating(false);
    }
  };

   useEffect(() => {
     fetchCart();
     
     // Listen for cart updates from other components
     const handleCartUpdate = () => {
       fetchCart();
     };
     window.addEventListener('cartUpdated', handleCartUpdate);
     return () => window.removeEventListener('cartUpdated', handleCartUpdate);
   }, []);

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f12] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-[#00d4aa] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[#737373]">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#fafafa] mb-2">Shopping Cart</h1>
          <p className="text-[#737373]">
            {items.length === 0
              ? 'Your cart is empty'
              : `${itemCount} item${itemCount !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBagIcon className="w-20 h-20 text-[#2a2a30] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[#fafafa] mb-4">Your cart is empty</h2>
            <p className="text-[#737373] mb-8">Looks like you haven&apos;t added any products yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-xl hover:scale-[1.02] transition-transform"
            >
              Browse Products
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-6 border border-[#2a2a30] flex flex-col sm:flex-row gap-4"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden bg-[#1a1a1f] flex-shrink-0">
                     {item.thumbnail ? (
                       <img src={getStorageUrl(item.thumbnail)!} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBagIcon className="w-8 h-8 text-[#2a2a30]" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link href={`/products/${item.product_id}`} className="text-lg font-semibold text-[#fafafa] hover:text-[#00d4aa] transition-colors line-clamp-1">
                          {item.name}
                        </Link>
                        <p className="text-[#00d4aa] font-bold mt-1">৳${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={updating}
                        className="p-2 text-[#737373] hover:text-[#ff4444] transition-colors"
                        title="Remove item"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={updating || item.quantity <= 1}
                          className="w-10 h-10 rounded-lg bg-[#1a1a1f] border border-[#2a2a30] text-[#fafafa] hover:border-[#00d4aa]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center text-lg font-bold text-[#fafafa]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={updating}
                          className="w-10 h-10 rounded-lg bg-[#1a1a1f] border border-[#2a2a30] text-[#fafafa] hover:border-[#00d4aa]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <p className="text-lg font-bold text-[#fafafa]">
                        ${item.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                disabled={updating}
                className="w-full py-3 text-[#737373] hover:text-[#ff4444] transition-colors font-medium"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 border border-[#2a2a30] sticky top-24">
                <h2 className="text-xl font-bold text-[#fafafa] mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#737373]">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="text-[#fafafa] font-medium">৳${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#737373]">
                    <span>Shipping</span>
                    <span className="text-[#00d4aa] font-medium">Free (Digital)</span>
                  </div>
                  <hr className="border-[#2a2a30]" />
                  <div className="flex justify-between text-lg">
                    <span className="text-[#fafafa] font-bold">Total</span>
                    <span className="text-[#00d4aa] font-bold">৳${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] text-[#0f0f12] font-bold rounded-xl hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(0,212,170,0.5)] transition-all duration-300"
                >
                  Proceed to Checkout
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/products"
                  className="block w-full text-center mt-4 text-sm text-[#737373] hover:text-[#00d4aa] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

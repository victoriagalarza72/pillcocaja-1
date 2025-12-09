import React from 'react';
import TopNav from '../components/TopNav';

const Cart: React.FC = () => {
  return (
    <main className="min-h-screen bg-cream-50">
      <TopNav onLight={false} />
      <div className="container-width pt-24 pb-16">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-700">Cart functionality coming soon. For orders, please contact us.</p>
      </div>
    </main>
  );
};

export default Cart;


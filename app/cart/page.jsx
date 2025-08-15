'use client';
import React from 'react';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import { useAppContext } from '../../context/AppContext';

import OrderSummary from '../../components/OrderSummary';

const Cart = () => {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
  } = useAppContext();

  // Contact form state
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    contact: '',
    time: '',
    date: '',
  });
  const [submitting, setSubmitting] = React.useState(false);
  // Calculate subtotal
  const subtotal = Object.keys(cartItems).reduce((sum, itemId) => {
    const product = products.find((product) => product._id === itemId);
    return product ? sum + product.offerPrice * cartItems[itemId] : sum;
  }, 0);
  // Handle form change
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      alert('Submitted!');
    }, 1200);
  }
  return (
    <>
      <Navbar />
      <main className='max-w-6xl mx-auto w-full px-2 md:px-6 py-10'>
        <header className='text-center mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#1A3578] mb-2'>
            Ready To Order?
          </h1>
          <p className='text-[#4B6584] text-base md:text-lg max-w-2xl mx-auto mb-2 font-normal'>
            Let’s bring smart living to your space. Reach out and we’ll handle
            the rest.
          </p>
          <div
            className='w-24 h-1 bg-[#A7B8D8] mx-auto rounded-full mt-2 mb-6'
            aria-hidden='true'
          ></div>
        </header>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Shopping Cart */}
          <section className='flex-1'>
            <h2 className='text-2xl font-bold text-[#1A3578] mb-6'>
              Shopping Cart
            </h2>
            <div className='space-y-4'>
              {Object.keys(cartItems).map((itemId) => {
                const product = products.find(
                  (product) => product._id === itemId
                );
                if (!product || cartItems[itemId] <= 0) return null;
                return (
                  <div
                    key={itemId}
                    className='flex items-center gap-4 bg-[#F8F9FA] rounded-xl p-4 border border-gray-200'
                  >
                    <div className='rounded-lg overflow-hidden bg-white p-2 shadow-sm'>
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        width={80}
                        height={80}
                        className='object-cover w-20 h-20'
                      />
                    </div>
                    <div className='flex-1'>
                      <div className='font-semibold text-[#1A3578] text-lg'>
                        {product.name}
                      </div>
                      <div className='text-sm text-[#4B6584]'>
                        {product.code || '#' + product._id.slice(-8)}
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <button
                        className='w-8 h-8 flex items-center justify-center rounded-full bg-[#A7B8D8] text-[#1A3578] hover:bg-[#1A3578] hover:text-white transition'
                        onClick={() =>
                          updateCartQuantity(product._id, cartItems[itemId] - 1)
                        }
                      >
                        -
                      </button>
                      <span className='w-8 text-center font-semibold'>
                        {cartItems[itemId]}
                      </span>
                      <button
                        className='w-8 h-8 flex items-center justify-center rounded-full bg-[#A7B8D8] text-[#1A3578] hover:bg-[#1A3578] hover:text-white transition'
                        onClick={() => addToCart(product._id)}
                      >
                        +
                      </button>
                    </div>
                    <div className='font-semibold text-[#1A3578] text-lg min-w-[80px] text-right'>
                      Rs
                      {(
                        product.offerPrice * cartItems[itemId]
                      ).toLocaleString()}
                    </div>
                    <button
                      className='ml-2 text-[#A7B8D8] hover:text-red-500 transition w-6 h-6 flex items-center justify-center'
                      onClick={() => updateCartQuantity(product._id, 0)}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
              {Object.keys(cartItems).length === 0 && (
                <div className='text-center py-12 text-[#4B6584]'>
                  <p className='text-lg'>Your cart is empty</p>
                  <button
                    onClick={() => router.push('/all-products')}
                    className='mt-4 px-6 py-2 bg-[#1A3578] text-white rounded-lg hover:bg-[#25335a] transition'
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
            {Object.keys(cartItems).length > 0 && (
              <div className='border-t border-[#A7B8D8] mt-6 pt-6 flex justify-between items-center'>
                <span className='text-xl font-bold text-[#1A3578]'>
                  Subtotal
                </span>
                <span className='text-xl font-bold text-[#1A3578]'>
                  ${subtotal.toLocaleString()}
                </span>
              </div>
            )}
          </section>
          {/* Contact Form */}
          <section className='w-full lg:w-[420px] bg-white rounded-xl shadow-lg p-8 border border-gray-200 h-fit'>
            <h2 className='text-2xl font-bold text-[#1A3578] mb-6'>
              Contact Form
            </h2>
            <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
              <div>
                <input
                  name='name'
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder='Name'
                  className='w-full border-b-2 border-[#A7B8D8] py-3 px-1 text-[#1A3578] bg-transparent focus:outline-none focus:border-[#1A3578] transition'
                  required
                />
              </div>
              <div>
                <input
                  name='email'
                  type='email'
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder='Email'
                  className='w-full border-b-2 border-[#A7B8D8] py-3 px-1 text-[#1A3578] bg-transparent focus:outline-none focus:border-[#1A3578] transition'
                  required
                />
              </div>
              <div>
                <input
                  name='contact'
                  type='tel'
                  value={form.contact}
                  onChange={handleFormChange}
                  placeholder='Contact No'
                  className='w-full border-b-2 border-[#A7B8D8] py-3 px-1 text-[#1A3578] bg-transparent focus:outline-none focus:border-[#1A3578] transition'
                  required
                />
              </div>
              <div>
                <label className='block text-sm text-[#4B6584] mb-2'>
                  When to contact you? (optional)
                </label>
                <div className='flex gap-3'>
                  <select
                    name='time'
                    value={form.time}
                    onChange={handleFormChange}
                    className='flex-1 border-2 border-[#A7B8D8] rounded-lg py-3 px-4 text-[#1A3578] bg-white focus:outline-none focus:border-[#1A3578] transition'
                  >
                    <option value=''>Select Time</option>
                    <option value='morning'>Morning (9AM - 12PM)</option>
                    <option value='afternoon'>Afternoon (12PM - 5PM)</option>
                    <option value='evening'>Evening (5PM - 9PM)</option>
                  </select>
                  <input
                    type='date'
                    name='date'
                    value={form.date}
                    onChange={handleFormChange}
                    className='flex-1 border-2 border-[#A7B8D8] rounded-lg py-3 px-4 text-[#1A3578] bg-white focus:outline-none focus:border-[#1A3578] transition'
                  />
                </div>
              </div>
              <button
                type='submit'
                disabled={submitting}
                className='mt-4 w-full px-6 py-4 bg-[#1A3578] text-white rounded-lg shadow-lg hover:bg-[#25335a] disabled:bg-gray-400 transition font-semibold text-lg'
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
};

export default Cart;

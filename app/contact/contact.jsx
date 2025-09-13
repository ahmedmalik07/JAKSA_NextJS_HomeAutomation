import React, { useState, useTransition } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import contactImg from '../../assets/jaksa/contact.png';
import fbIcon from '../../assets/jaksa/fb.png';
import instaIcon from '../../assets/jaksa/insta.png';
import linkedinIcon from '../../assets/jaksa/linkedin.png';
import mailIcon from '../../assets/jaksa/mail.png';
import callIcon from '../../assets/jaksa/call.png';
import locationIcon from '../../assets/jaksa/location.png';
import SCRIPT_URL from '../../utils/google-script.js';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: 'general',
    message: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Simple validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      setError('Please fill all required fields.');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/gs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'contact',
            payload: {
              ...formData,
              page: 'Contact Page',
              url: window.location.href,
              userAgent: navigator.userAgent,
            },
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
          throw new Error(result.error || 'Failed to send message');
        }

        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          topic: 'general',
          message: '',
        });
      } catch (err) {
        setError(err.message || 'Failed to send message.');
      }
    });
  };

  return (
    <div className='min-h-screen flex flex-col bg-[#f7f9fc]'>
      <Navbar />
      <main className='flex-1 flex flex-col items-center justify-center py-12 px-2 md:px-4'>
        <div
          className='max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#e6eaf3]'
          style={{ boxShadow: '0 8px 40px 0 rgba(44,62,80,0.10)' }}
        >
          {/* Left Side - Contact Information with image bg */}
          <div className='md:w-2/5 relative flex flex-col justify-between p-8 min-h-[480px] rounded-l-2xl shadow-xl border-r border-[#e6eaf3] overflow-hidden'>
            {/* Contact image background applied */}
            <div className='absolute inset-0 z-0 w-full h-full'>
              <Image
                src={contactImg}
                alt='Contact background'
                fill
                className='object-cover'
                priority
              />
            </div>
            <div className='relative z-10 h-full flex flex-col justify-between'>
              <h2 className='text-2xl font-bold mb-1 text-white'>
                Contact Information
              </h2>
              <p className='text-slate-200 mb-8 text-sm font-normal'>
                Start a conversation — we're here to help.
              </p>
              <div className='space-y-6 mb-8'>
                <div className='flex items-center gap-3'>
                  <span className='inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#3b4e7e]'>
                    <Image src={callIcon} alt='Call' width={22} height={22} />
                  </span>
                  <span className='text-[#e6eaf3] text-base'>
                    +92-319-3608483 (Jaksa)
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#3b4e7e]'>
                    <Image src={mailIcon} alt='Mail' width={22} height={22} />
                  </span>
                  <span className='text-[#e6eaf3] text-base'>
                    jaksa.connect@gmail.com
                  </span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#3b4e7e]'>
                    <Image
                      src={locationIcon}
                      alt='Location'
                      width={22}
                      height={22}
                    />
                  </span>
                  <span className='text-[#e6eaf3] text-base'>
                    AUBIC, FMC 5th Floor, E9 Islamabad.
                  </span>
                </div>
              </div>
              {/* Social Icons bottom left row - fixed placement */}
              <div className='flex gap-4 mt-8 pt-8 items-end'>
                <a href='#' className='hover:opacity-80 transition'>
                  <Image src={fbIcon} alt='Facebook' width={32} height={32} />
                </a>
                <a href='#' className='hover:opacity-80 transition'>
                  <Image
                    src={instaIcon}
                    alt='Instagram'
                    width={32}
                    height={32}
                  />
                </a>
                <a href='#' className='hover:opacity-80 transition'>
                  <Image
                    src={linkedinIcon}
                    alt='LinkedIn'
                    width={32}
                    height={32}
                  />
                </a>
              </div>
            </div>
          </div>
          {/* Right Side - Contact Form */}
          <div className='md:w-3/5 p-10 flex flex-col justify-center'>
            <form onSubmit={handleSubmit} className='space-y-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <label className='block text-xs font-semibold text-[#1A3578] mb-2'>
                    First Name
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className='w-full border-0 border-b border-[#7ea0e6] bg-transparent px-1 py-2 text-[#1A3578] focus:outline-none focus:border-[#1A3578] transition'
                    required
                  />
                </div>
                <div>
                  <label className='block text-xs font-semibold text-[#1A3578] mb-2'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className='w-full border-0 border-b border-[#7ea0e6] bg-transparent px-1 py-2 text-[#1A3578] focus:outline-none focus:border-[#1A3578] transition'
                    required
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <label className='block text-xs font-semibold text-[#1A3578] mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='w-full border-0 border-b border-[#7ea0e6] bg-transparent px-1 py-2 text-[#1A3578] focus:outline-none focus:border-[#1A3578] transition'
                    required
                  />
                </div>
                <div>
                  <label className='block text-xs font-semibold text-[#1A3578] mb-2'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='w-full border-0 border-b border-[#7ea0e6] bg-transparent px-1 py-2 text-[#1A3578] focus:outline-none focus:border-[#1A3578] transition'
                    required
                  />
                </div>
              </div>
              <div>
                <label className='block text-xs font-semibold text-[#1A3578] mb-2'>
                  Select a Topic
                </label>
                <div className='flex flex-wrap gap-8 mt-2'>
                  {[
                    { value: 'general', label: 'General Inquiry' },
                    { value: 'support', label: 'Product Support' },
                    { value: 'custom', label: 'Custom Solutions' },
                    { value: 'partnership', label: 'Partnership Request' },
                  ].map((topic) => (
                    <label
                      key={topic.value}
                      className='flex items-center gap-2 cursor-pointer group'
                    >
                      <input
                        type='radio'
                        name='topic'
                        value={topic.value}
                        checked={formData.topic === topic.value}
                        onChange={handleInputChange}
                        className='accent-[#3b4e7e] w-4 h-4'
                      />
                      <span
                        className={`text-xs font-medium ${
                          formData.topic === topic.value
                            ? 'text-[#3b4e7e]'
                            : 'text-[#7ea0e6]'
                        } group-hover:text-[#1A3578] transition`}
                      >
                        {topic.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className='block text-xs font-semibold text-[#1A3578] mb-2'>
                  Message (optional)
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder='Write your message..'
                  className='w-full border-0 border-b border-[#7ea0e6] bg-transparent px-1 py-2 text-[#1A3578] focus:outline-none focus:border-[#1A3578] transition resize-none'
                />
              </div>
              {error && (
                <div className='text-red-500 text-sm font-medium'>{error}</div>
              )}
              {success && (
                <div className='text-green-600 text-sm font-medium'>
                  Message sent successfully!
                </div>
              )}
              <div className='flex justify-end'>
                <button
                  type='submit'
                  disabled={isPending}
                  className='px-8 py-3 bg-[#25335a] text-white rounded-md shadow-md hover:bg-[#1A3578] transition font-semibold text-base focus:ring-2 focus:ring-[#A7B8D8] focus:ring-offset-2 outline-none disabled:opacity-60'
                >
                  {isPending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

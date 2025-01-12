'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from 'lodash';

export default function ContactForm() {
  const [mounted, setMounted] = useState(false);
  const [screenSize, setScreenSize] = useState('lg');
  const { ref: formRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else if (width < 1024) setScreenSize('lg');
      else setScreenSize('xl');
    };
    
    const debouncedCheck = debounce(checkScreenSize, 250);
    checkScreenSize();
    window.addEventListener('resize', debouncedCheck);
    setMounted(true);
    
    return () => window.removeEventListener('resize', debouncedCheck);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-gray-100">Contact Us</h2>
          <p className="mt-2 text-sm text-gray-400">We&apos;d love to hear from you</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-5">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full rounded-lg bg-gray-900 border border-gray-700 text-gray-300 shadow-sm 
                  focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50
                  placeholder-gray-600 transition-all duration-300 px-4 py-3 hover:border-gray-600"
                placeholder="Enter your name"
                required
                minLength={2}
                maxLength={50}
              />
            </div>

            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full rounded-lg bg-gray-900 border border-gray-700 text-gray-300 shadow-sm 
                  focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50
                  placeholder-gray-600 transition-all duration-300 px-4 py-3 hover:border-gray-600"
                placeholder="your@email.com"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
            </div>

            <div className="relative">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="block w-full rounded-lg bg-gray-900 border border-gray-700 text-gray-300 shadow-sm 
                  focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50
                  placeholder-gray-600 transition-all duration-300 px-4 py-3 hover:border-gray-600"
                placeholder="What is this about?"
                required
                minLength={3}
                maxLength={100}
              />
            </div>

            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="block w-full rounded-lg bg-gray-900 border border-gray-700 text-gray-300 shadow-sm 
                  focus:border-gray-500 focus:ring-2 focus:ring-gray-500/50
                  placeholder-gray-600 transition-all duration-300 resize-y px-4 py-3 hover:border-gray-600"
                rows={4}
                required
                minLength={10}
                maxLength={1000}
                placeholder="Write your message here..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="group relative w-full py-3 px-4 transition-all duration-300
              text-gray-300 bg-gray-900 border border-gray-700
              flex items-center justify-center gap-2 font-mono tracking-[0.2em]
              hover:bg-gray-800 hover:border-gray-600
              rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 text-sm text-green-400 text-center bg-green-900/20 py-2 px-4 rounded-lg border border-green-500/20"
              >
                Message sent successfully! ✨
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 text-sm text-red-400 text-center bg-red-900/20 py-2 px-4 rounded-lg border border-red-500/20"
              >
                Failed to send message. Please try again. 😢
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
}

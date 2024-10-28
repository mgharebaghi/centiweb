'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700/50">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Contact Us</h2>
          <p className="mt-2 text-sm text-gray-300">We&apos;d love to hear from you</p>
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
                className="block w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white shadow-sm 
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                  placeholder-gray-400 transition-all duration-300 px-4 py-3 hover:border-indigo-400"
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
                className="block w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white shadow-sm 
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                  placeholder-gray-400 transition-all duration-300 px-4 py-3 hover:border-indigo-400"
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
                className="block w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white shadow-sm 
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                  placeholder-gray-400 transition-all duration-300 px-4 py-3 hover:border-indigo-400"
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
                className="block w-full rounded-lg bg-gray-700/50 border border-gray-600 text-white shadow-sm 
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                  placeholder-gray-400 transition-all duration-300 resize-y px-4 py-3 hover:border-indigo-400"
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
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium 
              text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <div className="mt-2 text-sm text-green-400 text-center bg-green-900/20 py-2 px-4 rounded-lg border border-green-500/20">
              Message sent successfully! ✨
            </div>
          )}
          {status === 'error' && (
            <div className="mt-2 text-sm text-red-400 text-center bg-red-900/20 py-2 px-4 rounded-lg border border-red-500/20">
              Failed to send message. Please try again. 😢
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

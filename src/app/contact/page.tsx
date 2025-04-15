'use client';

import { useState } from 'react';
import ClientLayout from '@/app/layout.client';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess(data.message);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <ClientLayout>
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold handwriting mb-8 text-center">Contact Us</h1>
        <p className="text-center text-lg text-gray-700 mb-8">
          Please fill out this form and we’ll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <button type="submit" className="bg-green-dark text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Send Message
          </button>

          {success && <p className="text-green-600 text-center">{success}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
      </section>
    </ClientLayout>
  );
}
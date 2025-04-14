'use client';
import Link from 'next/link';
import { useActionState } from 'react';

function form() {
  return (
    <form>
      <div>
        {/* customer name */}
        <label htmlFor="customer">Customer Name</label>
        <input type="text" id="customer" name="customer" required />
      </div>
      <div>
        {/* customer email */}
        <label htmlFor="email">Customer Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        {/* customer phone */}
        <label htmlFor="phone">Customer Phone</label>
        <input type="tel" id="phone" name="phone" required />
      </div>
      <button type="submit">Buy</button>
    </form>
  );
}
export default form;

'use client';
import { createPurchase } from '@/api/controllers/purchase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Form() {
  const [customerID, setCustomerID] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);

      const calculatedTotal = parsedProducts.reduce(
        (acc: number, product: { price: number }) => acc + product.price,
        0
      );
      setTotalAmount(calculatedTotal);

      const purchaseData = {
        customerID: customerID,
        products: parsedProducts,
        totalAmount: calculatedTotal,
      };
      const response = await createPurchase(purchaseData);

      if (response?.ok) {
        router.push('/');
      }
    }
  };

  useEffect(() => {
    const storedCustomerID = localStorage.getItem('customerID');
    setCustomerID(storedCustomerID);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* customer name */}
        <label htmlFor="customer">Customer Name</label>
        <input type="text" id="customer" name="customer" required />
      </div>
      <div>
        <label htmlFor="customerID" hidden>
          Customer ID
        </label>
        <input type="text" id="customerID" name="customerID" hidden value={customerID || ''} />
      </div>

      <button type="submit">Buy</button>
    </form>
  );
}

export default Form;

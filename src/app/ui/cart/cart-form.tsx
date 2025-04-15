'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function Form() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedProducts = JSON.parse(storedCart);
      // Transform the products to match the Purchase model
      const transformedProducts = parsedProducts.map((product: any) => ({
        productId: product._id,
        quantity: product.quantity || 1, // default quantity if not provided
        price: product.price,
      }));

      // Calculate total based on each product's price.
      const calculatedTotal = transformedProducts.reduce(
        (acc: number, product: { price: number; quantity: number }) =>
          acc + product.price * product.quantity,
        0
      );

      const purchaseData = {
        userId: user?.id,
        products: transformedProducts,
        totalAmount: calculatedTotal,
      };

      const response = await fetch('/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      });

      if (response.ok) {
        localStorage.removeItem('cart');
        router.push('/');
      } else {
        console.error('Purchase failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
      <div className="mb-4">
        {/* Customer Name */}
        <label htmlFor="customer">Customer Name</label>
        <input
          type="text"
          id="customer"
          name="customer"
          value={user?.name || ''}
          required
          className="border border-gray-300 rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="customerID" hidden>
          Customer ID
        </label>
        <input
          type="text"
          id="customerID"
          name="customerID"
          hidden
          value={user?.id || ''}
          className="border border-gray-300 rounded p-2"
        />
      </div>

      <button type="submit" className="bg-black text-white rounded p-2 mt-4">
        Buy
      </button>
    </form>
  );
}

export default Form;

import Image from 'next/image';

interface Product {
  name: string;
  imageUrl: string;
  price: number;
}

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <div
            key={product.name}
            className="border p-4 rounded shadow-sm bg-white hover:shadow-md transition"
          >
            <Image
              src={product.imageUrl || "/default-product.png"}
              alt={product.name}
              width={100}
              height={100}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-600">${product.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;

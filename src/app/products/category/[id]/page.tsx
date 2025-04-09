// import { ProductCard } from '@/components/ProductCard';
// import { getProductsByCategoryId } from '@/';
// import { notFound } from 'next/navigation';

type Params = {
  params: {
    id: string;
  };
};

export default async function ProductsByCategoryPage({ params }: Params) {
  const { id } = params;

  // const products = await getProductsByCategoryId(id);

  // if (!products) return notFound();

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#082e21]">
        Products in this Category {id}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))} */}
      </div>
    </section>
  );
}

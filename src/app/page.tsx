import ProductsByCategory from '@/app/components/Galleries/ProductsByCategory';
import Hero from '@/app/components/Hero';
import Deals from '@/app/components/Deals';
import ClientLayout from '@/app/layout.client';

export default function Home() {
  return (
    <ClientLayout>
      <Hero />
      <div className="container mx-auto px-4 py-3">
        <section className="w-full py-8 px-4">
          <h2>[Our Products]</h2>
        </section>
        <hr />
        <Deals />
        <section className="w-full py-8 px-4">
          <h2>[Testimonials]</h2>
        </section>
        <hr />
        <ProductsByCategory />
      </div>
    </ClientLayout>
  );
}

import ProductsByCategory from '@/app/components/Galleries/ProductsByCategory';
import Hero from '@/app/components/Hero';
import Deals from '@/app/components/Deals';
import Testimonials from '@/app/components/Testimonials';
import ClientLayout from '@/app/layout.client';
import ListProducts from '@/app/ui/products/ListProducts';

export default function Home() {
  return (
    <ClientLayout>
      <Hero />
      <div className="container mx-auto px-4 py-3">
        <section className="w-full py-8 px-4">
          <ListProducts />
        </section>
        <Deals />
        <section className="w-full py-8 px-4">
        <Testimonials />
        </section>
        <hr />
        <ProductsByCategory />
      </div>
    </ClientLayout>
  );
}

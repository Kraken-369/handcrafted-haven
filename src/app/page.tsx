import ProductsByCategory from '@/app/components/Galleries/ProductsByCategory';
import Hero from '@/app/components/Hero';
import Deals from '@/app/components/Deals';
import Testimonials from '@/app/components/Testimonials';
import ClientLayout from '@/app/layout.client';
import FeaturedProducts from '@/app/ui/products/FeaturedProducts';

export default function Home() {
  return (
    <ClientLayout>
      <Hero />
      <div className="container mx-auto px-4 py-3">
        <section className="w-full py-8 px-4">
          <FeaturedProducts />
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

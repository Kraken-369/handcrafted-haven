import Form from '@/app/ui/cart/cart-form';
import Table from '@/app/ui/cart/products-table';

function Page() {
  return (
    <main>
      <h1 className="text-3xl text-center pt-2 font-bold text-primary mb-8">
        Shopping Cart
      </h1>
      <Table />
      <Form />
    </main>
  );
}
export default Page;

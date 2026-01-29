import ProductCardWrapper from '@/app/ui/dashboard/product-cards';

export default async function Home() {
  return (
    <main className="p-4">
      <h1 className="mb-4 text-2xl font-semibold">Your Products</h1>
      <ProductCardWrapper />
    </main>
  );
}
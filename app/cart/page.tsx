// app/cart/page.tsx
import { fetchProductData } from "../(main)/lib/data";
import CartItem from "@/components/cartItem/cartItem";
import CartSummary from "@/components/cartSummary/cartSummary";

export default async function CartPage() {
  const { productData } = await fetchProductData();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-playfair text-[#fefae0]">Shopping Cart</h1>
      <div className="space-y-4">
        {productData.map((item) => (
          <CartItem key={item.product_id} item={item} />
        ))}
      </div>
      <CartSummary items={productData} />
    </main>
  );
}

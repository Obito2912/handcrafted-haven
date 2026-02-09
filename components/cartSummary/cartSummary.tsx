// components/cartSummary/cartSummary.tsx
type CartSummaryProps = {
  items: {
    product_id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
};

export default function CartSummary({ items }: CartSummaryProps) {
  const total = items.reduce(
    (sum, i) => sum + Number(i.price) * Number(i.quantity),
    0
  );

  return (
    <div className="mt-6 p-4 bg-[#283618] text-[#fefae0] rounded">
      <h2 className="text-lg font-playfair">Cart Summary</h2>
      <p>Total Items: {items.length}</p>
      <p>Total Price: ${total}</p>
    </div>
  );
}

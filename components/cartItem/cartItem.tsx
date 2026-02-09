// components/cartItem/cartItem.tsx
type CartItemProps = {
  item: {
    product_id: string;
    title: string;
    price: number;
    quantity: number;
  };
};

export default function CartItem({ item }: CartItemProps) {
  return (
    <div className="flex justify-between bg-[#606c38] p-4 rounded">
      <div>
        <h3 className="text-[#fefae0] font-playfair">{item.title}</h3>
        <p className="text-[#dda15e]">Qty: {item.quantity}</p>
      </div>
      <span className="text-[#fefae0]">${item.price}</span>
    </div>
  );
}

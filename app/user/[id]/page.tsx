// app/user/[id]/page.tsx
import { fetchUserProducts } from "../../(main)/lib/data";

export default async function UserTasksPage({ params }) {
  const products = await fetchUserProducts(params.id);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-playfair text-[#fefae0]">
        Products for User {params.id}
      </h1>
      <ul className="space-y-2">
        {products.map((product) => (
          <li
            key={product.product_id}
            className="bg-[#606c38] p-3 rounded text-[#dda15e]"
          >
            {product.title} – ${product.price}
          </li>
        ))}
      </ul>
    </main>
  );
}

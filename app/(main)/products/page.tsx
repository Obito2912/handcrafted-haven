import EditableProductCardWrapper from "@/components/main/Products/EditableProductCardWrapper";
import { getLoggedInInfo } from "../lib/session";
import { fetchProductDataByUser } from "../lib/data";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";
import Link from "next/link";
export default async function Products() {
  const { session, userId, loggedIn } = await getLoggedInInfo();
  if (!userId) {
    return <div>Please log in to view your products.</div>;
  }
  const { productData } = await fetchProductDataByUser(userId);
  return (
    <main className="products">
      <ScrollableContainer>
        <h1>My Products</h1>
        <p>This is the products page. Here you can find your products and manage them.</p>
        <Link href="/products/create">Create New Product</Link>

        <EditableProductCardWrapper products={productData} />
      </ScrollableContainer>
    </main>)
}
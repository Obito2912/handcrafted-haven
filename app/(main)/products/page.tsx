import EditableProductCardWrapper from "@/components/Products/EditableProductCardWrapper";
import { getLoggedInInfo } from "../lib/session";
import { fetchProductDataByUser } from "../lib/data";
import Link from "next/dist/client/link";

export default async function Products() {
    const { session, userId, loggedIn } = await getLoggedInInfo();
    if (!userId) {
        return <div>Please log in to view your products.</div>;
    }
    const { productData } = await fetchProductDataByUser(userId);
  return (
    <main className="">
      <h1 className="mb-4 text-2xl font-bold">My Products</h1>
      <h2 className="mb-2 text-lg font-semibold"><Link href="/products/create">Create New Product</Link></h2>
      <EditableProductCardWrapper products={productData} />
    </main>)
}
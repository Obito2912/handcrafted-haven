import EditableProductCardWrapper from "@/components/ProductCard/EditableProductCard";
import { getLoggedInInfo } from "../lib/session";
import { fetchProductDataByUser } from "../lib/data";

export default async function Products() {
    const { session, userId, loggedIn } = await getLoggedInInfo();
    if (!userId) {
        return <div>Please log in to view your products.</div>;
    }
    const { productData } = await fetchProductDataByUser(userId);
  return (
    <main className="">
      <EditableProductCardWrapper products={productData} />
    </main>)
}
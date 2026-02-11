
import { fetchProductById, fetchUserProfile } from "@/app/(main)/lib/data";
import ProductDisplay from "@/components/main/Products/ProductDisplay";
import Breadcrumbs from "@/components/shared/Breadcrumbs/Breadcrumbs";
import { redirect } from "next/navigation";

export default async function ViewProduct(
    props: { params: Promise<{ id: string }> }
) {

    const params = await props.params;
    console.log(`Fetching product for id ${params.id}...`);
    const productId = params.id;
    const product = await fetchProductById(productId);
    const userProfile = await fetchUserProfile(product?.userId ?? "");
    if (!product) {
        // return <div>Product not found.</div>;
        redirect("/products");
    }
    return (
        <>
              <Breadcrumbs
                breadcrumbs={[
                  { label: "Home", href: "/" },
                  { label: product.title ?? "Product", href: `/products/view/${product.product_id}`, active: true },
                ]}
              />
            <ProductDisplay product={product} productSeller={userProfile} />
        </>
    );
}
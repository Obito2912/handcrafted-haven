import ProductForm from "@/components/main/Products/ProductForm"
import { getLoggedInInfo } from "@/app/(main)/lib/session";
import { fetchProductById } from "@/app/(main)/lib/data";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";
import { redirect } from "next/navigation";
import Breadcrumbs from "@/components/shared/Breadcrumbs/Breadcrumbs";

export default async function EditProduct(
    props: { params: Promise<{ id: string }> }
) {
    const { session, userId, loggedIn } = await getLoggedInInfo();
    if (!userId) {
        return <div>Please log in to view your products.</div>;
    }
    const params = await props.params;
    console.log(`Fetching product for id ${params.id}...`);
    const productId = params.id;
    const product = await fetchProductById(productId);
    if (!product) {
        // return <div>Product not found.</div>;
        redirect("/products");
    }
    return (
        <>
        <Breadcrumbs
                breadcrumbs={[
                  { label: "Home", href: "/" },
                  { label: "Manage Shop", href: "/products" },
                  { label: `Edit Product`, href: `/products/edit/${product.product_id}`, active: true },
                ]}
              />    
            <ScrollableContainer>
                <ProductForm initialValues={product} userId={userId} />
            </ScrollableContainer>
        </>
    );
}
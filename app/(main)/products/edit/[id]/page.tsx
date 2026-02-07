import ProductForm from "@/components/main/Products/ProductForm"
import { getLoggedInInfo } from "@/app/(main)/lib/session";
import { fetchProductById } from "@/app/(main)/lib/data";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";

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
        return <div>Product not found.</div>;
    }
    return (
        <>
            <ScrollableContainer>
                <ProductForm initialValues={product} userId={userId} />
            </ScrollableContainer>
        </>
    );
}
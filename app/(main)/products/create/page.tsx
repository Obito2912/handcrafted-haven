import ProductForm from "@/components/Products/ProductForm"
import { getLoggedInInfo } from "@/app/(main)/lib/session";
import { fetchProductById } from "@/app/(main)/lib/data";

export default async function CreateProduct(
props: { params: Promise<{ id: string }> }
){
    const { session, userId, loggedIn } = await getLoggedInInfo();
    if (!userId) {
        return <div>Please log in to create products.</div>;
    }
    return (
        <main className="">
        <ProductForm initialValues={undefined} userId={userId} />
        </main>
    );
}
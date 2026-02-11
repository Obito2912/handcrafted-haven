import ProductForm from "@/components/main/Products/ProductForm"
import { getLoggedInInfo } from "@/app/(main)/lib/session";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";
import Breadcrumbs from "@/components/shared/Breadcrumbs/Breadcrumbs";

export default async function CreateProduct(
    props: { params: Promise<{ id: string }> }
) {
    const { session, userId, loggedIn } = await getLoggedInInfo();
    if (!userId) {
        return <div>Please log in to create products.</div>;
    }
    return (
        <>
        <Breadcrumbs
                breadcrumbs={[
                  { label: "Home", href: "/" },
                  { label: "Manage Shop", href: "/products" },
                  { label: `Create Product`, href: `/products/create`, active: true },
                ]}
              />                
            <ScrollableContainer>
                <ProductForm initialValues={undefined} userId={userId} />
            </ScrollableContainer>
        </>
    );
}
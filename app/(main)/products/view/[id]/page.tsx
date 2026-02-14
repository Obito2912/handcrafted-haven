
import { fetchProductDetail, fetchUserProfile } from "@/app/(main)/lib/data";
import { getLoggedInInfo } from "@/app/(main)/lib/session";
import ProductDisplay from "@/components/main/Products/ProductDisplay";
import Breadcrumbs from "@/components/shared/Breadcrumbs/Breadcrumbs";
import { redirect } from "next/navigation";
import styles from "../../products.module.css";
import { Metadata } from "next";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";

export async function generateMetadata(
    props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const params = await props.params;
    const product = await fetchProductDetail(params.id);

    return {
        title: product?.productValue?.title ?? "View Product",
        description: `View the details of the product "${product?.productValue?.title ?? "this product"}" in your shop at Handcrafted Haven.`,
    };
}

export default async function ViewProduct(
    props: { params: Promise<{ id: string }> }
) {
    const { session, userId, loggedIn } = await getLoggedInInfo();

    const params = await props.params;
    console.log(`Fetching product for id ${params.id}...`);
    const productId = params.id;
    const { productValue, averageRating, allRatings } = await fetchProductDetail(productId);
    const userProductRating = allRatings?.find(r => r.productId === productId && r.userId === userId)?.rating;
    const userProfile = await fetchUserProfile(productValue?.userId ?? "");
    if (!productValue) {
        // return <div>Product not found.</div>;
        redirect("/products");
    }
    return (
        <>
            <div className={styles.products}>
                <Breadcrumbs
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: productValue.title ?? "Product", href: `/products/view/${productValue.product_id}`, active: true },
                    ]}
                />
                <ScrollableContainer>
                    <ProductDisplay product={productValue} productSeller={userProfile} averageRating={averageRating} allRatings={allRatings} userRating={userProductRating} userId={userId} />
                </ScrollableContainer>
            </div>
        </>
    );
}
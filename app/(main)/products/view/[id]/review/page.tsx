import Link from "next/link";
import { redirect } from "next/navigation";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";
import {
  fetchProductDetail,
} from "@/app/(main)/lib/data";
import { getLoggedInInfo } from "@/app/(main)/lib/session";
import ProductReviewForm from "@/components/main/Products/ProductReviewForm";
import styles from "@/components/main/Products/ProductReviewForm.module.css";
import Breadcrumbs from "@/components/shared/Breadcrumbs/Breadcrumbs";
import { Metadata } from "next";

export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const product = await fetchProductDetail(params.id);

  return {
    title: `Review ${product?.productValue?.title ?? "Product"}`,
    description: `Write a review for the product "${product?.productValue?.title ?? "this product"}" in your shop at Handcrafted Haven.`,
  };
}

type ProductReviewPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductReviewPage({
  params,
}: ProductReviewPageProps) {
  const { userId } = await getLoggedInInfo();
  const { id } = await params;
  const { productValue, averageRating, allRatings } = await fetchProductDetail(id);
  const userProductRating = allRatings?.find(r => r.productId === id && r.userId === userId)?.rating;

  if (!productValue) {
    redirect("/");
  }

  // Require login so the rating can be tied to the user.
  if (!userId) {
    return (
      <>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: productValue.title ?? "Product", href: `/products/view/${productValue.product_id}`, active: true },
          ]}
        />
        <ScrollableContainer>
          <div className={styles.details}>
            <h1>Write a review</h1>
            <p>Please sign in to leave a rating.</p>
            <Link href="/login">Go to login</Link>
          </div>
        </ScrollableContainer>
      </>
    );
  }

  return (
    <>    <Breadcrumbs
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: productValue.title ?? "Product", href: `/products/view/${productValue.product_id}`, active: true },
        { label: "Write a review", href: `/products/view/${productValue.product_id}/review`, active: true },
      ]}
    />
      <ScrollableContainer>
        <div className={styles.details}>
          <h1>Review {productValue.title}</h1>
          <p>Let others know what you think.</p>
          <ProductReviewForm
            productId={productValue.product_id}
            userId={userId}
            initialRating={userProductRating}
          />
          <Link href={`/products/view/${productValue.product_id}`}>
            Back to product
          </Link>
        </div>
      </ScrollableContainer>
    </>
  );
}
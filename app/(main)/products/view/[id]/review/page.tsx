import Link from "next/link";
import { redirect } from "next/navigation";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";
import {
  fetchProductDetail,
  fetchUserProductRating,
} from "@/app/(main)/lib/data";
import { getLoggedInInfo } from "@/app/(main)/lib/session";
import ProductReviewForm from "@/components/main/Products/ProductReviewForm";

type ProductReviewPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductReviewPage({
  params,
}: ProductReviewPageProps) {
  const { userId } = await getLoggedInInfo();
  const { id } = await params;
  const { product } = await fetchProductDetail(id);

  if (!product) {
    redirect("/");
  }

  // Require login so the rating can be tied to the user.
  if (!userId) {
    return (
      <ScrollableContainer>
        <div>
          <h1>Write a review</h1>
          <p>Please sign in to leave a rating.</p>
          <Link href="/login">Go to login</Link>
        </div>
      </ScrollableContainer>
    );
  }

  const userRating = await fetchUserProductRating(product.product_id, userId);

  return (
    <ScrollableContainer>
      <div>
        <h1>Review {product.title}</h1>
        <p>Let others know what you think.</p>
        <ProductReviewForm
          productId={product.product_id}
          userId={userId}
          initialRating={userRating}
        />
        <Link href={`/products/view/${product.product_id}`}>
          Back to product
        </Link>
      </div>
    </ScrollableContainer>
  );
}

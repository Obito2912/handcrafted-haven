import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";
import {
  fetchProductDetail,
  fetchUserProductRating,
} from "@/app/(main)/lib/data";
import { getLoggedInInfo } from "@/app/(main)/lib/session";
import styles from "./productView.module.css";

type ProductViewPageProps = {
  params: Promise<{ id: string }>;
};

function renderRatingStars(rating: number | null) {
  if (rating === null) {
    return <span className={styles.noRating}>No ratings yet</span>;
  }

  const rounded = Math.round(rating);
  return (
    <span
      className={styles.ratingStars}
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <i
          key={`rating-star-${index}`}
          className={
            index < rounded ? "fa-solid fa-star" : "fa-regular fa-star"
          }
        ></i>
      ))}
      <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
    </span>
  );
}

export default async function ProductViewPage({
  params,
}: ProductViewPageProps) {
  const { userId } = await getLoggedInInfo();
  const { id } = await params;
  const { product, rating, ratingCount } = await fetchProductDetail(id);

  if (!product) {
    redirect("/");
  }

  // Fetch the user's rating to show a personalized hint.
  const userRating = userId
    ? await fetchUserProductRating(product.product_id, userId)
    : null;

  return (
    <ScrollableContainer>
      <div className={styles.wrapper}>
        <div className={styles.media}>
          <Image
            src={product.image_url}
            alt={product.title}
            width={520}
            height={520}
            className={styles.image}
          />
        </div>
        <div className={styles.details}>
          <div className={styles.header}>
            <h1>{product.title}</h1>
            <p className={styles.price}>${product.price}</p>
            <div className={styles.ratingRow}>
              {renderRatingStars(rating)}
              <span className={styles.ratingCount}>
                {ratingCount} review{ratingCount === 1 ? "" : "s"}
              </span>
            </div>
            {userRating ? (
              <p className={styles.userRating}>Your rating: {userRating} / 5</p>
            ) : null}
          </div>
          <div className={styles.description}>
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
          <div className={styles.actions}>
            <Link
              className={styles.reviewButton}
              href={`/products/view/${product.product_id}/review`}
            >
              Write a Review
            </Link>
            {!userId ? (
              <p className={styles.loginHint}>
                <Link href="/login">Sign in</Link> to leave a rating.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </ScrollableContainer>
  );
}

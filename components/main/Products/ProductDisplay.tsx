
import Image from "next/image";
import styles from "./ProductDisplay.module.css";
import { ProductValue } from "@/app/(main)/lib/schemas/productSchema";
import { UserProfileValue } from "@/app/(main)/lib/schemas/profileSchemas";
import { ProductRating, ProductRatingDisplay } from "@/app/(main)/lib/definitions";
import Link from "next/link";
import RatingStars from "../../shared/RatingStars/RatingStars";
import { AllReviewsDisplay } from "./AllReviewsDisplay";

type ProductDisplayProps = {
    product: ProductValue;
    productSeller: UserProfileValue,
    averageRating?: number,
    allRatings?: ProductRatingDisplay[];
    userRating?: number;
    userId?: string;
};

export default function ProductDisplay({ product, productSeller, averageRating, allRatings, userRating, userId }: ProductDisplayProps) {
    return (
        <>
        {product ? (
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
            <div className={styles.priceQuantityRow}>
              <p className={styles.price}>${product.price}</p>
              <p className={styles.quantity}>{product.quantity} available</p>
            </div>
            <div className={styles.ratingRow}>
              <RatingStars rating={averageRating} />
              <span className={styles.ratingCount}>
                {allRatings.length} review{allRatings.length === 1 ? "" : "s"}
              </span>
            </div>
            {userRating ? (
              <p className={styles.userRating}>Your rating: {userRating} / 5</p>
            ) : null}
          </div>
          <div className={styles.description}>
            <h2>Description</h2>
            <p>{product.description}</p>
            <p className={styles.link}>Seller: <a href={`/artisans/${productSeller.user_id}`}>{productSeller.name}</a></p>
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
        <div className={styles.wrapper}>
        <AllReviewsDisplay allRatings={allRatings} />
      </div>
      </div>



          // <div className={styles.productDetails}>
          //   {product.image_url && <Image src={product.image_url ?? "/products/default.png"} alt={product.title ?? "Product"} width={100} height={100} />}
          //   <h2>{product.title}</h2>
          //   {product.description && <p>{product.description}</p>}
          //   <p>Price: ${product.price}</p>
          //   <p>Quantity: {product.quantity}</p>
          //   <p>Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
          //   <p>Seller: <a href={`/artisans/${productSeller.user_id}`}>{productSeller.name}</a></p>
          // </div>
        ) : (
          <p>No product found.</p>
        )}        
        </>
    )
}
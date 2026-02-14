import { ProductRating, ProductRatingDisplay } from "@/app/(main)/lib/definitions";
import { RatingCard } from "./RatingCard";
import styles from "./ProductDisplay.module.css";

type AllReviewsDisplayProps = {
    productId: string;
    allRatings?: ProductRatingDisplay[];
};

export function AllReviewsDisplay({ productId, allRatings }: AllReviewsDisplayProps) {
    const productRatings = allRatings?.filter((rating) => rating.productId === productId) ?? [];
    console.log("All reviews for product", productId, ":", productRatings);
    return (
        <>
            <div className={styles.reviewsSection}>
                {productRatings.length > 0 ? (
                    productRatings.map((rating) => (
                        <RatingCard key={`${rating.productId}-${rating.userId}`} rating={rating} />
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </>
    );
}

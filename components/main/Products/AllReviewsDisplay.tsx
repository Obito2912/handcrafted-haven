import { ProductRating, ProductRatingDisplay } from "@/app/(main)/lib/definitions";
import { RatingCard } from "./RatingCard";
import styles from "./ProductDisplay.module.css";

type AllReviewsDisplayProps = {
    allRatings?: ProductRatingDisplay[];
};

export function AllReviewsDisplay({ allRatings }: AllReviewsDisplayProps) {
    return (
        <>
            <div className={styles.reviewsSection}>
                {allRatings && allRatings.length > 0 ? (
                    allRatings.map((rating) => (
                        <RatingCard key={`${rating.productId}-${rating.userId}`} rating={rating} />
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </>
    );
}

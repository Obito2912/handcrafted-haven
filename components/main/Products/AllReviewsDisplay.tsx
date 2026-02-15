import { ProductRating, ProductRatingDisplay } from "@/app/(main)/lib/definitions";
import { RatingCard } from "./RatingCard";
import styles from "./ProductDisplay.module.css";

type AllReviewsDisplayProps = {
    productId: string;
    allRatings?: ProductRatingDisplay[];
};

export function AllReviewsDisplay({ productId, allRatings }: AllReviewsDisplayProps) {
    const productRatings = allRatings?.filter((rating) => rating.productId === productId) ?? [];
    return (
        <>
            <section className={styles.reviewsSection} aria-label="Product Reviews">
                {productRatings.length > 0 ? (
                    <ul className={styles.reviewsList}>
                        {productRatings.map((rating) => (
                            <li key={`${rating.productId}-${rating.userId}`}>
                                <RatingCard rating={rating} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p role="status">No reviews available.</p>
                )}
            </section>
        </>
    );
}

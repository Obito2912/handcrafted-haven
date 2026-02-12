import { ProductRatingDisplay } from "@/app/(main)/lib/definitions";
import Image from "next/image";
import styles from "./ProductDisplay.module.css";
import RatingStars from "@/components/shared/RatingStars/RatingStars";
type RatingCardProps = {
    rating: ProductRatingDisplay;
};

export function RatingCard({ rating }: RatingCardProps) {
    console.log("Rendering RatingCard for rating:", rating);
    return (
        <div className={styles.rating__card}>
            <div className={styles.rating__card_user}>
                             {rating.userImageUrl && <Image
                      src={rating.userImageUrl}
                      alt={rating.userName}
                      width={128}
                      height={128}
                      className={styles.rating__card_image}
                    />}
                <p>{rating.userName}</p>                
            </div>
            <RatingStars rating={rating.rating} />
            <p>Review: {rating.review}</p>
        </div>
    );
}
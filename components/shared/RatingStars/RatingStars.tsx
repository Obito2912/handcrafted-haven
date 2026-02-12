import styles from "@/components/main/Products/ProductDisplay.module.css";

export default function RatingStars({ rating }: { rating: number | null | undefined }) {
    if(rating === null || rating === undefined)
    {
        return (<span className={styles.noRating}>No ratings yet</span>);
    }
    return (
        <span
        className={styles.ratingStars}
        aria-label={`Rated ${rating} out of 5`}
        >
      {Array.from({ length: 5 }, (_, index) => (
        <i
          key={`rating-star-${index}`}
          className={
            index < rating ? "fa-solid fa-star" : "fa-regular fa-star"
          }
        ></i>
      ))}
      {/* <span className={styles.ratingValue}>{rating}</span> */}
    </span>
  );
}
"use client";

import { useActionState, useState } from "react";
import { rateProductFromForm } from "@/app/(main)/lib/actions";
import styles from "./ProductReviewForm.module.css";

type ProductReviewFormProps = {
  productId: string;
  userId: string;
  initialRating?: number | null;
  initialReview?: string | null;
};

type ReviewFormState = {
  message: string | null;
  success: boolean;
  rating: number | null;
  review: string | null;
};

export default function ProductReviewForm({
  productId,
  userId,
  initialRating,
  initialReview,
}: ProductReviewFormProps) {
  const initialState: ReviewFormState = {
    message: null,
    success: false,
    rating: initialRating ?? null,
    review: initialReview ?? null,
  };

  const [state, formAction] = useActionState(rateProductFromForm, initialState);
  const [selectedRating, setSelectedRating] = useState<number>(
    initialRating ?? 0,
  );
  const [reviewText, setReviewText] = useState<string>(initialReview ?? "");

  return (
    <form className={styles.form} action={formAction} aria-label="Product Review Form">
      <input type="hidden" name="product_id" value={productId} />
      <input type="hidden" name="user_id" value={userId} />
      <input type="hidden" name="rating" value={selectedRating} />

      <div className={styles.label}>
        Rating
      </div>

      <div
        className={styles.stars}
        role="radiogroup"
        aria-label="Select a rating from 1 to 5 stars"
      >
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const isActive = starValue <= selectedRating;
          return (
            <button
              key={`review-star-${starValue}`}
              type="button"
              role="radio"
              className={isActive ? styles.starActive : styles.star}
              aria-checked={isActive}
              onClick={() => setSelectedRating(starValue)}
              aria-label={`Rate ${starValue} star${starValue === 1 ? "" : "s"}`}
            >
              <i
                className={isActive ? "fa-solid fa-star" : "fa-regular fa-star"}
                aria-hidden="true"
              ></i>
            </button>
          );
        })}
      </div>
      <label className={styles.label} htmlFor="review">
        Review (optional)
      </label>
      <textarea
        className={`${styles.textarea}`}
        id="review"
        name="review"
        rows={3}
        value={reviewText}
        aria-describedby="review-help"
        onChange={(e) => setReviewText(e.target.value)}
        aria-label="Write your review"
        placeholder="Share your experience with this product"
      />
      <button className={styles.submit} type="submit" aria-label="Submit your review" disabled={selectedRating === 0} aria-disabled={selectedRating === 0}>
        Save Review
      </button>

      {state.message ? (
        <p className={state.success ? styles.success : styles.error} role="alert" aria-live="polite">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
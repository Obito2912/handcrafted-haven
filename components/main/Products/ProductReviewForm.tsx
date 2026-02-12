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
    <form className={styles.form} action={formAction}>
      <input type="hidden" name="product_id" value={productId} />
      <input type="hidden" name="user_id" value={userId} />
      <input type="hidden" name="rating" value={selectedRating} />

      <div className={styles.label}>
        Rating
      </div>

      <div
        className={styles.stars}
        role="radiogroup"
        aria-label="Choose rating"
      >
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const isActive = starValue <= selectedRating;
          return (
            <button
              key={`review-star-${starValue}`}
              type="button"
              className={isActive ? styles.starActive : styles.star}
              aria-pressed={isActive}
              onClick={() => setSelectedRating(starValue)}
            >
              <i
                className={isActive ? "fa-solid fa-star" : "fa-regular fa-star"}
              ></i>
            </button>
          );
        })}
      </div>
      <div className={styles.label}>
        Review
      </div>
      <textarea 
        className={`${styles.textarea}`} 
        id="review" 
        name="review" 
        rows={3} 
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <button className={styles.submit} type="submit">
        Save Review
      </button>

      {state.message ? (
        <p className={state.success ? styles.success : styles.error}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
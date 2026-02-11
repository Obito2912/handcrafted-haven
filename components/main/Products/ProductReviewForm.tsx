"use client";

import { useActionState, useEffect, useState } from "react";
import { rateProductFromForm } from "@/app/(main)/lib/actions";
import styles from "./ProductReviewForm.module.css";

type ProductReviewFormProps = {
  productId: string;
  userId: string;
  initialRating?: number | null;
};

type ReviewFormState = {
  message: string | null;
  success: boolean;
  rating: number | null;
};

export default function ProductReviewForm({
  productId,
  userId,
  initialRating,
}: ProductReviewFormProps) {
  const initialState: ReviewFormState = {
    message: null,
    success: false,
    rating: initialRating ?? null,
  };

  // Server action stores the rating using the logged-in user from session.
  const [state, formAction] = useActionState(rateProductFromForm, initialState);
  const [selectedRating, setSelectedRating] = useState<number>(
    initialRating ?? 0,
  );

  // Keep the star UI in sync after a successful submit.
  useEffect(() => {
    if (state.rating !== null) {
      setSelectedRating(state.rating);
    }
  }, [state.rating]);

  return (
    <form className={styles.form} action={formAction}>
      <input type="hidden" name="product_id" value={productId} />
      <input type="hidden" name="user_id" value={userId} />

      <label className={styles.label} htmlFor="rating">
        Rating
        <select
          id="rating"
          name="rating"
          className={styles.select}
          value={selectedRating}
          onChange={(event) => setSelectedRating(Number(event.target.value))}
        >
          <option value={0} disabled>
            Select a rating
          </option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

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

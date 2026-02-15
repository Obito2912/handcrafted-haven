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

  /**
   * Custom validation handler for rating selection
   * Why: Star rating is not a standard HTML input, so we need custom validation
   * How: Checks if rating is 0 (not selected) and prevents form submission
   * Shows alert to guide user to select a rating before proceeding
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (selectedRating === 0) {
      e.preventDefault();
      alert("Please select a rating before submitting");
      return;
    }
  };

  return (
    <form className={styles.form} action={formAction} onSubmit={handleSubmit}>
      {/* Hidden inputs send data to server - not visible to user */}
      <input type="hidden" name="product_id" value={productId} />
      <input type="hidden" name="user_id" value={userId} />
      {/* selectedRating state is passed to server via hidden input */}
      <input type="hidden" name="rating" value={selectedRating} />

      <div className={styles.label}>
        {/* Red asterisk indicates required field */}
        Rating <span style={{ color: "#ef4444" }}>*</span>
      </div>

      {/* 
        Custom star rating component:
        - role="radiogroup" for accessibility (ARIA)
        - aria-required="true" tells screen readers this is required
        - Manages state with selectedRating to track user's choice
      */}
      <div
        className={styles.stars}
        role="radiogroup"
        aria-label="Choose rating"
        aria-required="true"
      >
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const isActive = starValue <= selectedRating;
          return (
            <button
              key={`review-star-${starValue}`}
              // type="button" prevents form submission on star click
              type="button"
              className={isActive ? styles.starActive : styles.star}
              // aria-pressed for accessibility: indicates if star is selected
              aria-pressed={isActive}
              // onClick updates state, triggers re-render with new active stars
              onClick={() => setSelectedRating(starValue)}
              // Helpful tooltip on hover
              title={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
            >
              <i
                // FontAwesome icons: solid (filled) when active, regular (outline) when not
                className={isActive ? "fa-solid fa-star" : "fa-regular fa-star"}
              ></i>
            </button>
          );
        })}
      </div>
      <div className={styles.label}>Review</div>
      <textarea
        className={`${styles.textarea}`}
        id="review"
        name="review"
        rows={3}
        // Controlled component: value tied to state, onChange updates state
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        // maxLength prevents excessive review length (1000 chars)
        maxLength={1000}
        title="Review can be up to 1000 characters"
        // placeholder provides helpful hint text when field is empty
        placeholder="Share your thoughts about this product..."
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

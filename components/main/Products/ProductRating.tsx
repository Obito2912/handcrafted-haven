'use client';

import { useState, useTransition } from 'react';
import type { MouseEvent } from 'react';
import { rateProduct } from '@/app/(main)/lib/actions';

type ProductRatingProps = {
  productId: string;
  initialRating?: number | null;
};

export default function ProductRating({
  productId,
  initialRating,
}: ProductRatingProps) {
  const [currentRating, setCurrentRating] = useState<number | null>(
    initialRating ?? null,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const hasRating = currentRating !== null && currentRating !== undefined;
  const roundedRating = hasRating ? Math.round(currentRating) : 0;
  const ratingLabel = hasRating ? currentRating : 'No ratings';

  const handleRate = (value: number, event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const previousRating = currentRating;
    setCurrentRating(value);

    startTransition(async () => {
      const result = await rateProduct({ productId, rating: value });
      setMessage(result.message);
      if (!result.success) {
        setCurrentRating(previousRating ?? null);
      }
    });
  };

  return (
    <div
      className="card__icon-container"
      aria-label={
        hasRating ? `Rated ${ratingLabel} out of 5` : 'No ratings yet'
      }
    >
      <span className="rating-stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const isActive = index < roundedRating;
          return (
            <button
              key={starValue}
              type="button"
              className="rating-button"
              onClick={(event) => handleRate(starValue, event)}
              disabled={isPending}
              aria-label={`Rate ${starValue} star${starValue === 1 ? '' : 's'}`}
              aria-pressed={currentRating === starValue}
            >
              <i
                className={isActive ? 'fa-solid fa-star' : 'fa-regular fa-star'}
                aria-hidden="true"
              ></i>
            </button>
          );
        })}
      </span>
      <span className="rating-value" aria-live="polite">{ratingLabel}</span>
      {message ? <span className="rating-message" aria-live="polite" role="status">{message}</span> : null}
    </div>
  );
}

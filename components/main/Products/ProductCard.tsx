import { Product } from "@/app/(main)/lib/definitions";
import Image from "next/image";
import "./ProductCard.css";

type ProductCardProps = Product & {
  averageRating?: number | null;
};

function renderStarRating(averageRating: number | null | undefined) {
  if (averageRating === null || averageRating === undefined) {
    return (
      <span className="card__rating-value" aria-label="No ratings yet">
        No ratings
      </span>
    );
  }

  const rounded = Math.round(averageRating);
  return (
    <span
      className="card__rating-stars"
      aria-label={`Rated ${averageRating.toFixed(1)} out of 5`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <i
          key={`star-${index}`}
          className={
            index < rounded ? "fa-solid fa-star" : "fa-regular fa-star"
          }
        ></i>
      ))}
      <span className="card__rating-value">{averageRating.toFixed(1)}</span>
    </span>
  );
}

export default function ProductCard({
  averageRating,
  ...product
}: ProductCardProps) {
  return (
    <div className="card">
      <div className="card__image-container">
        <Image
          src={product.image_url}
          alt={product.title}
          width={128}
          height={128}
          className="card__image"
        />
        <button className="card__like-btn" aria-label="Add to Favorites">
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>
      <h2 className="card__title">{product.title}</h2>
      <div className="rating-stock">
        <div className="card__icon-container">
          {renderStarRating(averageRating)}
        </div>
        <span className="card__product-stock">Only X left!</span>
      </div>
      <div className="card__details">
        <p className="card__price">${product.price}</p>
        <button className="card__add-btn">
          <i className="fa-solid fa-cart-plus"></i>
          Add
        </button>
      </div>
    </div>
  );
}

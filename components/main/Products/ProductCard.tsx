import { Product } from "@/app/(main)/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import "../../shared/Card/Card.css";
import RatingStars from "@/components/shared/RatingStars/RatingStars";

type ProductCardProps = {
  product: Product,
  disableTitleLink?: boolean,
  average_rating?: number
};

export default function ProductCard({ disableTitleLink = false, product, average_rating }: ProductCardProps) {
console.log("Rendering ProductCard with product:", product.title, " and average rating: ", average_rating);
  const titleContent = <h2 className="card__title">{product.title}</h2>;
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
      {disableTitleLink ? (
        titleContent
      ) : (
        <Link href={`/products/view/${product.product_id}`}>{titleContent}</Link>
      )}
      <div className="rating-stock">
        <div className="card__icon-container">
          {<RatingStars rating={average_rating} />}
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

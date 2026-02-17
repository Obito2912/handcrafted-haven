"use client";

import { useActionState } from "react";
import { Product } from "@/app/(main)/lib/definitions";
import { toggleFavoriteAction } from "@/app/(main)/lib/actions";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import "./ProductCard.css";
import RatingStars from "@/components/shared/RatingStars/RatingStars";

type ProductCardProps = {
  product: Product;
  disableTitleLink?: boolean;
  average_rating?: number;
  favorite?: boolean;
  userId?: string;
};

export default function ProductCard({
  disableTitleLink = false,
  product,
  average_rating,
  favorite = false,
  userId,
}: ProductCardProps) {
  const titleContent = <h2 className="card__title">{product.title}</h2>;
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    await addToCart(product.product_id, 1);
  };
  const [state, formAction] = useActionState(toggleFavoriteAction, {
    favorite: favorite,
    message: null,
  });
  return (
    <article className="card">
      <div className="card__image-container">
        <Image
          src={product.image_url}
          alt={`${product.title} product image`}
          width={150}
          height={150}
          className="card__image"
        />
        {userId && (
          <form action={formAction}>
            <input type="hidden" name="product_id" value={product.product_id} />
            <input type="hidden" name="user_id" value={userId} />
            <button
              type="submit"
              className="card__like-btn"
              aria-label={`Add ${product.title} to Favorites`}
              aria-pressed={state.favorite}
            >
              <i
                className={`fa-${state.favorite ? "solid" : "regular"} fa-heart`}
                aria-hidden="true"
              ></i>
            </button>
          </form>
        )}
      </div>
      {disableTitleLink ? (
        titleContent
      ) : (
        <Link href={`/products/view/${product.product_id}`}>
          {titleContent}
        </Link>
      )}
      <div className="rating-stock">
        <div className="card__icon-container">
          {<RatingStars rating={average_rating} />}
        </div>
        <span
          // Product is considered low stock if quantity is less than 11
          // Change text color to red if stock is low, green otherwise
          className="card__product-stock"
          style={{ color: product.quantity < 11 ? "#ef4444" : "#22c55e" }}
        >
          {product.quantity > 11
            ? `${product.quantity} left!` // Show message product available
            : `Only ${product.quantity} left!`}{" "}
          {/* Show message low stock */}
        </span>
      </div>
      <div className="card__details">
        <p className="card__price">${product.price}</p>
        <button
          className="card__add-btn"
          onClick={handleAddToCart}
          aria-label={`Add ${product.title} to cart`}
          /* disabled={isLoading} */
        >
          <i className="fa-solid fa-cart-plus" aria-hidden="true"></i>Add to
          Cart
          {/* {isLoading ? 'Adding...' : 'Add'} */}
        </button>
      </div>
    </article>
  );
}

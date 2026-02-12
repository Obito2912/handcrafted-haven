'use client';

import { Product } from "@/app/(main)/lib/definitions";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import "../../shared/Card/Card.css";

export default function ProductCard(product: Product) {
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    await addToCart(product.product_id, 1);
  };

  return (
    <div className="card">
      <div className="card__image-container">
        <Image
          src={product.image_url}
          alt={product.title}
          width={150}
          height={150}
          className="card__image"
        />
        <button className="card__like-btn" aria-label="Add to Favorites">
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>
      <h2 className="card__title">{product.title}</h2>
      <div className="rating-stock">
        <div className="card__icon-container">
          <i className="fa-solid fa-star"></i>4.6
        </div>
        <span className="card__product-stock">Only X left!</span>
      </div>
      <div className="card__details">
        <p className="card__price">${product.price}</p>
        <button
          className="card__add-btn"
          onClick={handleAddToCart}
          /* disabled={isLoading} */ >
          <i className="fa-solid fa-cart-plus"></i>Add to Cart
          {/* {isLoading ? 'Adding...' : 'Add'} */}
        </button>
      </div>
    </div>
  );
}
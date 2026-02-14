'use client'

import { Product } from "@/app/(main)/lib/definitions"
import { useCart } from "@/app/context/CartContext"
import Image from "next/image"
import Link from "next/link"
import "./ProductCard.css"
import RatingStars from "@/components/shared/RatingStars/RatingStars"
type ProductCardProps = {
  product: Product,
  disableTitleLink?: boolean,
  average_rating?: number
}

export default function ProductCard({ disableTitleLink = false, product, average_rating }: ProductCardProps) {
  console.log("Rendering ProductCard with product:", product.title, " and average rating: ", average_rating)
  const titleContent = <h2 className="card__title">{product.title}</h2>
  const { addToCart, isLoading } = useCart()

  const handleAddToCart = async () => {
    await addToCart(product.product_id, 1)
  }

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
        <button className="card__like-btn" aria-label={`Add ${product.title} to Favorites`} aria-pressed="false"> {/* aria-pressed='false' is for indicating the initial state of the button */}
          <i className="fa-regular fa-heart" aria-hidden="true"></i>
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
        <span className="card__product-stock" role="status">Only {product.quantity} left!</span>
      </div>
      <div className="card__details">
        <p className="card__price">${product.price}</p>
        <button
          className="card__add-btn"
          onClick={handleAddToCart}
          aria-label={`Add ${product.title} to cart`}
          /* disabled={isLoading} */ >
          <i className="fa-solid fa-cart-plus" aria-hidden="true"></i>Add to Cart
          {/* {isLoading ? 'Adding...' : 'Add'} */}
        </button>
      </div>
    </article>
  )
}
"use client";

import { useCart } from "@/app/context/CartContext";
import { CartItemWithProduct } from "@/app/(main)/lib/definitions";
import Image from "next/image";
import "./CartItem.css";

export default function CartItem({ item }: { item: CartItemWithProduct }) {
  const { updateQuantity, removeFromCart, isLoading } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(item.cart_item_id);
    } else {
      updateQuantity(item.cart_item_id, newQuantity);
    }
  };

  // Convert price to number if it's a string
  const price = typeof item.product.price === "string"
    ? parseFloat(item.product.price)
    : item.product.price;

  const itemTotal = item.quantity * price;

  return (
    <article className={"cart-item"}>
      <div className="cart__item_container">
        {/* Product Image */}
        <div className={"cart__item_image-container"}>
          <Image
            src={item.product.image_url || "/placeholder-image.jpg"}
            alt={`${item.product.title} image`}
            className={"cart__item_image"}
            width={150}
            height={150}
          />
        </div>

        <div className="cart__item_content">
          {/* Product Details */}
          <div className={"cart__item_details"}>
            <h3 className={"cart__item_title"}>{item.product.title}</h3>
            <p className={"cart__item_description"}>
              {item.product.description}
            </p>
            <p className={"cart__item_price"}>
              ${price.toFixed(2)}
            </p>
          </div>
          {/* Quantity Controls */}
          <div className={"cart__item_quantity-controls"} aria-label={`Quantity controls for ${item.product.title}`} role="group">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isLoading}
              className={"cart__item_quantity-button"} aria-label={`Decrease quantity of ${item.product.title}`}>-</button>
            <span className={"cart__item_quantity"}>{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isLoading}
              className={"cart__item_quantity-button"} aria-label={`Increase quantity of ${item.product.title}`}>+</button>
          </div>
          {/* Item Total */}
          <div className={"cart__item_total"}>
            <p className={"cart__item_total-price"}>${itemTotal.toFixed(2)}</p>
            <button
              onClick={() => removeFromCart(item.cart_item_id)}
              disabled={isLoading}
              className={"cart__item_remove-button"} aria-label={`Remove ${item.product.title} from cart`}>Remove</button>
          </div>
        </div>
      </div>
    </article>
  );
}
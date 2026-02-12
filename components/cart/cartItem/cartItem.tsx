'use client';

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
  const price = typeof item.product.price === 'string'
    ? parseFloat(item.product.price)
    : item.product.price;

  const itemTotal = item.quantity * price;

  return (
    <div className={'cart-item'}>
      {/* Product Image */}
      <div className={'cart-item-image-container'}>
        <Image
          src={item.product.image_url || "/placeholder-image.jpg"}
          alt={item.product.title}
          className={'cart-item-image'}
          width={150}
          height={150}
        />
      </div>

      {/* Product Details */}
      <div className={'cart-item-details'}>
        <h3 className={'cart-item-title'}>{item.product.title}</h3>
        <p className={'cart-item-description'}>
          {item.product.description}
        </p>
        <p className={'cart-item-price'}>
          ${price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className={'cart-item-quantity-controls'}>
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={isLoading}
          className={'cart-item-quantity-button'}>-</button>
        <span className={'cart-item-quantity'}>{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isLoading}
          className={'cart-item-quantity-button'}>+</button>
      </div>

      {/* Item Total */}
      <div className={'cart-item-total'}>
        <p className={'cart-item-total-price'}>${itemTotal.toFixed(2)}</p>
        <button
          onClick={() => removeFromCart(item.cart_item_id)}
          disabled={isLoading}
          className={'cart-item-remove-button'}>Remove</button>
      </div>
    </div>
  );
}
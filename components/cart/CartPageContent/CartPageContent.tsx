"use client";

import { useCart } from "@/app/context/CartContext";
import CartItem from "../cartItem/cartItem";
import CartSummary from "../cartSummary/cartSummary";
import "./CartPageContent.css";
import Link from "next/link";

export default function CartPageContent({ userId }: { userId: string }) {
    const { items, totalItems, totalPrice, isLoading, clearCart } = useCart();

    // if (isLoading) {
    //     return (
    //         <div className=''>
    //             <div className=''>Loading cart...</div>
    //         </div>
    //     );
    // }

    if (items.length === 0) {
        return (
            <section className='cart__empty' aria-label="Empty Cart">
                <h2 className='cart__empty_title'>Your cart is empty</h2>
                <p className='cart__empty_message'>Start shopping to add items to your cart</p>
                <Link href="/" className='cart__empty_link'>Continue Shopping</Link>
            </section>
        );
    }

    return (
        <div className='cart__items_container'>
            <section aria-label="Cart Items" className='cart__items_section'>
                <ul className='cart__items'>
                    {items.map((item) => (
                        <li key={item.cart_item_id} className='cart__item'>
                            <CartItem item={item} />
                        </li>
                    ))}
                </ul>
            </section>
            {/* Clear Cart Button */}
            <button
                onClick={() => clearCart()}
                className='cart__button_clear'
                aria-label={`Clear cart with ${totalItems} items totaling $${totalPrice.toFixed(2)}`}>Clear Cart
            </button>
            {/* Cart Summary */}
            <section className='cart__summary_section' aria-label="Cart Summary">
                <CartSummary
                    totalItems={totalItems}
                    totalPrice={totalPrice} />
            </section>

        </div>
    );
}
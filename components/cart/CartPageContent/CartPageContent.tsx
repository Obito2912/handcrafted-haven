'use client';

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
            <div className='cart__empty'>
                <h2 className='cart__empty_title'>Your cart is empty</h2>
                <p className='cart__empty_message'>Start shopping to add items to your cart</p>
                <Link href="/" className='cart__empty_link'>Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className={'cart__items_container'}>
            <div className={'cart__items'}>
                {items.map((item) => (
                    <CartItem key={item.cart_item_id} item={item} />
                ))}
            </div>
            {/* Clear Cart Button */}
            <button
                onClick={() => clearCart()}
                className={'cart__button_clear'}
                    /* disabled={isLoading} */ >
                Clear Cart
            </button>
            {/* Cart Summary */}
            <div className={'cart__summary'}>
                <CartSummary
                    totalItems={totalItems}
                    totalPrice={totalPrice} />
            </div>

        </div>
    );
}
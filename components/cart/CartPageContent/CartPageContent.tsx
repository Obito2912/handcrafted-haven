'use client';

import { useCart } from "@/app/context/CartContext";
import CartItem from "../cartItem/cartItem";
import CartSummary from "../cartSummary/cartSummary";
import "./CartPageContent.css";

export default function CartPageContent({ userId }: { userId: string }) {
    const { items, totalItems, totalPrice, isLoading, clearCart } = useCart();

    // if (isLoading) {
    //     return (
    //         <div className={''}>
    //             <div className={''}>Loading cart...</div>
    //         </div>
    //     );
    // }

    if (items.length === 0) {
        return (
            <div className={''}>
                <h2 className={''}>Your cart is empty</h2>
                <p className={''}>Start shopping to add items to your cart</p>
                <a href="/products" className={''}>Continue Shopping</a>
            </div>
        );
    }

    return (
        <div className={'cart-items-container'}>
            <div className={'cart-items'}>
                {items.map((item) => (
                    <CartItem key={item.cart_item_id} item={item} />
                ))}
            </div>
            {/* Clear Cart Button */}
            <button
                onClick={() => clearCart()}
                className={'clear-cart-button'}
                    /* disabled={isLoading} */ >
                Clear Cart
            </button>
            {/* Cart Summary */}
            <div className={'cart-summary'}>
                <CartSummary
                    totalItems={totalItems}
                    totalPrice={totalPrice} />
            </div>

        </div>
    );
}
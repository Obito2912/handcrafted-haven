'use server';

import { revalidatePath } from 'next/cache';
import {
    fetchCartItems,
    addToCart as dbAddToCart,
    removeFromCart as dbRemoveFromCart,
    updateCartItemQuantity as dbUpdateCartItemQuantity,
    clearCart as dbClearCart
} from '../(main)/lib/data';

/**
 * Server action to add item to cart
 */
export async function addToCartAction(userId: string, productId: string, quantity: number = 1) {
    try {
        await dbAddToCart(userId, productId, quantity);
        revalidatePath('/cart'); // Refresh cart page
        return { success: true };
    } catch (error) {
        console.error('Error in addToCartAction:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to add item to cart'
        };
    }
}

/**
 * Server action to remove item from cart
 */
export async function removeFromCartAction(cartItemId: string) {
    try {
        await dbRemoveFromCart(cartItemId);
        revalidatePath('/cart');
        return { success: true };
    } catch (error) {
        console.error('Error in removeFromCartAction:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to remove item from cart'
        };
    }
}

/**
 * Server action to update cart item quantity
 */
export async function updateCartQuantityAction(cartItemId: string, quantity: number) {
    try {
        await dbUpdateCartItemQuantity(cartItemId, quantity);
        revalidatePath('/cart');
        return { success: true };
    } catch (error) {
        console.error('Error in updateCartQuantityAction:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update cart quantity'
        };
    }
}

/**
 * Server action to clear entire cart
 */
export async function clearCartAction(userId: string) {
    try {
        await dbClearCart(userId);
        revalidatePath('/cart');
        return { success: true };
    } catch (error) {
        console.error('Error in clearCartAction:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to clear cart'
        };
    }
}

/**
 * Server action to fetch cart items
 */
export async function fetchCartItemsAction(userId: string) {
    try {
        const cartItems = await fetchCartItems(userId);
        return { success: true, data: cartItems };
    } catch (error) {
        console.error('Error in fetchCartItemsAction:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch cart items',
            data: []
        };
    }
}
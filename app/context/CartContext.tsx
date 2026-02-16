'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItemWithProduct } from '../(main)/lib/definitions';
import {
    addToCartAction,
    removeFromCartAction,
    updateCartQuantityAction,
    clearCartAction,
    fetchCartItemsAction
} from '../actions/cartActions';
import { redirect } from "next/navigation";

type CartContextType = {
    items: CartItemWithProduct[];
    totalItems: number;
    totalPrice: number;
    isLoading: boolean;
    addToCart: (productId: string, quantity?: number) => Promise<void>;
    removeFromCart: (cartItemId: string) => Promise<void>;
    updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    loadCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
    children,
    userId
}: {
    children: React.ReactNode;
    userId?: string;
}) {
    const [items, setItems] = useState<CartItemWithProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Calculate totals
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => {
        const price = typeof item.product.price === 'string'
            ? parseFloat(item.product.price)
            : item.product.price;
        return sum + (item.quantity * price);
    }, 0);

    const addToCart = async (productId: string, quantity = 1) => {
        if (!userId) 
        {
            redirect('/login');
        }

        setIsLoading(true);
        try {
            const result = await addToCartAction(userId, productId, quantity);
            if (result.success) {
                await loadCart(); // Refresh cart after adding
            } else {
                console.error('Failed to add to cart:', result.error);
            }
        } catch (error) {
            console.error('Failed to add to cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromCart = async (cartItemId: string) => {
        setIsLoading(true);
        try {
            const result = await removeFromCartAction(cartItemId);
            if (result.success) {
                await loadCart(); // Refresh cart after removing
            } else {
                console.error('Failed to remove from cart:', result.error);
            }
        } catch (error) {
            console.error('Failed to remove from cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = async (cartItemId: string, quantity: number) => {
        setIsLoading(true);
        try {
            const result = await updateCartQuantityAction(cartItemId, quantity);
            if (result.success) {
                await loadCart(); // Refresh cart after updating
            } else {
                console.error('Failed to update quantity:', result.error);
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const clearCart = async () => {
        if (!userId) return;

        setIsLoading(true);
        try {
            const result = await clearCartAction(userId);
            if (result.success) {
                setItems([]); // Clear items immediately
            } else {
                console.error('Failed to clear cart:', result.error);
            }
        } catch (error) {
            console.error('Failed to clear cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadCart = useCallback(async () => {
        if (!userId) return;

        setIsLoading(true);
        try {
            const result = await fetchCartItemsAction(userId);
            if (result.success) {
                setItems(result.data);
            } else {
                console.error('Failed to load cart:', result.error);
            }
        } catch (error) {
            console.error('Failed to load cart:', error);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    // Load cart when component mounts or userId changes
    useEffect(() => {
        if (userId) {
            loadCart();
        }
    }, [userId, loadCart]);

    return (
        <CartContext.Provider value={{
            items,
            totalItems,
            totalPrice,
            isLoading,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            loadCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
"use server";

import { revalidatePath } from "next/cache";
import {
  fetchCartItems,
  addToCart as dbAddToCart,
  removeFromCart as dbRemoveFromCart,
  updateCartItemQuantity as dbUpdateCartItemQuantity,
  clearCart as dbClearCart,
  processCheckout as dbProcessCheckout,
} from "../(main)/lib/data";

/**
 * Server action to add item to cart
 * Adds a product to the user's cart in the database
 */
export async function addToCartAction(
  userId: string,
  productId: string,
  quantity: number = 1,
) {
  try {
    await dbAddToCart(userId, productId, quantity);
    revalidatePath("/cart"); // Refresh cart page
    return { success: true };
  } catch (error) {
    console.error("Error in addToCartAction:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to add item to cart",
    };
  }
}

/**
 * Server action to remove item from cart
 * Removes a specific item from the user's cart
 */
export async function removeFromCartAction(cartItemId: string) {
  try {
    await dbRemoveFromCart(cartItemId);
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error in removeFromCartAction:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to remove item from cart",
    };
  }
}

/**
 * Server action to update cart item quantity
 * Updates the quantity of a product in the cart
 */
export async function updateCartQuantityAction(
  cartItemId: string,
  quantity: number,
) {
  try {
    await dbUpdateCartItemQuantity(cartItemId, quantity);
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error in updateCartQuantityAction:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update cart quantity",
    };
  }
}

/**
 * Server action to clear entire cart
 * Empties the cart completely without processing checkout
 */
export async function clearCartAction(userId: string) {
  try {
    await dbClearCart(userId);
    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error in clearCartAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to clear cart",
    };
  }
}

/**
 * Server action to fetch cart items
 * Retrieves all cart items with product details
 */
export async function fetchCartItemsAction(userId: string) {
  try {
    const cartItems = await fetchCartItems(userId);
    return { success: true, data: cartItems };
  } catch (error) {
    console.error("Error in fetchCartItemsAction:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch cart items",
      data: [],
    };
  }
}

/**
 * Server action to process checkout
 * This action processes the complete purchase:
 * 1. Validates there is sufficient inventory for all products
 * 2. Reduces the inventory of each product in the cart
 * 3. Empties the user's cart after a successful purchase
 * 4. Revalidates affected pages to show changes immediately
 * @param userId - ID of the user performing checkout
 * @returns Object with success, message and optionally error
 */
export async function checkoutCartAction(userId: string) {
  try {
    // Process checkout using the database function
    const result = await dbProcessCheckout(userId);

    // If checkout was successful, revalidate related pages
    // This ensures the user sees changes immediately
    if (result.success) {
      revalidatePath("/cart"); // Cart page (now empty)
      revalidatePath("/products"); // Products page (updated inventory)
      revalidatePath("/"); // Main page (updated inventory)
    }

    return result;
  } catch (error) {
    console.error("Error in checkoutCartAction:", error);
    return {
      success: false,
      message: "Checkout failed",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

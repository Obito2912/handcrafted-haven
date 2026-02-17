"use client";
import "./CartSummary.css";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * CartSummary Component
 * Displays order summary with total items and price
 * Includes checkout button that processes purchase and reduces inventory
 */
export default function CartSummary({
  totalItems,
  totalPrice,
}: {
  totalItems: number;
  totalPrice: number;
}) {
  const { checkout } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  /**
   * Handle the checkout process
   * 1. Calls the checkout function from context
   * 2. Validates available inventory
   * 3. Reduces product inventory
   * 4. Empties cart if successful
   * 5. Displays success or error messages
   */
  const handleCheckout = async () => {
    // Prevent multiple clicks while processing
    if (isProcessing) return;

    setIsProcessing(true);
    setMessage(null);

    try {
      // Call the checkout function that reduces inventory
      const result = await checkout();

      if (result.success) {
        // Successful checkout - show success message
        setMessage({
          text: `Purchase successful! ${result.message}`,
          type: "success",
        });
        // Redirect to main page after 3 seconds so user can see the message
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        // Show error if checkout fails
        setMessage({
          text: result.error || result.message,
          type: "error",
        });
      }
    } catch (err) {
      // Handle unexpected errors
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setMessage({
        text: `Unexpected error: ${errorMessage}`,
        type: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <aside className="summary" aria-label="order summary">
      <h2 className="summary__title">Order Summary</h2>

      <dl className="summary__details">
        <div className="summary__row">
          <dt className="summary__label">Items ({totalItems}):</dt>
          <dd className="summary__value">${totalPrice.toFixed(2)}</dd>
        </div>

        <div className="summary__row">
          <dt className="summary__label">Shipping:</dt>
          <dd className="summary__value">Free</dd>
        </div>

        <div className="summary__divider" role="separator" aria-hidden="true">
          <hr />
        </div>

        <div className="summary__row summary__total">
          <dt className="summary__label">Total:</dt>
          <dd className="summary__value">${totalPrice.toFixed(2)}</dd>
        </div>
      </dl>

      {/* Checkout button that processes purchase and reduces inventory */}
      <button
        className="summary__checkout_button"
        onClick={handleCheckout}
        disabled={isProcessing || totalItems === 0}
        aria-busy={isProcessing}
      >
        {isProcessing ? "Processing..." : "Proceed to Checkout"}
      </button>

      {/* Success or error message below button */}
      {message && (
        <div
          className={`summary__message summary__message--${message.type}`}
          role="alert"
        >
          {message.text}
        </div>
      )}
    </aside>
  );
}

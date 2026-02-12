'use client';

export default function CartSummary({
  totalItems,
  totalPrice
}: {
  totalItems: number;
  totalPrice: number;
}) {
  return (
    <div className={'order-summary'}>
      <h2 className={''}>Order Summary</h2>

      <div className={''}>
        <div className={''}>
          <span>Items ({totalItems}):</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <div className={''}>
          <span>Shipping: </span>
          <span>Free</span>
        </div>

        <hr className={''} />

        <div className={''}>
          <span>Total: </span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <button className={''}>
        Proceed to Checkout
      </button>
    </div>
  );
}
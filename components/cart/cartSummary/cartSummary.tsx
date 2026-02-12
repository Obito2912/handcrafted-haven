'use client';
import "./CartSummary.css";


export default function CartSummary({
  totalItems,
  totalPrice
}: {
  totalItems: number;
  totalPrice: number;
}) {
  return (
    <div className='summary'>
      <h2 className='summary__title'>Order Summary</h2>

      <div className=''>
        <div className=''>
          <span className="strong">Items ({totalItems}): </span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <div className=''>
          <span className="strong">Shipping: </span>
          <span>Free</span>
        </div>

        <br />
        <hr className='' />
        <br />

        <div className=''>
          <span className="strong">Total: </span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <button className='summary__checkout_button'>
        Proceed to Checkout
      </button>
    </div>
  );
}
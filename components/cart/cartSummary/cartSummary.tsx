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
    <aside className='summary' aria-label='order summary'>
      <h2 className='summary__title'>Order Summary</h2>

      <dl className='summary__details'>
        <div className='summary__row'>
          <dt className="summary__label">Items: </dt>
          <dd className="summary__value">{totalItems}</dd>
        </div>
        <div className='summary__row'>
          <dt className="summary__label">Subtotal: </dt>
          <dd className="summary__value">${totalPrice.toFixed(2)}</dd>
        </div>
        <div className='summary__row'>
          <dt className="summary__label">Shipping: </dt>
          <dd className="summary__value">Free</dd>
        </div>

        <div className='summary__divider' role="separator" aria-hidden="true">
          <hr />
        </div>

        <div className='summary__row summary__total'>
          <dt className="summary__label">Total: </dt>
          <dd className="summary__value">${totalPrice.toFixed(2)}</dd>
        </div>
      </dl>

      <button className='summary__checkout_button'>
        Proceed to Checkout
      </button>
    </aside>
  );
}
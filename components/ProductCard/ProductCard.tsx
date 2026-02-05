import { fetchProductData } from "@/app/(main)/lib/data";
import { Product } from "@/app/(main)/lib/definitions";
import Image from "next/image";
import "./ProductCard.css";

type ProductCardWrapperProps = {
  products?: Product[];
};

export default async function ProductCardWrapper({
  products,
}: ProductCardWrapperProps = {}) {
  //TODO Add Paging and Filtering
  const productData = products ?? (await fetchProductData()).productData;
  return (
    <div className="product-card__wrapper">
      {productData.map((product) => (
        <ProductCard key={product.product_id} {...product} />
      ))}
    </div>
  );
}

export function ProductCard(product: Product) {
  return (
    <div className="card">
      <div className="card__image-container">
        <Image
          src={product.image_url}
          alt={product.title}
          width={128}
          height={128}
          className="card__image"
        />
        <button className="card__like-btn" aria-label="Add to Favorites">
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>
      <h2 className="card__title">{product.title}</h2>
      <div className="rating-stock">
        <div className="card__icon-container">
          <i className="fa-solid fa-star"></i>4.6
        </div>
        <span className="card__product-stock">Only X left!</span>
      </div>
      <div className="card__details">
        <p className="card__price">${product.price}</p>
        <button className="card__add-btn">
          <i className="fa-solid fa-cart-plus"></i>
          Add
        </button>
      </div>
    </div>
  );
}

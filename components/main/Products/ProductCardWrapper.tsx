import { fetchProductData } from "@/app/(main)/lib/data";
import { Product, ProductAverageRating } from "@/app/(main)/lib/definitions";
import ProductCard from "./ProductCard";
import '../../main/Products/ProductCard.css';
import Link from "next/link";

type ProductCardWrapperProps = {
  products?: Product[];
  productRatings?: ProductAverageRating[];
};

export default async function ProductCardWrapper({
  products,
  productRatings,
}: ProductCardWrapperProps = {}) {
  //TODO Add Paging and Filtering
  if (!products) {
    const { productData, ratingRows } = await fetchProductData();
    products = productData;
    productRatings = ratingRows;
  }
  return (
    <section>
      <ul className="card__wrapper">
        {products.map((product) => {
          const rating = productRatings?.find((r) => r.product_id === product.product_id);
          return (
            <li key={product.product_id} className="product__card_item">
              {/* <Link href={`/products/${product.product_id}`}></Link> */}
              <ProductCard product={product} average_rating={rating?.average_rating} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

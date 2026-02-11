import { fetchProductData } from "@/app/(main)/lib/data";
import { Product, RatingsByProduct } from "@/app/(main)/lib/definitions";
import ProductCard from "./ProductCard";
import Link from "next/link";

type ProductCardWrapperProps = {
  products?: Product[];
  ratingsByProduct?: RatingsByProduct;
};

export default async function ProductCardWrapper({
  products,
  ratingsByProduct,
}: ProductCardWrapperProps = {}) {
  //TODO Add Paging and Filtering
  // Use provided lists when filtering, otherwise fetch full catalog + ratings.
  const data = products ? null : await fetchProductData();
  const productData = products ?? data?.productData ?? [];
  const ratingLookup = ratingsByProduct ?? data?.ratingsByProduct ?? {};
  return (
    <div className="product-card__wrapper">
      {productData.map((product) => (
        <Link
          key={product.product_id}
          href={`/products/view/${product.product_id}`}
        >
          <ProductCard
            {...product}
            averageRating={ratingLookup[product.product_id]}
          />
        </Link>
      ))}
    </div>
  );
}

import { fetchProductData } from "@/app/(main)/lib/data";
import { Product, ProductAverageRating } from "@/app/(main)/lib/definitions";
import ProductCard from "./ProductCard";
import Link from 'next/link';

type EditableProductCardWrapperProps = {
  products?: Product[];
  productRatings?: ProductAverageRating[];
};

export default async function EditableProductCardWrapper({
  products,
  productRatings,
}: EditableProductCardWrapperProps = {}) {
  //TODO Add Paging and Filtering
  console.log("EditableProductCardWrapper received products:", products);
  console.log("EditableProductCardWrapper received productRatings:", productRatings);
  if (!products) {
    const { productData, ratingRows } = await fetchProductData();
    products = productData;
    productRatings = ratingRows;
  }
  return (
    <div className="card__wrapper editable-card__wrapper">
      {products.map((product) => {
        const rating = productRatings?.find((r) => r.product_id === product.product_id);
        console.log("Found rating for product:", product.product_id, rating);
        return (
          <Link key={product.product_id} href={`/products/edit/${product.product_id}`}>
            <ProductCard disableTitleLink product={product} average_rating={rating?.average_rating} />
          </Link>
        )
    })}
    </div>
  );
}

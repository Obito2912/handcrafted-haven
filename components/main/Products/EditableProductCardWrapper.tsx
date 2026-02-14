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

  console.log("EditableProductCardWrapper received products:", products);
  console.log("EditableProductCardWrapper received productRatings:", productRatings);

  if (!products) {
    const { productData, ratingRows } = await fetchProductData();
    products = productData;
    productRatings = ratingRows;
  }

  return (
    <section className="card__wrapper editable-card__wrapper" aria-label="Your Products">
      <ul className='card__wrapper__list'>
        {products.map((product) => {
          const rating = productRatings?.find((r) => r.product_id === product.product_id);
          console.log("Found rating for product:", product.product_id, rating);
          return (
            <li key={product.product_id}>
              <Link href={`/products/edit/${product.product_id}`} aria-label={`Edit ${product.title || 'product'}`}>
                <ProductCard disableTitleLink product={product} average_rating={rating?.average_rating} />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  );
}

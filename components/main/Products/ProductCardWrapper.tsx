import { fetchProductData } from "@/app/(main)/lib/data";
import { Product, ProductAverageRating } from "@/app/(main)/lib/definitions";
import ProductCard from "./ProductCard";

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
    <div className="card__wrapper">
      {products.map((product) => {
        const rating = productRatings?.find((r) => r.product_id === product.product_id);    
        return <ProductCard key={product.product_id} product={product} average_rating={rating?.average_rating} />;
      })}
    </div>
  );
}

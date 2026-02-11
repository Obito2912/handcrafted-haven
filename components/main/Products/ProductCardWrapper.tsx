import { fetchProductData } from "@/app/(main)/lib/data";
import { Product } from "@/app/(main)/lib/definitions";
import ProductCard from "./ProductCard";

type ProductCardWrapperProps = {
  products?: Product[];
};

export default async function ProductCardWrapper({
  products,
}: ProductCardWrapperProps = {}) {
  //TODO Add Paging and Filtering
  const productData = products ?? (await fetchProductData()).productData;
  return (
    <div className="card__wrapper">
      {productData.map((product) => (
        <ProductCard key={product.product_id} {...product} />
      ))}
    </div>
  );
}

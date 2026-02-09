import { fetchProductData } from "@/app/(main)/lib/data";
import { Product } from "@/app/(main)/lib/definitions";
import ProductCard from "./ProductCard";
import Link from 'next/link';

type EditableProductCardWrapperProps = {
  products?: Product[];
};

export default async function EditableProductCardWrapper({
  products,
}: EditableProductCardWrapperProps = {}) {
  //TODO Add Paging and Filtering
  const productData = products ?? (await fetchProductData()).productData;
  return (
    <div className="product-card__wrapper editable-product-card__wrapper">
      {productData.map((product) => (
        <Link key={product.product_id} href={`/products/edit/${product.product_id}`}>
          <ProductCard {...product} />
        </Link>
      ))}
    </div>
  );
}

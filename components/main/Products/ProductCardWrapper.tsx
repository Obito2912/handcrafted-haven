import { fetchProductData } from "@/app/(main)/lib/data";
import { Product, ProductAverageRating, UserFavoriteProduct } from "@/app/(main)/lib/definitions";
import ProductCard from "./ProductCard";
import '../../main/Products/ProductCard.css';

type ProductCardWrapperProps = {
  products?: Product[];
  productRatings?: ProductAverageRating[];
  userFavoriteProducts?: UserFavoriteProduct[];
  userId?: string;
};

export default async function ProductCardWrapper({
  products,
  productRatings,
  userFavoriteProducts,
  userId,
}: ProductCardWrapperProps = {}) {
  //TODO Add Paging and Filtering
  if (!products) {
    const { productData, ratingRows, userFavorites } = await fetchProductData(userId);
    products = productData;
    productRatings = ratingRows;
    userFavoriteProducts = userFavorites;
  }
  userFavoriteProducts = userFavoriteProducts ?? [];
  
  return (
    <section>
      <ul className="card__wrapper">
        {products.map((product) => {
          const rating = productRatings?.find((r) => r.product_id === product.product_id);
          const isFavorite = userFavoriteProducts.some((fav) => fav.product_id === product.product_id);
          return (
            <li key={product.product_id} className="product__card_item">
              {/* <Link href={`/products/${product.product_id}`}></Link> */}
              <ProductCard product={product} average_rating={rating?.average_rating} favorite={isFavorite} userId={userId} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

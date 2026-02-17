import { Product, ProductAverageRating, UserFavoriteProduct } from "@/app/(main)/lib/definitions";
import styles from "./ArtisansDisplay.module.css";
import ProductCardWrapper from "../Products/ProductCardWrapper";

type ArtisansProductDisplayProps = {
    products: Product[];
    productRatings?: ProductAverageRating[];
    userFavoriteProducts?: UserFavoriteProduct[];
    userId?: string;
};

export default function ArtisansProductDisplay({
  products = [],
  productRatings = [],
  userFavoriteProducts = [],
  userId = "",
}: ArtisansProductDisplayProps) {   
    return (     
        <div className={styles.artisanProducts}>
          {products.length > 0 ? <h2>Products by this Artisan</h2> : <p>No products found.</p>}    
          <ProductCardWrapper products={products} productRatings={productRatings} userFavoriteProducts={userFavoriteProducts} userId={userId} />
        </div>
    )
}
  
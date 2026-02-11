import { Product } from "@/app/(main)/lib/definitions";
import styles from "./ArtisansDisplay.module.css";
import ProductCardWrapper from "../Products/ProductCardWrapper";

type ArtisansProductDisplayProps = {
    products: Product[];
};

export default function ArtisansProductDisplay({
  products = [],
}: ArtisansProductDisplayProps) {   
    return (     
        <div className={styles.artisanProducts}>
          {products.length > 0 ? <h2>Products by this Artisan</h2> : <p>No products found.</p>}    
          <ProductCardWrapper products={products} />
        </div>
    )
}


import Image from "next/image";
import styles from "./ProductDisplay.module.css";
import { ProductValue } from "@/app/(main)/lib/schemas/productSchema";
import { UserProfileValue } from "@/app/(main)/lib/schemas/profileSchemas";

type ProductDisplayProps = {
    product: ProductValue;
    productSeller: UserProfileValue
};

export default function ProductDisplay({ product, productSeller }: ProductDisplayProps) {
    return (
        <>
        {product ? (
          <div className={styles.productDetails}>
            {product.image_url && <Image src={product.image_url ?? "/products/default.png"} alt={product.title ?? "Product"} width={100} height={100} />}
            <h2>{product.title}</h2>
            {product.description && <p>{product.description}</p>}
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
            <p>Seller: <a href={`/artisans/${productSeller.user_id}`}>{productSeller.name}</a></p>
          </div>
        ) : (
          <p>No product found.</p>
        )}        
        </>
    )
}
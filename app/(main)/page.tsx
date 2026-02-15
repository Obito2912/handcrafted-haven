import ProductFilters from "@/components/Filters/Filter";
import ProductCardWrapper from "@/components/main/Products/ProductCardWrapper";
import { fetchProductsByFilters } from "./lib/data";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";
import styles from "./main.module.css";
import { Metadata } from "next";
import { getLoggedInInfo } from "./lib/session";

export const metadata: Metadata = {
  title: "Home",
  description: "Discover unique handmade products crafted with love at Handcrafted Haven.",
};

type SearchParams = {
  q?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  rating?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  // Await searchParams to ensure we have the query parameters before fetching products
  const resolvedSearchParams = await searchParams;
  const { userId } = await getLoggedInInfo();
  const query = resolvedSearchParams?.q?.trim() || "";
  const minPriceValue = resolvedSearchParams?.minPrice ?? "";
  const maxPriceValue = resolvedSearchParams?.maxPrice ?? "";
  const minPrice = minPriceValue === "" ? undefined : Number(minPriceValue);
  const maxPrice = maxPriceValue === "" ? undefined : Number(maxPriceValue);
  const category = resolvedSearchParams?.category?.trim() || "";
  const ratingValue = resolvedSearchParams?.rating ?? "";
  const rating = ratingValue === "" ? undefined : Number(ratingValue);
  const { productData, ratingRows, userFavorites } = await fetchProductsByFilters({
    query: query || undefined,
    minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
    category: category || undefined,    
    rating: Number.isFinite(rating) ? rating : undefined,
    }, userId);
  return (
    <div className={styles.home}>
      <ProductFilters
        query={query}
        minPrice={minPriceValue}
        maxPrice={maxPriceValue}
        category={category}
        rating={ratingValue}
      />
      <ScrollableContainer>
        <ProductCardWrapper products={productData} productRatings={ratingRows} userFavoriteProducts={userFavorites} userId={userId} />
      </ScrollableContainer>
    </div>
  );
}

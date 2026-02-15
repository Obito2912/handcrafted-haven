import ProductFilters from "@/components/Filters/Filter";
import ProductCardWrapper from "@/components/main/Products/ProductCardWrapper";
import { fetchProductsByFilters } from "./lib/data";
import ScrollableContainer from "@/components/shared/ScrollableContainer/ScrollableContainer";

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

  const query = resolvedSearchParams?.q?.trim() || "";
  const minPriceValue = resolvedSearchParams?.minPrice ?? "";
  const maxPriceValue = resolvedSearchParams?.maxPrice ?? "";
  const minPrice = minPriceValue === "" ? undefined : Number(minPriceValue);
  const maxPrice = maxPriceValue === "" ? undefined : Number(maxPriceValue);
  const category = resolvedSearchParams?.category?.trim() || "";
  const ratingValue = resolvedSearchParams?.rating ?? "";
  const rating = ratingValue === "" ? undefined : Number(ratingValue);
  const { productData, ratingRows } = await fetchProductsByFilters({
    query: query || undefined,
    minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
    category: category || undefined,
    rating: Number.isFinite(rating) ? rating : undefined,
  });
  return (
    <>
      <ScrollableContainer>
        <ProductFilters
          query={query}
          minPrice={minPriceValue}
          maxPrice={maxPriceValue}
          category={category}
          rating={ratingValue}
        />
        <ProductCardWrapper
          products={productData}
          productRatings={ratingRows}
        />
      </ScrollableContainer>
    </>
  );
}

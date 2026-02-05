import ProductFilters from "@/components/Filters/Filter";
import ProductCardWrapper from "@/components/Products/ProductCardWrapper";
import { fetchProductsByFilters } from "./lib/data";
import ScrollableContainer from "@/components/ScrollableContainer/ScrollableContainer";

type SearchParams = {
  q?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
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
  const { productData } = await fetchProductsByFilters({
    query: query || undefined,
    minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
    category: category || undefined,
  });
  return (
    <main>
      <ProductFilters
        query={query}
        minPrice={minPriceValue}
        maxPrice={maxPriceValue}
        category={category}
      />
      <ScrollableContainer>
        <ProductCardWrapper products={productData} />
      </ScrollableContainer>
    </main>
  );
}

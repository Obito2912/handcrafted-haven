import ProductFilters from "@/components/Filters/Filter";
import ProductCardWrapper from "@/components/ProductCard/ProductCard";
import { fetchProductsByFilters } from "./lib/data";

//TODO Nefi Add a filter for products
//product ratings table in ProductRating
//by product name
//by price
//by category - use the enum
//add query in lib/data.ts
//Create the filters like a form with a search button
type SearchParams = {
  q?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const query = searchParams?.q?.trim() || "";
  const minPriceValue = searchParams?.minPrice ?? "";
  const maxPriceValue = searchParams?.maxPrice ?? "";
  const minPrice = minPriceValue === "" ? undefined : Number(minPriceValue);
  const maxPrice = maxPriceValue === "" ? undefined : Number(maxPriceValue);
  const category = searchParams?.category?.trim() || "";

  const { productData } = await fetchProductsByFilters({
    query: query || undefined,
    minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
    category: category || undefined,
  });
  return (
    <main className="">
      <ProductFilters
        query={query}
        minPrice={minPriceValue}
        maxPrice={maxPriceValue}
        category={category}
      />
      <ProductCardWrapper products={productData} />
    </main>
  );
}

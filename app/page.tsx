import ProductCardWrapper from "./ui/dashboard/product-cards";

//TODO Nefi Add a filter for products
//product ratings table in ProductRating
//by product name
//by price
//by category - use the enum
//add query in lib/data.ts
//Create the filters like a form with a search button
export default function Home() {
  return (
      <main className="p-4">
        <h1 className="mb-4 text-2xl font-semibold">Your Products</h1>
        <ProductCardWrapper />
      </main>)
}



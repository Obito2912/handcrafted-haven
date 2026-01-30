import ProductCardWrapper from "./dashboard/page";

//TODO Nefi Add a filter for products
//product ratings table in ProductRating
//by product name
//by price
//by category - use the enum
//add query in lib/data.ts
//Create the filters like a form with a search button
export default function Home() {
  return (
    <main className="">
      <ProductCardWrapper />
    </main>)
}
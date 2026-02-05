import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/app/(main)/lib/definitions";
import "./Filter.css";

// search by product name, filter by price range and category
type ProductFilterProps = {
  query?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
};

export default function ProductFilters({
  query,
  minPrice,
  maxPrice,
  category,
}: ProductFilterProps) {
  return (
    <form className="product-filters" method="get">
      <div className="product-filters__row">
        <label className="product-filters__field">
          <span className="product-filters__label">Search</span>
          <input
            type="search"
            name="q"
            placeholder="Product name"
            defaultValue={query}
            className="product-filters__input"
          />
        </label>

        <label className="product-filters__field">
          <span className="product-filters__label">Category</span>
          <select
            name="category"
            defaultValue={category || ""}
            className="product-filters__select"
          >
            <option value="">All categories</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="product-filters__field">
          <span className="product-filters__label">Min price</span>
          <input
            type="number"
            name="minPrice"
            min={0}
            step="0.01"
            placeholder="0"
            defaultValue={minPrice}
            className="product-filters__input"
          />
        </label>

        <label className="product-filters__field">
          <span className="product-filters__label">Max price</span>
          <input
            type="number"
            name="maxPrice"
            min={0}
            step="0.01"
            placeholder="100"
            defaultValue={maxPrice}
            className="product-filters__input"
          />
        </label>
      </div>

      <div className="product-filters__actions">
        <button className="product-filters__submit" type="submit">
          Search
        </button>
        <Link className="product-filters__clear" href="/">
          Clear filters
        </Link>
      </div>
    </form>
  );
}

import type { CatalogOptions, Product } from "./product.types";

export function getVisibleProducts(
  products: Product[],
  { query, category, sort }: CatalogOptions,
): Product[] {
  const searchText = query.trim().toLowerCase();

  // filter() creates a new array. Sorting this result leaves Redux unchanged.
  const result = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchText);
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  switch (sort) {
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);
    case "price-desc":
      return result.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return result.sort((a, b) => b.rating.rate - a.rating.rate);
    default:
      return result;
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

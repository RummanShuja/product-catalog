import type { Product } from "./product.types";

// TypeScript cannot check JSON at runtime. This small guard checks its shape.
function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Record<string, unknown>;
  const rating = item.rating;

  return (
    typeof item.id === "number" &&
    typeof item.title === "string" &&
    typeof item.price === "number" &&
    typeof item.description === "string" &&
    typeof item.category === "string" &&
    typeof item.image === "string" &&
    typeof rating === "object" &&
    rating !== null &&
    "rate" in rating &&
    typeof rating.rate === "number" &&
    "count" in rating &&
    typeof rating.count === "number"
  );
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    throw new Error(`Could not load products (HTTP ${response.status}).`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new Error("The API returned unexpected product data.");
  }

  return data;
}

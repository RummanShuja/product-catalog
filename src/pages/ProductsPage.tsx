import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ProductCard from "../features/products/ProductCard";
import ProductControls from "../features/products/ProductControls";
import { fetchProducts } from "../features/products/productsSlice";
import { getVisibleProducts } from "../features/products/productUtils";
import type { SortOption } from "../features/products/product.types";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");

  useEffect(() => {
    if (status === "idle") void dispatch(fetchProducts());
  }, [dispatch, status]);

  // Derived values: don't keep another copy of these in state.
  const categories = [
    ...new Set(items.map((product) => product.category)),
  ].sort();
  const visibleProducts = getVisibleProducts(items, { query, category, sort });

  function clearControls() {
    setQuery("");
    setCategory("all");
    setSort("default");
  }

  return (
    <Stack gap={7}>
      <Box>
        <Text
          color="teal.700"
          fontWeight="semibold"
          fontSize="sm"
          letterSpacing="wide"
          mb={2}
        >
          THE COLLECTION
        </Text>
        <Heading as="h1" size={{ base: "2xl", md: "3xl" }} mb={3}>
          Find your everyday.
        </Heading>
        <Text color="gray.600">
          Explore the products. Take a closer look at anything you like.
        </Text>
      </Box>

      <ProductControls
        query={query}
        category={category}
        sort={sort}
        categories={categories}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        onClear={clearControls}
      />

      {(status === "idle" || status === "loading") && (
        <Box role="status" aria-label="Loading products">
          <Text color="gray.600" mb={4}>
            Loading the collection…
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={5}>
            {Array.from({ length: 8 }, (_, index) => (
              <Skeleton key={index} h="380px" rounded="xl" />
            ))}
          </SimpleGrid>
        </Box>
      )}

      {status === "failed" && (
        <Stack
          role="alert"
          align="start"
          bg="white"
          p={6}
          rounded="xl"
          borderWidth="1px"
          borderColor="red.200"
          gap={3}
        >
          <Heading as="h2" size="lg">
            Couldn't load the collection
          </Heading>
          <Text color="gray.600">{error}</Text>
          <Button
            colorPalette="teal"
            onClick={() => void dispatch(fetchProducts())}
          >
            Try again
          </Button>
        </Stack>
      )}

      {status === "succeeded" && (
        <Box>
          <Text aria-live="polite" color="gray.600" fontSize="sm" mb={4}>
            Showing {visibleProducts.length} of {items.length} products
          </Text>

          {visibleProducts.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={5}>
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SimpleGrid>
          ) : (
            <Stack
              align="center"
              textAlign="center"
              bg="white"
              borderWidth="1px"
              borderColor="gray.200"
              rounded="xl"
              py={14}
              px={5}
              gap={3}
            >
              <Heading as="h2" size="lg">
                No products found
              </Heading>
              <Text color="gray.600">
                Try a different search or clear your filters.
              </Text>
              <Button variant="outline" onClick={clearControls}>
                Clear search and filters
              </Button>
            </Stack>
          )}
        </Box>
      )}
    </Stack>
  );
}

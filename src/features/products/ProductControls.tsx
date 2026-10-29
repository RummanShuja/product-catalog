import {
  Box,
  Button,
  Field,
  Grid,
  Input,
  NativeSelect,
} from "@chakra-ui/react";
import type { SortOption } from "./product.types";

interface ProductControlsProps {
  query: string;
  category: string;
  sort: SortOption;
  categories: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  onClear: () => void;
}

export default function ProductControls({
  query,
  category,
  sort,
  categories,
  onQueryChange,
  onCategoryChange,
  onSortChange,
  onClear,
}: ProductControlsProps) {
  return (
    <Box
      bg="white"
      p={{ base: 4, md: 5 }}
      borderWidth="1px"
      borderColor="gray.200"
      rounded="xl"
    >
      <Grid
        templateColumns={{ base: "1fr", md: "2fr 1fr 1fr auto" }}
        gap={4}
        alignItems="end"
      >
        <Field.Root>
          <Field.Label htmlFor="product-search">Search products</Field.Label>
          <Input
            id="product-search"
            type="search"
            placeholder="Search by product name…"
            value={query}
            onChange={(event) => onQueryChange(event.currentTarget.value)}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label htmlFor="product-category">Category</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              id="product-category"
              value={category}
              onChange={(event) => onCategoryChange(event.currentTarget.value)}
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Field.Root>
          <Field.Label htmlFor="product-sort">Sort by</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              id="product-sort"
              value={sort}
              // These options contain only valid SortOption values.
              onChange={(event) =>
                onSortChange(event.currentTarget.value as SortOption)
              }
            >
              <option value="default">Default order</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating-desc">Highest rated</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Button variant="outline" onClick={onClear}>
          Clear
        </Button>
      </Grid>
    </Box>
  );
}

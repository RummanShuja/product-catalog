import { useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsSlice";
import { formatPrice } from "../features/products/productUtils";
import NotFoundPage from "./NotFoundPage";

export default function ProductDetailsPage() {
  // Route params arrive as strings, even when they contain a number.
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const validId = Number.isInteger(productId) && productId > 0;
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    // This also runs on a direct visit or browser refresh.
    if (validId && status === "idle") void dispatch(fetchProducts());
  }, [dispatch, status, validId]);

  if (!validId) {
    return (
      <NotFoundPage
        title="Product not found"
        message="That product address is invalid."
      />
    );
  }

  if (status === "idle" || status === "loading") {
    return (
      <Stack role="status" align="center" gap={4} py={20}>
        <Spinner color="teal.700" size="xl" />
        <Text color="gray.600">Loading product details…</Text>
      </Stack>
    );
  }

  if (status === "failed") {
    return (
      <Stack role="alert" align="start" gap={4}>
        <Heading as="h1" size="2xl">
          Couldn't load this product
        </Heading>
        <Text color="gray.600">{error}</Text>
        <Button
          colorPalette="teal"
          onClick={() => void dispatch(fetchProducts())}
        >
          Try again
        </Button>
      </Stack>
    );
  }

  const product = items.find((item) => item.id === productId);

  if (!product) {
    return (
      <NotFoundPage
        title="Product not found"
        message="This product isn't in the current collection."
      />
    );
  }

  return (
    <Stack gap={6}>
      <Box>
        <Link to="/products" className="text-link">
          ← Back to products
        </Link>
      </Box>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={{ base: 7, md: 12 }}
        bg="white"
        p={{ base: 6, md: 10 }}
        borderWidth="1px"
        borderColor="gray.200"
        rounded="2xl"
        alignItems="center"
      >
        <Box p={{ base: 3, md: 6 }}>
          <Image
            src={product.image}
            alt={product.title}
            w="full"
            h={{ base: "260px", md: "400px" }}
            objectFit="contain"
          />
        </Box>

        <Stack gap={5} align="start">
          <Badge
            colorPalette="teal"
            variant="subtle"
            textTransform="capitalize"
          >
            {product.category}
          </Badge>
          <Heading as="h1" size={{ base: "2xl", md: "3xl" }} lineHeight="1.3">
            {product.title}
          </Heading>
          <Text color="gray.600">
            ★ {product.rating.rate.toFixed(1)} / 5 · {product.rating.count}{" "}
            reviews
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color="teal.800">
            {formatPrice(product.price)}
          </Text>
          <Box borderTopWidth="1px" borderColor="gray.200" pt={5} w="full">
            <Heading as="h2" size="md" mb={3}>
              About this product
            </Heading>
            <Text color="gray.600" lineHeight="1.9">
              {product.description}
            </Text>
          </Box>
          <Button asChild colorPalette="teal" variant="outline">
            <Link to="/feedback">Share your feedback</Link>
          </Button>
        </Stack>
      </Grid>
    </Stack>
  );
}

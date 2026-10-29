import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router";
import type { Product } from "./product.types";
import { formatPrice } from "./productUtils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`} className="product-link">
      <Card.Root
        h="full"
        overflow="hidden"
        borderColor="gray.200"
        rounded="xl"
        transition="box-shadow 0.2s, transform 0.2s"
        _hover={{ shadow: "md", transform: "translateY(-3px)" }}
      >
        <Box p={6} bg="white" borderBottomWidth="1px" borderColor="gray.100">
          <Image
            src={product.image}
            alt={product.title}
            h="180px"
            w="full"
            objectFit="contain"
            loading="lazy"
          />
        </Box>
        <Card.Body p={5}>
          <Stack gap={3} h="full">
            <Badge
              colorPalette="teal"
              variant="subtle"
              alignSelf="flex-start"
              textTransform="capitalize"
            >
              {product.category}
            </Badge>
            <Heading
              as="h2"
              fontSize="md"
              lineHeight="1.5"
              lineClamp={2}
              minH="48px"
            >
              {product.title}
            </Heading>
            <Flex
              justify="space-between"
              align="center"
              gap={2}
              mt="auto"
              pt={2}
            >
              <Text fontWeight="bold" fontSize="lg">
                {formatPrice(product.price)}
              </Text>
              <Text color="gray.600" fontSize="sm">
                ★ {product.rating.rate.toFixed(1)} / 5
              </Text>
            </Flex>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}

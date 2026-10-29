import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router";

const highlights = [
  {
    number: "01",
    title: "Explore the collection",
    description:
      "Discover clothing, accessories, electronics, and everyday essentials.",
  },
  {
    number: "02",
    title: "Find your favorites",
    description:
      "Search by name, choose a category, and sort the collection your way.",
  },
  {
    number: "03",
    title: "Share a little feedback",
    description:
      "Tell us what you think and revisit your feedback whenever you like.",
  },
];

export default function HomePage() {
  return (
    <Stack gap={{ base: 8, md: 12 }}>
      <Box
        bg="teal.50"
        borderWidth="1px"
        borderColor="teal.100"
        rounded="2xl"
        px={{ base: 6, md: 12 }}
        py={{ base: 10, md: 16 }}
      >
        <Stack gap={6} maxW="720px" align="start">
          <Badge colorPalette="teal" variant="subtle" px={3} py={1}>
            THE EVERYDAY COLLECTION
          </Badge>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl" }}
            lineHeight="1.15"
            letterSpacing="tight"
          >
            Good finds.
            <br />
            Simple discoveries.
          </Heading>
          <Text
            color="gray.600"
            fontSize={{ base: "md", md: "lg" }}
            maxW="560px"
            lineHeight="1.8"
          >
            Browse the collection, take a closer look, and find something that
            feels right for your everyday.
          </Text>
          <Flex gap={3} wrap="wrap">
            <Button asChild colorPalette="teal" size="lg">
              <Link to="/products">Browse products →</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/feedback">Give feedback</Link>
            </Button>
          </Flex>
        </Stack>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
        {highlights.map((item) => (
          <Box
            key={item.number}
            bg="white"
            p={6}
            rounded="xl"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Text color="teal.700" fontWeight="bold" fontSize="sm" mb={4}>
              {item.number}
            </Text>
            <Heading as="h2" size="md" mb={3}>
              {item.title}
            </Heading>
            <Text color="gray.600" lineHeight="1.8" fontSize="sm">
              {item.description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  );
}

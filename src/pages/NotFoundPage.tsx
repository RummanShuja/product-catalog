import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router";

interface NotFoundPageProps {
  title?: string;
  message?: string;
}

export default function NotFoundPage({
  title = "Page not found",
  message = "We couldn't find the page you're looking for.",
}: NotFoundPageProps) {
  return (
    <Stack align="center" gap={4} py={16} textAlign="center">
      <Text color="teal.700" fontWeight="bold">
        NOT FOUND
      </Text>
      <Heading as="h1" size="2xl">
        {title}
      </Heading>
      <Text color="gray.600">{message}</Text>
      <Button asChild colorPalette="teal">
        <Link to="/products">Browse products</Link>
      </Button>
    </Stack>
  );
}

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router";
import { useAppSelector } from "../app/hooks";

export default function SavedFeedbackPage() {
  const { items, storageError } = useAppSelector((state) => state.feedback);
  // Copy before sorting. Redux state must not be mutated by a component.
  const feedback = [...items].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <Stack gap={6}>
      <Flex justify="space-between" align="start" gap={4} wrap="wrap">
        <Box>
          <Heading as="h1" size="3xl" mb={3}>
            Your feedback
          </Heading>
          <Text color="gray.600">
            Revisit the thoughts you've shared from this browser.
          </Text>
        </Box>
        <Button asChild colorPalette="teal">
          <Link to="/feedback">Give feedback</Link>
        </Button>
      </Flex>

      {storageError && (
        <Box
          role="alert"
          bg="orange.50"
          color="orange.900"
          borderWidth="1px"
          borderColor="orange.200"
          p={4}
          rounded="lg"
        >
          {storageError}
        </Box>
      )}

      {feedback.length === 0 ? (
        <Stack
          align="center"
          textAlign="center"
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          rounded="xl"
          py={16}
          px={5}
          gap={4}
        >
          <Heading as="h2" size="xl">
            No feedback yet
          </Heading>
          <Text color="gray.600">
            Your submitted feedback will appear here.
          </Text>
          <Button asChild variant="outline">
            <Link to="/feedback">Share your first feedback</Link>
          </Button>
        </Stack>
      ) : (
        <Stack gap={4} maxW="800px">
          <Text color="gray.600" fontSize="sm">
            {feedback.length}{" "}
            {feedback.length === 1 ? "submission" : "submissions"}
          </Text>
          {feedback.map((entry) => (
            <Box
              key={entry.id}
              bg="white"
              p={{ base: 5, md: 6 }}
              borderWidth="1px"
              borderColor="gray.200"
              rounded="xl"
            >
              <Flex justify="space-between" align="start" gap={4} mb={4}>
                <Box>
                  <Heading as="h2" size="md" overflowWrap="anywhere">
                    {entry.name}
                  </Heading>
                  <Text
                    asChild
                    display="block"
                    color="gray.600"
                    fontSize="sm"
                    mt={1}
                  >
                    <time dateTime={entry.createdAt}>
                      {new Date(entry.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </time>
                  </Text>
                </Box>
                <Badge colorPalette="teal" flexShrink={0}>
                  ★ {entry.rating} / 5
                </Badge>
              </Flex>
              <Text
                color="gray.700"
                lineHeight="1.8"
                whiteSpace="pre-wrap"
                overflowWrap="anywhere"
              >
                {entry.message}
              </Text>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

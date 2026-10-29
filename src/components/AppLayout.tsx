import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function AppLayout() {
  return (
    <Flex direction="column" minH="100vh" bg="gray.50" color="gray.900">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />

      <Box as="main" id="main-content" flex={1}>
        <Container
          maxW="1200px"
          px={{ base: 4, md: 8 }}
          py={{ base: 8, md: 12 }}
        >
          <Outlet />
        </Container>
      </Box>

      <Box as="footer" borderTopWidth="1px" borderColor="gray.200" bg="white">
        <Container maxW="1200px" px={{ base: 4, md: 8 }} py={6}>
          <Flex
            justify="space-between"
            wrap="wrap"
            gap={2}
            fontSize="sm"
            color="gray.600"
          >
            <Text fontWeight="semibold">Everyday</Text>
            <Text>A little discovery, every day.</Text>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}

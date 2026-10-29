import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { Link, NavLink } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/feedback", label: "Give feedback" },
  { to: "/feedbacks", label: "Saved feedback" },
];

export default function Navbar() {
  return (
    <Box as="header" bg="white" borderBottomWidth="1px" borderColor="gray.200">
      <Container maxW="1200px" px={{ base: 4, md: 8 }} py={4}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Link to="/" aria-label="Everyday home">
            <Flex align="center" gap={3}>
              <Flex
                bg="teal.700"
                color="white"
                w={10}
                h={10}
                rounded="xl"
                align="center"
                justify="center"
                fontWeight="bold"
                fontSize="xl"
              >
                e.
              </Flex>
              <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
                Everyday
              </Text>
            </Flex>
          </Link>

          <Flex as="nav" aria-label="Main navigation" gap={1} wrap="wrap">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Card,
  Spinner,
} from "@chakra-ui/react";
import { useAuth } from "@/provider/AuthProvider";
import { useColorModeValue } from "@/components/ui/color-mode";
import { customShades } from "@/theme/custom-color";

export const Route = createFileRoute("/_auth/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user, isLoading } = useAuth();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  if (isLoading) {
    return (
      <Box
        minH="100vh"
        bg={bgColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap={4}>
          <Spinner size="xl" color={customShades.purple[500]} />
          <Text>Loading dashboard...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="6xl">
        <VStack gap={8} align="stretch">
          {/* Header */}
          <VStack align="start" gap={1}>
            <Text fontSize="3xl" fontWeight="bold" color={useColorModeValue("gray.800", "white")}>
              Welcome back, {user?.username}!
            </Text>
            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")}>
              Tourist Attractions Dashboard
            </Text>
          </VStack>

          {/* Quick Stats */}
          <Card.Root
            bg={cardBgColor}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="xl"
            shadow="md"
          >
            <Card.Header>
              <Text fontSize="xl" fontWeight="semibold">
                Quick Navigation
              </Text>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align="stretch">
                <HStack gap={4} wrap="wrap">
                  <Box
                    p={6}
                    bg={`linear-gradient(135deg, ${customShades.purple[500]}, ${customShades.purple[600]})`}
                    color="white"
                    borderRadius="lg"
                    minW="200px"
                    textAlign="center"
                    shadow="md"
                    _hover={{
                      transform: "translateY(-2px)",
                      shadow: "lg",
                    }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <VStack gap={2}>
                      <Text fontSize="2xl">🗺️</Text>
                      <Text fontWeight="semibold">Map View</Text>
                      <Text fontSize="sm" opacity={0.9}>
                        Interactive map with attractions
                      </Text>
                    </VStack>
                  </Box>

                  <Box
                    p={6}
                    bg={`linear-gradient(135deg, ${customShades.blue[500]}, ${customShades.blue[600]})`}
                    color="white"
                    borderRadius="lg"
                    minW="200px"
                    textAlign="center"
                    shadow="md"
                    _hover={{
                      transform: "translateY(-2px)",
                      shadow: "lg",
                    }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <VStack gap={2}>
                      <Text fontSize="2xl">📊</Text>
                      <Text fontWeight="semibold">Data Tables</Text>
                      <Text fontSize="sm" opacity={0.9}>
                        View and manage data
                      </Text>
                    </VStack>
                  </Box>

                  <Box
                    p={6}
                    bg={`linear-gradient(135deg, ${customShades.green[500]}, ${customShades.green[600]})`}
                    color="white"
                    borderRadius="lg"
                    minW="200px"
                    textAlign="center"
                    shadow="md"
                    _hover={{
                      transform: "translateY(-2px)",
                      shadow: "lg",
                    }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <VStack gap={2}>
                      <Text fontSize="2xl">🚌</Text>
                      <Text fontWeight="semibold">Transportation</Text>
                      <Text fontSize="sm" opacity={0.9}>
                        Transportation analysis
                      </Text>
                    </VStack>
                  </Box>
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* User Info */}
          <Card.Root
            bg={cardBgColor}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="xl"
            shadow="md"
          >
            <Card.Header>
              <Text fontSize="xl" fontWeight="semibold">
                User Information
              </Text>
            </Card.Header>
            <Card.Body>
              <VStack gap={3} align="start">
                <HStack>
                  <Text fontWeight="semibold">User ID:</Text>
                  <Text>{user?.userId}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="semibold">Username:</Text>
                  <Text>{user?.username}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="semibold">Status:</Text>
                  <Text color="green.500" fontWeight="semibold">Authenticated</Text>
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Box>
  );
}

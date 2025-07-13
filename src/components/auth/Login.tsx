import {
  Box,
  Card,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Container,
  Link,
  Alert,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { useColorModeValue } from "@/components/ui/color-mode";
import { customShades } from "@/theme/custom-color";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await login({ username, password });
    if (!result.success) {
      setError(result.error || "Login failed");
    }
  };

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="md" w="full">
        <Card.Root
          bg={cardBgColor}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="xl"
          shadow="2xl"
          overflow="hidden"
        >
          {/* Header Section */}
          <Box
            bg={`linear-gradient(135deg, ${customShades.purple[500]}, ${customShades.purple[600]})`}
            p={8}
            textAlign="center"
            color="white"
          >
            <VStack gap={4}>
              <Box
                w="16"
                h="16"
                bg="white"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                shadow="lg"
              >
                <Text fontSize="2xl" fontWeight="bold" color={customShades.purple[600]}>
                  🗺️
                </Text>
              </Box>
              <VStack gap={1}>
                <Text fontSize="2xl" fontWeight="bold">
                  Selamat Datang
                </Text>
                <Text fontSize="md" opacity={0.9}>
                  Silakan masuk untuk melanjutkan
                </Text>
              </VStack>
            </VStack>
          </Box>

          {/* Form Section */}
          <Card.Body p={8}>
            <form onSubmit={handleSubmit}>
              <VStack gap={6} align="stretch">
                {error && (
                  <Alert.Root status="error" borderRadius="lg">
                    <Alert.Indicator />
                    <Alert.Title>Error!</Alert.Title>
                    <Alert.Description>{error}</Alert.Description>
                  </Alert.Root>
                )}

                <VStack gap={2} align="stretch">
                  <Text fontSize="sm" fontWeight="semibold" color={useColorModeValue("gray.700", "gray.200")}>
                    Username *
                  </Text>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    size="lg"
                    borderWidth="2px"
                    borderColor={inputBorderColor}
                    borderRadius="lg"
                    bg={useColorModeValue("white", "gray.700")}
                    _hover={{
                      borderColor: customShades.purple[400],
                    }}
                    _focus={{
                      borderColor: customShades.purple[500],
                      boxShadow: `0 0 0 1px ${customShades.purple[500]}`,
                    }}
                    _placeholder={{
                      color: useColorModeValue("gray.400", "gray.500"),
                    }}
                  />
                </VStack>

                <VStack gap={2} align="stretch">
                  <Text fontSize="sm" fontWeight="semibold" color={useColorModeValue("gray.700", "gray.200")}>
                    Password *
                  </Text>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    size="lg"
                    borderWidth="2px"
                    borderColor={inputBorderColor}
                    borderRadius="lg"
                    bg={useColorModeValue("white", "gray.700")}
                    _hover={{
                      borderColor: customShades.purple[400],
                    }}
                    _focus={{
                      borderColor: customShades.purple[500],
                      boxShadow: `0 0 0 1px ${customShades.purple[500]}`,
                    }}
                    _placeholder={{
                      color: useColorModeValue("gray.400", "gray.500"),
                    }}
                  />
                </VStack>

                <Button
                  type="submit"
                  size="lg"
                  bg={`linear-gradient(135deg, ${customShades.purple[500]}, ${customShades.purple[600]})`}
                  color="white"
                  borderRadius="lg"
                  _hover={{
                    bg: `linear-gradient(135deg, ${customShades.purple[600]}, ${customShades.purple[700]})`,
                    transform: "translateY(-1px)",
                    shadow: "lg",
                  }}
                  _active={{
                    transform: "translateY(0)",
                  }}
                  transition="all 0.2s"
                  disabled={isLoading}
                  fontWeight="semibold"
                  py={6}
                >
                  {isLoading ? (
                    <HStack>
                      <Spinner size="sm" />
                      <Text>Signing In...</Text>
                    </HStack>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </VStack>
            </form>
          </Card.Body>

          {/* Footer */}
          <Box
            p={6}
            borderTopWidth="1px"
            borderColor={borderColor}
            textAlign="center"
            bg={useColorModeValue("gray.50", "gray.750")}
          >
          </Box>
        </Card.Root>
      </Container>
    </Box>
  );
};

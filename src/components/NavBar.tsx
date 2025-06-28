import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  IconButton,
  Stack,
  useDisclosure,
  HStack,
  Drawer,
  Popover,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { ColorModeButton } from "./ui/theme-toggle";
import { Icon } from "@iconify/react";
import { customColors, customGradients } from "../theme/custom-color";
import { Link as Route, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/provider/AuthProvider";

export default function NavBar() {
  const router = useRouter();
  const { open, onOpen, onClose } = useDisclosure();
  const { user, logout, isAuthenticated } = useAuth();

  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(23, 23, 23, 0.9)"
  );
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Apple-inspired colors and gradients
  const gradientBg = useColorModeValue(
    customGradients.blueToTeal,
    customGradients.purpleToBlue
  );
  const logoGradient = useColorModeValue(
    customGradients.orangeToPink,
    customGradients.pinkToPurple
  );
  const buttonBg = useColorModeValue(
    customGradients.blueToTeal,
    customGradients.purpleToBlue
  );

  return (
    <Box
      as="nav"
      bg={bgColor}
      backdropFilter="blur(10px)"
      position="fixed"
      width="full"
      zIndex="10"
      borderBottom="1px"
      borderBottomColor={borderColor}
    >
      <Flex
        h="64px"
        alignItems="center"
        justifyContent="space-between"
        mx="auto"
        px={{ base: 4, md: 6 }}
        maxWidth="1200px"
      >
        <Box position="relative">
          <Text
            fontSize="xl"
            fontWeight="bold"
            bgClip="text"
            bgGradient={logoGradient}
          >
            Attractions GIS
          </Text>
        </Box>

        <HStack gap={6} display={{ base: "none", md: "flex" }}>
          <Route to="/">
            <Link
              color={textColor}
              fontWeight="medium"
              position="relative"
              _hover={{
                textDecoration: "none",
                _after: {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: "0",
                  width: "100%",
                  height: "2px",
                  bgGradient: gradientBg,
                },
              }}
            >
              Home
            </Link>
          </Route>
          <Route to="/map">
            <Link
              color={textColor}
              fontWeight="medium"
              position="relative"
              _hover={{
                textDecoration: "none",
                _after: {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: "0",
                  width: "100%",
                  height: "2px",
                  bgGradient: gradientBg,
                },
              }}
            >
              Map
            </Link>
          </Route>
          <Route to="/data">
            <Link
              color={textColor}
              fontWeight="medium"
              position="relative"
              _hover={{
                textDecoration: "none",
                _after: {
                  content: '""',
                  position: "absolute",
                  bottom: "-4px",
                  left: "0",
                  width: "100%",
                  height: "2px",
                  bgGradient: gradientBg,
                },
              }}
            >
              Data
            </Link>
          </Route>
        </HStack>

        <HStack gap={3}>
          <ColorModeButton display={{ base: "none", md: "flex" }} />

          {/* Show different content based on authentication */}
          {isAuthenticated ? (
            <>
              {/* User Menu */}
              <Popover.Root>
                <Popover.Trigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    display={{ base: "none", md: "flex" }}
                  >
                    <Avatar.Root size="sm">
                      <Avatar.Fallback>
                        {user?.username?.charAt(0)?.toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <Text ml={2} fontSize="sm" fontWeight="medium">
                      {user?.username}
                    </Text>
                    <Icon icon="mdi:chevron-down" width="16" height="16" />
                  </Button>
                </Popover.Trigger>
                <Popover.Positioner>
                  <Popover.Content>
                    <Popover.Arrow>
                      <Popover.ArrowTip />
                    </Popover.Arrow>
                    <Popover.Body>
                      <Stack gap={2}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.navigate({ to: "/dashboard" })}
                          justifyContent="flex-start"
                          width="full"
                        >
                          <Icon
                            icon="mdi:view-dashboard"
                            width="16"
                            height="16"
                          />
                          <Text ml={2}>Dashboard</Text>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={logout}
                          justifyContent="flex-start"
                          width="full"
                          color="red.500"
                          _hover={{ bg: "red.50" }}
                        >
                          <Icon icon="mdi:logout" width="16" height="16" />
                          <Text ml={2}>Logout</Text>
                        </Button>
                      </Stack>
                    </Popover.Body>
                  </Popover.Content>
                </Popover.Positioner>
              </Popover.Root>
            </>
          ) : (
            <>
              {/* Guest Navigation */}
              <Button
                bgGradient={buttonBg}
                color="white"
                size="sm"
                rounded="full"
                fontWeight="medium"
                display={{ base: "none", md: "inline-flex" }}
                onClick={() => (window.location.href = "/map")}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "md",
                }}
                transition="all 0.2s"
              >
                Explore Map
              </Button>

              <Route to="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  rounded="full"
                  fontWeight="medium"
                  display={{ base: "none", md: "inline-flex" }}
                  borderColor={useColorModeValue(
                    customColors.blue,
                    customColors.purple
                  )}
                  color={useColorModeValue(
                    customColors.blue,
                    customColors.purple
                  )}
                  _hover={{
                    bg: useColorModeValue(
                      customColors.blue,
                      customColors.purple
                    ),
                    color: "white",
                  }}
                >
                  Admin Login
                </Button>
              </Route>
            </>
          )}

          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Open menu"
            variant="ghost"
            onClick={onOpen}
          >
            <Icon icon="mdi:menu" width="24" height="24" color={textColor} />
          </IconButton>
        </HStack>
      </Flex>{" "}
      {/* Mobile menu */}
      <Drawer.Root
        open={open}
        onOpenChange={(e) => (e.open ? onOpen() : onClose())}
        closeOnEscape
        closeOnInteractOutside
      >
        <Drawer.Backdrop bg="blackAlpha.600" backdropFilter="blur(5px)" />
        <Drawer.Positioner>
          <Drawer.Content
            bg={bgColor}
            backdropFilter="blur(10px)"
            borderLeftWidth="1px"
            borderLeftColor={borderColor}
          >
            <Drawer.Header
              borderBottomWidth="1px"
              borderBottomColor={borderColor}
              bgGradient={useColorModeValue(
                "linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(0, 164, 239, 0.1))",
                "linear-gradient(to right, rgba(23, 23, 23, 0.9), rgba(162, 0, 255, 0.1))"
              )}
            >
              <Drawer.Title
                fontSize="xl"
                fontWeight="bold"
                bgClip="text"
                bgGradient={logoGradient}
              >
                Attractions GIS
              </Drawer.Title>
              <Drawer.CloseTrigger
                _hover={{
                  bg: "transparent",
                  color: useColorModeValue(
                    customColors.blue,
                    customColors.purple
                  ),
                }}
              />
            </Drawer.Header>
            <Drawer.Body>
              <Stack gap={6} pt={4}>
                <Route to="/">
                  <Link
                    color={textColor}
                    fontWeight="medium"
                    onClick={onClose}
                    px={4}
                    py={2}
                    borderRadius="md"
                    _hover={{
                      bg: useColorModeValue("gray.50", "gray.700"),
                      color: useColorModeValue(
                        customColors.blue,
                        customColors.purple
                      ),
                    }}
                    transition="all 0.2s"
                  >
                    Home
                  </Link>
                </Route>
                <Route to="/map">
                  <Link
                    color={textColor}
                    fontWeight="medium"
                    onClick={onClose}
                    px={4}
                    py={2}
                    borderRadius="md"
                    _hover={{
                      bg: useColorModeValue("gray.50", "gray.700"),
                      color: useColorModeValue(
                        customColors.blue,
                        customColors.purple
                      ),
                    }}
                    transition="all 0.2s"
                  >
                    Map
                  </Link>
                </Route>
                <Route to="/data">
                  <Link
                    color={textColor}
                    fontWeight="medium"
                    onClick={onClose}
                    px={4}
                    py={2}
                    borderRadius="md"
                    _hover={{
                      bg: useColorModeValue("gray.50", "gray.700"),
                      color: useColorModeValue(
                        customColors.blue,
                        customColors.purple
                      ),
                    }}
                    transition="all 0.2s"
                  >
                    Data
                  </Link>
                </Route>

                {/* Authentication-aware mobile content */}
                {isAuthenticated ? (
                  <>
                    <Route to="/dashboard">
                      <Link
                        color={textColor}
                        fontWeight="medium"
                        onClick={onClose}
                        px={4}
                        py={2}
                        borderRadius="md"
                        _hover={{
                          bg: useColorModeValue("gray.50", "gray.700"),
                          color: useColorModeValue(
                            customColors.blue,
                            customColors.purple
                          ),
                        }}
                        transition="all 0.2s"
                      >
                        Dashboard
                      </Link>
                    </Route>

                    <Box px={4} py={2}>
                      <Flex align="center" gap={3} mb={3}>
                        <Avatar.Root size="sm">
                          <Avatar.Fallback>
                            {user?.username?.charAt(0)?.toUpperCase()}
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <Text fontSize="sm" fontWeight="medium">
                          {user?.username}
                        </Text>
                      </Flex>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          logout();
                          onClose();
                        }}
                        width="full"
                      >
                        <Icon icon="mdi:logout" width="16" height="16" />
                        <Text ml={2}>Logout</Text>
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Box pt={2}>
                    <Button
                      variant="outline"
                      size="md"
                      rounded="full"
                      fontWeight="medium"
                      width="full"
                      mb={3}
                      onClick={() => {
                        onClose();
                      }}
                      borderColor={useColorModeValue(
                        customColors.blue,
                        customColors.purple
                      )}
                      color={useColorModeValue(
                        customColors.blue,
                        customColors.purple
                      )}
                      _hover={{
                        bg: useColorModeValue(
                          customColors.blue,
                          customColors.purple
                        ),
                        color: "white",
                      }}
                    >
                      Admin Login
                    </Button>
                  </Box>
                )}

                <Box pt={6}>
                  <HStack gap={3} mb={4} justifyContent="space-between">
                    <Text fontSize="sm" fontWeight="medium">
                      Theme
                    </Text>
                    <ColorModeButton />
                  </HStack>
                  {!isAuthenticated && (
                    <Button
                      bgGradient={buttonBg}
                      color="white"
                      size="md"
                      rounded="full"
                      fontWeight="medium"
                      width="full"
                      onClick={() => {
                        router.navigate({ to: "/map" });
                        onClose();
                      }}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "md",
                      }}
                      transition="all 0.2s"
                    >
                      Explore Map
                    </Button>
                  )}
                </Box>
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
}

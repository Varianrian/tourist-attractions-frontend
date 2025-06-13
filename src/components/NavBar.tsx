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
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { ColorModeButton } from "./ui/theme-toggle";
import { Icon } from "@iconify/react";
import { customColors, customGradients } from "../theme/custom-color";

export default function NavBar() {
  const { open, onOpen, onClose } = useDisclosure();

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
            Java Tourism GIS
          </Text>
        </Box>

        <HStack gap={6} display={{ base: "none", md: "flex" }}>
          <Link
            href="#"
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
          <Link
            href="#about"
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
            About
          </Link>
          <Link
            href="#features"
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
            Features
          </Link>
          <Link
            href="#transport"
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
            Transportation
          </Link>
          <Link
            href="#contact"
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
            Contact
          </Link>
        </HStack>

        <HStack gap={3}>
          <ColorModeButton display={{ base: "none", md: "flex" }} />
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
      <Drawer.Root open={open} closeOnEscape closeOnInteractOutside>
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
                Java Tourism GIS
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
                <Link
                  href="#"
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
                <Link
                  href="#about"
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
                  About
                </Link>
                <Link
                  href="#features"
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
                  Features
                </Link>
                <Link
                  href="#transport"
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
                  Transportation
                </Link>
                <Link
                  href="#contact"
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
                  Contact
                </Link>
                <Box pt={6}>
                  <HStack gap={3} mb={4} justifyContent="space-between">
                    <Text fontSize="sm" fontWeight="medium">
                      Theme
                    </Text>
                    <ColorModeButton />
                  </HStack>
                  <Button
                    bgGradient={buttonBg}
                    color="white"
                    size="md"
                    rounded="full"
                    fontWeight="medium"
                    width="full"
                    onClick={() => (window.location.href = "/map")}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "md",
                    }}
                    transition="all 0.2s"
                  >
                    Explore Map
                  </Button>
                </Box>
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
}

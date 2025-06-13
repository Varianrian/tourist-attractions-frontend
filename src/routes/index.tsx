import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Stack,
  Icon,
} from "@chakra-ui/react";
import {
  FaMapMarkedAlt,
  FaRoad,
  FaPlane,
  FaShip,
  FaBus,
  FaTrain,
} from "react-icons/fa";
import NavBar from "../components/NavBar";
import Feature from "../components/Feature";
import { customGradients } from "../theme/custom-color";
import { useColorModeValue } from "../components/ui/color-mode";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const secondaryBg = useColorModeValue("gray.50", "gray.800");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const buttonVariant = useColorModeValue("solid", "outline");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={bgColor} color={textColor}>
      <NavBar />

      {/* Hero Section */}
      <Box
        width="100%"
        height="100vh"
        position="relative"
        bgImage={useColorModeValue(
          "url('https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?auto=format&fit=crop&w=1920&q=80')",
          "url('https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?auto=format&fit=crop&w=1920&q=80&auto=format&fit=crop&w=1920&q=80&blend=1F2937&blend-mode=multiply&sat=-100&blend-alpha=10')"
        )}
        bgSize="cover"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg={useColorModeValue("blackAlpha.400", "blackAlpha.700")}
          backdropFilter="blur(2px)"
        />
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
          height="100%"
          color="white"
          textAlign="center"
          px={4}
        >
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            fontWeight="bold"
            letterSpacing="tight"
          >
            Java Tourism GIS Platform
          </Heading>
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            mb={8}
            maxWidth="800px"
            fontWeight="medium"
            opacity={0.9}
          >
            Discover accessible tourist attractions across Java Island based on
            transportation hubs proximity
          </Text>
          <Button
            size="lg"
            colorScheme="blue"
            variant={buttonVariant}
            bgGradient={useColorModeValue(
              customGradients.orangeToPink,
              customGradients.pinkToPurple
            )}
            rounded="full"
            px={8}
            onClick={() => (window.location.href = "/map")}
            _hover={{ transform: "translateY(-2px)", transition: "all 0.2s" }}
          >
            Explore the Map
          </Button>
        </Flex>
      </Box>

      {/* About Section */}
      <Box id="about" py={24} bg={secondaryBg}>
        <Box maxWidth="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          <Stack direction="column" gap={16}>
            <Center flexDirection="column" textAlign="center">
              <Heading
                mb={3}
                fontSize={{ base: "2xl", md: "3xl" }}
                letterSpacing="tight"
              >
                About Our Project
              </Heading>
              <Box width="40px" height="2px" bg={accentColor} mb={6} />
              <Text fontSize="lg" maxWidth="800px" opacity={0.85}>
                Our GIS platform analyzes and visualizes tourist attractions
                across Java Island based on their accessibility from key
                transportation hubs like airports, bus stations, railway
                stations, and harbors.
              </Text>
            </Center>

            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap={12}
              alignItems="center"
            >
              <Box>
                <Image
                  src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1170&q=80"
                  borderRadius="2xl"
                  alt="Java Island"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  shadow="lg"
                />
              </Box>
              <Stack direction="column" gap={8} py={4}>
                <Box>
                  <Heading size="md" mb={3} letterSpacing="tight">
                    Why Java Island?
                  </Heading>
                  <Text opacity={0.85} lineHeight="tall">
                    Java is Indonesia's most populous island and home to
                    numerous world-class tourist destinations. From ancient
                    temples and vibrant cities to stunning natural landscapes,
                    Java offers diverse attractions.
                  </Text>
                </Box>
                <Box>
                  <Heading size="md" mb={3} letterSpacing="tight">
                    Our Methodology
                  </Heading>
                  <Text opacity={0.85} lineHeight="tall">
                    We use buffer analysis around transportation hubs to
                    identify tourist attractions within accessible distances.
                    This helps travelers understand which attractions are most
                    convenient to reach from different entry points.
                  </Text>
                </Box>
              </Stack>
            </SimpleGrid>
          </Stack>
        </Box>
      </Box>

      {/* Features Section */}
      <Box id="features" py={24}>
        <Box maxWidth="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          <Stack direction="column" gap={16}>
            <Center flexDirection="column" textAlign="center">
              <Heading
                mb={3}
                fontSize={{ base: "2xl", md: "3xl" }}
                letterSpacing="tight"
              >
                Key Features
              </Heading>
              <Box width="40px" height="2px" bg={accentColor} mb={6} />
              <Text fontSize="lg" maxWidth="800px" opacity={0.85}>
                Our platform provides valuable insights for travelers planning
                their visit to Java Island
              </Text>
            </Center>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
              <Feature
                icon={<Icon as={FaMapMarkedAlt} boxSize={8} color="white" />}
                title="Interactive GIS Map"
                text="Explore an intuitive map interface showing tourist attractions and transportation hubs across Java Island"
                styles={{
                  bg: "transparent",
                  bgGradient: useColorModeValue(
                    customGradients.purpleToBlue,
                    customGradients.pinkToPurple
                  ),
                  color: "white",
                  borderColor: "transparent",
                  _hover: {
                    transform: "translateY(-4px)",
                    boxShadow: "xl",
                  },
                }}
              />
              <Feature
                icon={<Icon as={FaRoad} boxSize={8} color="white" />}
                title="Accessibility Analysis"
                text="See which attractions fall within buffer zones of transportation hubs for easy accessibility planning"
                styles={{
                  bg: "transparent",
                  bgGradient: useColorModeValue(
                    customGradients.blueToTeal,
                    customGradients.purpleToBlue
                  ),
                  color: "white",
                  borderColor: "transparent",
                  _hover: {
                    transform: "translateY(-4px)",
                    boxShadow: "xl",
                  },
                }}
              />
              <Feature
                icon={<Icon as={FaPlane} boxSize={8} color="white" />}
                title="Transportation Filters"
                text="Filter attractions by their proximity to airports, bus stations, railway stations, or harbors"
                styles={{
                  bg: "transparent",
                  bgGradient: useColorModeValue(
                    customGradients.tealToGreen,
                    customGradients.blueToTeal
                  ),
                  color: "white",
                  borderColor: "transparent",
                  _hover: {
                    transform: "translateY(-4px)",
                    boxShadow: "xl",
                  },
                }}
              />
            </SimpleGrid>
          </Stack>
        </Box>
      </Box>

      {/* Transportation Section */}
      <Box id="transport" py={24} bg={secondaryBg}>
        <Box maxWidth="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          <Stack direction="column" gap={16}>
            <Center flexDirection="column" textAlign="center">
              <Heading
                mb={3}
                fontSize={{ base: "2xl", md: "3xl" }}
                letterSpacing="tight"
              >
                Transportation Analysis
              </Heading>
              <Box width="40px" height="2px" bg={accentColor} mb={6} />
              <Text fontSize="lg" maxWidth="800px" opacity={0.85}>
                We analyze tourist attraction accessibility based on proximity
                to these transportation types
              </Text>
            </Center>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
              <TransportationCard
                icon={FaPlane}
                title="Airports"
                description="Major international and domestic airports across Java Island"
              />
              <TransportationCard
                icon={FaBus}
                title="Bus Stations"
                description="Central bus terminals connecting major cities and towns"
              />
              <TransportationCard
                icon={FaTrain}
                title="Railway Stations"
                description="Train stations along Java's extensive railway network"
              />
              <TransportationCard
                icon={FaShip}
                title="Harbors"
                description="Passenger ports serving ferries and cruise ships"
              />
            </SimpleGrid>
          </Stack>
        </Box>
      </Box>

      {/* Contact Section */}
      <Box id="contact" py={24}>
        <Box maxWidth="800px" mx="auto" px={{ base: 4, md: 8 }}>
          <Center flexDirection="column" textAlign="center" gap={8}>
            <Heading
              mb={3}
              fontSize={{ base: "2xl", md: "3xl" }}
              letterSpacing="tight"
            >
              Contact Us
            </Heading>
            <Box width="40px" height="2px" bg={accentColor} mb={4} />
            <Text fontSize="lg" maxWidth="600px" opacity={0.85}>
              Have questions about our GIS platform or need assistance with
              planning your Java Island trip?
            </Text>
            <Button
              colorScheme="blue"
              variant={buttonVariant}
              size="lg"
              rounded="full"
              px={8}
              onClick={() =>
                (window.location.href = "mailto:contact@javatourismgis.com")
              }
              _hover={{ transform: "translateY(-2px)", transition: "all 0.2s" }}
            >
              Get In Touch
            </Button>
          </Center>
        </Box>
      </Box>

      {/* Footer */}
      <Box py={12} borderTop="1px solid" borderColor={borderColor}>
        <Box maxWidth="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap={6}
          >
            <Text fontWeight="medium">Java Tourism GIS Platform</Text>
            <Text opacity={0.7} fontSize="sm">
              © {new Date().getFullYear()} - All Rights Reserved
            </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

interface TransportationCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function TransportationCard({
  icon,
  title,
  description,
}: TransportationCardProps) {
  let gradientStyle;

  switch (title) {
    case "Airports":
      gradientStyle = useColorModeValue(
        customGradients.orangeToPink,
        customGradients.pinkToPurple
      );
      break;
    case "Bus Stations":
      gradientStyle = useColorModeValue(
        customGradients.purpleToBlue,
        customGradients.blueToTeal
      );
      break;
    case "Railway Stations":
      gradientStyle = useColorModeValue(
        customGradients.blueToTeal,
        customGradients.tealToGreen
      );
      break;
    case "Harbors":
      gradientStyle = useColorModeValue(
        customGradients.tealToGreen,
        customGradients.greenToOrange
      );
      break;
    default:
      gradientStyle = useColorModeValue(
        customGradients.purpleToBlue,
        customGradients.blueToTeal
      );
  }

  return (
    <Box
      p={8}
      borderRadius="xl"
      bg={gradientStyle}
      borderWidth="1px"
      borderColor={useColorModeValue("blue.100", "blue.700")}
      position="relative"
      transition="all 0.3s"
      overflow="hidden"
      role="group"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: useColorModeValue("lg", "dark-lg"),
        borderColor: useColorModeValue("blue.100", "blue.700"),
      }}
    >
      <Box
        position="absolute"
        bgGradient={gradientStyle}
        opacity="0"
        transition="opacity 0.3s"
        _groupHover={{ opacity: 0.1 }}
        zIndex="0"
      />
      <Stack
        direction="column"
        gap={4}
        align="center"
        textAlign="center"
        position="relative"
        zIndex="1"
      >
        <Icon as={icon} boxSize={8} color={"white"} />
        <Heading
          size="md"
          fontWeight="700"
          letterSpacing="tight"
          color={"white"}
        >
          {title}
        </Heading>
        <Box height="1px" bg={"white"} width="80%" />
        <Text lineHeight="tall" opacity={0.8} color={"white"}>
          {description}
        </Text>
      </Stack>
    </Box>
  );
}

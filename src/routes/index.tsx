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
            size={{ base: "2xl", md: "4xl" }}
            mb={4}
            fontWeight="bold"
            letterSpacing="tight"
          >
            Platform GIS Pariwisata Jawa
          </Heading>
          <Text 
            fontSize={{ base: "md", md: "lg" }}
            mb={8}
            maxWidth="800px"
            fontWeight="medium"
            opacity={0.9}
          >
            Temukan objek wisata yang mudah diakses di Pulau Jawa berdasarkan
            kedekatan dengan pusat transportasi
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
            Jelajahi Peta
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
                Tentang Aplikasi
              </Heading>
              <Box width="40px" height="2px" bg={accentColor} mb={6} />
              <Text fontSize="lg" maxWidth="800px" opacity={0.85}>
                Platform GIS kami menganalisis dan memvisualisasikan objek wisata
                di Pulau Jawa berdasarkan aksesibilitas dari pusat transportasi utama 
                seperti bandara, terminal bus, stasiun kereta api, dan pelabuhan.
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
                    Mengapa Pulau Jawa?
                  </Heading>
                  <Text opacity={0.85} lineHeight="tall">
                    Pulau Jawa adalah pulau terpadat di Indonesia dan rumah bagi
                    banyak destinasi wisata kelas dunia. Dari candi-candi kuno
                    dan kota-kota yang dinamis hingga pemandangan alam yang menakjubkan,
                    Jawa menawarkan berbagai atraksi wisata yang beragam.
                  </Text>
                </Box>
                <Box>
                  <Heading size="md" mb={3} letterSpacing="tight">
                    Metodologi Kami
                  </Heading>
                  <Text opacity={0.85} lineHeight="tall">
                    Kami menggunakan analisis buffer di sekitar pusat transportasi untuk
                    mengidentifikasi objek wisata dalam jarak yang mudah diakses.
                    Hal ini membantu wisatawan memahami objek wisata mana yang 
                    paling nyaman dijangkau dari berbagai titik masuk.
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
                Fitur Utama
              </Heading>
              <Box width="40px" height="2px" bg={accentColor} mb={6} />
              <Text fontSize="lg" maxWidth="800px" opacity={0.85}>
                Platform kami menyediakan informasi berharga bagi wisatawan yang
                merencanakan kunjungan ke Pulau Jawa
              </Text>
            </Center>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
              <Feature
                icon={<Icon as={FaMapMarkedAlt} boxSize={8} color="white" />}
                title="Peta GIS Interaktif"
                text="Jelajahi antarmuka peta intuitif yang menampilkan objek wisata dan pusat transportasi di seluruh Pulau Jawa"
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
                title="Analisis Aksesibilitas"
                text="Lihat objek wisata yang berada dalam zona buffer dari pusat transportasi untuk perencanaan aksesibilitas yang mudah"
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
                title="Filter Transportasi"
                text="Filter objek wisata berdasarkan kedekatan dengan bandara, terminal bus, stasiun kereta api, atau pelabuhan"
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
                Analisis Transportasi
              </Heading>
              <Box width="40px" height="2px" bg={accentColor} mb={6} />
              <Text fontSize="lg" maxWidth="800px" opacity={0.85}>
                Kami menganalisis aksesibilitas objek wisata berdasarkan kedekatan
                dengan jenis-jenis transportasi berikut
              </Text>
            </Center>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
              <TransportationCard
                icon={FaPlane}
                title="Bandara"
                description="Bandara internasional dan domestik utama di seluruh Pulau Jawa"
              />
              <TransportationCard
                icon={FaBus}
                title="Terminal Bus"
                description="Terminal bus pusat yang menghubungkan kota-kota besar dan kecil"
              />
              <TransportationCard
                icon={FaTrain}
                title="Stasiun Kereta Api"
                description="Stasiun kereta api di sepanjang jaringan kereta api Jawa yang luas"
              />
              <TransportationCard
                icon={FaShip}
                title="Pelabuhan"
                description="Pelabuhan penumpang yang melayani kapal feri dan kapal pesiar"
              />
            </SimpleGrid>
          </Stack>
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
            <Text fontWeight="medium">Platform GIS Pariwisata Jawa</Text>
            <Text opacity={0.7} fontSize="sm">
              © {new Date().getFullYear()} - Hak Cipta Dilindungi
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
    case "Bandara":
      gradientStyle = useColorModeValue(
        customGradients.orangeToPink,
        customGradients.pinkToPurple
      );
      break;
    case "Terminal Bus":
      gradientStyle = useColorModeValue(
        customGradients.purpleToBlue,
        customGradients.blueToTeal
      );
      break;
    case "Stasiun Kereta Api":
      gradientStyle = useColorModeValue(
        customGradients.blueToTeal,
        customGradients.tealToGreen
      );
      break;
    case "Pelabuhan":
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

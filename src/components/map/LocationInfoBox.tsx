import {
  Box,
  Heading,
  Text,
  HStack,
  Badge,
  Icon,
  CloseButton,
  Popover,
  VStack,
} from "@chakra-ui/react";
import { getTransportIcon } from "../../utils/mapIcons";

interface LocationDetailProps {
  location: {
    name: string;
    description?: string;
    type: string;
    attractionType?: string;
    nearbyTransport?: {
      name: string;
      type: string;
    }[];
    isHub?: boolean;
    position?: [number, number];
  } | null;
  onClose: () => void;
  textColor: string;
  subtleTextColor: string;
  bgColor: string;
  borderColor: string;
}

export function LocationInfoBox({
  location,
  onClose,
  textColor,
  subtleTextColor,
  bgColor,
  borderColor,
}: LocationDetailProps) {
  if (!location) return null;
  return (
    <Box
      position="absolute"
      bottom="100px"
      left="50%"
      transform="translateX(-50%)"
      borderRadius="xl"
      bg={bgColor}
      boxShadow="xl"
      p={4}
      width={{ base: "90%", md: "400px" }}
      maxW="90vw"
      zIndex="3"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Box mb={3}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading as="h3" size="md" color={textColor}>
            {location.name}{" "}
            {location.position && (
              <Text
                fontSize="xs"
                color={subtleTextColor}
                mr={1}
                fontStyle="italic"
              >
                {location.position[0].toFixed(4)},{" "}
                {location.position[1].toFixed(4)}
              </Text>
            )}
          </Heading>
          <CloseButton onClick={onClose} />
        </HStack>
        {location.description && (
          <Text color={subtleTextColor} fontSize="sm">
            {location.description}
          </Text>
        )}
        {location.attractionType && (
          <Text fontSize="sm" color={subtleTextColor}>
            Tipe:{" "}
            {location.attractionType === "NATURAL"
              ? "Wisata Alam"
              : location.attractionType === "CULTURAL"
              ? "Wisata Budaya"
              : location.attractionType === "ARTIFICIAL"
              ? "Wisata Buatan"
              : "Lainnya"}
          </Text>
        )}
      </Box>
      {!location.isHub &&
        location.nearbyTransport &&
        location.nearbyTransport.length > 0 && (
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={2} color={textColor}>
              Transportasi Sekitar:
            </Text>{" "}
            <HStack gap={2} flexWrap="wrap">
              {/* Limit to 10 items */}
              {location.nearbyTransport.slice(0, 10).map((transport) => (
                <Badge
                  key={transport.name}
                  colorPalette={
                    transport.type === "AIRPORT"
                      ? "orange"
                      : transport.type === "BUS_STATION"
                        ? "purple"
                        : transport.type === "TRAIN_STATION"
                          ? "blue"
                          : "teal"
                  }
                  variant="outline"
                  borderRadius="full"
                  py={1}
                  px={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={getTransportIcon(transport.type)} mr={1} />
                  {transport.name.charAt(0).toUpperCase() +
                    transport.name.slice(1)}
                </Badge>
              ))}
              {location.nearbyTransport.length > 10 && (
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Badge
                      colorScheme="gray"
                      borderRadius="full"
                      py={1}
                      px={2}
                      cursor="pointer"
                      _hover={{ bg: "gray.200" }}
                      transition="background-color 0.2s"
                    >
                      +{location.nearbyTransport.length - 10} Lainnya
                    </Badge>
                  </Popover.Trigger>
                  <Popover.Positioner>
                    <Popover.Content
                      bg={bgColor}
                      borderColor={borderColor}
                      borderWidth="1px"
                      borderRadius="xl"
                      boxShadow="xl"
                      p={4}
                      maxW="300px"
                      maxH="400px"
                      overflowY="auto"
                    >
                      <Popover.Header>
                        <HStack justify="space-between" align="center">
                          <Heading size="sm" color={textColor}>
                            Semua Transportasi (
                            {location.nearbyTransport.length})
                          </Heading>
                        </HStack>
                      </Popover.Header>
                      <Popover.Body>
                        <VStack gap={2} align="stretch">
                          {location.nearbyTransport
                            .sort((a, b) => a.type.localeCompare(b.type))
                            .map((transport, index) => (
                              <HStack
                                key={`${transport.name}-${index}`}
                                p={2}
                                borderRadius="md"
                                bg={borderColor}
                                align="center"
                              >
                                <Icon
                                  as={getTransportIcon(transport.type)}
                                  color={
                                    transport.type === "AIRPORT"
                                      ? "orange.500"
                                      : transport.type === "BUS_STATION"
                                        ? "purple.500"
                                        : transport.type === "TRAIN_STATION"
                                          ? "blue.500"
                                          : "teal.500"
                                  }
                                  boxSize={4}
                                />
                                <VStack align="start" gap={0} flex={1}>
                                  <Text
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color={textColor}
                                    lineHeight="shorter"
                                  >
                                    {transport.name.charAt(0).toUpperCase() +
                                      transport.name.slice(1)}
                                  </Text>
                                  <Text
                                    fontSize="xs"
                                    color={subtleTextColor}
                                    lineHeight="shorter"
                                  >
                                    {transport.type === "AIRPORT"
                                      ? "Bandara"
                                      : transport.type === "BUS_STATION"
                                        ? "Terminal Bus"
                                        : transport.type === "TRAIN_STATION"
                                          ? "Stasiun Kereta"
                                          : "Pelabuhan"}
                                  </Text>
                                </VStack>
                              </HStack>
                            ))}
                        </VStack>
                      </Popover.Body>
                    </Popover.Content>
                  </Popover.Positioner>
                </Popover.Root>
              )}
            </HStack>
          </Box>
        )}
      {location.isHub && (
        <Box>
          <Badge
            borderRadius="full"
            py={1}
            px={2}
            alignItems="center"
            colorPalette={
              location.type === "AIRPORT"
                ? "orange"
                : location.type === "BUS_STATION"
                  ? "purple"
                  : location.type === "TRAIN_STATION"
                    ? "blue"
                    : location.type === "HARBOR"
                      ? "teal"
                      : "gray"
            }
            variant="outline"
          >
            <Icon as={getTransportIcon(location.type)} mr={1} />
            {location.type === "AIRPORT"
              ? "Bandara"
              : location.type === "BUS_STATION"
                ? "Terminal Bus"
                : location.type === "TRAIN_STATION"
                  ? "Stasiun Kereta"
                  : location.type === "HARBOR"
                    ? "Pelabuhan"
                    : "Unknown"}
          </Badge>
        </Box>
      )}
    </Box>
  );
}

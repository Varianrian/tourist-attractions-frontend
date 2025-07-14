import {
  Box,
  Heading,
  Text,
  HStack,
  Badge,
  Icon,
  CloseButton,
} from "@chakra-ui/react";
import { getTransportIcon } from "../../utils/mapIcons";

interface LocationDetailProps {
  location: {
    name: string;
    description?: string;
    type: string;
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
  console.log("Location Info Box", location);

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
            {location.name} {location.position && (
              <Text fontSize="xs" color={subtleTextColor} mr={1} fontStyle="italic">
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
      </Box>
      {!location.isHub &&
        location.nearbyTransport &&
        location.nearbyTransport.length > 0 && (
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={2} color={textColor}>
              Nearby Transportation:
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
                <Badge colorScheme="gray" borderRadius="full" py={1} px={2}>
                  +{location.nearbyTransport.length - 10} more
                </Badge>
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

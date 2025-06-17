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
    nearbyTransport?: string[];
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
      bottom="24px"
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
        <HStack justifyContent="space-between" alignItems="flex-start">
          <Heading as="h3" size="md" color={textColor}>
            {location.name}
          </Heading>
          <CloseButton onClick={onClose} />
        </HStack>
        {location.description && (
          <Text mt={1} color={subtleTextColor} fontSize="sm">
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
              {location.nearbyTransport.map((transport) => (
                <Badge
                  key={transport}
                  colorScheme={
                    transport === "airport"
                      ? "orange"
                      : transport === "bus"
                        ? "purple"
                        : transport === "train"
                          ? "blue"
                          : "teal"
                  }
                  borderRadius="full"
                  py={1}
                  px={2}
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={getTransportIcon(transport)} mr={1} />
                  {transport.charAt(0).toUpperCase() + transport.slice(1)}
                </Badge>
              ))}
            </HStack>
          </Box>
        )}
      {location.isHub && (
        <Box>
          <Badge
            colorScheme={
              location.type === "airport"
                ? "orange"
                : location.type === "bus"
                  ? "purple"
                  : location.type === "train"
                    ? "blue"
                    : "teal"
            }
            borderRadius="full"
            py={1}
            px={2}
            display="flex"
            alignItems="center"
          >
            <Icon as={getTransportIcon(location.type)} mr={1} />
            {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
          </Badge>
        </Box>
      )}
    </Box>
  );
}

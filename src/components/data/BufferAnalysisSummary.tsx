import {
  Box,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

interface BufferAnalysisSummaryProps {
  metadata?: {
    totalAttractions: number;
    reachableAttractions: number;
    unreachableAttractions: number;
    bufferRadiusMeters: number;
  };
}

export const BufferAnalysisSummary = ({ metadata }: BufferAnalysisSummaryProps) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  if (!metadata) return null;

  return (
    <Box
      bg={useColorModeValue("blue.50", "blue.900")}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      p={{ base: 4, md: 6 }}
      width="100%"
    >
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
        <Box textAlign="center">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue("blue.600", "blue.300")}
          >
            {metadata.totalAttractions}
          </Text>
          <Text
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Total Attractions
          </Text>
        </Box>
        <Box textAlign="center">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue("green.600", "green.300")}
          >
            {metadata.reachableAttractions}
          </Text>
          <Text
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Reachable
          </Text>
        </Box>
        <Box textAlign="center">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue("red.600", "red.300")}
          >
            {metadata.unreachableAttractions}
          </Text>
          <Text
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Unreachable
          </Text>
        </Box>
        <Box textAlign="center">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue("purple.600", "purple.300")}
          >
            {(metadata.bufferRadiusMeters / 1000).toFixed(1)}km
          </Text>
          <Text
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Buffer Radius
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

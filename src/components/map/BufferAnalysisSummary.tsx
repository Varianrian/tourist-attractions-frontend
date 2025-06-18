import {
  Box,
  Heading,
  Stack,
  Text,
  Progress,
  Flex,
  Badge,
  HStack,
  StatGroup,
  Stat,
} from "@chakra-ui/react";
import { type BufferAnalysis } from "@/types/bufferAnalysis";

interface BufferAnalysisSummaryProps {
  data: BufferAnalysis | undefined;
  cardBgColor: string;
  borderColor: string;
  textColor: string;
  subtleTextColor: string;
  filterColors: Record<string, string>;
  isOpen: boolean;
}

export function BufferAnalysisSummary({
  data,
  cardBgColor,
  borderColor,
  textColor,
  subtleTextColor,
  filterColors,
  isOpen,
}: BufferAnalysisSummaryProps) {
  if (!data) {
    return null;
  }

  const {
    totalAttractions,
    reachableAttractions,
    unreachableAttractions,
    bufferRadiusMeters,
    filters,
  } = data.data.metadata;

  const reachablePercentage = Math.round(
    (reachableAttractions / totalAttractions) * 100
  );

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${meters} m`;
  };

  return (
    <Box
      position="absolute"
      top="430px"
      left={isOpen ? "16px" : "-350px"}
      zIndex="2"
      bg={cardBgColor}
      borderRadius="xl"
      boxShadow="lg"
      p={4}
      borderWidth="1px"
      borderColor={borderColor}
      display={{ base: "none", md: "block" }}
      transition="left 0.3s ease"
      width="340px"
    >
      <Stack gap={4}>
        <Heading size="sm" color={textColor}>
          Buffer Analysis Results
        </Heading>

        <Flex justify="space-between" align="center">
          <Stack gap={1}>
            <Text fontSize="sm" color={subtleTextColor}>
              Buffer Radius
            </Text>
            <HStack>
              <Badge
                fontSize="md"
                colorScheme="blue"
                variant="subtle"
                px={2}
                py={1}
                borderRadius="md"
              >
                {formatDistance(bufferRadiusMeters)}
              </Badge>
              <Text fontSize="xs" color={subtleTextColor}>
                from Hubs
              </Text>
            </HStack>
          </Stack>

          <Box position="relative" width="70px" height="70px">
            <Text
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              fontWeight="bold"
              fontSize="lg"
            >
              {reachablePercentage}%
            </Text>
            {/* <Progress 
              value={reachablePercentage} 
              size="lg" 
              thickness="8px"
              colorScheme="green"
              borderRadius="full"
              transform="rotate(-90deg)"
            /> */}
          </Box>
        </Flex>

        <Box height="1px" bg={borderColor} my={1} />
        <StatGroup>
          <Stat.Root>
            <Stat.Label color={textColor} fontSize="xs">
              Total
            </Stat.Label>
            <Stat.ValueText color={textColor} fontSize="md">
              {totalAttractions}
            </Stat.ValueText>
          </Stat.Root>

          <Stat.Root>
            <Stat.Label color="green.500" fontSize="xs">
              Reachable
            </Stat.Label>
            <Stat.ValueText color="green.500" fontSize="md">
              {reachableAttractions}
            </Stat.ValueText>
          </Stat.Root>

          <Stat.Root>
            <Stat.Label color="red.500" fontSize="xs">
              Unreachable
            </Stat.Label>
            <Stat.ValueText color="red.500" fontSize="md">
              {unreachableAttractions}
            </Stat.ValueText>
          </Stat.Root>
        </StatGroup>

        <Box height="1px" bg={borderColor} my={1} />

        <Box>
          <Text fontSize="xs" color={subtleTextColor} mb={1}>
            Analysis Filters
          </Text>
          <Flex gap={2} flexWrap="wrap">
            {filters.transportationType && (
              <Badge colorScheme="purple" variant="subtle" fontSize="xs">
                {filters.transportationType.replace(/_/g, " ")}
              </Badge>
            )}
            {filters.provinceName && (
              <Badge colorScheme="teal" variant="subtle" fontSize="xs">
                {filters.provinceName}
              </Badge>
            )}
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
}

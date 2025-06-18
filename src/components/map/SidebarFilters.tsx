import {
  Box,
  Heading,
  HStack,
  Portal,
  Stack,
  IconButton,
  VStack,
  StatGroup,
  Badge,
  Flex,
  Stat,
  Text,
  ProgressCircle,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { FilterButton } from "./FilterButton";
import { bufferRadiusOptions, provinces } from "../../data/sampleData";
import { type TransportationType } from "@/types/transportation";
import { useState } from "react";
import {
  FaChevronLeft as ChevronLeftIcon,
  FaChevronRight as ChevronRightIcon,
} from "react-icons/fa";
import { Select } from "@chakra-ui/react";
import { type BufferAnalysis } from "@/types/bufferAnalysis";

interface SidebarFiltersProps {
  activeFilters: Record<TransportationType, boolean>;
  cardBgColor: string;
  borderColor: string;
  textColor: string;
  filterColors: Record<TransportationType | string, string>;
  subtleTextColor: string;
  toggleFilter: (type: TransportationType) => void;
  selectedProvince: string;
  setSelectedProvince: (province: string) => void;
  selectedBufferRadius: number;
  setSelectedBufferRadius: (radius: number) => void;
  data: BufferAnalysis | undefined;
}

export function SidebarFilters({
  activeFilters,
  cardBgColor,
  borderColor,
  textColor,
  filterColors,
  subtleTextColor,
  toggleFilter,
  selectedProvince,
  setSelectedProvince,
  selectedBufferRadius,
  setSelectedBufferRadius,
  data,
}: SidebarFiltersProps) {
  if (!data) {
    return null; // Return null if no data is available
  }
  const {
    totalAttractions,
    reachableAttractions,
    unreachableAttractions,
    bufferRadiusMeters,
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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Toggle button always visible */}
      <IconButton
        aria-label={isOpen ? "Close filters" : "Open filters"}
        position="absolute"
        top="80px"
        left={isOpen ? "360px" : "16px"}
        zIndex={3}
        bg={cardBgColor}
        color={textColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        boxShadow="md"
        size="md"
        onClick={() => setIsOpen(!isOpen)}
        display={{ base: "none", md: "flex" }}
        transition="left 0.3s ease"
      >
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>

      {/* Sidebar with filters */}
      <VStack
        gap={6}
        position="absolute"
        top="80px"
        left={isOpen ? "16px" : "-350px"}
        transition="left 0.3s ease"
        maxH="calc(100vh - 80px)"
        overflowY="auto"
        paddingBottom="16px"
      >
        <Box
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
          <Stack gap={6}>
            {/* <Stack gap={3}>
            <Heading size="sm" mb={0} color={textColor}>
              Map Controls
            </Heading>
            <HStack gap={2} flexWrap={"wrap"}>
              <FilterButton
                type="attraction"
                label="Attractions"
                isActive={activeFilters.ATTRACTION}
                borderColor={borderColor}
                subtleTextColor={subtleTextColor}
                filterColors={filterColors}
                onToggle={toggleFilter}
              />
              <FilterButton
                type="transportation"
                label="Transportation Hubs"
                isActive={activeFilters.TRANSPORTATION}
                borderColor={borderColor}
                subtleTextColor={subtleTextColor}
                filterColors={filterColors}
                onToggle={toggleFilter}
              />
              <FilterButton
                type="attraction_buffer"
                label="Attraction Buffer"
                isActive={activeFilters.ATTRACTION_BUFFER}
                borderColor={borderColor}
                subtleTextColor={subtleTextColor}
                filterColors={filterColors}
                onToggle={toggleFilter}
              />
            </HStack>
          </Stack> */}

            <Stack gap={3}>
              <Heading size="sm" mb={0} color={textColor}>
                Buffer Radius
              </Heading>
              <Select.Root
                collection={bufferRadiusOptions}
                size="sm"
                width="100%"
                onValueChange={(value) =>
                  setSelectedBufferRadius(value.value[0] as unknown as number)
                }
                value={[selectedBufferRadius as unknown as string]}
              >
                <Select.HiddenSelect />
                <Select.Control
                  bg={cardBgColor}
                  borderColor={borderColor}
                  borderWidth="1px"
                  borderRadius="md"
                  _hover={{ borderColor: filterColors.ATTRACTION }}
                  _focus={{ boxShadow: `0 0 0 1px ${filterColors.ATTRACTION}` }}
                >
                  <Select.Trigger px={3} py={2} color={textColor}>
                    <Select.ValueText
                      placeholder="Buffer Radius"
                      fontWeight="medium"
                    />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator color={filterColors.ATTRACTION} />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content
                      bg={cardBgColor}
                      borderColor={borderColor}
                      borderWidth="1px"
                      borderRadius="md"
                      boxShadow="lg"
                      py={1}
                      maxH="300px"
                      overflow="auto"
                    >
                      {bufferRadiusOptions.items.map((radius) => (
                        <Select.Item
                          item={radius}
                          key={radius.value}
                          px={3}
                          py={2}
                          borderRadius="sm"
                          _hover={{
                            bg: useColorModeValue("gray.100", "gray.700"),
                          }}
                          _selected={{
                            bg: useColorModeValue("gray.200", "gray.600"),
                          }}
                          _focus={{
                            bg: useColorModeValue("gray.100", "gray.700"),
                          }}
                        >
                          {radius.label}
                          <Select.ItemIndicator
                            color={filterColors.ATTRACTION}
                          />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Stack>

            <Stack gap={3}>
              <Heading size="sm" mb={0} color={textColor}>
                Province Filters
              </Heading>
              <Select.Root
                collection={provinces}
                size="sm"
                width="100%"
                onValueChange={(value) => setSelectedProvince(value.value[0])}
                value={[selectedProvince]}
              >
                <Select.HiddenSelect />
                <Select.Control
                  bg={cardBgColor}
                  borderColor={borderColor}
                  borderWidth="1px"
                  borderRadius="md"
                  _hover={{ borderColor: filterColors.ATTRACTION }}
                  _focus={{ boxShadow: `0 0 0 1px ${filterColors.ATTRACTION}` }}
                >
                  <Select.Trigger px={3} py={2} color={textColor}>
                    <Select.ValueText
                      placeholder="Select Province"
                      fontWeight="medium"
                    />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator color={filterColors.ATTRACTION} />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content
                      bg={cardBgColor}
                      borderColor={borderColor}
                      borderWidth="1px"
                      borderRadius="md"
                      boxShadow="lg"
                      py={1}
                      maxH="300px"
                      overflow="auto"
                    >
                      {provinces.items.map((province) => (
                        <Select.Item
                          item={province}
                          key={province.value}
                          px={3}
                          py={2}
                          borderRadius="sm"
                          _hover={{
                            bg: useColorModeValue("gray.100", "gray.700"),
                          }}
                          _selected={{
                            bg: useColorModeValue("gray.200", "gray.600"),
                          }}
                          _focus={{
                            bg: useColorModeValue("gray.100", "gray.700"),
                          }}
                        >
                          {province.label}
                          <Select.ItemIndicator
                            color={filterColors.ATTRACTION}
                          />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Stack>

            <Stack gap={3}>
              <Heading size="sm" mb={1} color={textColor}>
                Transportation Filters
              </Heading>
              <Stack>
                <FilterButton
                  type="AIRPORT"
                  label="Airports"
                  isActive={activeFilters.AIRPORT}
                  borderColor={borderColor}
                  subtleTextColor={subtleTextColor}
                  filterColors={filterColors}
                  onToggle={toggleFilter}
                />
                <FilterButton
                  type="BUS_STATION"
                  label="Bus Stations"
                  isActive={activeFilters.BUS_STATION}
                  borderColor={borderColor}
                  subtleTextColor={subtleTextColor}
                  filterColors={filterColors}
                  onToggle={toggleFilter}
                />
                <FilterButton
                  type="TRAIN_STATION"
                  label="Railway Stations"
                  isActive={activeFilters.TRAIN_STATION}
                  borderColor={borderColor}
                  subtleTextColor={subtleTextColor}
                  filterColors={filterColors}
                  onToggle={toggleFilter}
                />
                <FilterButton
                  type="HARBOR"
                  label="Harbors"
                  isActive={activeFilters.HARBOR}
                  borderColor={borderColor}
                  subtleTextColor={subtleTextColor}
                  filterColors={filterColors}
                  onToggle={toggleFilter}
                />
              </Stack>
            </Stack>
          </Stack>
        </Box>

        <Box
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
                <AbsoluteCenter>
                  <ProgressCircle.Root size="lg" value={reachablePercentage}>
                    <ProgressCircle.Circle>
                      <ProgressCircle.Track />
                      <ProgressCircle.Range />
                    </ProgressCircle.Circle>
                    <AbsoluteCenter>
                      <ProgressCircle.ValueText />
                    </AbsoluteCenter>
                  </ProgressCircle.Root>
                </AbsoluteCenter>
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

            {/* <Box>
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
            </Box> */}
          </Stack>
        </Box>
      </VStack>

      {/* Placeholder for additional content */}
    </>
  );
}

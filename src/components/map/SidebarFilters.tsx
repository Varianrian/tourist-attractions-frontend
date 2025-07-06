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
  Checkbox,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { FilterButton } from "./FilterButton";
import { bufferRadiusOptions, provinces } from "../../data/sampleData";
import {
  type Transportation,
  type TransportationType,
} from "@/types/transportation";
import { useState } from "react";
import {
  FaChevronLeft as ChevronLeftIcon,
  FaChevronRight as ChevronRightIcon,
  FaInfoCircle as InfoCircleIcon,
} from "react-icons/fa";
import { Select } from "@chakra-ui/react";
import { type BufferAnalysis } from "@/types/bufferAnalysis";
import { Tooltip } from "../../components/ui/tooltip";

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
  activeLayers: {
    province: boolean;
    transportationHubs: boolean;
    reachableAttractions: boolean;
    unreachableAttractions: boolean;
  };
  setActiveLayers: React.Dispatch<
    React.SetStateAction<{
      province: boolean;
      transportationHubs: boolean;
      reachableAttractions: boolean;
      unreachableAttractions: boolean;
    }>
  >;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description?: string;
      type: string;
      nearbyTransport?: {
        name: string;
        type: string;
      }[];
      isHub?: boolean;
      position?: [number, number];
    } | null>
  >;
  transportations: Transportation[];
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
  activeLayers,
  setActiveLayers,
  setSelectedLocation,
  transportations,
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
  const [isSidebarLeftOpen, setIsSidebarLeftOpen] = useState(true);
  const [isSidebarRightOpen, setIsSidebarRightOpen] = useState(true);

  const checkboxBorderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <>
      {/* Toggle button always visible */}
      <IconButton
        aria-label={isSidebarLeftOpen ? "Close filters" : "Open filters"}
        position="absolute"
        top="80px"
        left={isSidebarLeftOpen ? "360px" : "16px"}
        zIndex={3}
        bg={cardBgColor}
        color={textColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        boxShadow="md"
        size="md"
        onClick={() => setIsSidebarLeftOpen(!isSidebarLeftOpen)}
        display={{ base: "none", md: "flex" }}
        transition="left 0.3s ease"
      >
        {isSidebarLeftOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>

      <IconButton
        aria-label={isSidebarRightOpen ? "Close filters" : "Open filters"}
        position="absolute"
        top="80px"
        right={isSidebarRightOpen ? "360px" : "16px"}
        zIndex={3}
        bg={cardBgColor}
        color={textColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="md"
        boxShadow="md"
        size="md"
        onClick={() => setIsSidebarRightOpen(!isSidebarRightOpen)}
        display={{ base: "none", md: "flex" }}
        transition="right 0.3s ease"
      >
        {isSidebarRightOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>

      {/* Sidebar Left with filters */}
      <VStack
        gap={6}
        position="absolute"
        top="80px"
        left={isSidebarLeftOpen ? "16px" : "-350px"}
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

            {/* Layer Control */}
            <Stack gap={3}>
              <Heading size="sm" mb={1} color={textColor}>
                Layer Control
              </Heading>
              <Checkbox.Root
                checked={activeLayers.province}
                onCheckedChange={(value) =>
                  setActiveLayers((prev) => ({
                    ...prev,
                    province: Boolean(value.checked),
                  }))
                }
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control borderColor={checkboxBorderColor} />
                <Checkbox.Label>Batas Provinsi</Checkbox.Label>
              </Checkbox.Root>
              <Checkbox.Root
                checked={activeLayers.reachableAttractions}
                onCheckedChange={(value) =>
                  setActiveLayers((prev) => ({
                    ...prev,
                    reachableAttractions: Boolean(value.checked),
                  }))
                }
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control borderColor={checkboxBorderColor} />
                <HStack alignItems={"center"}>
                  <Checkbox.Label>Tempat Wisata Terjangkau</Checkbox.Label>
                  <Tooltip content="Tempat wisata yang dapat dijangkau dalam radius buffer yang ditentukan.">
                    <InfoCircleIcon />
                  </Tooltip>
                </HStack>
              </Checkbox.Root>
              <Checkbox.Root
                checked={activeLayers.unreachableAttractions}
                onCheckedChange={(value) =>
                  setActiveLayers((prev) => ({
                    ...prev,
                    unreachableAttractions: Boolean(value.checked),
                  }))
                }
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control borderColor={checkboxBorderColor} />
                <HStack alignItems={"center"}>
                  <Checkbox.Label>
                    Tempat Wisata Tidak Terjangkau
                  </Checkbox.Label>
                  <Tooltip content="Tempat wisata yang tidak dapat dijangkau dalam radius buffer yang ditentukan.">
                    <InfoCircleIcon />
                  </Tooltip>
                </HStack>
              </Checkbox.Root>
              <Checkbox.Root
                checked={activeLayers.transportationHubs}
                onCheckedChange={(value) =>
                  setActiveLayers((prev) => ({
                    ...prev,
                    transportationHubs: Boolean(value.checked),
                  }))
                }
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control borderColor={checkboxBorderColor} />
                <Checkbox.Label>Transportasi Umum</Checkbox.Label>
              </Checkbox.Root>
            </Stack>
          </Stack>
        </Box>
      </VStack>

      {/* Sidebar Right with filters */}
      <VStack
        gap={6}
        position="absolute"
        top="80px"
        right={isSidebarRightOpen ? "16px" : "-350px"}
        transition="right 0.3s ease"
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
          transition="right 0.3s ease"
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

            {/* Top 10 Attractions */}
            <Stack gap={2}>
              <Heading size="sm" color={textColor}>
                Top 10 Attractions
              </Heading>
              {data.data.features
                .slice(0, 10)
                .filter((feature) => feature.properties.is_reachable)
                .map((feature) => (
                  <HStack
                    key={feature.properties.id}
                    justifyContent="space-between"
                    alignItems="center"
                    cursor="pointer"
                    onClick={() =>
                      setSelectedLocation({
                        name: feature.properties.attraction_name,
                        description: feature.properties.province,
                        type: "attraction",
                        nearbyTransport: feature.properties.transportations,
                        isHub: false,
                        position: [
                          feature.properties.latitude,
                          feature.properties.longitude,
                        ],
                      })
                    }
                  >
                    <Text fontSize="sm" color={textColor}>
                      {feature.properties.attraction_name}
                    </Text>
                    {/* Reached by transportations.lenghts */}
                    <Badge
                      colorScheme="blue"
                      variant="subtle"
                      fontSize="xs"
                      px={2}
                      py={1}
                      borderRadius="md"
                    >
                      {feature.properties.transportation_count}{" "}
                      {feature.properties.transportation_count >= 1
                        ? "Transportasi"
                        : "Transportasi"}
                    </Badge>
                  </HStack>
                ))}
            </Stack>
            <Box height="1px" bg={borderColor} my={1} />

            {/* Legends */}
            <Stack gap={2}>
              <Heading size="sm" color={textColor}>
                Legenda
              </Heading>
              <HStack gap={2} flexWrap="wrap">
                {Object.entries(filterColors)
                  .filter(([type]) => type !== "ATTRACTION")
                  .map(([type, color]) => (
                    <Box
                      key={type}
                      display="flex"
                      alignItems="center"
                      gap={2}
                      bgColor={cardBgColor}
                      borderWidth="1px"
                      borderColor={color}
                      borderRadius="md"
                      px={3}
                      py={1}
                    >
                      <Box alignContent={"text-center"}>
                        <img
                          src={`https://img.icons8.com/?size=20&id=${
                            type === "HARBOR"
                              ? "9580"
                              : type === "AIRPORT"
                                ? "12665"
                                : type === "TRAIN_STATION"
                                  ? "9361"
                                  : type === "BUS_STATION"
                                    ? "9351"
                                    : type === "ATTRACTION_REACHABLE"
                                      ? "62215"
                                      : "62215"
                          }&format=png&color=${color.split("#")[1]}`}
                          alt={type}
                        />
                      </Box>
                      <Text fontSize="sm" color={textColor}>
                        {type.charAt(0).toUpperCase() +
                          type.slice(1).replace(/_/g, " ")}{" "}
                        {" ("}
                        {type === "ATTRACTION_REACHABLE" ||
                        type === "ATTRACTION_UNREACHABLE"
                          ? data.data.features.filter(
                              (feature) =>
                                feature.properties.is_reachable ===
                                (type === "ATTRACTION_REACHABLE")
                            ).length
                          : transportations.filter((t) => t.type === type)
                              .length}
                        {")"}
                      </Text>
                    </Box>
                  ))}
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </VStack>
    </>
  );
}

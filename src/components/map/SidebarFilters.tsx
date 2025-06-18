import {
  Box,
  Heading,
  HStack,
  Portal,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { FilterButton } from "./FilterButton";
import { provinces } from "../../data/sampleData";
import { type TransportationType } from "@/types/transportation";
import { useState } from "react";
import {
  FaChevronLeft as ChevronLeftIcon,
  FaChevronRight as ChevronRightIcon,
} from "react-icons/fa";
import { Select } from "@chakra-ui/react";

interface SidebarFiltersProps {
  activeFilters: Record<TransportationType, boolean>;
  cardBgColor: string;
  borderColor: string;
  textColor: string;
  filterColors: Record<TransportationType, string>;
  subtleTextColor: string;
  toggleFilter: (type: TransportationType) => void;
  selectedProvince: string;
  setSelectedProvince: (province: string) => void;
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
}: SidebarFiltersProps) {
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
      <Box
        position="absolute"
        top="80px"
        left={isOpen ? "16px" : "-350px"} // Move offscreen when closed
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
              Province Filters
            </Heading>
            <Select.Root collection={provinces} size="sm" width="100%" onValueChange={(value) => setSelectedProvince(value.value[0])} value={[selectedProvince]}>
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
                        <Select.ItemIndicator color={filterColors.ATTRACTION} />
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
    </>
  );
}

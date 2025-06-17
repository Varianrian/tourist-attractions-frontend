import { Box, Heading, HStack, Portal, Stack, Select } from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { FilterButton } from "./FilterButton";
import { provinces } from "../../data/sampleData";

interface SidebarFiltersProps {
  activeFilters: Record<string, boolean>;
  cardBgColor: string;
  borderColor: string;
  textColor: string;
  filterColors: Record<string, string>;
  subtleTextColor: string;
  toggleFilter: (type: string) => void;
}

export function SidebarFilters({
  activeFilters,
  cardBgColor,
  borderColor,
  textColor,
  filterColors,
  subtleTextColor,
  toggleFilter,
}: SidebarFiltersProps) {
  return (
    <Box
      position="absolute"
      top="80px"
      left="16px"
      zIndex="2"
      bg={cardBgColor}
      borderRadius="xl"
      boxShadow="lg"
      p={4}
      borderWidth="1px"
      borderColor={borderColor}
      display={{ base: "none", md: "block" }}
    >
      <Stack gap={6}>
        <Stack gap={3}>
          <Heading size="sm" mb={0} color={textColor}>
            Map Controls
          </Heading>
          <HStack gap={2}>
            <FilterButton
              type="attraction"
              label="Attractions"
              isActive={activeFilters.attraction}
              borderColor={borderColor}
              subtleTextColor={subtleTextColor}
              filterColors={filterColors}
              onToggle={toggleFilter}
            />
            <FilterButton
              type="transportation"
              label="Transportation Hubs"
              isActive={activeFilters.transportation}
              borderColor={borderColor}
              subtleTextColor={subtleTextColor}
              filterColors={filterColors}
              onToggle={toggleFilter}
            />
            <FilterButton
              type="attraction_buffer"
              label="Attraction Buffer"
              isActive={activeFilters.attraction_buffer}
              borderColor={borderColor}
              subtleTextColor={subtleTextColor}
              filterColors={filterColors}
              onToggle={toggleFilter}
            />
          </HStack>
        </Stack>

        <Stack gap={3}>
          <Heading size="sm" mb={0} color={textColor}>
            Province Filters
          </Heading>
          <Select.Root collection={provinces} size="sm" width="320px">
            <Select.HiddenSelect />
            <Select.Control
              bg={cardBgColor}
              borderColor={borderColor}
              borderWidth="1px"
              borderRadius="md"
              _hover={{ borderColor: filterColors.attraction }}
              _focus={{ boxShadow: `0 0 0 1px ${filterColors.attraction}` }}
            >
              <Select.Trigger 
                px={3} 
                py={2}
                color={textColor}
              >
                <Select.ValueText 
                  placeholder="Select Province" 
                  fontWeight="medium" 
                />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator color={filterColors.attraction} />
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
                      _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                      _selected={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                      _focus={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                    >
                      {province.label}
                      <Select.ItemIndicator color={filterColors.attraction} />
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
              type="airport"
              label="Airports"
              isActive={activeFilters.airport}
              borderColor={borderColor}
              subtleTextColor={subtleTextColor}
              filterColors={filterColors}
              onToggle={toggleFilter}
            />
            <FilterButton
              type="bus"
              label="Bus Stations"
              isActive={activeFilters.bus}
              borderColor={borderColor}
              subtleTextColor={subtleTextColor}
              filterColors={filterColors}
              onToggle={toggleFilter}
            />
            <FilterButton
              type="train"
              label="Railway Stations"
              isActive={activeFilters.train}
              borderColor={borderColor}
              subtleTextColor={subtleTextColor}
              filterColors={filterColors}
              onToggle={toggleFilter}
            />
            <FilterButton
              type="harbor"
              label="Harbors"
              isActive={activeFilters.harbor}
              borderColor={borderColor}
              subtleTextColor={subtleTextColor}
              filterColors={filterColors}
              onToggle={toggleFilter}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

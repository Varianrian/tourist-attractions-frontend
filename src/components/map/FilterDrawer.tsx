import {
  Box,
  CloseButton,
  Drawer,
  Heading,
  Stack,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { FilterButton } from "./FilterButton";
import { type TransportationType } from "@/types/transportation";

interface FilterDrawerProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  activeFilters: Record<TransportationType, boolean>;
  borderColor: string;
  subtleTextColor: string;
  textColor?: string;
  filterColors: Record<TransportationType | string, string>;
  toggleFilter: (type: TransportationType) => void;
  selectedProvince?: string;
  setSelectedProvince?: (province: string) => void;
  data?: {
    data: {
      metadata: {
        totalAttractions: number;
        reachableAttractions: number;
        unreachableAttractions: number;
        bufferRadiusMeters: number;
        filters: any;
      };
    };
  };
}

export function FilterDrawer({
  open,
  onOpen,
  onClose,
  activeFilters,
  borderColor,
  subtleTextColor,
  textColor,
  filterColors,
  toggleFilter,
  selectedProvince,
  setSelectedProvince,
  data,
}: FilterDrawerProps) {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => {
        e.open ? onOpen() : onClose();
      }}
      closeOnEscape
      closeOnInteractOutside
    >
      <Drawer.Backdrop />
      <Drawer.Trigger />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Filters</Drawer.Title>
            <Drawer.CloseTrigger asChild>
              <CloseButton />
            </Drawer.CloseTrigger>
          </Drawer.Header>
          <Drawer.Body>
            <Stack gap={6}>
              {/* Province Filter */}
              {selectedProvince && setSelectedProvince && (
                <Box>
                  <Heading size="sm" mb={3} color={textColor}>
                    Province Filter
                  </Heading>{" "}
                  <ButtonGroup
                    size="sm"
                    variant="outline"
                    display="flex"
                    flexWrap="wrap"
                    gap={2}
                  >
                    <Button
                      colorScheme={
                        selectedProvince === "JAWA TENGAH" ? "blue" : "gray"
                      }
                      onClick={() => setSelectedProvince("JAWA TENGAH")}
                    >
                      JAWA TENGAH
                    </Button>
                    <Button
                      colorScheme={
                        selectedProvince === "JAWA BARAT" ? "blue" : "gray"
                      }
                      onClick={() => setSelectedProvince("JAWA BARAT")}
                    >
                      JAWA BARAT
                    </Button>
                    <Button
                      colorScheme={
                        selectedProvince === "JAWA TIMUR" ? "blue" : "gray"
                      }
                      onClick={() => setSelectedProvince("JAWA TIMUR")}
                    >
                      JAWA TIMUR
                    </Button>
                    <Button
                      colorScheme={
                        selectedProvince === "DKI JAKARTA" ? "blue" : "gray"
                      }
                      onClick={() => setSelectedProvince("DKI JAKARTA")}
                    >
                      DKI JAKARTA
                    </Button>
                    <Button
                      colorScheme={
                        selectedProvince === "DI YOGYAKARTA" ? "blue" : "gray"
                      }
                      onClick={() => setSelectedProvince("DI YOGYAKARTA")}
                    >
                      D.I. Yogyakarta
                    </Button>
                    <Button
                      colorScheme={
                        selectedProvince === "BANTEN" ? "blue" : "gray"
                      }
                      onClick={() => setSelectedProvince("BANTEN")}
                    >
                      BANTEN
                    </Button>
                  </ButtonGroup>
                </Box>
              )}

              {/* Transportation Types */}
              <Box>
                {" "}
                <Heading size="sm" mb={3} color={textColor}>
                  Transportation Filters
                </Heading>
                <Stack gap={2}>
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
              </Box>

              {/* Buffer Analysis Results */}
              {data && data.data && (
                <Box
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="xl"
                  p={4}
                >
                  <Heading size="sm" mb={3} color={textColor}>
                    Buffer Analysis Results
                  </Heading>
                  <Stack>
                    <Box
                      borderBottomWidth="1px"
                      borderColor={borderColor}
                      pb={2}
                    >
                      <Box as="span" fontWeight="bold" mr={2}>
                        Buffer Radius:
                      </Box>
                      {data.data.metadata.bufferRadiusMeters >= 1000
                        ? `${(data.data.metadata.bufferRadiusMeters / 1000).toFixed(1)} km`
                        : `${data.data.metadata.bufferRadiusMeters} m`}
                    </Box>

                    <Box
                      borderBottomWidth="1px"
                      borderColor={borderColor}
                      pb={2}
                    >
                      <Box as="span" fontWeight="bold" mr={2}>
                        Total Attractions:
                      </Box>
                      {data.data.metadata.totalAttractions}
                    </Box>

                    <Box
                      borderBottomWidth="1px"
                      borderColor={borderColor}
                      pb={2}
                    >
                      <Box as="span" fontWeight="bold" color="green.500" mr={2}>
                        Reachable:
                      </Box>
                      {data.data.metadata.reachableAttractions}
                    </Box>

                    <Box pb={2}>
                      <Box as="span" fontWeight="bold" color="red.500" mr={2}>
                        Unreachable:
                      </Box>
                      {data.data.metadata.unreachableAttractions}
                    </Box>
                  </Stack>
                </Box>
              )}
            </Stack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

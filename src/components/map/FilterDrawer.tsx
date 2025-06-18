import { Box, CloseButton, Drawer, Heading, Stack } from "@chakra-ui/react";
import { FilterButton } from "./FilterButton";
import { type TransportationType } from "@/types/transportation";

interface FilterDrawerProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  activeFilters: Record<TransportationType, boolean>;
  borderColor: string;
  subtleTextColor: string;
  filterColors: Record<TransportationType, string>;
  toggleFilter: (type: TransportationType) => void;
}

export function FilterDrawer({
  open,
  onOpen,
  onClose,
  activeFilters,
  borderColor,
  subtleTextColor,
  filterColors,
  toggleFilter,
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
            <Stack gap={4} mt={2}>
              <Box>
                <Heading size="sm" mb={3}>
                  Transportation Types
                </Heading>
                <Stack gap={2}>
                  <FilterButton
                    type="airport"
                    label="Airports"
                    isActive={activeFilters.AIRPORT}
                    borderColor={borderColor}
                    subtleTextColor={subtleTextColor}
                    filterColors={filterColors}
                    onToggle={toggleFilter}
                  />
                  <FilterButton
                    type="bus"
                    label="Bus Stations"
                    isActive={activeFilters.BUS_STATION}
                    borderColor={borderColor}
                    subtleTextColor={subtleTextColor}
                    filterColors={filterColors}
                    onToggle={toggleFilter}
                  />
                  <FilterButton
                    type="train"
                    label="Railway Stations"
                    isActive={activeFilters.TRAIN_STATION}
                    borderColor={borderColor}
                    subtleTextColor={subtleTextColor}
                    filterColors={filterColors}
                    onToggle={toggleFilter}
                  />
                  <FilterButton
                    type="harbor"
                    label="Harbors"
                    isActive={activeFilters.HARBOR}
                    borderColor={borderColor}
                    subtleTextColor={subtleTextColor}
                    filterColors={filterColors}
                    onToggle={toggleFilter}
                  />
                </Stack>
              </Box>
            </Stack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

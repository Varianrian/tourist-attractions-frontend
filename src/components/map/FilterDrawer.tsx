import {
  Box,
  CloseButton,
  Drawer,
  Heading,
  Stack,
  Button,
  ButtonGroup,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { FilterButton } from "./FilterButton";
import { type TransportationType } from "@/types/transportation";
import { bufferRadiusOptions } from "../../data/sampleData";
import { useColorModeValue } from "../../components/ui/color-mode";
import { FaInfoCircle as InfoCircleIcon } from "react-icons/fa";
import { Tooltip } from "../../components/ui/tooltip";
import React from "react";

interface FilterDrawerProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  activeFilters: Record<TransportationType, boolean>;
  borderColor: string;
  subtleTextColor: string;
  textColor?: string;
  cardBgColor?: string;
  filterColors: Record<TransportationType | string, string>;
  toggleFilter: (type: TransportationType) => void;
  selectedProvince?: string;
  setSelectedProvince?: (province: string) => void;
  selectedBufferRadius?: number;
  setSelectedBufferRadius?: (radius: number) => void;
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
  activeLayers?: {
    province: boolean;
    transportationHubs: boolean;
    reachableAttractions: boolean;
    unreachableAttractions: boolean;
  };
  setActiveLayers?: React.Dispatch<
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
  selectedBufferRadius,
  setSelectedBufferRadius,
  activeLayers,
  setActiveLayers,
}: FilterDrawerProps) {
  const checkboxBorderColor = useColorModeValue("gray.300", "gray.600");
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
          </Drawer.Header>{" "}
          <Drawer.Body>
            <Stack gap={6}>
              {/* Buffer Radius Control */}
              {selectedBufferRadius !== undefined &&
                setSelectedBufferRadius && (
                  <Box>
                    <Heading size="sm" mb={3} color={textColor}>
                      Buffer Radius
                    </Heading>
                    <ButtonGroup
                      size="sm"
                      variant="outline"
                      display="flex"
                      flexWrap="wrap"
                      gap={2}
                    >
                      {bufferRadiusOptions.items.map((option) => (
                        <Button
                          key={option.value}
                          colorScheme={
                            selectedBufferRadius == option.value
                              ? "blue"
                              : "gray"
                          }
                          onClick={() => setSelectedBufferRadius(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Box>
                )}

              {/* Province Filter */}
              {selectedProvince && setSelectedProvince && (
                <Box>
                  <Heading size="sm" mb={3} color={textColor}>
                    Filter Provinsi
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
                  Filter Transportasi
                </Heading>
                <Stack gap={2}>
                  <FilterButton
                    type="AIRPORT"
                    label="Bandara"
                    isActive={activeFilters.AIRPORT}
                    borderColor={borderColor}
                    subtleTextColor={subtleTextColor}
                    filterColors={filterColors}
                    onToggle={toggleFilter}
                  />
                  <FilterButton
                    type="BUS_STATION"
                    label="Terminal Bus"
                    isActive={activeFilters.BUS_STATION}
                    borderColor={borderColor}
                    subtleTextColor={subtleTextColor}
                    filterColors={filterColors}
                    onToggle={toggleFilter}
                  />
                  <FilterButton
                    type="TRAIN_STATION"
                    label="Stasiun Kereta"
                    isActive={activeFilters.TRAIN_STATION}
                    borderColor={borderColor}
                    subtleTextColor={subtleTextColor}
                    filterColors={filterColors}
                    onToggle={toggleFilter}
                  />
                  <FilterButton
                    type="HARBOR"
                    label="Pelabuhan"
                    isActive={activeFilters.HARBOR}
                    borderColor={borderColor}
                    subtleTextColor={subtleTextColor}
                    filterColors={filterColors}
                    onToggle={toggleFilter}
                  />
                </Stack>{" "}
              </Box>

              {/* Layer Control */}
              {activeLayers && setActiveLayers && (
                <Box>
                  <Heading size="sm" mb={3} color={textColor}>
                    Layer Control
                  </Heading>
                  <Stack gap={2}>
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
                        <Checkbox.Label>
                          Tempat Wisata Terjangkau
                        </Checkbox.Label>
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
                </Box>
              )}
            </Stack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

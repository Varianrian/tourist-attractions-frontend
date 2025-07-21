import {
  Box,
  CloseButton,
  Drawer,
  Heading,
  Stack,
  HStack,
  Text,
  Badge,
} from "@chakra-ui/react";
import {
  type Transportation,
  type TransportationType,
} from "@/types/transportation";
import React from "react";
import { type BufferAnalysis } from "@/types/bufferAnalysis";

interface ResultDrawerProps {
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
  data: BufferAnalysis | undefined;
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
  transportations: Transportation[];
}

export function ResultDrawer({
  open,
  onOpen,
  onClose,
  borderColor,
  textColor,
  data,
  cardBgColor,
  filterColors,

  setSelectedLocation,
  transportations,
}: ResultDrawerProps) {
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
        {" "}
        <Drawer.Content position="absolute" right={0} height="100%">
          <Drawer.Header p={{ base: 2, md: 4 }}>
            <Drawer.Title fontSize={{ base: "sm", md: "md" }}>
              Buffer Analysis Result
            </Drawer.Title>
            <Drawer.CloseTrigger asChild>
              <CloseButton size={{ base: "xs", md: "sm" }} />
            </Drawer.CloseTrigger>
          </Drawer.Header>
          <Drawer.Body px={{ base: 2, md: 3 }} py={{ base: 1, md: 2 }}>
            <Stack gap={{ base: 2, md: 4 }}>
              {/* Buffer Analysis Results */}
              {data && data.data && (
                <Box
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  p={{ base: 2, md: 3 }}
                >
                  <Heading
                    size="xs"
                    mb={{ base: 1, md: 2 }}
                    color={textColor}
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    Hasil Analisis Buffer
                  </Heading>{" "}
                  <Stack gap={{ base: 1, md: 2 }}>
                    <Box
                      borderBottomWidth="1px"
                      borderColor={borderColor}
                      pb={1}
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <Box as="span" fontWeight="bold" mr={1}>
                        Buffer Radius:
                      </Box>
                      {data.data.metadata.bufferRadiusMeters >= 1000
                        ? `${(data.data.metadata.bufferRadiusMeters / 1000).toFixed(1)} km`
                        : `${data.data.metadata.bufferRadiusMeters} m`}
                    </Box>

                    <Box
                      borderBottomWidth="1px"
                      borderColor={borderColor}
                      pb={1}
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <Box as="span" fontWeight="bold" mr={2}>
                        Total Tempat Wisata:
                      </Box>
                      {data.data.metadata.totalAttractions}
                    </Box>

                    <Box
                      borderBottomWidth="1px"
                      borderColor={borderColor}
                      pb={1}
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <Box as="span" fontWeight="bold" color="green.500" mr={2}>
                        Terjangkau:
                      </Box>
                      {data.data.metadata.reachableAttractions}
                    </Box>

                    <Box pb={1} fontSize={{ base: "xs", md: "sm" }}>
                      <Box as="span" fontWeight="bold" color="red.500" mr={2}>
                        Tidak Terjangkau:
                      </Box>
                      {data.data.metadata.unreachableAttractions}
                    </Box>
                  </Stack>
                </Box>
              )}
            </Stack>

            <Box height="1px" bg={borderColor} my={{ base: 1, md: 2 }} />

            {/* Top 10 Attractions */}
            <Stack gap={{ base: 1, md: 2 }}>
              <Heading
                size="xs"
                color={textColor}
                fontSize={{ base: "xs", md: "sm" }}
              >
                Top 10 Attractions
              </Heading>
              {data?.data.features
                .slice(0, 10)
                .filter((feature) => feature.properties.is_reachable)
                .map((feature) => (
                  <HStack
                    key={feature.properties.id}
                    justifyContent="space-between"
                    alignItems="center"
                    cursor="pointer"
                    py={{ base: 0.5, md: 1 }}
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
                    <Text
                      fontSize={{ base: "xs", md: "sm" }}
                      color={textColor}
                      maxWidth="70%"
                    >
                      {feature.properties.attraction_name}
                    </Text>
                    {/* Reached by transportations.lenghts */}
                    <Badge
                      colorScheme="blue"
                      variant="subtle"
                      fontSize={{ base: "2xs", md: "xs" }}
                      px={{ base: 1, md: 2 }}
                      py={{ base: 0, md: 1 }}
                      borderRadius="md"
                      minWidth="fit-content"
                    >
                      {feature.properties.transportation_count}{" "}
                      {feature.properties.transportation_count >= 1
                        ? "Transportasi"
                        : "Transportasi"}
                    </Badge>
                  </HStack>
                ))}
            </Stack>
            <Box height="1px" bg={borderColor} my={{ base: 1, md: 2 }} />

            {/* Legends */}
            <Stack gap={{ base: 1, md: 2 }}>
              <Heading
                size="xs"
                color={textColor}
                fontSize={{ base: "xs", md: "sm" }}
              >
                Legenda
              </Heading>
              <HStack gap={{ base: 1, md: 2 }} flexWrap="wrap">
                {Object.entries(filterColors)
                  .filter(([type]) => type !== "ATTRACTION")
                  .map(([type, color]) => (
                    <Box
                      key={type}
                      display="flex"
                      alignItems="center"
                      gap={{ base: 1, md: 2 }}
                      bgColor={cardBgColor}
                      borderWidth="1px"
                      borderColor={color}
                      borderRadius="md"
                      px={{ base: 1, md: 2 }}
                      py={{ base: 0.5, md: 1 }}
                      mb={{ base: 1, md: 2 }}
                      mr={{ base: 1, md: 2 }}
                    >
                      <Box alignContent={"text-center"}>
                        <img
                          src={`https://img.icons8.com/?size=${window.innerWidth < 768 ? 16 : 20}&id=${
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
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        color={textColor}
                      >
                        {type === "ATTRACTION_REACHABLE"
                          ? "Tempat Wisata Terjangkau"
                          : type === "ATTRACTION_UNREACHABLE"
                            ? "Tempat Wisata Tidak Terjangkau"
                            : type === "HARBOR"
                              ? "Pelabuhan"
                              : type === "AIRPORT"
                                ? "Bandara"
                                : type === "TRAIN_STATION"
                                  ? "Stasiun Kereta"
                                  : type === "BUS_STATION"
                                    ? "Stasiun Bus"
                                    : type.charAt(0).toUpperCase() +
                                      type.slice(1).replace(/_/g, " ")}{" "}
                        {" ("}
                        {type === "ATTRACTION_REACHABLE" ||
                        type === "ATTRACTION_UNREACHABLE"
                          ? data?.data.features.filter(
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
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

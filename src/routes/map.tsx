import { createFileRoute } from "@tanstack/react-router";
import { Box, Badge, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  LayerGroup,
  Popup,
  Polygon,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMapColors } from "../hooks/useMapColors";
import { SetMapView } from "../components/map/SetMapView";
import { SidebarFilters } from "../components/map/SidebarFilters";
import { MobileControls } from "../components/map/MobileControls";
import { FilterDrawer } from "../components/map/FilterDrawer";
import { LocationInfoBox } from "../components/map/LocationInfoBox";
import { MapLoadingState } from "../components/map/MapLoadingState";
import NavBar from "../components/NavBar";
import { GetAllTransportationWithFilter } from "@/api/transportation";
import { GetProvinceByName } from "@/api/province";
import { GetBufferAnalysis } from "@/api/buffer-analysis";
import { toaster } from "@/components/ui/toaster";
import { ResultDrawer } from "@/components/map/ResultDrawer";

export const Route = createFileRoute("/map")({
  component: MapPage,
});

// Main Component
function MapPage() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(
    "JAWA TENGAH"
  );
  const [bufferRadius, setBufferRadius] = useState<number>(3000);
  const [attractionType, setAttractionType] = useState<string>("");

  const [activeFilters, setActiveFilters] = useState({
    AIRPORT: true,
    BUS_STATION: true,
    TRAIN_STATION: true,
    HARBOR: true,
  });

  const [activeLayers, setActiveLayers] = useState({
    province: true,
    transportationHubs: false,
    reachableAttractions: true,
    unreachableAttractions: false,
  });

  const { data, isFetching } = GetAllTransportationWithFilter(
    selectedProvince || "JAWA TENGAH",
    activeFilters
  );
  const { data: provinceData, isFetching: isFetchingProvince } =
    GetProvinceByName(selectedProvince || "JAWA TENGAH");
  const { data: bufferData, isFetching: isFetchingBuffer } = GetBufferAnalysis(
    bufferRadius,
    selectedProvince || "JAWA TENGAH",
    attractionType,
    activeFilters
  );

  // Loading states
  const isAnyLoading = isFetching || isFetchingProvince || isFetchingBuffer;
  const loadingSteps = [
    {
      name: "Memuat data provinsi...",
      isComplete: !!provinceData && !isFetchingProvince,
      isCurrent: isFetchingProvince,
    },
    {
      name: "Memuat data transportasi...",
      isComplete: !!data && !isFetching,
      isCurrent: isFetching && !!provinceData,
    },
    {
      name: "Memuat analisis buffer...",
      isComplete: !!bufferData && !isFetchingBuffer,
      isCurrent: isFetchingBuffer && !!data,
    },
  ];

  const completedSteps = loadingSteps.filter((step) => step.isComplete).length;
  const loadingProgress = (completedSteps / loadingSteps.length) * 100;
  const currentLoadingStep =
    loadingSteps.find((step) => step.isCurrent)?.name || "Loading data...";

  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    description?: string;
    type: string;
    attractionType?: string;
    nearbyTransport?: {
      name: string;
      type: string;
    }[];
    isHub?: boolean;
    position?: [number, number];
  } | null>(null);

  const {
    open: mobileFilterOpen,
    onOpen: onMobileFilterOpen,
    onClose: onMobileFilterClose,
  } = useDisclosure();
  const {
    open: mobileResultOpen,
    onOpen: onMobileResultOpen,
    onClose: onMobileResultClose,
  } = useDisclosure();

  const {
    cardBgColor,
    borderColor,
    textColor,
    subtleTextColor,
    mapStyle,
    filterColors,
  } = useMapColors();

  // Auto-close mobile drawers when loading starts
  useEffect(() => {
    if (isAnyLoading) {
      onMobileFilterClose();
      onMobileResultClose();
    }
  }, [isAnyLoading, onMobileFilterClose, onMobileResultClose]);

  // Toggle filter status
  const toggleFilter = (filterName: string) => {
    // Minimum 1 filter must be active
    if (
      Object.values(activeFilters).filter((value) => value).length <= 1 &&
      activeFilters[filterName as keyof typeof activeFilters]
    ) {
      toaster.create({
        title: "Minimal 1 filter transportasi harus aktif",
        type: "error",
        closable: true,
      });
      return;
    }
    setActiveFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName as keyof typeof activeFilters],
    }));
  };

  let showedAttractions: any[] = [];
  if (
    activeLayers.reachableAttractions &&
    bufferData?.data &&
    !activeLayers.unreachableAttractions
  ) {
    showedAttractions = bufferData.data.data.features.filter(
      (feature) => feature.properties.is_reachable
    );
  } else if (
    activeLayers.unreachableAttractions &&
    bufferData?.data &&
    !activeLayers.reachableAttractions
  ) {
    showedAttractions = bufferData.data.data.features.filter(
      (feature) => feature.properties.is_reachable === false
    );
  } else if (
    activeLayers.reachableAttractions &&
    activeLayers.unreachableAttractions &&
    bufferData?.data
  ) {
    showedAttractions = bufferData.data.data.features;
  }

  return (
    <Box position="relative" h="100vh" w="100vw" overflow="hidden">
      <NavBar />

      {/* Map Container */}
      <Box position="relative" height="calc(100vh)" width="100%">
        <MapContainer
          // center={[-1.6037, 117.4158]} // Indonesia center
          center={[-6.7956, 110.3695]} // Central Java center
          zoom={7}
          style={{ height: "100%", width: "100%", zIndex: 1 }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={mapStyle}
          />

          {/* Province Layer */}
          {activeLayers.province && provinceData && (
            <LayerGroup>
              {provinceData.geometry.coordinates.map((polygon, index) => (
                <Polygon
                  key={`province-polygon-${index}`}
                  // @ts-expect-error
                  positions={polygon[0].map((coord: number[]) => [
                    coord[1],
                    coord[0],
                  ])}
                  pathOptions={{
                    fillOpacity: 0.05,
                    color: filterColors.ATTRACTION,
                    weight: 1,
                  }}
                />
              ))}
            </LayerGroup>
          )}

          {/* Transportation Hubs Layers */}
          {activeLayers.transportationHubs && data?.data?.transportations && (
            <LayerGroup>
              {data.data.transportations.map((hub) => (
                <Marker
                  key={`hub-${hub.latitude}-${hub.longitude}`}
                  position={[hub.latitude, hub.longitude]}
                  icon={
                    new L.Icon({
                      iconUrl: `https://img.icons8.com/?size=20&id=${
                        hub.type === "HARBOR"
                          ? "9580"
                          : hub.type === "AIRPORT"
                            ? "12665"
                            : hub.type === "TRAIN_STATION"
                              ? "9361"
                              : "9351"
                      }&format=png&color=${(filterColors[hub.type as keyof typeof filterColors] as string).split("#")[1]}`,
                      iconRetinaUrl: `https://img.icons8.com/?size=100&id=${
                        hub.type === "HARBOR"
                          ? "9580"
                          : hub.type === "AIRPORT"
                            ? "12665"
                            : hub.type === "TRAIN_STATION"
                              ? "9361"
                              : "9351"
                      }&format=png&color=${(filterColors[hub.type as keyof typeof filterColors] as string).split("#")[1]}`,

                      iconSize: [25, 25],
                      iconAnchor: [12, 41],
                      popupAnchor: [0, -41],
                      tooltipAnchor: [12, 0],
                    })
                  }
                  eventHandlers={{
                    click: () => {
                      setSelectedLocation({
                        name: hub.name,
                        type: hub.type,
                        description: hub.province,
                        isHub: true,
                        position: [hub.latitude, hub.longitude],
                      });
                    },
                    mouseover: (e) => {
                      e.target.openPopup();
                    },
                    mouseout: (e) => {
                      e.target.closePopup();
                    },
                  }}
                >
                  <Popup
                    closeButton={false}
                    autoClose={false}
                    className="custom-popup"
                  >
                    <Box p={1}>
                      <Heading size="xs">{hub.name}</Heading>
                      <Text fontSize="xs" mt={1}>
                        {hub.type === "HARBOR"
                          ? "Pelabuhan"
                          : hub.type === "AIRPORT"
                            ? "Bandara"
                            : hub.type === "TRAIN_STATION"
                              ? "Stasiun Kereta"
                              : "Terminal Bus"}
                      </Text>
                    </Box>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          )}

          {/* Attractions Layer */}
          {(activeLayers.reachableAttractions ||
            activeLayers.unreachableAttractions) &&
            showedAttractions && (
              <LayerGroup>
                {showedAttractions.map((attraction) => (
                  <>
                    <Polygon
                      key={`attraction-polygon-${attraction.properties.id}`}
                      positions={attraction.geometry.coordinates[0].map(
                        (coord: number[]) => [coord[1], coord[0]]
                      )}
                      pathOptions={{
                        fillOpacity: 0.01,
                        color: attraction.properties.is_reachable
                          ? filterColors.ATTRACTION_REACHABLE
                          : filterColors.ATTRACTION_UNREACHABLE,
                        weight: 0.05,
                      }}
                    />
                    <Marker
                      key={`attraction-${attraction.properties.id}`}
                      position={[
                        attraction.properties.latitude,
                        attraction.properties.longitude,
                      ]}
                      icon={
                        new L.Icon({
                          iconUrl: `https://img.icons8.com/?size=100&id=62215&format=png&color=${
                            attraction.properties.is_reachable
                              ? (
                                  filterColors.ATTRACTION_REACHABLE as string
                                ).split("#")[1]
                              : (
                                  filterColors.ATTRACTION_UNREACHABLE as string
                                ).split("#")[1]
                          }`,
                          iconRetinaUrl: `https://img.icons8.com/?size=100&id=62215&format=png&color=${
                            attraction.properties.is_reachable
                              ? (
                                  filterColors.ATTRACTION_REACHABLE as string
                                ).split("#")[1]
                              : (
                                  filterColors.ATTRACTION_UNREACHABLE as string
                                ).split("#")[1]
                          }`,
                          iconSize: [25, 25],
                          iconAnchor: [12, 41],
                          popupAnchor: [0, -41],
                          tooltipAnchor: [12, 0],
                        })
                      }
                      eventHandlers={{
                        click: () => {
                          setSelectedLocation({
                            name: attraction.properties.attraction_name,
                            description: `${attraction.properties.province}`,
                            type: "attraction",
                            attractionType:
                              attraction.properties.attraction_type,
                            nearbyTransport:
                              attraction.properties.transportations || [],
                            isHub: false,
                            position: [
                              attraction.properties.latitude,
                              attraction.properties.longitude,
                            ],
                          });
                        },
                        mouseover: (e) => {
                          e.target.openPopup();
                        },
                        mouseout: (e) => {
                          e.target.closePopup();
                        },
                      }}
                    >
                      <Popup
                        closeButton={false}
                        autoClose={false}
                        className="custom-popup"
                      >
                        <Box p={1}>
                          <Heading size="xs">
                            {attraction.properties.attraction_name}
                          </Heading>
                          <Text fontSize="xs" mt={1}>
                            {attraction.properties.province}
                          </Text>
                          {attraction.properties.transportation_count > 0 && (
                            <Badge colorScheme="green" mt={1} size="xs">
                              {attraction.properties.transportation_count}{" "}
                              opsi transportasi
                            </Badge>
                          )}
                        </Box>
                      </Popup>
                    </Marker>
                  </>
                ))}
              </LayerGroup>
            )}

          {selectedLocation?.position && (
            <SetMapView center={selectedLocation.position} />
          )}
        </MapContainer>

        {/* Map Loading State */}
        <MapLoadingState
          isLoading={isAnyLoading}
          loadingSteps={loadingSteps}
          currentStep={currentLoadingStep}
          progress={loadingProgress}
        />
      </Box>

      {/* Sidebar Filters (Desktop) */}
      <SidebarFilters
        activeFilters={activeFilters}
        cardBgColor={cardBgColor}
        borderColor={borderColor}
        textColor={textColor}
        filterColors={filterColors}
        subtleTextColor={subtleTextColor}
        toggleFilter={toggleFilter}
        selectedAttractionType={attractionType}
        setSelectedAttractionType={setAttractionType}
        selectedProvince={selectedProvince!}
        setSelectedProvince={setSelectedProvince}
        data={bufferData?.data}
        selectedBufferRadius={bufferRadius}
        setSelectedBufferRadius={setBufferRadius}
        activeLayers={activeLayers}
        setActiveLayers={setActiveLayers}
        setSelectedLocation={setSelectedLocation}
        transportations={data?.data?.transportations || []}
      />

      {/* Mobile Controls */}
      <MobileControls
        onOpenFilters={onMobileFilterOpen}
        onOpenResult={onMobileResultOpen}
      />

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        open={mobileFilterOpen && !isAnyLoading}
        onOpen={onMobileFilterOpen}
        onClose={onMobileFilterClose}
        activeFilters={activeFilters}
        borderColor={borderColor}
        textColor={textColor}
        subtleTextColor={subtleTextColor}
        filterColors={filterColors}
        toggleFilter={toggleFilter}
        selectedProvince={selectedProvince!}
        setSelectedProvince={setSelectedProvince}
        selectedBufferRadius={bufferRadius}
        setSelectedBufferRadius={setBufferRadius}
        data={bufferData?.data}
        activeLayers={activeLayers}
        setActiveLayers={setActiveLayers}
        cardBgColor={cardBgColor}
        setSelectedLocation={setSelectedLocation}
      />

      {/* Mobile Filter Drawer */}
      <ResultDrawer
        open={mobileResultOpen && !isAnyLoading}
        onOpen={onMobileResultOpen}
        onClose={onMobileResultClose}
        activeFilters={activeFilters}
        borderColor={borderColor}
        textColor={textColor}
        subtleTextColor={subtleTextColor}
        filterColors={filterColors}
        toggleFilter={toggleFilter}
        selectedProvince={selectedProvince!}
        setSelectedProvince={setSelectedProvince}
        selectedBufferRadius={bufferRadius}
        setSelectedBufferRadius={setBufferRadius}
        data={bufferData?.data}
        activeLayers={activeLayers}
        setActiveLayers={setActiveLayers}
        cardBgColor={cardBgColor}
        setSelectedLocation={setSelectedLocation}
        transportations={data?.data?.transportations || []}
      />

      {/* Location Info Popup */}
      <LocationInfoBox
        location={selectedLocation}
        onClose={() => setSelectedLocation(null)}
        textColor={textColor}
        subtleTextColor={subtleTextColor}
        bgColor={cardBgColor}
        borderColor={borderColor}
      />
    </Box>
  );
}

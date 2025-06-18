import { createFileRoute } from "@tanstack/react-router";
import { Box, Badge, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
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
import NavBar from "../components/NavBar";
import { GetAllTransportationWithFilter } from "@/api/transportation";
import { GetProvinceByName } from "@/api/province";
import { GetBufferAnalysis } from "@/api/buffer-analysis";

// Fixes the default icon path issues in Leaflet
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

export const Route = createFileRoute("/map")({
  component: MapPage,
});

// Main Component
function MapPage() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(
    "JAWA TENGAH"
  );
  const [bufferRadius, setBufferRadius] = useState<number>(500);
  
  const [activeFilters, setActiveFilters] = useState({
    AIRPORT: true,
    BUS_STATION: true,
    TRAIN_STATION: true,
    HARBOR: true,
  });
  const { data } = GetAllTransportationWithFilter(
    selectedProvince || "JAWA TENGAH",
    activeFilters
  );
  const { data: provinceData } = GetProvinceByName(
    selectedProvince || "JAWA TENGAH"
  );
  const { data: bufferData } = GetBufferAnalysis(
    bufferRadius,
    selectedProvince || "JAWA TENGAH",
    activeFilters
  );

  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    description?: string;
    type: string;
    nearbyTransport?: string[];
    isHub?: boolean;
    position?: [number, number];
  } | null>(null);


  const { open, onOpen, onClose } = useDisclosure();
  const {
    cardBgColor,
    borderColor,
    textColor,
    subtleTextColor,
    mapStyle,
    filterColors,
  } = useMapColors();

  // Toggle filter status
  const toggleFilter = (filterName: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName as keyof typeof activeFilters],
    }));
  };

  return (
    <Box position="relative" h="100vh">
      <NavBar />

      {/* Map Container */}
      <Box position="relative" height="calc(100vh)" width="100%">
        <MapContainer
          center={[-1.6037, 117.4158]} // Indonesia center
          zoom={5}
          style={{ height: "100%", width: "100%", zIndex: 1 }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={mapStyle}
          />

          {/* Province Layer */}
          {provinceData && (
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
          {data?.data?.transportations && (
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
                          ? "Harbor"
                          : hub.type === "AIRPORT"
                            ? "Airport"
                            : hub.type === "TRAIN_STATION"
                              ? "Train Station"
                              : "Bus Station"}
                      </Text>
                    </Box>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          )}

          {/* Attractions Layer */}
          {bufferData?.data && (
            <LayerGroup>
              {bufferData.data.data.features.map((attraction) => (
                <>
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
                          description: `${attraction.properties.city}, ${attraction.properties.province}`,
                          type: "attraction",
                          nearbyTransport:
                            attraction.properties.transportation_names || [],
                          isHub: false,
                          position: [
                            attraction.properties.latitude,
                            attraction.properties.longitude,
                          ],
                        });
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
                          {attraction.properties.city},{" "}
                          {attraction.properties.province}
                        </Text>
                        {attraction.properties.transportation_count > 0 && (
                          <Badge colorScheme="green" mt={1} size="xs">
                            {attraction.properties.transportation_count}{" "}
                            transport options
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
            <SetMapView center={selectedLocation.position} zoom={10} />
          )}
        </MapContainer>
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
        selectedProvince={selectedProvince!}
        setSelectedProvince={setSelectedProvince}
        data={bufferData?.data}
        selectedBufferRadius={bufferRadius}
        setSelectedBufferRadius={setBufferRadius}
      />

      {/* Mobile Controls */}
      <MobileControls onOpenFilters={onOpen} />

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        activeFilters={activeFilters}
        borderColor={borderColor}
        textColor={textColor}
        subtleTextColor={subtleTextColor}
        filterColors={filterColors}
        toggleFilter={toggleFilter}
        selectedProvince={selectedProvince!}
        setSelectedProvince={setSelectedProvince}
        data={bufferData?.data}
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

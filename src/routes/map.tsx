import { createFileRoute } from "@tanstack/react-router";
import { Box, Badge, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayerGroup,
  CircleMarker,
  Popup,
  Polygon,
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
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export const Route = createFileRoute("/map")({
  component: MapPage,
});

// Main Component
function MapPage() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const { data } = GetAllTransportationWithFilter(selectedProvince || "JAWA TENGAH");
  const { data: provinceData } = GetProvinceByName(selectedProvince || "JAWA TENGAH");
  const { data: bufferData } = GetBufferAnalysis(3000, selectedProvince || "JAWA TENGAH");

  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    description?: string;
    type: string;
    nearbyTransport?: string[];
    isHub?: boolean;
    position?: [number, number];
  } | null>(null);

  const [activeFilters, setActiveFilters] = useState({
    AIRPORT: true,
    BUS_STATION: true,
    TRAIN_STATION: true,
    HARBOR: true,
  });

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
                <CircleMarker
                  key={`hub-${hub.latitude}-${hub.longitude}`}
                  center={[hub.latitude, hub.longitude]}
                  radius={3}
                  pathOptions={{
                    fillColor:
                      filterColors[hub.type as keyof typeof filterColors],
                    fillOpacity: 1,
                    color: "white",
                    weight: 2,
                  }}
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
                        {hub.type.charAt(0).toUpperCase() + hub.type.slice(1)}
                      </Text>
                    </Box>
                  </Popup>
                </CircleMarker>
              ))}
            </LayerGroup>
          )}

          {/* Attractions Layer */}
          {bufferData?.data && (
            <LayerGroup>
              {bufferData.data.data.features.map((attraction) => (
                <>
                <Polygon
                  key={`attraction-${attraction.properties.id}`}
                  positions={attraction.geometry.coordinates[0].map(
                    (coord: number[]) => [coord[1], coord[0]]
                  )}
                  pathOptions={{
                    fillColor: attraction.properties.is_reachable
                      ? "#00FF00" // Green for reachable
                      : "#FF0000", // Red for not reachable
                    fillOpacity: 0.3,
                    color: "white",
                    weight: 0.5,
                  }}
                  eventHandlers={{
                    click: () => {
                      setSelectedLocation({
                        name: attraction.properties.attraction_name,
                        description: `${attraction.properties.city}, ${attraction.properties.province}`,
                        type: "attraction",
                        nearbyTransport:
                          attraction.properties.transportation_names || [],
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
                          {attraction.properties.transportation_count} transport
                          options
                        </Badge>
                      )}
                    </Box>
                  </Popup>
                </Polygon>
                <CircleMarker
                  center={[
                    attraction.properties.latitude,
                    attraction.properties.longitude,
                  ]}
                  pathOptions={{
                    fillColor: attraction.properties.is_reachable
                      ? "#00FF00" // Green for reachable
                      : "#FF0000", // Red for not reachable
                    fillOpacity: 0.3,
                    color: "white",
                    weight: 0.5,
                  }}
                  radius={3}
                ></CircleMarker>
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
        subtleTextColor={subtleTextColor}
        filterColors={filterColors}
        toggleFilter={toggleFilter}
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

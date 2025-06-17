import { createFileRoute } from "@tanstack/react-router";
import { Box, Badge, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayerGroup,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { SAMPLE_DATA } from "../data/sampleData";
import { useMapColors } from "../hooks/useMapColors";
import { SetMapView } from "../components/map/SetMapView";
import { SidebarFilters } from "../components/map/SidebarFilters";
import { MobileControls } from "../components/map/MobileControls";
import { FilterDrawer } from "../components/map/FilterDrawer";
import { LocationInfoBox } from "../components/map/LocationInfoBox";
import NavBar from "../components/NavBar";

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
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    description?: string;
    type: string;
    nearbyTransport?: string[];
    isHub?: boolean;
    position?: [number, number];
  } | null>(null);

  const [activeFilters, setActiveFilters] = useState({
    airport: true,
    bus: true,
    train: true,
    harbor: true,
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
      <Box position="relative" height="calc(100vh - 64px)" width="100%">
        <MapContainer
          center={[-1.6037, 117.4158]} // Indonesia center
          zoom={5}
          style={{ height: "100%", width: "100%", zIndex: 1 }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={mapStyle}
          />
          {/* Attractions Layer */}
          <LayerGroup>
            {SAMPLE_DATA.attractions.map((attraction) => (
              <CircleMarker
                key={`attraction-${attraction.properties.id}`}
                center={[
                  attraction.properties.latitude,
                  attraction.properties.longitude,
                ]}
                radius={6}
                pathOptions={{
                  fillColor: filterColors.attraction,
                  fillOpacity: 1,
                  color: "white",
                  weight: 2,
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
              </CircleMarker>
            ))}
          </LayerGroup>
          {/* Transportation Hubs Layers */}
          {SAMPLE_DATA.transportHubs.map(
            (hub) =>
              activeFilters[hub.type as keyof typeof activeFilters] && (
                <LayerGroup key={`hub-${hub.id}`}>
                  <CircleMarker
                    center={
                      [hub.location[0], hub.location[1]] as [number, number]
                    }
                    radius={8}
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
                          isHub: true,
                          position: [hub.location[0], hub.location[1]] as [
                            number,
                            number,
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
                        <Heading size="xs">{hub.name}</Heading>
                        <Text fontSize="xs" mt={1}>
                          {hub.type.charAt(0).toUpperCase() + hub.type.slice(1)}
                        </Text>
                      </Box>
                    </Popup>
                  </CircleMarker>
                </LayerGroup>
              )
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

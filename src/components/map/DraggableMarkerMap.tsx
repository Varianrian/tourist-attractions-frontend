import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { Box, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon
const defaultIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=32&id=13800&format=png&color=3182ce",
  iconRetinaUrl: "https://img.icons8.com/?size=64&id=13800&format=png&color=3182ce",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface DraggableMarkerMapProps {
  latitude?: number;
  longitude?: number;
  onPositionChange: (lat: number, lng: number) => void;
  height?: string;
}

// Component to handle marker dragging
function DraggableMarker({
  position,
  onPositionChange,
}: {
  position: [number, number];
  onPositionChange: (lat: number, lng: number) => void;
}) {
  const [markerPosition, setMarkerPosition] = useState(position);
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const newPos = marker.getLatLng();
        setMarkerPosition([newPos.lat, newPos.lng]);
        onPositionChange(newPos.lat, newPos.lng);
      }
    },
  };

  useEffect(() => {
    setMarkerPosition(position);
  }, [position]);

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={markerPosition}
      ref={markerRef}
      icon={defaultIcon}
    />
  );
}

// Component to handle map clicks
function MapClickHandler({
  onPositionChange,
}: {
  onPositionChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Component to center map when position changes
function MapCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    if (center[0] !== 0 && center[1] !== 0) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  
  return null;
}

export const DraggableMarkerMap = ({
  latitude = -6.2088,
  longitude = 106.8456,
  onPositionChange,
  height = "300px",
}: DraggableMarkerMapProps) => {
  const [position, setPosition] = useState<[number, number]>([latitude, longitude]);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  useEffect(() => {
    if (latitude && longitude) {
      setPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);

  const handlePositionChange = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onPositionChange(lat, lng);
  };

  // Default center to Jakarta if no coordinates provided
  const defaultCenter: [number, number] = [latitude || -6.2088, longitude || 106.8456];

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      overflow="hidden"
      bg={bgColor}
    >
      <Box
        height={height}
        width="100%"
        position="relative"
      >
        <MapContainer
          center={defaultCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <DraggableMarker
            position={position}
            onPositionChange={handlePositionChange}
          />
          
          <MapClickHandler onPositionChange={handlePositionChange} />
          
          <MapCenter center={position} />
        </MapContainer>
      </Box>
      
      <Box p={2} bg={useColorModeValue("gray.50", "gray.700")}>
        <Text fontSize="xs" color={useColorModeValue("gray.600", "gray.400")}>
          📍 Drag the marker or click on the map to set coordinates
        </Text>
        <Text fontSize="xs" color={useColorModeValue("gray.600", "gray.400")} mt={1}>
          Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
        </Text>
      </Box>
    </Box>
  );
};

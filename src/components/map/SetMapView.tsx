import { useEffect } from "react";
import { useMap } from "react-leaflet";

// Leaflet component to update the map view
export function SetMapView({
  center,
}: {
  center: [number, number];
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

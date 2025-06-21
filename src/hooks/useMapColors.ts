import { useColorModeValue } from "../components/ui/color-mode";
import { customShades } from "../theme/custom-color";
import { type TransportationType } from "@/types/transportation";

export const useMapColors = () => {
  const bgColor = useColorModeValue("white", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subtleTextColor = useColorModeValue("gray.600", "gray.400");
  const mapStyle = useColorModeValue(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  );

  const filterColors: Record<TransportationType | string, string> = {
    AIRPORT: useColorModeValue(
      customShades.orange[500],
      customShades.orange[400]
    ),
    BUS_STATION: useColorModeValue(
      customShades.purple[500],
      customShades.purple[400]
    ),
    TRAIN_STATION: useColorModeValue(
      customShades.blue[500],
      customShades.blue[400]
    ),
    HARBOR: useColorModeValue(customShades.teal[500], customShades.teal[400]),
    ATTRACTION: useColorModeValue(
      customShades.green[500],
      customShades.green[400]
    ),
    ATTRACTION_REACHABLE: useColorModeValue(
      customShades.green[600],
      customShades.green[500]
    ),
    ATTRACTION_UNREACHABLE: useColorModeValue(
      customShades.red[500],
      customShades.red[400]
    ),
  };

  return {
    bgColor,
    cardBgColor,
    borderColor,
    textColor,
    subtleTextColor,
    mapStyle,
    filterColors,
  };
};

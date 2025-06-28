import {
  Badge,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useMapColors } from "@/hooks/useMapColors";
import { typeColors } from "./TransportationFilters";
import type { TransportationType } from "../../types/transportation";

interface TransportationTypeBadgeProps {
  type: TransportationType;
}

export const TransportationTypeBadge = ({ type }: TransportationTypeBadgeProps) => {
  const { filterColors } = useMapColors();

  return (
    <Badge
      colorScheme={typeColors[type].color}
      borderRadius="md"
      px={{ base: 1, md: 2 }}
      py={{ base: 0.5, md: 1 }}
      fontSize={{ base: "2xs", md: "xs" }}
    >
      <HStack columnGap={2}>
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
                    : "62215"
          }&format=png&color=${filterColors[type].split("#")[1]}`}
          alt={type}
          style={{ width: "16px", height: "16px" }}
        />

        <Text display={{ base: "none", md: "inline" }}>
          {typeColors[type].label}
        </Text>
      </HStack>
    </Badge>
  );
};

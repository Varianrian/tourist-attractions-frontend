import {
  HStack,
  Badge,
  Text,
} from "@chakra-ui/react";
import { useMapColors } from "@/hooks/useMapColors";
import { transportationTypeColors } from "./BufferAnalysisFilters";

interface TransportationTypesRendererProps {
  transportations: { name: string; type: string }[];
}

export const TransportationTypesRenderer = ({ 
  transportations 
}: TransportationTypesRendererProps) => {
  const { filterColors } = useMapColors();
  
  if (transportations.length === 0) {
    return (
      <Text fontSize="xs" color="gray.500">
        None
      </Text>
    );
  }

  const uniqueTypes = [...new Set(transportations.map((t) => t.type))];
  
  return (
    <HStack gap={1} flexWrap="wrap">
      {uniqueTypes.map((type, index) => {
        const typeConfig =
          transportationTypeColors[
            type as keyof typeof transportationTypeColors
          ];
        if (!typeConfig) return null;
        return (
          <Badge
            key={index}
            colorScheme={typeConfig.color}
            borderRadius="md"
            px={1}
            py={0.5}
            fontSize="2xs"
          >
            <HStack columnGap={1}>
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
                {typeConfig.label}
              </Text>
            </HStack>
          </Badge>
        );
      })}
    </HStack>
  );
};

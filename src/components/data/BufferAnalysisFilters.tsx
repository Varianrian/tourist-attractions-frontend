import {
  Box,
  VStack,
  Text,
  Input,
  Select,
  Portal,
  SimpleGrid,
  createListCollection,
  HStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { customShades } from "../../theme/custom-color";
import { useMapColors } from "@/hooks/useMapColors";

export const transportationTypeColors = {
  AIRPORT: {
    color: "blue",
    icon: "✈️",
    label: "Airport",
  },
  BUS_STATION: {
    color: "green",
    icon: "🚌",
    label: "Bus Station",
  },
  TRAIN_STATION: {
    color: "orange",
    icon: "🚆",
    label: "Train Station",
  },
  HARBOR: {
    color: "purple",
    icon: "⚓",
    label: "Harbor",
  },
};

export const transportationTypeOptions = createListCollection({
  items: Object.keys(transportationTypeColors).map((type) => ({
    value: type,
    label:
      transportationTypeColors[type as keyof typeof transportationTypeColors]
        .label,
  })),
});

export const provinces = [
  "JAWA TENGAH",
  "JAWA BARAT",
  "JAWA TIMUR",
  "DKI JAKARTA",
  "DI YOGYAKARTA",
  "BANTEN",
];

export const provincesOptions = createListCollection({
  items: provinces.map((province) => ({
    value: province,
    label: province,
  })),
});

interface BufferAnalysisFiltersProps {
  searchTerm: string;
  selectedProvince: string;
  selectedTypes: {
    AIRPORT: boolean;
    BUS_STATION: boolean;
    TRAIN_STATION: boolean;
    HARBOR: boolean;
  };
  bufferRadius: number;
  onSearchChange: (value: string) => void;
  onProvinceChange: (province: string) => void;
  onTypesChange: (types: {
    AIRPORT: boolean;
    BUS_STATION: boolean;
    TRAIN_STATION: boolean;
    HARBOR: boolean;
  }) => void;
  onBufferRadiusChange: (radius: number) => void;
}

export const BufferAnalysisFilters = ({
  searchTerm,
  selectedProvince,
  selectedTypes,
  bufferRadius,
  onSearchChange,
  onProvinceChange,
  onTypesChange,
  onBufferRadiusChange,
}: BufferAnalysisFiltersProps) => {
  const { filterColors } = useMapColors();
  const filterBgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box
      bg={filterBgColor}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      p={{ base: 4, md: 6 }}
      width="100%"
      shadow="sm"
    >
      <VStack gap={6} align="stretch">
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={useColorModeValue("gray.800", "white")}
        >
          Buffer Analysis Settings
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
          <Box>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              mb={3}
              color={useColorModeValue("gray.700", "gray.200")}
            >
              Search Attractions
            </Text>
            <Input
              placeholder="Search by name, city, or province..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              borderColor={inputBorderColor}
              borderWidth="2px"
              borderRadius="md"
              bg={useColorModeValue("white", "gray.700")}
              _hover={{
                borderColor: customShades.green[400],
              }}
              _focus={{
                borderColor: customShades.green[500],
                boxShadow: `0 0 0 1px ${customShades.green[500]}`,
              }}
              size="md"
            />
          </Box>

          <Box>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              mb={3}
              color={useColorModeValue("gray.700", "gray.200")}
            >
              Select Province
            </Text>
            <Select.Root
              collection={provincesOptions}
              size="md"
              value={[selectedProvince]}
              onValueChange={(value) => onProvinceChange(value.value[0])}
            >
              <Select.Control>
                <Select.Trigger
                  borderWidth="2px"
                  borderColor={inputBorderColor}
                  bg={useColorModeValue("white", "gray.700")}
                  _hover={{
                    borderColor: customShades.green[400],
                  }}
                  _focus={{
                    borderColor: customShades.green[500],
                    boxShadow: `0 0 0 1px ${customShades.green[500]}`,
                  }}
                >
                  <Select.ValueText placeholder="Select province" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                  <Select.ClearTrigger />
                </Select.IndicatorGroup>
              </Select.Control>

              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {provincesOptions.items.map((item) => (
                      <Select.Item key={item.value} item={item.label}>
                        {item.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Box>

          <Box>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              mb={3}
              color={useColorModeValue("gray.700", "gray.200")}
            >
              Transportation Types
            </Text>
            <Select.Root
              multiple
              collection={transportationTypeOptions}
              size="md"
              value={Object.entries(selectedTypes)
                .filter(([_, isSelected]) => isSelected)
                .map(([type]) => type)}
              onValueChange={(value) => {
                const newSelectedTypes = {
                  AIRPORT: false,
                  BUS_STATION: false,
                  TRAIN_STATION: false,
                  HARBOR: false,
                };
                value.value.forEach((type) => {
                  newSelectedTypes[type as keyof typeof newSelectedTypes] =
                    true;
                });
                onTypesChange(newSelectedTypes);
              }}
            >
              <Select.Control>
                <Select.Trigger
                  borderWidth="2px"
                  borderColor={inputBorderColor}
                  bg={useColorModeValue("white", "gray.700")}
                  _hover={{
                    borderColor: customShades.green[400],
                  }}
                  _focus={{
                    borderColor: customShades.green[500],
                    boxShadow: `0 0 0 1px ${customShades.green[500]}`,
                  }}
                >
                  <Select.ValueText placeholder="Select transportation types" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>

              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {Object.entries(transportationTypeColors).map(
                      ([type, { label }]) => (
                        <Select.Item key={type} item={type}>
                          <HStack gap={2}>
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
                            <Text>{label}</Text>
                          </HStack>
                          <Select.ItemIndicator />
                        </Select.Item>
                      )
                    )}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Box>

          <Box>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              mb={3}
              color={useColorModeValue("gray.700", "gray.200")}
            >
              Buffer Radius (meters)
            </Text>
            <Input
              type="number"
              placeholder="Buffer radius in meters"
              value={bufferRadius}
              onChange={(e) => {
                onBufferRadiusChange(parseInt(e.target.value) || 3000);
              }}
              borderColor={inputBorderColor}
              borderWidth="2px"
              borderRadius="md"
              bg={useColorModeValue("white", "gray.700")}
              _hover={{
                borderColor: customShades.green[400],
              }}
              _focus={{
                borderColor: customShades.green[500],
                boxShadow: `0 0 0 1px ${customShades.green[500]}`,
              }}
              size="md"
            />
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

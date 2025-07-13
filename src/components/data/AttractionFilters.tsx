import {
  Box,
  VStack,
  Text,
  Input,
  Select,
  Portal,
  SimpleGrid,
  createListCollection,
} from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { customShades } from "../../theme/custom-color";

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

interface AttractionFiltersProps {
  searchTerm: string;
  selectedProvince: string;
  onSearchChange: (value: string) => void;
  onProvinceChange: (province: string) => void;
}

export const AttractionFilters = ({
  searchTerm,
  selectedProvince,
  onSearchChange,
  onProvinceChange,
}: AttractionFiltersProps) => {
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
        <Text fontSize="lg" fontWeight="bold" color={useColorModeValue("gray.800", "white")}>
          Filter Data Tempat Wisata
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" mb={3} color={useColorModeValue("gray.700", "gray.200")}>
              Cari Tempat Wisata
            </Text>
            <Input
              placeholder="Cari berdasarkan nama"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              borderColor={inputBorderColor}
              borderWidth="2px"
              borderRadius="md"
              bg={useColorModeValue("white", "gray.700")}
              _hover={{
                borderColor: customShades.purple[400],
              }}
              _focus={{
                borderColor: customShades.purple[500],
                boxShadow: `0 0 0 1px ${customShades.purple[500]}`,
              }}
              size="md"
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="semibold" mb={3} color={useColorModeValue("gray.700", "gray.200")}>
              Pilih Provinsi
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
                    borderColor: customShades.purple[400],
                  }}
                  _focus={{
                    borderColor: customShades.purple[500],
                    boxShadow: `0 0 0 1px ${customShades.purple[500]}`,
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
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

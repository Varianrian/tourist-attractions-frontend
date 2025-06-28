import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Icon } from "@iconify/react";
import { customShades } from "@/theme/custom-color";

interface DataQualityMetrics {
  total: number;
  withCoordinates: number;
  withProvince: number;
  coordinatesCompleteness: number;
  provinceCompleteness: number;
}

interface DataQualityProps {
  attractions: DataQualityMetrics;
  transportation: DataQualityMetrics;
}

const DataQualityCard = ({ 
  title, 
  data, 
  icon, 
  color 
}: { 
  title: string; 
  data: DataQualityMetrics; 
  icon: string; 
  color: string;
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Card.Root
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      shadow="md"
    >
      <Card.Header>
        <HStack>
          <Icon icon={icon} width="20" height="20" color={color} />
          <Text fontSize="lg" fontWeight="semibold" color={textColor}>
            {title} Data Quality
          </Text>
        </HStack>
      </Card.Header>
      <Card.Body>
        <VStack gap={4} align="stretch">
          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" color={textColor} fontWeight="medium">
                Total Records
              </Text>
              <Text fontSize="sm" color={subTextColor} fontWeight="bold">
                {data.total.toLocaleString()}
              </Text>
            </HStack>
          </Box>

          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" color={textColor} fontWeight="medium">
                Coordinates Completeness
              </Text>
              <Text fontSize="sm" color={subTextColor} fontWeight="bold">
                {data.coordinatesCompleteness}%
              </Text>
            </HStack>
            <Progress.Root
              value={data.coordinatesCompleteness}
              colorScheme="green"
              size="sm"
            >
              <Progress.Track borderRadius="full">
                <Progress.Range borderRadius="full" />
              </Progress.Track>
            </Progress.Root>
            <Text fontSize="xs" color={subTextColor} mt={1}>
              {data.withCoordinates.toLocaleString()} of {data.total.toLocaleString()} records
            </Text>
          </Box>

          <Box>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" color={textColor} fontWeight="medium">
                Province Completeness
              </Text>
              <Text fontSize="sm" color={subTextColor} fontWeight="bold">
                {data.provinceCompleteness}%
              </Text>
            </HStack>
            <Progress.Root
              value={data.provinceCompleteness}
              colorScheme={data.provinceCompleteness > 90 ? "green" : data.provinceCompleteness > 50 ? "yellow" : "red"}
              size="sm"
            >
              <Progress.Track borderRadius="full">
                <Progress.Range borderRadius="full" />
              </Progress.Track>
            </Progress.Root>
            <Text fontSize="xs" color={subTextColor} mt={1}>
              {data.withProvince.toLocaleString()} of {data.total.toLocaleString()} records
            </Text>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export const DataQuality = ({ attractions, transportation }: DataQualityProps) => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
      <DataQualityCard
        title="Attractions"
        data={attractions}
        icon="mdi:map-marker-check"
        color={customShades.blue[500]}
      />
      <DataQualityCard
        title="Transportation"
        data={transportation}
        icon="mdi:bus-check"
        color={customShades.green[500]}
      />
    </SimpleGrid>
  );
};

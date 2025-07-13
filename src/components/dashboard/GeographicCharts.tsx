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

interface ProvinceCount {
  province: string;
  count: string;
}

interface TransportationTypeCount {
  type: string;
  count: string;
}

interface GeographicChartsProps {
  attractionsByProvince: ProvinceCount[];
  transportationByProvince: ProvinceCount[];
  transportationByType: TransportationTypeCount[];
}

const ProvinceChart = ({ 
  data, 
  title, 
  icon, 
  color 
}: { 
  data: ProvinceCount[], 
  title: string, 
  icon: string, 
  color: string 
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  const maxCount = Math.max(...data.map(item => parseInt(item.count)));

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
            {title}
          </Text>
        </HStack>
      </Card.Header>
      <Card.Body>
        <VStack gap={4} align="stretch">
          {data.map((item, index) => (
            <Box key={item.province}>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" color={textColor} fontWeight="medium">
                  {item.province}
                </Text>
                <Text fontSize="sm" color={subTextColor} fontWeight="bold">
                  {parseInt(item.count).toLocaleString()}
                </Text>
              </HStack>
              <Progress.Root
                value={(parseInt(item.count) / maxCount) * 100}
                colorScheme={index === 0 ? "blue" : index === 1 ? "green" : "purple"}
                size="sm"
              >
                <Progress.Track borderRadius="full">
                  <Progress.Range borderRadius="full" />
                </Progress.Track>
              </Progress.Root>
            </Box>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

const TransportationTypeChart = ({ data }: { data: TransportationTypeCount[] }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const typeIcons: Record<string, string> = {
    'BUS_STATION': 'mdi:bus',
    'TRAIN_STATION': 'mdi:train',
    'AIRPORT': 'mdi:airplane',
    'HARBOR': 'mdi:ferry',
  };

  const typeLabels: Record<string, string> = {
    'BUS_STATION': 'Terminal Bus',
    'TRAIN_STATION': 'Stasiun Kereta',
    'AIRPORT': 'Bandara',
    'HARBOR': 'Pelabuhan',
  };

  const typeColors = [
    customShades.blue[500],
    customShades.green[500],
    customShades.purple[500],
    customShades.orange[500],
  ];

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
          <Icon icon="mdi:chart-donut" width="20" height="20" color={customShades.purple[500]} />
          <Text fontSize="lg" fontWeight="semibold" color={textColor}>
            Transportasi Berdasarkan Jenis
          </Text>
        </HStack>
      </Card.Header>
      <Card.Body>
        <SimpleGrid columns={2} gap={4}>
          {data.map((item, index) => (
            <Box
              key={item.type}
              p={4}
              bg={useColorModeValue("gray.50", "gray.700")}
              borderRadius="lg"
              textAlign="center"
            >
              <Icon
                icon={typeIcons[item.type] || 'mdi:help'}
                width="32"
                height="32"
                color={typeColors[index]}
                style={{ margin: '0 auto 8px' }}
              />
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                {parseInt(item.count).toLocaleString()}
              </Text>
              <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
                {typeLabels[item.type] || item.type}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
};

export const GeographicCharts = ({ 
  attractionsByProvince, 
transportationByProvince, 
  transportationByType 
}: GeographicChartsProps) => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} width={"100%"}>
      <ProvinceChart
        data={attractionsByProvince}
        title="Tempat Wisata Berdasarkan Provinsi"
        icon="mdi:map-marker-multiple"
        color={customShades.blue[500]}
      />
      <ProvinceChart
        data={transportationByProvince}
        title="Transportasi Berdasarkan Provinsi"
        icon="mdi:bus-multiple"
        color={customShades.green[500]}
      />
      <Box gridColumn={{ lg: "span 2" }}>
        <TransportationTypeChart data={transportationByType} />
      </Box>
    </SimpleGrid>
  );
};

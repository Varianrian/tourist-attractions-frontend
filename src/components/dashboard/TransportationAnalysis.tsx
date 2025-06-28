import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Icon } from "@iconify/react";
import { customShades } from "@/theme/custom-color";

interface AccessibilityStats {
  accessibility_status: string;
  count: string;
}

interface TransportationByProvince {
  province_name: string;
  transportation_count: string;
}

interface TransportationAnalysisProps {
  accessibilityStats: AccessibilityStats[];
  avgTransportationPerProvince: TransportationByProvince[];
}

const AccessibilityCard = ({ stats }: { stats: AccessibilityStats[] }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const totalAccessibility = stats.reduce((sum, stat) => sum + parseInt(stat.count), 0);
  const accessibleCount = stats.find(s => s.accessibility_status === 'accessible')?.count || '0';
  const accessibilityPercentage = (parseInt(accessibleCount) / totalAccessibility) * 100;

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
          <Icon icon="mdi:wheelchair-accessibility" width="20" height="20" color={customShades.green[500]} />
          <Text fontSize="lg" fontWeight="semibold" color={textColor}>
            Transportation Accessibility
          </Text>
        </HStack>
      </Card.Header>
      <Card.Body>
        <VStack gap={4} align="stretch">
          <Box textAlign="center">
            <Text fontSize="3xl" fontWeight="bold" color={customShades.green[500]}>
              {accessibilityPercentage.toFixed(1)}%
            </Text>
            <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
              Accessibility Rate
            </Text>
          </Box>
          
          <VStack gap={3} align="stretch">
            {stats.map((stat) => (
              <Box key={stat.accessibility_status}>
                <HStack justify="space-between" mb={2}>
                  <HStack>
                    <Badge
                      colorScheme={stat.accessibility_status === 'accessible' ? 'green' : 'red'}
                      variant="subtle"
                    >
                      {stat.accessibility_status === 'accessible' ? 'Accessible' : 'Not Accessible'}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" fontWeight="bold">
                    {parseInt(stat.count).toLocaleString()}
                  </Text>
                </HStack>
                <Progress.Root
                  value={(parseInt(stat.count) / totalAccessibility) * 100}
                  colorScheme={stat.accessibility_status === 'accessible' ? 'green' : 'red'}
                  size="sm"
                >
                  <Progress.Track borderRadius="full">
                    <Progress.Range borderRadius="full" />
                  </Progress.Track>
                </Progress.Root>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

const TransportationByProvinceCard = ({ 
  provinces 
}: { 
  provinces: TransportationByProvince[] 
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  const maxCount = Math.max(...provinces.map(p => parseInt(p.transportation_count)));

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
          <Icon icon="mdi:chart-bar" width="20" height="20" color={customShades.blue[500]} />
          <Text fontSize="lg" fontWeight="semibold" color={textColor}>
            Transportation Distribution
          </Text>
        </HStack>
      </Card.Header>
      <Card.Body>
        <VStack gap={4} align="stretch">
          {provinces.map((province, index) => (
            <Box key={province.province_name}>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" color={textColor} fontWeight="medium">
                  {province.province_name}
                </Text>
                <Text fontSize="sm" color={subTextColor} fontWeight="bold">
                  {parseInt(province.transportation_count).toLocaleString()}
                </Text>
              </HStack>
              <Progress.Root
                value={(parseInt(province.transportation_count) / maxCount) * 100}
                colorScheme={index < 2 ? "blue" : index < 4 ? "green" : "purple"}
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

export const TransportationAnalysis = ({ 
  accessibilityStats, 
  avgTransportationPerProvince 
}: TransportationAnalysisProps) => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
      <AccessibilityCard stats={accessibilityStats} />
      <TransportationByProvinceCard provinces={avgTransportationPerProvince} />
    </SimpleGrid>
  );
};

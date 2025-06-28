import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  SimpleGrid,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Icon } from "@iconify/react";
import { customShades } from "@/theme/custom-color";

interface RecentAttraction {
  id: string;
  province: string;
  name: string;
}

interface RecentTransportation {
  id: string;
  name: string;
  type: string;
}

interface RecentActivityProps {
  recentAttractions: RecentAttraction[];
  recentTransportation: RecentTransportation[];
}

const RecentAttractionsCard = ({ attractions }: { attractions: RecentAttraction[] }) => {
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
          <Icon icon="mdi:map-marker-star" width="20" height="20" color={customShades.blue[500]} />
          <Text fontSize="lg" fontWeight="semibold" color={textColor}>
            Recent Attractions
          </Text>
        </HStack>
      </Card.Header>
      <Card.Body>
        <VStack gap={3} align="stretch">
          {attractions.slice(0, 5).map((attraction) => (
            <Box
              key={attraction.id}
              p={3}
              bg={useColorModeValue("gray.50", "gray.700")}
              borderRadius="lg"
              _hover={{
                bg: useColorModeValue("gray.100", "gray.600"),
              }}
              transition="background 0.2s"
            >
              <Flex justify="space-between" align="start">
                <VStack align="start" gap={1} flex={1}>
                  <Text fontSize="sm" fontWeight="medium" color={textColor} lineClamp={2}>
                    {attraction.name}
                  </Text>
                  <Badge
                    colorScheme="blue"
                    size="sm"
                    variant="subtle"
                  >
                    {attraction.province}
                  </Badge>
                </VStack>
                <Icon
                  icon="mdi:chevron-right"
                  width="16"
                  height="16"
                  color={subTextColor}
                />
              </Flex>
            </Box>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

const RecentTransportationCard = ({ transportation }: { transportation: RecentTransportation[] }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  const typeIcons: Record<string, string> = {
    'BUS_STATION': 'mdi:bus',
    'TRAIN_STATION': 'mdi:train',
    'AIRPORT': 'mdi:airplane',
    'HARBOR': 'mdi:ferry',
  };

  const typeColors: Record<string, string> = {
    'BUS_STATION': 'blue',
    'TRAIN_STATION': 'green',
    'AIRPORT': 'purple',
    'HARBOR': 'orange',
  };

  const typeLabels: Record<string, string> = {
    'BUS_STATION': 'Bus',
    'TRAIN_STATION': 'Train',
    'AIRPORT': 'Airport',
    'HARBOR': 'Harbor',
  };

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
          <Icon icon="mdi:bus-clock" width="20" height="20" color={customShades.green[500]} />
          <Text fontSize="lg" fontWeight="semibold" color={textColor}>
            Recent Transportation
          </Text>
        </HStack>
      </Card.Header>
      <Card.Body>
        <VStack gap={3} align="stretch">
          {transportation.slice(0, 5).map((transport) => (
            <Box
              key={transport.id}
              p={3}
              bg={useColorModeValue("gray.50", "gray.700")}
              borderRadius="lg"
              _hover={{
                bg: useColorModeValue("gray.100", "gray.600"),
              }}
              transition="background 0.2s"
            >
              <Flex justify="space-between" align="start">
                <HStack align="start" flex={1}>
                  <Icon
                    icon={typeIcons[transport.type] || 'mdi:help'}
                    width="16"
                    height="16"
                    color={customShades[typeColors[transport.type] as keyof typeof customShades]?.[500] || customShades.blue[500]}
                  />
                  <VStack align="start" gap={1} flex={1}>
                    <Text fontSize="sm" fontWeight="medium" color={textColor} lineClamp={2}>
                      {transport.name}
                    </Text>
                    <Badge
                      colorScheme={typeColors[transport.type] || 'gray'}
                      size="sm"
                      variant="subtle"
                    >
                      {typeLabels[transport.type] || transport.type}
                    </Badge>
                  </VStack>
                </HStack>
                <Icon
                  icon="mdi:chevron-right"
                  width="16"
                  height="16"
                  color={subTextColor}
                />
              </Flex>
            </Box>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export const RecentActivity = ({ recentAttractions, recentTransportation }: RecentActivityProps) => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
      <RecentAttractionsCard attractions={recentAttractions} />
      <RecentTransportationCard transportation={recentTransportation} />
    </SimpleGrid>
  );
};

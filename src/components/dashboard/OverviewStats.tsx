import { Box, Text, HStack, VStack, Card, SimpleGrid } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Icon } from "@iconify/react";
import { customShades } from "@/theme/custom-color";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  subLabel?: string;
}

export const StatsCard = ({ title, value, icon, color }: StatsCardProps) => {
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
      _hover={{
        transform: "translateY(-2px)",
        shadow: "lg",
      }}
      transition="all 0.2s"
    >
      <Card.Body p={6}>
        <HStack justify="space-between" align="start">
          <VStack align="start" gap={1}>
            <Text fontSize="sm" color={subTextColor} fontWeight="medium">
              {title}
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color={textColor}>
              {typeof value === "number" ? value.toLocaleString() : value}
            </Text>
          </VStack>
          <Box
            p={3}
            bg={`linear-gradient(135deg, ${color}20, ${color}30)`}
            borderRadius="lg"
          >
            <Icon icon={icon} width="24" height="24" color={color} />
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

interface OverviewStatsProps {
  totals: {
    attractions: number;
    transportation: number;
    provinces: number;
  };
}

export const OverviewStats = ({ totals }: OverviewStatsProps) => {
  return (
    <SimpleGrid width="100%" columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
      <StatsCard
        title="Total Attractions"
        value={totals.attractions}
        icon="mdi:map-marker-multiple"
        color={customShades.blue[500]}
        subLabel="Recent"
      />
      <StatsCard
        title="Transportation Points"
        value={totals.transportation}
        icon="mdi:bus-multiple"
        color={customShades.green[500]}
        subLabel="Recent"
      />
      <StatsCard
        title="Provinces"
        value={totals.provinces}
        icon="mdi:map"
        color={customShades.purple[500]}
      />
    </SimpleGrid>
  );
};

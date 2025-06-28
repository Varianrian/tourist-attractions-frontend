import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Container,
  VStack,
  Text,
  Spinner,
  Alert,
  HStack,
} from "@chakra-ui/react";
import { useAuth } from "@/provider/AuthProvider";
import { useColorModeValue } from "@/components/ui/color-mode";
import { customShades } from "@/theme/custom-color";
import { useDashboard } from "@/hooks/useDashboard";
import { OverviewStats } from "@/components/dashboard/OverviewStats";
import { GeographicCharts } from "@/components/dashboard/GeographicCharts";
import { Icon } from "@iconify/react";

export const Route = createFileRoute("/_auth/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: dashboardData, isLoading, error } = useDashboard();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  if (authLoading || isLoading) {
    return (
      <Box
        minH="100vh"
        bg={bgColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap={4}>
          <Spinner size="xl" color={customShades.purple[500]} />
          <Text>Loading dashboard...</Text>
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box minH="100vh" bg={bgColor} py={8}>
        <Container maxW="6xl">
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Title>Error loading dashboard</Alert.Title>
            <Alert.Description>
              {error instanceof Error ? error.message : 'Something went wrong'}
            </Alert.Description>
          </Alert.Root>
        </Container>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box minH="100vh" bg={bgColor} py={8}>
        <Container maxW="6xl">
          <Alert.Root>
            <Alert.Indicator />
            <Alert.Title>No data available</Alert.Title>
            <Alert.Description>
              Dashboard data is not available at the moment.
            </Alert.Description>
          </Alert.Root>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="6xl">
        <VStack gap={8} align="stretch">
          {/* Header */}
          <VStack align="start" gap={1}>
            <HStack gap={3}>
              <Icon 
                icon="mdi:view-dashboard" 
                width="32" 
                height="32" 
                color={customShades.blue[500]} 
              />
              <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                Welcome back, {user?.username}!
              </Text>
            </HStack>
            <Text fontSize="lg" color={subTextColor}>
              Tourist Attractions Analytics Dashboard
            </Text>
            <Text fontSize="sm" color={subTextColor}>
              Last updated: {new Date(dashboardData.metadata.generatedAt).toLocaleString()}
            </Text>
          </VStack>

          {/* Overview Stats */}
          <VStack align="start" gap={4} width={"100%"}>
            <Text fontSize="xl" fontWeight="semibold" color={textColor}>
              Overview
            </Text>
            <OverviewStats 
              totals={dashboardData.overview.totals}
            />
          </VStack>

          {/* Geographic Distribution */}
          <VStack align="start" gap={4} width={"100%"}>
            <Text fontSize="xl" fontWeight="semibold" color={textColor}>
              Geographic Distribution
            </Text>
            <GeographicCharts 
              attractionsByProvince={dashboardData.geographic.attractionsByProvince}
              transportationByProvince={dashboardData.geographic.transportationByProvince}
              transportationByType={dashboardData.geographic.transportationByType}
            />
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}

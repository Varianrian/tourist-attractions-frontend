import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import SegmentedControl from "../../components/ui/SegmentedControl";
import { customColors, customShades } from "../../theme/custom-color";
import { Icon } from "@iconify/react";
import TransportationTable from "@/components/data/table/TransportationTable";
import AttractionTable from "@/components/data/table/AttractionTable";
import BufferAnalysisTable from "@/components/data/table/BufferAnalysisTable";

export const Route = createFileRoute("/_auth/data-management")({
  component: DataManagement,
});

function DataManagement() {
  const [activeTab, setActiveTab] = useState("transportations");

  const textColor = useColorModeValue("gray.800", "white");
  const subtleTextColor = useColorModeValue("gray.600", "gray.400");
  const highlightColor = useColorModeValue(
    customColors.blue,
    customShades.blue[300]
  );
  const bgColor = useColorModeValue("gray.50", "gray.900");

  const tabs = [
    { value: "transportations", label: "Transportasi Umum" },
    { value: "attractions", label: "Tempat Wisata" },
    { value: "analysis", label: "Analisis Buffer" },
  ];

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "transportations":
        return "mdi:bus-multiple";
      case "attractions":
        return "mdi:map-marker-multiple";
      default:
        return "mdi:database";
    }
  };

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case "transportations":
        return "Transportasi Umum"
      case "attractions":
        return "Tempat Wisata";
      case "analysis":
        return "Analisis Buffer";
      default:
        return "Manajemen Data";
    }
  };

  const getTabContent = (tab: string) => {
    switch (tab) {
      case "transportations":
        return <TransportationTable />;
      case "attractions":
        return <AttractionTable />;
      case "analysis":
        return <BufferAnalysisTable />;
      default:
        return <Text>No data available</Text>;
    }
  };

  return (
    <Box color={textColor} minH="100vh" bg={bgColor}>
      <Container
        maxW="container.xl"
        pt={8}
        pb={8}
        px={{ base: 4, md: 6, lg: 8 }}
      >
        <VStack gap={6} align="flex-start" width="100%">
          {/* Header Section */}
          <Box width="100%">
            <HStack gap={3} mb={2}>
              <Icon
                icon="mdi:database-edit"
                width="32"
                height="32"
                color={highlightColor}
              />
              <Heading
                as="h1"
                size={{ base: "lg", md: "xl" }}
                color={textColor}
              >
                Manajemen Data
              </Heading>
            </HStack>
            <Text
              color={subtleTextColor}
              mb={{ base: 4, md: 6 }}
              fontSize={{ base: "sm", md: "md" }}
            >
              Kelola data transportasi dan objek wisata dengan mudah. Pilih tab di bawah untuk mengelola data yang sesuai.
            </Text>

            {/* Tab Navigation */}
            <HStack
              justify="space-between"
              align="center"
              mb={{ base: 4, md: 6 }}
              wrap="wrap"
              gap={4}
            >
              <Box overflowX="auto">
                <SegmentedControl
                  options={tabs}
                  value={activeTab}
                  onChange={setActiveTab}
                />
              </Box>
            </HStack>

            {/* Content Section */}
            <Box width="100%">
              <HStack gap={2} mb={4} align="center">
                <Icon
                  icon={getTabIcon(activeTab)}
                  width="20"
                  height="20"
                  color={highlightColor}
                />
                <Heading
                  as="h2"
                  size={{ base: "sm", md: "md" }}
                  color={highlightColor}
                >
                  {getTabTitle(activeTab)}
                </Heading>
              </HStack>

              {/* Table Content */}
              <Box
                borderRadius="lg"
                width="100%"
                mb={{ base: 4, md: 0 }}
                bg={useColorModeValue("white", "gray.800")}
                shadow="md"
                p={4}
                overflow="hidden"
              >
                {getTabContent(activeTab)}
              </Box>
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Box, Container, Heading, VStack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import SegmentedControl from "../components/ui/SegmentedControl";
import TransportationTable from "../components/data/table/TransportationTable";
import AttractionTable from "@/components/data/table/AttractionTable";
import BufferAnalysisTable from "../components/data/table/BufferAnalysisTable";
import { customColors, customShades } from "../theme/custom-color";
import NavBar from "@/components/NavBar";

export const Route = createFileRoute("/data")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState("transportations");

  const textColor = useColorModeValue("gray.800", "white");
  const subtleTextColor = useColorModeValue("gray.600", "gray.400");
  const highlightColor = useColorModeValue(
    customColors.blue,
    customShades.blue[300]
  );

  const tabs = [
    { value: "transportations", label: "Transportation Hubs" },
    { value: "attractions", label: "Tourist Attractions" },
    { value: "buffer-analysis", label: "Buffer Analysis" },
  ];

  return (
    <Box color={textColor} minH="100vh">
      <NavBar />
      <Container
        maxW="container.xl"
        pt={{ base: 20, md: 24 }}
        pb={8}
        px={{ base: 4, md: 6, lg: 8 }}
      >
        <VStack gap={6} align="flex-start" width="100%">
          <Box width="100%">
            <Heading
              as="h1"
              size={{ base: "lg", md: "xl" }}
              mb={2}
              color={textColor}
            >
              Data Explorer
            </Heading>
            <Text
              color={subtleTextColor}
              mb={{ base: 4, md: 6 }}
              fontSize={{ base: "sm", md: "md" }}
            >
              Browse transportation hubs and tourist attractions data
            </Text>

            <Box mb={{ base: 4, md: 6 }} overflowX="auto" width="100%">
              <SegmentedControl
                options={tabs}
                value={activeTab}
                onChange={setActiveTab}
              />
            </Box>

            {activeTab === "transportations" ? (
              <Box width="100%">
                <Heading
                  as="h2"
                  size={{ base: "sm", md: "md" }}
                  mb={{ base: 2, md: 4 }}
                  color={highlightColor}
                >
                  Transportation Hubs
                </Heading>
                <Box borderRadius="lg" width="100%" mb={{ base: 4, md: 0 }}>
                  <TransportationTable />
                </Box>
              </Box>
            ) : activeTab === "attractions" ? (
              <Box width="100%">
                <Heading
                  as="h2"
                  size={{ base: "sm", md: "md" }}
                  mb={{ base: 2, md: 4 }}
                  color={highlightColor}
                >
                  Tourist Attractions
                </Heading>
                <Box borderRadius="lg" width="100%" mb={{ base: 4, md: 0 }}>
                  <AttractionTable />
                </Box>
              </Box>
            ) : (
              <Box width="100%">
                <Heading
                  as="h2"
                  size={{ base: "sm", md: "md" }}
                  mb={{ base: 2, md: 4 }}
                  color={highlightColor}
                >
                  Buffer Analysis
                </Heading>
                <Box borderRadius="lg" width="100%" mb={{ base: 4, md: 0 }}>
                  <BufferAnalysisTable />
                </Box>
              </Box>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

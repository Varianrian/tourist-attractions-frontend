import {
  Box,
  HStack,
  VStack,
  Text,
  Badge,
  Table,
  Input,
  Button,
  Select,
  Flex,
  Spinner,
  Portal,
  SimpleGrid,
  createListCollection,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { useColorModeValue } from "../ui/color-mode";
import { customShades } from "../../theme/custom-color";
import { GetBufferAnalysis } from "@/api/buffer-analysis";
import { useMapColors } from "@/hooks/useMapColors";

const transportationTypeColors = {
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

const transportationTypeOptions = createListCollection({
  items: Object.keys(transportationTypeColors).map((type) => ({
    value: type,
    label:
      transportationTypeColors[type as keyof typeof transportationTypeColors]
        .label,
  })),
});

const provinces = [
  "JAWA TENGAH",
  "JAWA BARAT",
  "JAWA TIMUR",
  "DKI JAKARTA",
  "DI YOGYAKARTA",
  "BANTEN",
];

const provincesOptions = createListCollection({
  items: provinces.map((province) => ({
    value: province,
    label: province,
  })),
});

const BufferAnalysisTable = () => {
  const { filterColors } = useMapColors();
  // State for filters and frontend pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("JAWA TENGAH");
  const [selectedTypes, setSelectedTypes] = useState<{
    AIRPORT: boolean;
    BUS_STATION: boolean;
    TRAIN_STATION: boolean;
    HARBOR: boolean;
  }>({
    AIRPORT: true,
    BUS_STATION: true,
    TRAIN_STATION: true,
    HARBOR: true,
  });
  const [bufferRadius, setBufferRadius] = useState(3000);
  const [sortBy, setSortBy] = useState("attraction_name");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  // Frontend pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch data using API
  const { data: apiData, isLoading } = GetBufferAnalysis(
    bufferRadius,
    selectedProvince,
    selectedTypes
  );

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBgColor = useColorModeValue(
    customShades.green[50],
    customShades.green[900]
  );
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");
  const filterBgColor = useColorModeValue("gray.50", "gray.700");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");

  // Process and filter data on frontend
  const processedData = useMemo(() => {
    if (!apiData?.data?.data?.features) return [];

    let filtered = apiData.data.data.features.map(
      (feature) => feature.properties
    );

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.attraction_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.province.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal, bVal;

      switch (sortBy) {
        case "attraction_name":
          aVal = a.attraction_name;
          bVal = b.attraction_name;
          break;
        case "city":
          aVal = a.city;
          bVal = b.city;
          break;
        case "province":
          aVal = a.province;
          bVal = b.province;
          break;
        case "transportation_count":
          aVal = a.transportation_count;
          bVal = b.transportation_count;
          break;
        case "is_reachable":
          aVal = a.is_reachable ? 1 : 0;
          bVal = b.is_reachable ? 1 : 0;
          break;
        default:
          aVal = a.attraction_name;
          bVal = b.attraction_name;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "ASC"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortOrder === "ASC"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return filtered;
  }, [apiData, searchTerm, sortBy, sortOrder]);

  // Frontend pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return processedData.slice(startIndex, endIndex);
  }, [processedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSortChange = (newSortBy: string) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(newSortBy);
      setSortOrder("ASC");
    }
    setCurrentPage(1);
  };

  const renderTransportationTypes = (
    transportations: { name: string; type: string }[]
  ) => {
    const uniqueTypes = [...new Set(transportations.map((t) => t.type))];
    return (
      <HStack gap={1} flexWrap="wrap">
        {uniqueTypes.map((type, index) => {
          const typeConfig =
            transportationTypeColors[
              type as keyof typeof transportationTypeColors
            ];
          if (!typeConfig) return null;
          return (
            <Badge
              key={index}
              colorScheme={typeConfig.color}
              borderRadius="md"
              px={1}
              py={0.5}
              fontSize="2xs"
            >
              <HStack columnGap={1}>
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
                <Text display={{ base: "none", md: "inline" }}>
                  {typeConfig.label}
                </Text>
              </HStack>
            </Badge>
          );
        })}
      </HStack>
    );
  };

  return (
    <VStack gap={4} width="100%" align="stretch">
      {/* Filters */}
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
                onChange={(e) => handleSearchChange(e.target.value)}
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
                onValueChange={(value) => handleProvinceChange(value.value[0])}
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
                  setSelectedTypes(newSelectedTypes);
                  setCurrentPage(1);
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
                  setBufferRadius(parseInt(e.target.value) || 3000);
                  setCurrentPage(1);
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

      {/* Summary Statistics */}
      {apiData?.data?.data?.metadata && (
        <Box
          bg={useColorModeValue("blue.50", "blue.900")}
          borderWidth="1px"
          borderRadius="lg"
          borderColor={borderColor}
          p={{ base: 4, md: 6 }}
          width="100%"
        >
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
            <Box textAlign="center">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color={useColorModeValue("blue.600", "blue.300")}
              >
                {apiData.data.data.metadata.totalAttractions}
              </Text>
              <Text
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Total Attractions
              </Text>
            </Box>
            <Box textAlign="center">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color={useColorModeValue("green.600", "green.300")}
              >
                {apiData.data.data.metadata.reachableAttractions}
              </Text>
              <Text
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Reachable
              </Text>
            </Box>
            <Box textAlign="center">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color={useColorModeValue("red.600", "red.300")}
              >
                {apiData.data.data.metadata.unreachableAttractions}
              </Text>
              <Text
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Unreachable
              </Text>
            </Box>
            <Box textAlign="center">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color={useColorModeValue("purple.600", "purple.300")}
              >
                {(apiData.data.data.metadata.bufferRadiusMeters / 1000).toFixed(
                  1
                )}
                km
              </Text>
              <Text
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Buffer Radius
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      )}

      {/* Table */}
      <Box
        borderWidth="1px"
        borderRadius="lg"
        borderColor={borderColor}
        bg={bgColor}
        shadow="sm"
        width="100%"
      >
        <Table.ScrollArea
          height={{ base: "60vh", md: "70vh" }}
          overflowX="auto"
        >
          <Table.Root
            size={{ base: "sm", md: "md" }}
            variant="outline"
            stickyHeader
          >
            <Table.Header>
              <Table.Row bg={headerBgColor}>
                <Table.ColumnHeader
                  minW={{ base: "50px", md: "60px" }}
                  textAlign="center"
                >
                  No
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  minW={{ base: "150px", md: "200px" }}
                  cursor="pointer"
                  onClick={() => handleSortChange("attraction_name")}
                  _hover={{ bg: "blackAlpha.50" }}
                >
                  <HStack>
                    <Text>Attraction Name</Text>
                    {sortBy === "attraction_name" && (
                      <Text>{sortOrder === "ASC" ? "↑" : "↓"}</Text>
                    )}
                  </HStack>
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  minW={{ base: "80px", md: "100px" }}
                  cursor="pointer"
                  onClick={() => handleSortChange("city")}
                  _hover={{ bg: "blackAlpha.50" }}
                >
                  <HStack>
                    <Text>City</Text>
                    {sortBy === "city" && (
                      <Text>{sortOrder === "ASC" ? "↑" : "↓"}</Text>
                    )}
                  </HStack>
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  minW={{ base: "100px", md: "150px" }}
                  display={{ base: "none", md: "table-cell" }}
                  cursor="pointer"
                  onClick={() => handleSortChange("province")}
                  _hover={{ bg: "blackAlpha.50" }}
                >
                  <HStack>
                    <Text>Province</Text>
                    {sortBy === "province" && (
                      <Text>{sortOrder === "ASC" ? "↑" : "↓"}</Text>
                    )}
                  </HStack>
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  minW={{ base: "80px", md: "100px" }}
                  cursor="pointer"
                  onClick={() => handleSortChange("is_reachable")}
                  _hover={{ bg: "blackAlpha.50" }}
                >
                  <HStack>
                    <Text>Reachable</Text>
                    {sortBy === "is_reachable" && (
                      <Text>{sortOrder === "ASC" ? "↑" : "↓"}</Text>
                    )}
                  </HStack>
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  minW={{ base: "80px", md: "100px" }}
                  cursor="pointer"
                  onClick={() => handleSortChange("transportation_count")}
                  _hover={{ bg: "blackAlpha.50" }}
                >
                  <HStack>
                    <Text>Transport Count</Text>
                    {sortBy === "transportation_count" && (
                      <Text>{sortOrder === "ASC" ? "↑" : "↓"}</Text>
                    )}
                  </HStack>
                </Table.ColumnHeader>
                <Table.ColumnHeader minW={{ base: "150px", md: "200px" }}>
                  Transportation Types
                </Table.ColumnHeader>
                <Table.ColumnHeader minW={{ base: "120px", md: "150px" }}>
                  Coordinates
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {isLoading ? (
                <Table.Row>
                  <Table.Cell colSpan={8} textAlign="center" py={8}>
                    <VStack>
                      <Spinner size="lg" />
                      <Text>Loading buffer analysis data...</Text>
                    </VStack>
                  </Table.Cell>
                </Table.Row>
              ) : paginatedData.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={8} textAlign="center" py={8}>
                    <Text color="gray.500">No buffer analysis data found</Text>
                  </Table.Cell>
                </Table.Row>
              ) : (
                paginatedData.map((item, index) => (
                  <Table.Row
                    key={item.id}
                    _hover={{ bg: hoverBgColor }}
                    transition="background-color 0.2s"
                  >
                    <Table.Cell
                      textAlign="center"
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </Table.Cell>
                    <Table.Cell
                      fontWeight="medium"
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <Box>
                        <Text>{item.attraction_name}</Text>
                        {/* Show province on mobile only - since we hide that column */}
                        <Text
                          fontSize="2xs"
                          color="gray.500"
                          display={{ base: "block", md: "none" }}
                        >
                          {item.province}
                        </Text>
                      </Box>
                    </Table.Cell>
                    <Table.Cell fontSize={{ base: "xs", md: "sm" }}>
                      {item.city}
                    </Table.Cell>
                    <Table.Cell display={{ base: "none", md: "table-cell" }}>
                      {item.province}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        colorScheme={item.is_reachable ? "green" : "red"}
                        borderRadius="md"
                        px={{ base: 1, md: 2 }}
                        py={{ base: 0.5, md: 1 }}
                        fontSize={{ base: "2xs", md: "xs" }}
                      >
                        {item.is_reachable ? "✓ Yes" : "✗ No"}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <Badge
                        colorScheme={
                          item.transportation_count > 0 ? "blue" : "gray"
                        }
                        borderRadius="md"
                        px={{ base: 1, md: 2 }}
                        py={{ base: 0.5, md: 1 }}
                        fontSize={{ base: "2xs", md: "xs" }}
                      >
                        {item.transportation_count}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      {item.transportations.length > 0 ? (
                        renderTransportationTypes(item.transportations)
                      ) : (
                        <Text fontSize="xs" color="gray.500">
                          None
                        </Text>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Text fontSize={{ base: "2xs", md: "sm" }}>
                        {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>

      {/* Pagination and Results Summary */}
      <VStack gap={4} width="100%">
        {/* Results Summary and Items per Page */}
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 0 }}
          px={2}
          width="100%"
        >
          <Text fontSize="sm" color="gray.600" fontWeight="medium">
            {isLoading ? (
              <HStack>
                <Spinner size="sm" />
                <Text>Loading...</Text>
              </HStack>
            ) : (
              `Showing ${paginatedData.length} of ${processedData.length} results`
            )}
          </Text>

          <Flex
            align="center"
            gap={4}
            direction={{ base: "column", md: "row" }}
            width={{ base: "100%", md: "auto" }}
          >
            {/* Items per Page Selector */}
            <Flex align="center" gap={2}>
              <Text
                fontSize="sm"
                color="gray.600"
                fontWeight="medium"
                whiteSpace="nowrap"
              >
                Items per page:
              </Text>
              <Select.Root
                collection={createListCollection({
                  items: [10, 20, 50, 100].map((count) => ({
                    value: count.toString(),
                    label: count.toString(),
                  })),
                })}
                size="sm"
                value={[itemsPerPage.toString()]}
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value.value[0]));
                  setCurrentPage(1);
                }}
              >
                <Select.Control>
                  <Select.Trigger
                    borderWidth="1px"
                    borderColor="gray.300"
                    bg={useColorModeValue("white", "gray.700")}
                    _hover={{
                      borderColor: customShades.green[400],
                    }}
                    _focus={{
                      borderColor: customShades.green[500],
                      boxShadow: `0 0 0 1px ${customShades.green[500]}`,
                    }}
                    minW="80px"
                  >
                    <Select.ValueText />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>

                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {[10, 20, 50, 100].map((count) => (
                        <Select.Item key={count} item={count.toString()}>
                          {count}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Flex>

            {/* Page Info */}
            <Text
              fontSize="sm"
              color="gray.600"
              fontWeight="medium"
              whiteSpace="nowrap"
            >
              Page {currentPage} of {totalPages || 1}
            </Text>
          </Flex>
        </Flex>

        {/* Pagination */}
        {totalPages > 1 && (
          <Flex
            justify="center"
            align="center"
            gap={2}
            wrap="wrap"
            width="100%"
          >
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <HStack gap={1} flexWrap="wrap">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber =
                  Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;

                if (pageNumber > totalPages) return null;

                return (
                  <Button
                    key={pageNumber}
                    size="sm"
                    variant={currentPage === pageNumber ? "solid" : "outline"}
                    colorScheme={currentPage === pageNumber ? "green" : "gray"}
                    onClick={() => setCurrentPage(pageNumber)}
                    minW="40px"
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </HStack>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </Flex>
        )}
      </VStack>
    </VStack>
  );
};

export default BufferAnalysisTable;

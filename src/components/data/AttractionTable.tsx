import {
  Box,
  HStack,
  VStack,
  Text,
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
import { useState } from "react";
import { useColorModeValue } from "../ui/color-mode";
import { customShades } from "../../theme/custom-color";
import type { Attraction } from "../../types/attraction";
import { GetAllAttractionsPaginated } from "@/api/attraction";

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

const AttractionTable = () => {
  // State for filters and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("JAWA TENGAH");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch data using API
  const {
    data: apiData,
    isLoading,
  } = GetAllAttractionsPaginated(
    currentPage,
    itemsPerPage,
    sortBy,
    sortOrder,
    selectedProvince,
    searchTerm || undefined
  );

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBgColor = useColorModeValue(
    customShades.purple[50],
    customShades.purple[900]
  );
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");
  const filterBgColor = useColorModeValue("gray.50", "gray.700");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");

  // Use API data if available, otherwise fall back to empty array
  const attractionsData = apiData?.data?.tourist_attractions || [];
  const metaData = apiData?.data?.meta;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
          <Text fontSize="lg" fontWeight="bold" color={useColorModeValue("gray.800", "white")}>
            Filter Tourist Attraction Data
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={3} color={useColorModeValue("gray.700", "gray.200")}>
                Search Attractions
              </Text>
              <Input
                placeholder="Search by name or city..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
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
                  onClick={() => handleSortChange("name")}
                  _hover={{ bg: "blackAlpha.50" }}
                >
                  <HStack>
                    <Text>Name</Text>
                    {sortBy === "name" && (
                      <Text>{sortOrder === "ASC" ? "↑" : "↓"}</Text>
                    )}
                  </HStack>
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  minW={{ base: "100px", md: "120px" }}
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
                <Table.ColumnHeader minW={{ base: "120px", md: "150px" }}>
                  Coordinates
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  minW={{ base: "100px", md: "120px" }}
                  display={{ base: "none", md: "table-cell" }}
                  cursor="pointer"
                  onClick={() => handleSortChange("createdAt")}
                  _hover={{ bg: "blackAlpha.50" }}
                >
                  <HStack>
                    <Text>Created</Text>
                    {sortBy === "createdAt" && (
                      <Text>{sortOrder === "ASC" ? "↑" : "↓"}</Text>
                    )}
                  </HStack>
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {isLoading ? (
                <Table.Row>
                  <Table.Cell colSpan={6} textAlign="center" py={8}>
                    <VStack>
                      <Spinner size="lg" />
                      <Text>Loading attraction data...</Text>
                    </VStack>
                  </Table.Cell>
                </Table.Row>
              ) : attractionsData.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={6} textAlign="center" py={8}>
                    <Text color="gray.500">No attraction data found</Text>
                  </Table.Cell>
                </Table.Row>
              ) : (
                attractionsData.map((item: Attraction, index: number) => (
                  <Table.Row
                    key={item.id}
                    _hover={{ bg: hoverBgColor }}
                    transition="background-color 0.2s"
                  >
                    <Table.Cell textAlign="center" fontSize={{ base: "xs", md: "sm" }}>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </Table.Cell>
                    <Table.Cell
                      fontWeight="medium"
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <Box>
                        <Text>{item.name}</Text>
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
                      <Text fontSize={{ base: "2xs", md: "sm" }}>
                        {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                      </Text>
                    </Table.Cell>
                    <Table.Cell display={{ base: "none", md: "table-cell" }}>
                      <Text fontSize={{ base: "2xs", md: "sm" }}>
                        {formatDate(item.createdAt)}
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
              `Showing ${attractionsData.length} of ${metaData?.total || 0} results`
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
              <Text fontSize="sm" color="gray.600" fontWeight="medium" whiteSpace="nowrap">
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
                      borderColor: customShades.purple[400],
                    }}
                    _focus={{
                      borderColor: customShades.purple[500],
                      boxShadow: `0 0 0 1px ${customShades.purple[500]}`,
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
            {metaData && (
              <Text fontSize="sm" color="gray.600" fontWeight="medium" whiteSpace="nowrap">
                Page {metaData.page} of {metaData.totalPages}
              </Text>
            )}
          </Flex>
        </Flex>

        {/* Pagination */}
        {metaData && metaData.totalPages > 1 && (
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
              {Array.from(
                { length: Math.min(5, metaData.totalPages) },
                (_, i) => {
                  const pageNumber =
                    Math.max(
                      1,
                      Math.min(metaData.totalPages - 4, currentPage - 2)
                    ) + i;

                  if (pageNumber > metaData.totalPages) return null;

                  return (
                    <Button
                      key={pageNumber}
                      size="sm"
                      variant={currentPage === pageNumber ? "solid" : "outline"}
                      colorScheme={currentPage === pageNumber ? "purple" : "gray"}
                      onClick={() => setCurrentPage(pageNumber)}
                      minW="40px"
                    >
                      {pageNumber}
                    </Button>
                  );
                }
              )}
            </HStack>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === metaData.totalPages}
            >
              Next
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(metaData.totalPages)}
              disabled={currentPage === metaData.totalPages}
            >
              Last
            </Button>
          </Flex>
        )}
      </VStack>
    </VStack>
  );
};

export default AttractionTable;

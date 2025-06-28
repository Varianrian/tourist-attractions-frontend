import {
  Box,
  HStack,
  VStack,
  Text,
  Badge,
  Table,
  Spinner,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../ui/color-mode";
import { customShades } from "../../../theme/custom-color";
import { useBufferAnalysis } from "@/hooks/useBufferAnalysis";
import { BufferAnalysisFilters } from "../BufferAnalysisFilters";
import { BufferAnalysisSummary } from "../BufferAnalysisSummary";
import { BufferAnalysisPagination } from "../BufferAnalysisPagination";
import { TransportationTypesRenderer } from "../TransportationTypesRenderer";

const BufferAnalysisTable = () => {
  const {
    // Data
    apiData,
    isLoading,
    paginatedData,
    
    // Filter states
    searchTerm,
    selectedProvince,
    selectedTypes,
    bufferRadius,
    sortBy,
    sortOrder,
    
    // Pagination states
    currentPage,
    totalPages,
    processedData,
    itemsPerPage,
    
    // Handlers
    handleSearchChange,
    handleProvinceChange,
    handleSortChange,
    handleTypesChange,
    handleBufferRadiusChange,
    handlePageChange,
    handleItemsPerPageChange,
  } = useBufferAnalysis();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBgColor = useColorModeValue(
    customShades.green[50],
    customShades.green[900]
  );
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <VStack gap={4} width="100%" align="stretch">
      {/* Filters */}
      <BufferAnalysisFilters
        searchTerm={searchTerm}
        selectedProvince={selectedProvince}
        selectedTypes={selectedTypes}
        bufferRadius={bufferRadius}
        onSearchChange={handleSearchChange}
        onProvinceChange={handleProvinceChange}
        onTypesChange={handleTypesChange}
        onBufferRadiusChange={handleBufferRadiusChange}
      />

      {/* Summary Statistics */}
      <BufferAnalysisSummary metadata={apiData?.data?.data?.metadata} />

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
                      <TransportationTypesRenderer 
                        transportations={item.transportations}
                      />
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
      <BufferAnalysisPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={processedData.length}
        currentPageItems={paginatedData.length}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </VStack>
  );
};

export default BufferAnalysisTable;

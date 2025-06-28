import {
  Box,
  HStack,
  VStack,
  Text,
  Table,
  Spinner,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../ui/color-mode";
import { customShades } from "../../../theme/custom-color";
import type { Transportation } from "../../../types/transportation";
import { useTransportation } from "@/hooks/useTransportation";
import { TransportationFilters } from "../TransportationFilters";
import { TransportationPagination } from "../TransportationPagination";
import { TransportationTypeBadge } from "../TransportationTypeBadge";

const TransportationTable = () => {
  const {
    // Data
    transportationsData,
    metaData,
    isLoading,
    
    // Filter states
    searchTerm,
    selectedProvince,
    selectedTypes,
    sortBy,
    sortOrder,
    currentPage,
    itemsPerPage,
    
    // Handlers
    handleSearchChange,
    handleProvinceChange,
    handleSortChange,
    handleTypesChange,
    handlePageChange,
    handleItemsPerPageChange,
    
    // Utilities
    formatDate,
  } = useTransportation();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBgColor = useColorModeValue(
    customShades.blue[50],
    customShades.blue[900]
  );
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <VStack gap={4} width="100%" align="stretch">
      {/* Filters */}
      <TransportationFilters
        searchTerm={searchTerm}
        selectedProvince={selectedProvince}
        selectedTypes={selectedTypes}
        onSearchChange={handleSearchChange}
        onProvinceChange={handleProvinceChange}
        onTypesChange={handleTypesChange}
      />

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
          borderWidth="1px"
          rounded="md"
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
                  minW={{ base: "120px", md: "180px" }}
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
                  minW={{ base: "80px", md: "120px" }}
                  cursor="pointer"
                  onClick={() => handleSortChange("type")}
                  _hover={{ bg: "blackAlpha.50" }}
                >
                  <HStack>
                    <Text>Type</Text>
                    {sortBy === "type" && (
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
                      <Text>Loading transportation data...</Text>
                    </VStack>
                  </Table.Cell>
                </Table.Row>
              ) : transportationsData.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={6} textAlign="center" py={8}>
                    <Text color="gray.500">No transportation data found</Text>
                  </Table.Cell>
                </Table.Row>
              ) : (
                transportationsData.map((item: Transportation, index: number) => (
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
                        <Text
                          fontSize="2xs"
                          color="gray.500"
                          display={{ base: "block", md: "none" }}
                        >
                          {item.province}
                        </Text>
                      </Box>
                    </Table.Cell>
                    <Table.Cell>
                      <TransportationTypeBadge type={item.type} />
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
      <TransportationPagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={metaData?.total || 0}
        currentPageItems={transportationsData.length}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        metaData={metaData}
      />
    </VStack>
  );
};

export default TransportationTable;

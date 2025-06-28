import {
  Box,
  HStack,
  VStack,
  Text,
  Table,
  Spinner,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { customShades } from "@/theme/custom-color";
import type { Attraction } from "@/types/attraction";
import { useAttraction } from "@/hooks/useAttraction";
import { AttractionFilters } from "../AttractionFilters";
import AttractionPagination from "../AttractionPagination";

const AttractionTable = () => {
  const {
    currentPage,
    searchTerm,
    selectedProvince,
    sortBy,
    sortOrder,
    itemsPerPage,
    attractionsData,
    metaData,
    isLoading,
    handleSearchChange,
    handleProvinceChange,
    handleSortChange,
    handlePageChange,
    handleItemsPerPageChange,
  } = useAttraction();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headerBgColor = useColorModeValue(
    customShades.purple[50],
    customShades.purple[900]
  );
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <VStack gap={4} width="100%" align="stretch">
      {/* Filters */}
      <AttractionFilters
        searchTerm={searchTerm}
        selectedProvince={selectedProvince}
        onSearchChange={handleSearchChange}
        onProvinceChange={handleProvinceChange}
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

      {/* Pagination */}
      <AttractionPagination
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={handleItemsPerPageChange}
        metaData={metaData}
        itemsCount={attractionsData.length}
        isLoading={isLoading}
      />
    </VStack>
  );
};

export default AttractionTable;

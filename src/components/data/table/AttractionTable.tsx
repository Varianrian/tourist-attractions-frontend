import {
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { customShades } from "@/theme/custom-color";
import { useAttraction } from "@/hooks/useAttraction";
import { AttractionFilters } from "../AttractionFilters";
import AttractionPagination from "../AttractionPagination";
import ReusableTable from "../../common/ReusableTable";
import { attractionTableColumns } from "../../config/tableConfigs";

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

  const headerBgColor = useColorModeValue(
    customShades.purple[50],
    customShades.purple[900]
  );

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
      <ReusableTable
        columns={attractionTableColumns}
        data={attractionsData}
        isLoading={isLoading}
        loadingText="Loading attraction data..."
        emptyText="No attraction data found"
        headerBgColor={headerBgColor}
        sortBy={sortBy}
        sortOrder={sortOrder}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onSortChange={handleSortChange}
      />

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

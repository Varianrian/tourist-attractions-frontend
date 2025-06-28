import {
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../ui/color-mode";
import { customShades } from "../../../theme/custom-color";
import { useTransportation } from "@/hooks/useTransportation";
import { TransportationFilters } from "../TransportationFilters";
import { TransportationPagination } from "../TransportationPagination";
import ReusableTable from "../../common/ReusableTable";
import { transportationTableColumns } from "../../config/tableConfigs";

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
  } = useTransportation();

  const headerBgColor = useColorModeValue(
    customShades.blue[50],
    customShades.blue[900]
  );

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
      <ReusableTable
        columns={transportationTableColumns}
        data={transportationsData}
        isLoading={isLoading}
        loadingText="Loading transportation data..."
        emptyText="No transportation data found"
        headerBgColor={headerBgColor}
        sortBy={sortBy}
        sortOrder={sortOrder}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onSortChange={handleSortChange}
      />

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

import {
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../../ui/color-mode";
import { customShades } from "../../../theme/custom-color";
import { useBufferAnalysis } from "@/hooks/useBufferAnalysis";
import { BufferAnalysisFilters } from "../BufferAnalysisFilters";
import { BufferAnalysisSummary } from "../BufferAnalysisSummary";
import { BufferAnalysisPagination } from "../BufferAnalysisPagination";
import ReusableTable from "../../common/ReusableTable";
import { bufferAnalysisTableColumns } from "../../config/tableConfigs";

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
  
  const headerBgColor = useColorModeValue(
    customShades.green[50],
    customShades.green[900]
  );

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
      <ReusableTable
        columns={bufferAnalysisTableColumns}
        data={paginatedData}
        isLoading={isLoading}
        loadingText="Loading buffer analysis data..."
        emptyText="No buffer analysis data found"
        headerBgColor={headerBgColor}
        sortBy={sortBy}
        sortOrder={sortOrder}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onSortChange={handleSortChange}
      />

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

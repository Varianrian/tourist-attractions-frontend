import {
  VStack,
  Box,
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
    <VStack 
      gap={{ base: 2, md: 4 }} 
      width="100%" 
      align="stretch"
      px={{ base: 2, md: 0 }}
    >
      {/* Filters */}
      <Box px={{ base: 0, md: 4 }} width="100%">
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
      </Box>

      {/* Summary Statistics */}
      <Box px={{ base: 0, md: 4 }} width="100%">
        <BufferAnalysisSummary metadata={apiData?.data?.data?.metadata} />
      </Box>

      {/* Table */}
      <Box 
        width="100%" 
        overflowX={{ base: "auto", lg: "visible" }}
        px={{ base: 0, md: 4 }}
      >
        <ReusableTable
          columns={bufferAnalysisTableColumns}
          data={paginatedData}
          isLoading={isLoading}
          loadingText="Loading Data Analisis Buffer, Proses ini bisa memakan waktu beberapa saat..."
          emptyText="No buffer analysis data found"
          headerBgColor={headerBgColor}
          sortBy={sortBy}
          sortOrder={sortOrder}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onSortChange={handleSortChange}
        />
      </Box>

      {/* Pagination and Results Summary */}
      <Box px={{ base: 0, md: 4 }} width="100%">
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
      </Box>
    </VStack>
  );
};

export default BufferAnalysisTable;

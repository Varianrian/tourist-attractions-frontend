import { useState, useMemo } from "react";
import { GetBufferAnalysis } from "@/api/buffer-analysis";

export interface BufferAnalysisFilters {
  searchTerm: string;
  selectedProvince: string;
  selectedTypes: {
    AIRPORT: boolean;
    BUS_STATION: boolean;
    TRAIN_STATION: boolean;
    HARBOR: boolean;
  };
  bufferRadius: number;
  sortBy: string;
  sortOrder: "ASC" | "DESC";
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

export const useBufferAnalysis = () => {
  // State for filters
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

  // Handler functions
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

  const handleTypesChange = (newSelectedTypes: typeof selectedTypes) => {
    setSelectedTypes(newSelectedTypes);
    setCurrentPage(1);
  };

  const handleBufferRadiusChange = (radius: number) => {
    setBufferRadius(radius);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return {
    // Data
    apiData,
    isLoading,
    processedData,
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
    itemsPerPage,
    totalPages,
    
    // Handlers
    handleSearchChange,
    handleProvinceChange,
    handleSortChange,
    handleTypesChange,
    handleBufferRadiusChange,
    handlePageChange,
    handleItemsPerPageChange,
  };
};

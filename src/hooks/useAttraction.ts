import { useState } from "react";
import { GetAllAttractionsPaginated } from "@/api/attraction";

export interface AttractionFilters {
  searchTerm: string;
  selectedProvince: string;
  sortBy: string;
  sortOrder: "ASC" | "DESC";
}

export interface AttractionPaginationState {
  currentPage: number;
  itemsPerPage: number;
}

export const useAttraction = () => {
  // State for filters and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [attractionType, setAttractionType] = useState<string>("");

  // Fetch data using API
  const {
    data: apiData,
    isLoading,
    refetch: refetchAttractions,
    isRefetching
  } = GetAllAttractionsPaginated(
    currentPage,
    itemsPerPage,
    sortBy,
    sortOrder,
    selectedProvince,
    attractionType,
    searchTerm || undefined,
  );

  // Use API data if available
  const attractionsData = apiData?.data?.tourist_attractions || [];
  const metaData = apiData?.data?.meta;

  // Handler functions
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleAttractionTypeChange = (type: string) => {
    setAttractionType(type);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return {
    // Data
    apiData,
    isLoading,
    attractionsData,
    metaData,
    refetchAttractions,
    isRefetching,
    
    // Filter states
    searchTerm,
    selectedProvince,
    attractionType,
    sortBy,
    sortOrder,
    currentPage,
    itemsPerPage,
    
    // Handlers
    handleSearchChange,
    handleProvinceChange,
    handleSortChange,
    handlePageChange,
    handleItemsPerPageChange,
    handleAttractionTypeChange,
    
    // Utilities
    formatDate,
  };
};

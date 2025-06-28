import { useState } from "react";
import { GetAllTransportationsPaginated } from "@/api/transportation";

export interface TransportationFilters {
  searchTerm: string;
  selectedProvince: string;
  selectedTypes: {
    AIRPORT: boolean;
    BUS_STATION: boolean;
    TRAIN_STATION: boolean;
    HARBOR: boolean;
  };
  sortBy: string;
  sortOrder: "ASC" | "DESC";
}

export interface TransportationPaginationState {
  currentPage: number;
  itemsPerPage: number;
}

export const useTransportation = () => {
  // State for filters and pagination
  const [currentPage, setCurrentPage] = useState(1);
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
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [itemsPerPage, setItemsPerPage] = useState(50);

  // Fetch data using API
  const {
    data: apiData,
    isLoading,
  } = GetAllTransportationsPaginated(
    currentPage,
    itemsPerPage,
    sortBy,
    sortOrder,
    selectedProvince,
    selectedTypes,
    searchTerm || undefined
  );

  // Use API data if available
  const transportationsData = apiData?.data?.transportations || [];
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

  const handleDelete = (id: string) => {
    // Implement delete logic here
  };

  return {
    // Data
    apiData,
    isLoading,
    transportationsData,
    metaData,
    
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
  };
};

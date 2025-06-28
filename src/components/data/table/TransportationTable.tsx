import { useState } from "react";
import { VStack, HStack, Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { useColorModeValue } from "../../ui/color-mode";
import { customShades, customColors } from "../../../theme/custom-color";
import { useTransportation } from "@/hooks/useTransportation";
import { TransportationFilters } from "../TransportationFilters";
import { TransportationPagination } from "../TransportationPagination";
import ReusableTable from "../../common/ReusableTable";
import { createTransportationTableColumns } from "../../config/tableConfigs";
import { TransportationDialog } from "../../data-management/TransportationDialog";
import type { Transportation } from "@/types/transportation";
import { useAuth } from "@/provider/AuthProvider";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";

const TransportationTable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransport, setSelectedTransport] =
    useState<Transportation | null>(null);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const { user } = useAuth();

  const isDataManagement =
    window.location.pathname.includes("/data-management") && user !== null;

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

  const highlightColor = useColorModeValue(
    customColors.blue,
    customShades.blue[300]
  );

  const handleCreate = () => {
    setSelectedTransport(null);
    setDialogMode("create");
    setIsDialogOpen(true);
  };

  const handleSave = async (data: Partial<Transportation>) => {
    try {
      if (dialogMode === "create") {
        // TODO: Implement create API call
        console.log("Create transportation:", data);
        alert("Create functionality will be implemented with API integration");
      } else {
        // TODO: Implement update API call
        console.log("Update transportation:", data);
        alert("Update functionality will be implemented with API integration");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!selectedTransport) return;

    try {
      // TODO: Implement delete API call
      console.log("Delete transportation:", selectedTransport.id);
      alert("Delete functionality will be implemented with API integration");
    } catch (error) {
      throw error;
    }
  };

  return (
    <VStack gap={4} width="100%" align="stretch">
      {isDataManagement && (
        <HStack justify="flex-end" width="100%" px={4} pt={4}>
          <Button
            size="md"
            colorScheme="blue"
            onClick={handleCreate}
            bg={highlightColor}
            color="white"
            _hover={{
              bg: useColorModeValue(customColors.blue, customShades.blue[400]),
              transform: "translateY(-1px)",
            }}
            shadow="md"
            transition="all 0.2s"
          >
            <Icon icon="mdi:plus" width="16" height="16" />
            Add Transportation Hub
          </Button>
        </HStack>
      )}

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
        columns={createTransportationTableColumns(
          // Edit
          (transportation) => {
            setSelectedTransport(transportation);
            setDialogMode("edit");
            setIsDialogOpen(true);
          },
          // Delete
          (transportation) => {
            console.log("Delete transportation:", transportation);
            setSelectedTransport(transportation);
            setIsConfirmationDialogOpen(true);

            console.log("isConfirmationDialogOpen:", isConfirmationDialogOpen);
          },
          isDataManagement
        )}
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

      {/* Dialog */}
      {isDataManagement && (
        <>
          <ConfirmationDialog
            isOpen={isConfirmationDialogOpen}
            onClose={() => setIsConfirmationDialogOpen(false)}
            onConfirm={handleDelete}
            title="Delete Transportation Hub"
            message="Are you sure you want to delete this transportation hub?"
            variant="danger"
          />
          <TransportationDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSave={handleSave}
            initialData={selectedTransport || undefined}
            mode={dialogMode}
          />
        </>
      )}
    </VStack>
  );
};

export default TransportationTable;

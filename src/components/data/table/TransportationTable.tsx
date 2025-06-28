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
import {
  CreateTransportation,
  DeleteTransportation,
  UpdateTransportation,
} from "@/api/transportation";
import { toaster } from "@/components/ui/toaster";

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
    refetchTransportations,
    isRefetching,

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
        try {
          await CreateTransportation(data);
        } catch (error: any) {
          console.error("Error creating transportation:", error);
          toaster.create({
            title: "Error",
            description: `Gagal membuat sarana transportasi: ${error.response.data.message || error.message}`,
            type: "error",
            closable: true,
          });
          return;
        }
        setIsDialogOpen(false);
        setSelectedTransport(null);
        refetchTransportations(); // Refresh the data after creation
        toaster.create({
          title: "Success",
          description: "Transportation hub created successfully",
          type: "success",
          closable: true,
        });
      } else {
        try {
          await UpdateTransportation(selectedTransport?.id!, data);
        } catch (error: any) {
          console.error("Error updating transportation:", error);
          toaster.create({
            title: "Error",
            description: `Gagal memperbarui sarana transportasi: ${error.response.data.message || error.message}`,
            type: "error",
            closable: true,
          });
          return;
        }
        setIsDialogOpen(false);
        setSelectedTransport(null);
        refetchTransportations(); // Refresh the data after update
        toaster.create({
          title: "Success",
          description: "Transportation hub updated successfully",
          type: "success",
          closable: true,
        });
      }
    } catch (error) {
      console.error("Error saving transportation:", error);
      toaster.create({
        title: "Error",
        description: `Gagal menyimpan sarana transportasi`,
        type: "error",
        closable: true,
      });
      throw error; // Re-throw the error to be handled by the parent component if needed
    }
  };

  const handleDelete = async () => {
    if (!selectedTransport) return;

    try {
      await DeleteTransportation(selectedTransport.id);
      setIsConfirmationDialogOpen(false);
      setSelectedTransport(null);
      refetchTransportations(); // Refresh the data after deletion
      toaster.create({
        title: "Success",
        description: "Transportation hub deleted successfully",
        type: "success",
        closable: true,
      });
    } catch (error: any) {
      console.error("Error deleting transportation:", error);
      toaster.create({
        title: "Error",
        description: `Gagal menghapus sarana transportasi: ${error.response.data.message || error.message}`,
        type: "error",
        closable: true,
      });
    }
    setIsConfirmationDialogOpen(false);
    setSelectedTransport(null);
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
            console.log("Edit transportation:", transportation);
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
        isLoading={isLoading || isRefetching}
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
            title="Hapus Sarana Transportasi"
            message={`Apakah Anda yakin ingin menghapus sarana transportasi ini (${selectedTransport?.name})?`}
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

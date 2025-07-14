import { useState } from "react";
import { VStack, HStack, Button, Box, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { useColorModeValue } from "../../ui/color-mode";
import { customShades, customColors } from "../../../theme/custom-color";
import { useTransportation } from "@/hooks/useTransportation";
import { TransportationFilters } from "../TransportationFilters";
import { TransportationPagination } from "../TransportationPagination";
import ReusableTable from "../../common/ReusableTable";
import { createTransportationTableColumns } from "../../config/tableConfigs";
import { TransportationDialog } from "../../data-management/TransportationDialog";
import { TransportationImportExportDialog } from "../../data-management/TransportationImportExportDialog";
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
  const [isImportExportDialogOpen, setIsImportExportDialogOpen] = useState(false);
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

  const handleImportExport = () => {
    setIsImportExportDialogOpen(true);
  };

  const handleSave = async (data: Partial<Transportation>) => {
    try {
      if (dialogMode === "create") {
        try {
          await CreateTransportation(data);
        } catch (error: any) {
          console.error("Error creating transportation:", error);
          throw error; // Re-throw the error to be handled by the parent component if needed
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
          throw error; // Re-throw the error to be handled by the parent component if needed
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
    <VStack 
      gap={{ base: 2, md: 4 }} 
      width="100%" 
      align="stretch"
      px={{ base: 2, md: 0 }}
    >
      {isDataManagement && (
        <VStack 
          width="100%" 
          px={{ base: 2, md: 4 }} 
          pt={{ base: 2, md: 4 }} 
          gap={{ base: 2, md: 2 }}
          align={{ base: "stretch", md: "flex-end" }}
        >
          <HStack 
            justify={{ base: "center", md: "flex-end" }} 
            width="100%" 
            gap={2}
            flexDirection={{ base: "column", sm: "row" }}
          >
            <Button
              size={{ base: "sm", md: "md" }}
              colorScheme="blue"
              onClick={handleImportExport}
              bg={highlightColor}
              color="white"
              _hover={{
                bg: useColorModeValue(customColors.blue, customShades.blue[400]),
                transform: "translateY(-1px)",
              }}
              shadow="md"
              transition="all 0.2s"
              width={{ base: "100%", sm: "auto" }}
              fontSize={{ base: "sm", md: "md" }}
            >
              <Icon icon="mdi:file-import" width="16" height="16" />
              <Text as="span" display={{ base: "none", sm: "inline" }}>Bulk </Text>
              Import/Export
            </Button>
            <Button
              size={{ base: "sm", md: "md" }}
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
              width={{ base: "100%", sm: "auto" }}
              fontSize={{ base: "sm", md: "md" }}
            >
              <Icon icon="mdi:plus" width="16" height="16" />
              <Text as="span" display={{ base: "none", sm: "inline" }}>Tambah </Text>
              Transportasi
            </Button>
          </HStack>
        </VStack>
      )}

      {/* Filters */}
      <Box px={{ base: 0, md: 4 }} width="100%">
        <TransportationFilters
          searchTerm={searchTerm}
          selectedProvince={selectedProvince}
          selectedTypes={selectedTypes}
          onSearchChange={handleSearchChange}
          onProvinceChange={handleProvinceChange}
          onTypesChange={handleTypesChange}
        />
      </Box>

      {/* Table */}
      <Box 
        width="100%" 
        overflowX={{ base: "auto", lg: "visible" }}
        px={{ base: 0, md: 4 }}
      >
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
              setSelectedTransport(transportation);
              setIsConfirmationDialogOpen(true);
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
      </Box>

      {/* Pagination and Results Summary */}
      <Box px={{ base: 0, md: 4 }} width="100%">
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
      </Box>

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
          <TransportationImportExportDialog
            isOpen={isImportExportDialogOpen}
            onClose={() => setIsImportExportDialogOpen(false)}
            onImportSuccess={() => {
              refetchTransportations();
              setIsImportExportDialogOpen(false);
            }}
          />
        </>
      )}
    </VStack>
  );
};

export default TransportationTable;

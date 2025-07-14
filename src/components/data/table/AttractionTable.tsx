import {
  VStack,
  HStack,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { customShades } from "@/theme/custom-color";
import { useAttraction } from "@/hooks/useAttraction";
import { useAuth } from "@/provider/AuthProvider";
import { CreateAttraction, UpdateAttraction, DeleteAttraction } from "@/api/attraction";
import { toaster } from "@/components/ui/toaster";
import { AttractionFilters } from "../AttractionFilters";
import AttractionPagination from "../AttractionPagination";
import ReusableTable from "../../common/ReusableTable";
import { attractionTableColumns, createAttractionTableColumns } from "../../config/tableConfigs";
import { AttractionDialog } from "../../data-management/AttractionDialog";
import { AttractionImportExportDialog } from "../../data-management/AttractionImportExportDialog";
import { ConfirmationDialog } from "../../common/ConfirmationDialog";
import type { Attraction } from "@/types/attraction";

const AttractionTable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImportExportDialogOpen, setIsImportExportDialogOpen] = useState(false);
  const [selectedAttraction, setSelectedAttraction] =
    useState<Attraction | null>(null);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const { user } = useAuth();

  const isDataManagement =
    window.location.pathname.includes("/data-management") && user !== null;

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
    refetchAttractions,
    isRefetching,
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

  const handleCreate = () => {
    setSelectedAttraction(null);
    setDialogMode("create");
    setIsDialogOpen(true);
  };

  const handleImportExport = () => {
    setIsImportExportDialogOpen(true);
  };

  const handleSave = async (data: Partial<Attraction>) => {
    try {
      if (dialogMode === "create") {
        try {
          await CreateAttraction(data);
        } catch (error: any) {
          console.error("Error creating attraction:", error);
          throw error;
        }
        setIsDialogOpen(false);
        setSelectedAttraction(null);
        refetchAttractions(); // Refresh the data after creation
        toaster.create({
          title: "Success",
          description: "Tourist attraction created successfully",
          type: "success",
          closable: true,
        });
      } else {
        try {
          if (!selectedAttraction?.id) throw new Error("No attraction ID found");
          await UpdateAttraction(selectedAttraction.id, data);
        } catch (error: any) {
          console.error("Error updating attraction:", error);
          throw error;
        }
        setIsDialogOpen(false);
        setSelectedAttraction(null);
        refetchAttractions(); // Refresh the data after update
        toaster.create({
          title: "Success",
          description: "Tourist attraction updated successfully",
          type: "success",
          closable: true,
        });
      }
    } catch (error) {
      console.error("Error saving attraction:", error);
      toaster.create({
        title: "Error",
        description: `Gagal menyimpan tempat wisata`,
        type: "error",
        closable: true,
      });
      throw error; // Re-throw the error to be handled by the parent component if needed
    }
  };

  const handleDelete = async () => {
    if (!selectedAttraction) return;

    try {
      await DeleteAttraction(selectedAttraction.id);
      setIsConfirmationDialogOpen(false);
      setSelectedAttraction(null);
      refetchAttractions(); // Refresh the data after deletion
      toaster.create({
        title: "Success",
        description: "Tourist attraction deleted successfully",
        type: "success",
        closable: true,
      });
    } catch (error: any) {
      console.error("Error deleting attraction:", error);
      toaster.create({
        title: "Error",
        description: `Gagal menghapus tempat wisata: ${error.response?.data?.message || error.message}`,
        type: "error",
        closable: true,
      });
    }
    setIsConfirmationDialogOpen(false);
    setSelectedAttraction(null);
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
              colorPalette="purple"
              onClick={handleImportExport}
              width={{ base: "100%", sm: "auto" }}
              fontSize={{ base: "sm", md: "md" }}
            >
              <Icon icon="mdi:file-import" />
              <Text as="span" display={{ base: "none", sm: "inline" }}>Bulk </Text>
              Import/Export
            </Button>
            <Button
              size={{ base: "sm", md: "md" }}
              colorPalette="purple"
              onClick={handleCreate}
              width={{ base: "100%", sm: "auto" }}
              fontSize={{ base: "sm", md: "md" }}
            >
              <Icon icon="mdi:plus" />
              <Text as="span" display={{ base: "none", sm: "inline" }}>Tambah </Text>
              Tempat Wisata
            </Button>
          </HStack>
        </VStack>
      )}

      {/* Filters */}
      <Box px={{ base: 0, md: 4 }} width="100%">
        <AttractionFilters
          searchTerm={searchTerm}
          selectedProvince={selectedProvince}
          onSearchChange={handleSearchChange}
          onProvinceChange={handleProvinceChange}
        />
      </Box>

      {/* Table */}
      <Box 
        width="100%" 
        overflowX={{ base: "auto", lg: "visible" }}
        px={{ base: 0, md: 4 }}
      >
        <ReusableTable
          columns={isDataManagement ? createAttractionTableColumns(
            // Edit
            (attraction) => {
              console.log("Edit attraction:", attraction);
              setSelectedAttraction(attraction);
              setDialogMode("edit");
              setIsDialogOpen(true);
            },
            // Delete
            (attraction) => {
              console.log("Delete attraction:", attraction);
              setSelectedAttraction(attraction);
              setIsConfirmationDialogOpen(true);
            },
            isDataManagement
          ) : attractionTableColumns}
          data={attractionsData}
          isLoading={isLoading || isRefetching}
          loadingText="Loading attraction data..."
          emptyText="No attraction data found"
          headerBgColor={headerBgColor}
          sortBy={sortBy}
          sortOrder={sortOrder}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onSortChange={handleSortChange}
        />
      </Box>

      {/* Pagination */}
      <Box px={{ base: 0, md: 4 }} width="100%">
        <AttractionPagination
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={handleItemsPerPageChange}
          metaData={metaData}
          itemsCount={attractionsData.length}
          isLoading={isLoading}
        />
      </Box>

      {/* Dialog */}
      {isDataManagement && (
        <>
          <ConfirmationDialog
            isOpen={isConfirmationDialogOpen}
            onClose={() => setIsConfirmationDialogOpen(false)}
            onConfirm={handleDelete}
            title="Hapus Tempat Wisata"
            message={`Apakah Anda yakin ingin menghapus tempat wisata ini (${selectedAttraction?.name})?`}
            variant="danger"
          />
          <AttractionDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSave={handleSave}
            initialData={selectedAttraction || undefined}
            mode={dialogMode}
          />
          <AttractionImportExportDialog
            isOpen={isImportExportDialogOpen}
            onClose={() => setIsImportExportDialogOpen(false)}
            onImportSuccess={() => {
              refetchAttractions();
              setIsImportExportDialogOpen(false);
            }}
          />
        </>
      )}
    </VStack>
  );
};

export default AttractionTable;

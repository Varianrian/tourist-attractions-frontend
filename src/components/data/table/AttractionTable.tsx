import {
  VStack,
  HStack,
  Button,
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
import { ConfirmationDialog } from "../../common/ConfirmationDialog";
import type { Attraction } from "@/types/attraction";

const AttractionTable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    <VStack gap={4} width="100%" align="stretch">
      {isDataManagement && (
        <HStack justify="flex-end" width="100%" px={4} pt={4}>
          <Button
            colorPalette="purple"
            onClick={handleCreate}
          >
            <Icon icon="mdi:plus" />
            Add Attraction
          </Button>
        </HStack>
      )}

      {/* Filters */}
      <AttractionFilters
        searchTerm={searchTerm}
        selectedProvince={selectedProvince}
        onSearchChange={handleSearchChange}
        onProvinceChange={handleProvinceChange}
      />

      {/* Table */}
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

      {/* Pagination */}
      <AttractionPagination
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={handleItemsPerPageChange}
        metaData={metaData}
        itemsCount={attractionsData.length}
        isLoading={isLoading}
      />

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
        </>
      )}
    </VStack>
  );
};

export default AttractionTable;

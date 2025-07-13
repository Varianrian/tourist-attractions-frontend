import { useState } from "react";
import {
  VStack,
  Box,
  Text,
  Button,
  Dialog,
  Portal,
  CloseButton,
  Alert,
  FileUpload,
  Icon,
  Separator,
} from "@chakra-ui/react";
import { LuUpload, LuDownload, LuFileSpreadsheet } from "react-icons/lu";
import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import {
  ExportAllTransportations,
  ImportExampleTransportations,
  ImportTransportations,
} from "@/api/transportation";

interface TransportationImportExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess?: () => void;
  trigger?: React.ReactNode;
}

export const TransportationImportExportDialog = ({
  isOpen,
  onClose,
  onImportSuccess,
  trigger,
}: TransportationImportExportDialogProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const textColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleExport = async () => {
    setIsExporting(true);
    setError("");

    try {
      const response = await ExportAllTransportations();
      
      // Create blob and download
      const blob = new Blob([response.data as any], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `transportation-data-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toaster.create({
        title: "Success",
        description: "Transportation data exported successfully",
        type: "success",
        closable: true,
      });
    } catch (err: any) {
      setError("Failed to export transportation data");
      toaster.create({
        title: "Error",
        description: "Failed to export transportation data",
        type: "error",
        closable: true,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadTemplate = async () => {
    setIsDownloadingTemplate(true);
    setError("");

    try {
      const response = await ImportExampleTransportations();
      
      // Create blob and download
      const blob = new Blob([response.data as any], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "transportation-import-template.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toaster.create({
        title: "Success",
        description: "Import template downloaded successfully",
        type: "success",
        closable: true,
      });
    } catch (err: any) {
      setError("Failed to download import template");
      toaster.create({
        title: "Error",
        description: "Failed to download import template",
        type: "error",
        closable: true,
      });
    } finally {
      setIsDownloadingTemplate(false);
    }
  };

  const handleImport = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select a file to import");
      return;
    }

    const file = selectedFiles[0];
    
    // Validate file
    if (!file || file.size === 0) {
      setError("Please select a valid Excel file");
      return;
    }

    if (!file.name.endsWith('.xlsx')) {
      setError("Please select a valid Excel file (.xlsx)");
      return;
    }

    setIsImporting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("FormData contents:", {
        file: file,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      await ImportTransportations(formData);

      toaster.create({
        title: "Success",
        description: "Transportation data imported successfully",
        type: "success",
        closable: true,
      });

      setSelectedFiles([]);
      onImportSuccess?.();
      onClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to import transportation data";
      setError(errorMessage);
      
      // Create a more detailed error message for the toaster
      const lines = errorMessage.split('\n');
      const toasterMessage = lines.length > 1 ? lines.join(' | ') : errorMessage;
      
      toaster.create({
        title: "Import Error",
        description: toasterMessage,
        type: "error",
        closable: true,
        duration: 10000, // Longer duration for error messages
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleFileChange = (files: File[]) => {
    setSelectedFiles(files);
    setError("");
  };

  const handleCancel = () => {
    setSelectedFiles([]);
    setError("");
    onClose();
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      placement="center"
    >
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="2xl" mx={4}>
            <Dialog.Header>
              <Dialog.Title>Import/Export Data Transportasi</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <VStack gap={6} align="stretch">
                {error && (
                  <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Description>
                      {error.split('\n').map((line, index) => (
                        <div key={index}>
                          {line}
                          {index < error.split('\n').length - 1 && <br />}
                        </div>
                      ))}
                    </Alert.Description>
                  </Alert.Root>
                )}

                {/* Export Section */}
                <Box>
                  <Text fontSize="lg" fontWeight="semibold" mb={3} color={textColor}>
                    Export Data
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={4}>
                    Ekspor semua data transportasi ke file Excel
                  </Text>
                  <Button
                    onClick={handleExport}
                    loading={isExporting}
                    loadingText="Exporting..."
                    colorPalette="green"
                    size="md"
                  >
                    <LuDownload />
                    Export to Excel
                  </Button>
                </Box>

                <Separator />

                {/* Import Section */}
                <Box>
                  <Text fontSize="lg" fontWeight="semibold" mb={3} color={textColor}>
                    Import Data
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={4}>
                    Impor data transportasi dari file Excel. Pastikan file sesuai dengan format yang telah ditentukan.
                  </Text>

                  {/* Download Template Button */}
                  <Button
                    onClick={handleDownloadTemplate}
                    loading={isDownloadingTemplate}
                    loadingText="Downloading..."
                    variant="outline"
                    size="md"
                    mb={4}
                  >
                    <LuFileSpreadsheet />
                    Download Import Template
                  </Button>

                  {/* File Upload Dropzone */}
                  <FileUpload.Root
                    maxW="full"
                    alignItems="stretch"
                    maxFiles={1}
                    accept=".xlsx"
                    onFileChange={(details) => handleFileChange(details.acceptedFiles)}
                  >
                    <FileUpload.HiddenInput />
                    <FileUpload.Dropzone
                      bg={bgColor}
                      border="2px dashed"
                      borderColor={borderColor}
                      borderRadius="md"
                      p={8}
                      textAlign="center"
                      _hover={{
                        borderColor: "blue.400",
                        bg: useColorModeValue("blue.50", "blue.900"),
                      }}
                      transition="all 0.2s"
                    >
                      <Icon size="xl" color="gray.400" mb={4}>
                        <LuUpload />
                      </Icon>
                      <FileUpload.DropzoneContent>
                        <Box fontSize="md" fontWeight="medium" mb={2}>
                          Drag and drop Excel file here
                        </Box>
                        <Box color="gray.500" fontSize="sm">
                          Only .xlsx files are accepted
                        </Box>
                      </FileUpload.DropzoneContent>
                    </FileUpload.Dropzone>
                    <FileUpload.List />
                  </FileUpload.Root>

                  {/* Import Button */}
                  {selectedFiles.length > 0 && (
                    <Button
                      onClick={handleImport}
                      loading={isImporting}
                      loadingText="Importing..."
                      colorPalette="blue"
                      size="md"
                      mt={4}
                    >
                      <LuUpload />
                      Import Data
                    </Button>
                  )}
                </Box>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isExporting || isDownloadingTemplate || isImporting}
                >
                  Batal
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

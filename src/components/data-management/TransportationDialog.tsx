import { useState } from "react";
import {
  VStack,
  Box,
  Text,
  Input,
  Alert,
  Button,
  Dialog,
  Portal,
  CloseButton,
  Select,
  createListCollection,
  Tabs,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { Transportation } from "@/types/transportation";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { DraggableMarkerMap } from "@/components/map/DraggableMarkerMap";

interface TransportationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Transportation>) => Promise<void>;
  initialData?: Partial<Transportation>;
  mode: "create" | "edit";
  trigger?: React.ReactNode;
}

const transportationTypes = [
  { value: "BUS_STATION", label: "Terminal Bus" },
  { value: "TRAIN_STATION", label: "Stasiun Kereta" },
  { value: "AIRPORT", label: "Bandara" },
  { value: "HARBOR", label: "Pelabuhan" },
];

const transportationOptions = createListCollection({
  items: transportationTypes.map((type) => ({
    value: type.value,
    label: type.label,
  })),
});

export const TransportationDialog = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
  trigger,
}: TransportationDialogProps) => {
  const [formData, setFormData] = useState<
    Omit<Partial<Transportation>, "latitude" | "longitude"> & {
      latitude: string;
      longitude: string;
    }
  >({
    name: initialData?.name || "",
    type: initialData?.type || "BUS_STATION",
    latitude: initialData?.latitude?.toString() || "",
    longitude: initialData?.longitude?.toString() || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        type: initialData.type || "BUS_STATION",
        latitude: initialData.latitude?.toString() || "",
        longitude: initialData.longitude?.toString() || "",
      });
    }
  }, [initialData]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const textColor = useColorModeValue("gray.800", "white");
  const inputBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(""); // Clear error when user types
  };

  const handleCoordinateChange = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString(),
    }));
    setError(""); // Clear error when coordinates change
  };

  const validateForm = () => {
    if (!formData.name?.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.type) {
      setError("Type is required");
      return false;
    }
    if (formData.latitude && isNaN(Number(formData.latitude))) {
      setError("Latitude must be a valid number");
      return false;
    }
    if (formData.longitude && isNaN(Number(formData.longitude))) {
      setError("Longitude must be a valid number");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const dataToSave: Partial<Transportation> = {
        ...formData,
        latitude: formData.latitude ? Number(formData.latitude) : undefined,
        longitude: formData.longitude ? Number(formData.longitude) : undefined,
      };

      if (mode === "edit" && initialData) {
        dataToSave.id = initialData.id; // Ensure ID is included for updates
      }

      await onSave(dataToSave);

      // Reset form on successful save
      if (mode === "create") {
        setFormData({
          name: "",
          type: "BUS_STATION",
          province: "",
          latitude: "",
          longitude: "",
        });
      }

      // onClose();
    } catch (err) {
      setError(
        err instanceof AxiosError
          ? err.response?.data.message
          : "Gagal menyimpan data transportasi",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      type: "BUS_STATION",
      province: "",
      latitude: "",
      longitude: "",
    });
    setError("");
    onClose();
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      placement={"center"}
    >
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="lg" mx={4}>
            <Dialog.Header>
              <Dialog.Title>
                {mode === "create"
                  ? "Tambahkan Data Transportasi"
                  : "Edit Data Transportasi"}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <VStack gap={4} align="stretch">
                {error && (
                  <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Description>{error}</Alert.Description>
                  </Alert.Root>
                )}

                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    mb={2}
                    color={textColor}
                  >
                    Nama *
                  </Text>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Masukkan nama pusat transportasi"
                    bg={inputBg}
                    borderColor={borderColor}
                  />
                </Box>

                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    mb={2}
                    color={textColor}
                  >
                    Jenis Transportasi *
                  </Text>
                  <Select.Root
                    collection={transportationOptions}
                    value={[formData.type as string]}
                    onValueChange={(value) =>
                      handleInputChange("type", value.value[0])
                    }
                  >
                    <Select.Control>
                      <Select.Trigger bg={inputBg} borderColor={borderColor}>
                        <Select.ValueText placeholder="Pilih jenis transportasi" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>

                    <Select.Positioner>
                      <Select.Content>
                        {transportationOptions.items.map((item) => (
                          <Select.Item key={item.value} item={item.value}>
                            {item.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                </Box>

                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    mb={2}
                    color={textColor}
                  >
                    Koordinat Lokasi *
                  </Text>
                  <Tabs.Root defaultValue="map" size="sm">
                    <Tabs.List>
                      <Tabs.Trigger value="map">Pilih dari Peta</Tabs.Trigger>
                      <Tabs.Trigger value="manual">Input Manual</Tabs.Trigger>
                    </Tabs.List>
                    
                    <Tabs.Content value="manual" pt={3}>
                      <VStack gap={3} align="stretch">
                        <Box>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            mb={2}
                            color={textColor}
                          >
                            Latitude
                          </Text>
                          <Input
                            value={formData.latitude}
                            onChange={(e) =>
                              handleInputChange("latitude", e.target.value)
                            }
                            placeholder="Enter latitude"
                            type="number"
                            step="any"
                            bg={inputBg}
                            borderColor={borderColor}
                          />
                        </Box>

                        <Box>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            mb={2}
                            color={textColor}
                          >
                            Longitude
                          </Text>
                          <Input
                            value={formData.longitude}
                            onChange={(e) =>
                              handleInputChange("longitude", e.target.value)
                            }
                            placeholder="Enter longitude"
                            type="number"
                            step="any"
                            bg={inputBg}
                            borderColor={borderColor}
                          />
                        </Box>
                      </VStack>
                    </Tabs.Content>
                    
                    <Tabs.Content value="map" pt={3}>
                      <Box>
                        <DraggableMarkerMap
                          latitude={formData.latitude ? Number(formData.latitude) : undefined}
                          longitude={formData.longitude ? Number(formData.longitude) : undefined}
                          onPositionChange={handleCoordinateChange}
                          height="250px"
                        />
                      </Box>
                    </Tabs.Content>
                  </Tabs.Root>
                </Box>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="blue"
                onClick={handleSave}
                loading={isLoading}
                loadingText="Saving..."
              >
                {mode === "create" ? "Create" : "Update"}
              </Button>
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

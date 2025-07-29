import {
  Dialog,
  Portal,
  CloseButton,
  Button,
  VStack,
  Box,
  Input,
  Text,
  Tabs,
  Alert,
  Select,
  createListCollection
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { Attraction } from "@/types/attraction";
import { DraggableMarkerMap } from "@/components/map/DraggableMarkerMap";
import { AxiosError } from "axios";

interface AttractionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Attraction>) => Promise<void>;
  initialData?: Partial<Attraction>;
  mode: "create" | "edit";
  trigger?: React.ReactNode;
}

const attractionTypes = [
  { value: "NATURAL", label: "Wisata Alam" },
  { value: "CULTURAL", label: "Wisata Budaya" },
  { value: "ARTIFICIAL", label: "Wisata Buatan" },
];

const attractionOptions = createListCollection({
  items: attractionTypes.map((type) => ({
    value: type.value,
    label: type.label,
  })),
});

export const AttractionDialog = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
  trigger,
}: AttractionDialogProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "NATURAL",
    latitude: initialData?.latitude?.toString() || "",
    longitude: initialData?.longitude?.toString() || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        type: initialData.type || "NATURAL",
        latitude: initialData.latitude?.toString() || "",
        longitude: initialData.longitude?.toString() || "",
      });
      console.log("Initial data set in form:", initialData);
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
    if (!formData.name.trim()) {
      setError("Name is required");
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
      const dataToSave: Partial<Attraction> = {
        ...formData,
        type: formData.type as Attraction["type"], // Cast to correct type
        latitude: formData.latitude ? Number(formData.latitude) : undefined,
        longitude: formData.longitude ? Number(formData.longitude) : undefined,
      };

      await onSave(dataToSave);

      // Reset form on successful save
      setFormData({
        name: "",
        latitude: "",
        type: "NATURAL",
        longitude: "",
      });

      onClose();
    } catch (err) {
      console.error("Error saving attraction data:", err);
      setError(
        err instanceof AxiosError
          ? err.response?.data.message
          : "Failed to save attraction data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      type: "NATURAL",
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
                  ? "Tambah Data Tempat Wisata"
                  : "Edit Data Tempat Wisata"}
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
                    mb={2}
                    fontSize="sm"
                    fontWeight="medium"
                    color={textColor}
                  >
                    Nama *
                  </Text>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Masukkan nama tempat wisata"
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
                    Jenis Tempat Wisata *
                  </Text>
                  <Select.Root
                    collection={attractionOptions}
                    value={[formData.type as string]}
                    onValueChange={(value) =>
                      handleInputChange("type", value.value[0])
                    }
                  >
                    <Select.Control>
                      <Select.Trigger bg={inputBg} borderColor={borderColor}>
                        <Select.ValueText placeholder="Pilih jenis tempat wisata" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>

                    <Select.Positioner>
                      <Select.Content>
                        {attractionOptions.items.map((item) => (
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
                      <Tabs.Trigger value="map">Pilih Peta</Tabs.Trigger>
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
                          latitude={
                            formData.latitude
                              ? Number(formData.latitude)
                              : undefined
                          }
                          longitude={
                            formData.longitude
                              ? Number(formData.longitude)
                              : undefined
                          }
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
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="purple"
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

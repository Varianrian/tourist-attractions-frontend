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
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { Transportation } from "@/types/transportation";
import { useEffect } from "react";
import { AxiosError } from "axios";

interface TransportationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Transportation>) => Promise<void>;
  initialData?: Partial<Transportation>;
  mode: "create" | "edit";
  trigger?: React.ReactNode;
}

const transportationTypes = [
  { value: "BUS_STATION", label: "Bus Station" },
  { value: "TRAIN_STATION", label: "Train Station" },
  { value: "AIRPORT", label: "Airport" },
  { value: "HARBOR", label: "Harbor" },
];

const provinces = [
  "JAWA TENGAH",
  "JAWA BARAT",
  "JAWA TIMUR",
  "BANTEN",
  "DKI JAKARTA",
  "DI YOGYAKARTA",
];

const transportationOptions = createListCollection({
  items: transportationTypes.map((type) => ({
    value: type.value,
    label: type.label,
  })),
});

const provincesOptions = createListCollection({
  items: provinces.map((province) => ({
    value: province,
    label: province,
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
    province: initialData?.province || "",
    latitude: initialData?.latitude?.toString() || "",
    longitude: initialData?.longitude?.toString() || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        type: initialData.type || "BUS_STATION",
        province: initialData.province || "",
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

  const validateForm = () => {
    if (!formData.name?.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.type) {
      setError("Type is required");
      return false;
    }
    if (!formData.province?.trim()) {
      setError("Province is required");
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
          : "Failed to save transportation data"
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
                  ? "Add Transportation Hub"
                  : "Edit Transportation Hub"}
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
                    Name *
                  </Text>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter transportation hub name"
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
                    Type *
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
                        <Select.ValueText placeholder="Select transportation type" />
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
                    Province *
                  </Text>
                  <Select.Root
                    collection={provincesOptions}
                    value={[formData.province as string]}
                    onValueChange={(value) =>
                      handleInputChange("province", value.value[0])
                    }
                  >
                    <Select.Control>
                      <Select.Trigger bg={inputBg} borderColor={borderColor}>
                        <Select.ValueText placeholder="Select province" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>

                    <Select.Positioner>
                      <Select.Content>
                        {provincesOptions.items.map((item) => (
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

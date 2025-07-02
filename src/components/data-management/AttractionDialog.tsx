import {
  Dialog,
  Portal,
  CloseButton,
  Button,
  VStack,
  Box,
  Input,
  Text,
  Select
} from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { Attraction } from "@/types/attraction";

interface AttractionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Attraction>) => Promise<void>;
  initialData?: Partial<Attraction>;
  mode: "create" | "edit";
  trigger?: React.ReactNode;
}

const provinces = [
  "JAWA TENGAH",
  "JAWA BARAT",
  "JAWA TIMUR",
  "BANTEN",
  "DKI JAKARTA",
  "DI YOGYAKARTA",
];

const provincesOptions = createListCollection({
  items: provinces.map((province) => ({
    value: province,
    label: province,
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
    city: initialData?.city || "",
    province: initialData?.province || "",
    latitude: initialData?.latitude?.toString() || "",
    longitude: initialData?.longitude?.toString() || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        city: initialData.city || "",
        province: initialData.province || "",
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

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.city.trim()) {
      setError("City is required");
      return false;
    }
    if (!formData.province.trim()) {
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
      const dataToSave: Partial<Attraction> = {
        ...formData,
        latitude: formData.latitude ? Number(formData.latitude) : undefined,
        longitude: formData.longitude ? Number(formData.longitude) : undefined,
      };

      await onSave(dataToSave);

      // Reset form on successful save
      setFormData({
        name: "",
        city: "",
        province: "",
        latitude: "",
        longitude: "",
      });

      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save attraction data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      city: "",
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
                  ? "Add Tourist Attraction"
                  : "Edit Tourist Attraction"}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <VStack gap={4} align="stretch">
                {error && (
                  <Text color="red.500" fontSize="sm">
                    {error}
                  </Text>
                )}

                <Box>
                  <Text
                    mb={2}
                    fontSize="sm"
                    fontWeight="medium"
                    color={textColor}
                  >
                    Name
                  </Text>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter attraction name"
                    bg={inputBg}
                    borderColor={borderColor}
                  />
                </Box>

                <Box>
                  <Text
                    mb={2}
                    fontSize="sm"
                    fontWeight="medium"
                    color={textColor}
                  >
                    City
                  </Text>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Enter city name"
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
                          <Select.Item
                            key={item.value}
                            item={item.value}
                          >
                            <Select.ItemText>
                              {item.label}
                            </Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                </Box>

                <Box>
                  <Text
                    mb={2}
                    fontSize="sm"
                    fontWeight="medium"
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
                    mb={2}
                    fontSize="sm"
                    fontWeight="medium"
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

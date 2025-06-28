import {
  Button,
  Dialog,
  Portal,
  CloseButton,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useState } from "react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: ConfirmationDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          colorScheme: "red" as const,
          icon: "mdi:alert-circle-outline",
          iconColor: "red.500",
        };
      case "warning":
        return {
          colorScheme: "yellow" as const,
          icon: "mdi:alert-outline",
          iconColor: "yellow.500",
        };
      case "info":
        return {
          colorScheme: "blue" as const,
          icon: "mdi:information-outline",
          iconColor: "blue.500",
        };
      default:
        return {
          colorScheme: "red" as const,
          icon: "mdi:alert-circle-outline",
          iconColor: "red.500",
        };
    }
  };

  const { colorScheme, icon, iconColor } = getVariantStyles();
  const textColor = useColorModeValue("gray.800", "white");

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);
      await onConfirm();
      onClose();
    } catch (error) {
      // Error handling is done by the parent component
      console.error("Confirmation action failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="md" mx={4}>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <VStack gap={4} align="stretch">
                <HStack gap={3}>
                  <Icon
                    icon={icon}
                    width="24"
                    height="24"
                    color={iconColor}
                    style={{ flexShrink: 0 }}
                  />
                  <Text color={textColor} fontSize="sm">
                    {message}
                  </Text>
                </HStack>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer>
              <HStack justify="flex-end" gap={3}>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    {cancelText}
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  colorPalette={colorScheme}
                  onClick={handleConfirm}
                  loading={isSubmitting}
                  loadingText="Processing..."
                >
                  {confirmText}
                </Button>
              </HStack>
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

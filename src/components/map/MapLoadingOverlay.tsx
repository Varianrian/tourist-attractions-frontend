import { Box, VStack, Spinner, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

interface MapLoadingOverlayProps {
  isVisible: boolean;
  loadingText?: string;
}

export const MapLoadingOverlay = ({ 
  isVisible, 
  loadingText = "Loading map data..." 
}: MapLoadingOverlayProps) => {
  const overlayBg = useColorModeValue("rgba(255, 255, 255, 0.9)", "rgba(0, 0, 0, 0.8)");
  const textColor = useColorModeValue("gray.800", "white");

  if (!isVisible) return null;

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg={overlayBg}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
      backdropFilter="blur(2px)"
    >
      <VStack gap={4}>
        <Spinner
          size="xl"
          colorPalette="purple"
        />
        <Text
          fontSize="lg"
          fontWeight="medium"
          color={textColor}
          textAlign="center"
        >
          {loadingText}
        </Text>
      </VStack>
    </Box>
  );
};

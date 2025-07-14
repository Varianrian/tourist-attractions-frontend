import { Box, VStack, HStack, Spinner, Text } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

interface MapLoadingStateProps {
  isLoading: boolean;
  loadingSteps?: {
    name: string;
    isComplete: boolean;
    isCurrent: boolean;
  }[];
  currentStep?: string;
  progress?: number;
}

export const MapLoadingState = ({ 
  isLoading, 
  loadingSteps, 
  currentStep = "Loading data...",
  progress 
}: MapLoadingStateProps) => {
  const overlayBg = useColorModeValue("rgba(255, 255, 255, 0.95)", "rgba(0, 0, 0, 0.85)");
  const textColor = useColorModeValue("gray.800", "white");
  const subtleTextColor = useColorModeValue("gray.600", "gray.300");
  const completedColor = useColorModeValue("green.500", "green.400");
  const currentColor = useColorModeValue("blue.500", "blue.400");

  if (!isLoading) return null;

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
      backdropFilter="blur(3px)"
    >
      <VStack 
        gap={6} 
        bg={useColorModeValue("white", "gray.800")}
        p={8}
        borderRadius="xl"
        boxShadow="xl"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        minW="320px"
      >
        <VStack gap={3}>
          <Spinner
            size="xl"
            colorPalette="blue"
          />
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color={textColor}
            textAlign="center"
          >
            {currentStep}
          </Text>
        </VStack>

        {progress !== undefined && (
          <Box w="100%">
            <Progress.Root
              value={progress}
              colorPalette="blue"
              size="sm"
            >
              <Progress.Track borderRadius="full">
                <Progress.Range borderRadius="full" />
              </Progress.Track>
            </Progress.Root>
            <Text 
              fontSize="sm" 
              color={subtleTextColor} 
              textAlign="center" 
              mt={1}
            >
              {Math.round(progress)}%
            </Text>
          </Box>
        )}

        {loadingSteps && loadingSteps.length > 0 && (
          <VStack gap={2} w="100%" align="stretch">
            {loadingSteps.map((step, index) => (
              <HStack key={index} gap={3}>
                <Box
                  w="20px"
                  h="20px"
                  borderRadius="full"
                  bg={
                    step.isComplete 
                      ? completedColor 
                      : step.isCurrent 
                        ? currentColor 
                        : useColorModeValue("gray.200", "gray.600")
                  }
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  {step.isComplete ? (
                    <Text color="white" fontSize="xs" fontWeight="bold">✓</Text>
                  ) : step.isCurrent ? (
                    <Spinner size="xs" color="white" />
                  ) : (
                    <Text 
                      color={useColorModeValue("gray.500", "gray.400")} 
                      fontSize="xs"
                    >
                      {index + 1}
                    </Text>
                  )}
                </Box>
                <Text
                  fontSize="sm"
                  color={
                    step.isComplete || step.isCurrent 
                      ? textColor 
                      : subtleTextColor
                  }
                  fontWeight={step.isCurrent ? "medium" : "normal"}
                >
                  {step.name}
                </Text>
              </HStack>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

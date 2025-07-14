import { Box, VStack, HStack, Skeleton } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

interface FilterLoadingSkeletonProps {
  isVisible: boolean;
}

export const FilterLoadingSkeleton = ({ isVisible }: FilterLoadingSkeletonProps) => {
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (!isVisible) return null;

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg={cardBgColor}
      borderRadius="md"
      border="1px solid"
      borderColor={borderColor}
      p={4}
      zIndex={10}
    >
      <VStack gap={4} align="stretch">
        {/* Province Filter Skeleton */}
        <Box>
          <Skeleton height="20px" width="120px" mb={2} />
          <Skeleton height="40px" width="100%" />
        </Box>

        {/* Buffer Radius Skeleton */}
        <Box>
          <Skeleton height="20px" width="100px" mb={2} />
          <Skeleton height="40px" width="100%" />
        </Box>

        {/* Transportation Filters Skeleton */}
        <Box>
          <Skeleton height="20px" width="150px" mb={3} />
          <VStack gap={2} align="stretch">
            {[1, 2, 3, 4].map((item) => (
              <HStack key={item} justify="space-between">
                <HStack>
                  <Skeleton height="20px" width="20px" borderRadius="md" />
                  <Skeleton height="16px" width="80px" />
                </HStack>
                <Skeleton height="16px" width="30px" />
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Layer Filters Skeleton */}
        <Box>
          <Skeleton height="20px" width="130px" mb={3} />
          <VStack gap={2} align="stretch">
            {[1, 2, 3, 4].map((item) => (
              <HStack key={item} justify="space-between">
                <HStack>
                  <Skeleton height="20px" width="20px" borderRadius="md" />
                  <Skeleton height="16px" width="120px" />
                </HStack>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Summary Stats Skeleton */}
        <Box>
          <Skeleton height="20px" width="80px" mb={3} />
          <VStack gap={2} align="stretch">
            {[1, 2, 3].map((item) => (
              <Box key={item}>
                <HStack justify="space-between" mb={1}>
                  <Skeleton height="14px" width="100px" />
                  <Skeleton height="14px" width="40px" />
                </HStack>
                <Skeleton height="8px" width="100%" borderRadius="md" />
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Action Buttons Skeleton */}
        <VStack gap={2} mt={4}>
          <Skeleton height="40px" width="100%" borderRadius="md" />
          <Skeleton height="40px" width="100%" borderRadius="md" />
        </VStack>
      </VStack>
    </Box>
  );
};

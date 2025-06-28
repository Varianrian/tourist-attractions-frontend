import {
  VStack,
  Flex,
  Text,
  Button,
  HStack,
  Spinner,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { customShades } from "../../theme/custom-color";

interface BufferAnalysisPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  currentPageItems: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export const BufferAnalysisPagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  currentPageItems,
  isLoading,
  onPageChange,
  onItemsPerPageChange,
}: BufferAnalysisPaginationProps) => {
  return (
    <VStack gap={4} width="100%">
      {/* Results Summary and Items per Page */}
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}
        px={2}
        width="100%"
      >
        <Text fontSize="sm" color="gray.600" fontWeight="medium">
          {isLoading ? (
            <HStack>
              <Spinner size="sm" />
              <Text>Loading...</Text>
            </HStack>
          ) : (
            `Showing ${currentPageItems} of ${totalItems} results`
          )}
        </Text>

        <Flex
          align="center"
          gap={4}
          direction={{ base: "column", md: "row" }}
          width={{ base: "100%", md: "auto" }}
        >
          {/* Items per Page Selector */}
          <Flex align="center" gap={2}>
            <Text
              fontSize="sm"
              color="gray.600"
              fontWeight="medium"
              whiteSpace="nowrap"
            >
              Items per page:
            </Text>
            <Select.Root
              collection={createListCollection({
                items: [10, 20, 50, 100].map((count) => ({
                  value: count.toString(),
                  label: count.toString(),
                })),
              })}
              size="sm"
              value={[itemsPerPage.toString()]}
              onValueChange={(value) => {
                onItemsPerPageChange(parseInt(value.value[0]));
              }}
            >
              <Select.Control>
                <Select.Trigger
                  borderWidth="1px"
                  borderColor="gray.300"
                  bg={useColorModeValue("white", "gray.700")}
                  _hover={{
                    borderColor: customShades.green[400],
                  }}
                  _focus={{
                    borderColor: customShades.green[500],
                    boxShadow: `0 0 0 1px ${customShades.green[500]}`,
                  }}
                  minW="80px"
                >
                  <Select.ValueText />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>

              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {[10, 20, 50, 100].map((count) => (
                      <Select.Item key={count} item={count.toString()}>
                        {count}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Flex>

          {/* Page Info */}
          <Text
            fontSize="sm"
            color="gray.600"
            fontWeight="medium"
            whiteSpace="nowrap"
          >
            Page {currentPage} of {totalPages || 1}
          </Text>
        </Flex>
      </Flex>

      {/* Pagination */}
      {totalPages > 1 && (
        <Flex
          justify="center"
          align="center"
          gap={2}
          wrap="wrap"
          width="100%"
        >
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <HStack gap={1} flexWrap="wrap">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber =
                Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;

              if (pageNumber > totalPages) return null;

              return (
                <Button
                  key={pageNumber}
                  size="sm"
                  variant={currentPage === pageNumber ? "solid" : "outline"}
                  colorScheme={currentPage === pageNumber ? "green" : "gray"}
                  onClick={() => onPageChange(pageNumber)}
                  minW="40px"
                >
                  {pageNumber}
                </Button>
              );
            })}
          </HStack>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </Button>
        </Flex>
      )}
    </VStack>
  );
};

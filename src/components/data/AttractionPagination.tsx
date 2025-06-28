import {
  HStack,
  VStack,
  Text,
  Button,
  Select,
  Flex,
  Spinner,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { customShades } from "../../theme/custom-color";

interface AttractionPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
  metaData?: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
  itemsCount: number;
  isLoading: boolean;
}

const AttractionPagination = ({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  metaData,
  itemsCount,
  isLoading,
}: AttractionPaginationProps) => {
  const itemsPerPageOptions = createListCollection({
    items: [10, 20, 50, 100].map((count) => ({
      value: count.toString(),
      label: count.toString(),
    })),
  });

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

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
            `Showing ${itemsCount} of ${metaData?.total || 0} results`
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
            <Text fontSize="sm" color="gray.600" fontWeight="medium" whiteSpace="nowrap">
              Items per page:
            </Text>
            <Select.Root
              collection={itemsPerPageOptions}
              size="sm"
              value={[itemsPerPage.toString()]}
              onValueChange={(value) => handleItemsPerPageChange(value.value[0])}
            >
              <Select.Control>
                <Select.Trigger
                  borderWidth="1px"
                  borderColor="gray.300"
                  bg={useColorModeValue("white", "gray.700")}
                  _hover={{
                    borderColor: customShades.purple[400],
                  }}
                  _focus={{
                    borderColor: customShades.purple[500],
                    boxShadow: `0 0 0 1px ${customShades.purple[500]}`,
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
          {metaData && (
            <Text fontSize="sm" color="gray.600" fontWeight="medium" whiteSpace="nowrap">
              Page {metaData.page} of {metaData.totalPages}
            </Text>
          )}
        </Flex>
      </Flex>

      {/* Pagination */}
      {metaData && metaData.totalPages > 1 && (
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
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <HStack gap={1} flexWrap="wrap">
            {Array.from(
              { length: Math.min(5, metaData.totalPages) },
              (_, i) => {
                const pageNumber =
                  Math.max(
                    1,
                    Math.min(metaData.totalPages - 4, currentPage - 2)
                  ) + i;

                if (pageNumber > metaData.totalPages) return null;

                return (
                  <Button
                    key={pageNumber}
                    size="sm"
                    variant={currentPage === pageNumber ? "solid" : "outline"}
                    colorScheme={currentPage === pageNumber ? "purple" : "gray"}
                    onClick={() => setCurrentPage(pageNumber)}
                    minW="40px"
                  >
                    {pageNumber}
                  </Button>
                );
              }
            )}
          </HStack>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === metaData.totalPages}
          >
            Next
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage(metaData.totalPages)}
            disabled={currentPage === metaData.totalPages}
          >
            Last
          </Button>
        </Flex>
      )}
    </VStack>
  );
};

export default AttractionPagination;

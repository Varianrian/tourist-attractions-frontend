import {
  Box,
  HStack,
  VStack,
  Text,
  Table,
  Spinner,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { ReactNode } from "react";

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  minWidth?: { base: string; md?: string };
  display?: { base: string; md?: string };
  textAlign?: "left" | "center" | "right";
  render?: (item: any, index: number) => ReactNode;
}

export interface ReusableTableProps {
  columns: TableColumn[];
  data: any[];
  isLoading: boolean;
  loadingText?: string;
  emptyText?: string;
  headerBgColor: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  currentPage?: number;
  itemsPerPage?: number;
  onSortChange?: (sortBy: string) => void;
  height?: { base: string; md: string };
}

const ReusableTable = ({
  columns,
  data,
  isLoading,
  loadingText = "Loading data...",
  emptyText = "No data found",
  headerBgColor,
  sortBy,
  sortOrder,
  currentPage = 1,
  itemsPerPage = 10,
  onSortChange,
  height = { base: "60vh", md: "70vh" },
}: ReusableTableProps) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBgColor = useColorModeValue("gray.50", "gray.600");

  const handleSortClick = (columnKey: string) => {
    if (onSortChange) {
      onSortChange(columnKey);
    }
  };

  const renderCell = (column: TableColumn, item: any, index: number) => {
    if (column.render) {
      return column.render(item, index);
    }

    // Default rendering for common patterns
    if (column.key === "index") {
      return (
        <Text textAlign="center" fontSize={{ base: "xs", md: "sm" }}>
          {(currentPage - 1) * itemsPerPage + index + 1}
        </Text>
      );
    }

    // Get nested value if key contains dots (e.g., "meta.total")
    const value = column.key.split('.').reduce((obj, key) => obj?.[key], item);
    
    return (
      <Text fontSize={{ base: "xs", md: "sm" }}>
        {value?.toString() || "-"}
      </Text>
    );
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      bg={bgColor}
      shadow="sm"
      width="100%"
      position="relative"
      overflow="hidden"
    >
      <Table.ScrollArea
        height={height}
        overflowX="auto"
        borderWidth="1px"
        rounded="md"
        position="relative"
      >
        <Table.Root
          size={{ base: "sm", md: "md" }}
          variant="outline"
          stickyHeader
        >
          <Table.Header>
            <Table.Row bg={headerBgColor}>
              {columns.map((column) => (
                <Table.ColumnHeader
                  key={column.key}
                  minW={column.minWidth}
                  display={column.display}
                  textAlign={column.textAlign}
                  cursor={column.sortable ? "pointer" : "default"}
                  onClick={column.sortable ? () => handleSortClick(column.key) : undefined}
                  _hover={column.sortable ? { bg: "blackAlpha.50" } : undefined}
                >
                  {column.sortable ? (
                    <HStack>
                      <Text>{column.label}</Text>
                      {sortBy === column.key && (
                        <Text>{sortOrder === "ASC" ? "↑" : "↓"}</Text>
                      )}
                    </HStack>
                  ) : (
                    <Text>{column.label}</Text>
                  )}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {isLoading ? (
              <Table.Row>
                <Table.Cell colSpan={columns.length} textAlign="center" py={8}>
                  <VStack>
                    <Spinner size="lg" />
                    <Text>{loadingText}</Text>
                  </VStack>
                </Table.Cell>
              </Table.Row>
            ) : data.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={columns.length} textAlign="center" py={8}>
                  <Text color="gray.500">{emptyText}</Text>
                </Table.Cell>
              </Table.Row>
            ) : (
              data.map((item, index) => (
                <Table.Row
                  key={item.id || index}
                  _hover={{ bg: hoverBgColor }}
                  transition="background-color 0.2s"
                >
                  {columns.map((column) => (
                    <Table.Cell
                      key={`${item.id || index}-${column.key}`}
                      display={column.display}
                      textAlign={column.textAlign}
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      {renderCell(column, item, index)}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
};

export default ReusableTable;

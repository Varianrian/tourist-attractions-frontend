import { Box, Text, Badge, HStack, VStack, IconButton } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import type { TableColumn } from "../common/ReusableTable";
import type { Attraction } from "../../types/attraction";
import type { Transportation } from "../../types/transportation";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Popover } from "@chakra-ui/react";

// Attraction Table Configuration
export const attractionTableColumns: TableColumn[] = [
  {
    key: "index",
    label: "No",
    minWidth: { base: "50px", md: "60px" },
    textAlign: "center",
  },
  {
    key: "name",
    label: "Nama",
    sortable: true,
    minWidth: { base: "150px", md: "200px" },
    render: (item: Attraction) => (
      <Box>
        <Text fontWeight="medium">{item.name}</Text>
        {/* Show province on mobile only - since we hide that column */}
        <Text
          fontSize="2xs"
          color="gray.500"
          display={{ base: "block", md: "none" }}
        >
          {item.province}
        </Text>
      </Box>
    ),
  },
  {
    key: "province",
    label: "Provinsi",
    sortable: true,
    minWidth: { base: "100px", md: "150px" },
    display: { base: "none", md: "table-cell" },
  },
  {
    key: "coordinates",
    label: "Koordinat",
    minWidth: { base: "120px", md: "150px" },
    render: (item: Attraction) => (
      <Text fontSize={{ base: "2xs", md: "sm" }}>
        {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
      </Text>
    ),
  },
  {
    key: "createdAt",
    label: "Created",
    sortable: true,
    minWidth: { base: "100px", md: "120px" },
    display: { base: "none", md: "table-cell" },
    render: (item: Attraction) => (
      <Text fontSize={{ base: "2xs", md: "sm" }}>
        {new Date(item.createdAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Text>
    ),
  },
  {
    key: "updatedAt",
    label: "Updated",
    sortable: true,
    minWidth: { base: "100px", md: "120px" },
    display: { base: "none", md: "table-cell" },
    render: (item: Attraction) => (
      <Text fontSize={{ base: "2xs", md: "sm" }}>
        {new Date(item.updatedAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Text>
    ),
  },
];

// Attraction Table Configuration with Actions
export const createAttractionTableColumns = (
  onEdit?: (item: Attraction) => void,
  onDelete?: (item: Attraction) => void,
  showActions = false
): TableColumn[] => {
  const baseColumns: TableColumn[] = [
    {
      key: "index",
      label: "No",
      minWidth: { base: "50px", md: "60px" },
      textAlign: "center",
    },
    {
      key: "name",
      label: "Nama",
      sortable: true,
      minWidth: { base: "120px", md: "180px" },
      render: (item: Attraction) => (
        <Box>
          <Text fontWeight="medium">{item.name}</Text>
          <Text
            fontSize="2xs"
            color="gray.500"
            display={{ base: "block", md: "none" }}
          >
            {item.province}
          </Text>
        </Box>
      ),
    },
    {
      key: "province",
      label: "Provinsi",
      sortable: true,
      minWidth: { base: "100px", md: "150px" },
      display: { base: "none", md: "table-cell" },
    },
    {
      key: "coordinates",
      label: "Koordinat",
      minWidth: { base: "120px", md: "150px" },
      render: (item: Attraction) => (
        <Text fontSize={{ base: "2xs", md: "sm" }}>
          {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
        </Text>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      minWidth: { base: "100px", md: "120px" },
      display: { base: "none", md: "table-cell" },
      render: (item: Attraction) => (
        <Text fontSize={{ base: "2xs", md: "sm" }}>
          {new Date(item.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      ),
    },
    {
      key: "updatedAt",
      label: "Updated",
      sortable: true,
      minWidth: { base: "100px", md: "120px" },
      display: { base: "none", md: "table-cell" },
      render: (item: Attraction) => (
        <Text fontSize={{ base: "2xs", md: "sm" }}>
          {new Date(item.updatedAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      ),
    },
  ];

  // Add actions column if needed
  if (showActions && (onEdit || onDelete)) {
    baseColumns.push({
      key: "actions",
      label: "Aksi",
      minWidth: { base: "80px", md: "100px" },
      textAlign: "center",
      render: (item: Attraction) => (
        <HStack justify="center" gap={1}>
          {onEdit && (
            <IconButton
              variant="ghost"
              size="sm"
              onClick={() => onEdit(item)}
              aria-label="Edit attraction"
            >
              <Icon icon="mdi:pencil" width="16" height="16" />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              variant="ghost"
              size="sm"
              colorScheme="red"
              onClick={() => onDelete(item)}
              aria-label="Delete attraction"
            >
              <Icon icon="mdi:delete" width="16" height="16" />
            </IconButton>
          )}
        </HStack>
      ),
    });
  }

  return baseColumns;
};

// Transportation Table Configuration with Actions
export const createTransportationTableColumns = (
  onEdit?: (item: Transportation) => void,
  onDelete?: (item: Transportation) => void,
  showActions = false
): TableColumn[] => {
  const baseColumns: TableColumn[] = [
    {
      key: "index",
      label: "No",
      minWidth: { base: "50px", md: "60px" },
      textAlign: "center",
    },
    {
      key: "name",
      label: "Nama",
      sortable: true,
      minWidth: { base: "120px", md: "180px" },
      render: (item: Transportation) => (
        <Box>
          <Text fontWeight="medium">{item.name}</Text>
          <Text
            fontSize="2xs"
            color="gray.500"
            display={{ base: "block", md: "none" }}
          >
            {item.province}
          </Text>
        </Box>
      ),
    },
    {
      key: "type",
      label: "Tipe Transportasi",
      sortable: true,
      minWidth: { base: "80px", md: "120px" },
      render: (item: Transportation) => {
        const getTypeLabel = (type: string) => {
          switch (type.toLowerCase()) {
            case "airport":
              return "Bandara";
            case "bus_station":
              return "Terminal Bus";
            case "train_station":
              return "Stasiun Kereta";
            case "harbor":
              return "Pelabuhan";
            default:
              return type;
          }
        };

        return (
          <Badge
            variant={"surface"}
            borderRadius="md"
            px={{ base: 1, md: 2 }}
            py={{ base: 0.5, md: 1 }}
            fontSize={{ base: "2xs", md: "xs" }}
          >
            {getTypeLabel(item.type)}
          </Badge>
        );
      },
    },
    {
      key: "province",
      label: "Provinsi",
      sortable: true,
      minWidth: { base: "100px", md: "150px" },
      display: { base: "none", md: "table-cell" },
    },
    {
      key: "coordinates",
      label: "Koordinat",
      minWidth: { base: "120px", md: "150px" },
      render: (item: Transportation) => (
        <Text fontSize={{ base: "2xs", md: "sm" }}>
          {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
        </Text>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      minWidth: { base: "100px", md: "120px" },
      display: { base: "none", md: "table-cell" },
      render: (item: Transportation) => (
        <Text fontSize={{ base: "2xs", md: "sm" }}>
          {new Date(item.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      ),
    },
    {
      key: "updatedAt",
      label: "Updated",
      sortable: true,
      minWidth: { base: "100px", md: "120px" },
      display: { base: "none", md: "table-cell" },
      render: (item: Transportation) => (
        <Text fontSize={{ base: "2xs", md: "sm" }}>
          {new Date(item.updatedAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      ),
    },
  ];

  // Add actions column if needed
  if (showActions && (onEdit || onDelete)) {
    baseColumns.push({
      key: "actions",
      label: "Aksi",
      minWidth: { base: "80px", md: "100px" },
      textAlign: "center",
      render: (item: Transportation) => (
        <HStack justify="center" gap={1}>
          {onEdit && (
            <IconButton
              variant="ghost"
              size="sm"
              onClick={() => onEdit(item)}
              aria-label="Edit transportation"
            >
              <Icon icon="mdi:pencil" width="16" height="16" />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              variant="ghost"
              size="sm"
              colorScheme="red"
              onClick={() => onDelete(item)}
              aria-label="Delete transportation"
            >
              <Icon icon="mdi:delete" width="16" height="16" />
            </IconButton>
          )}
        </HStack>
      ),
    });
  }

  return baseColumns;
};

// Buffer Analysis Table Configuration
export const bufferAnalysisTableColumns: TableColumn[] = [
  {
    key: "index",
    label: "No",
    minWidth: { base: "50px", md: "60px" },
    textAlign: "center",
  },
  {
    key: "attraction_name",
    label: "Nama Tempat Wisata",
    sortable: true,
    minWidth: { base: "150px", md: "200px" },
    render: (item: any) => (
      <Box>
        <Text fontWeight="medium">{item.attraction_name}</Text>
        {/* Show province on mobile only - since we hide that column */}
        <Text
          fontSize="2xs"
          color="gray.500"
          display={{ base: "block", md: "none" }}
        >
          {item.province}
        </Text>
      </Box>
    ),
  },
  {
    key: "province",
    label: "Provinsi",
    sortable: true,
    minWidth: { base: "100px", md: "150px" },
    display: { base: "none", md: "table-cell" },
  },
  {
    key: "is_reachable",
    label: "Ada Transportasi di Sekitar?",
    sortable: true,
    textAlign: "center",
    minWidth: { base: "80px", md: "100px" },
    render: (item: any) => (
      <Badge
        colorPalette={item.is_reachable ? "green" : "red"}
        variant="subtle"
        borderRadius="md"
        px={{ base: 1, md: 2 }}
        py={{ base: 0.5, md: 1 }}
        fontSize={{ base: "2xs", md: "xs" }}
      >
        {item.is_reachable ? (
          <HStack gap={1}>
            <FaCheck />
            <Text>Ya</Text>
          </HStack>
        ) : (
          <HStack gap={1}>
            <FaTimes />
            <Text>Tidak</Text>
          </HStack>
        )}
      </Badge>
    ),
  },
  {
    key: "transportation_count",
    label: "Jumlah Transportasi Sekitar",
    sortable: true,
    minWidth: { base: "80px", md: "100px" },
    textAlign: "center",
    render: (item: any) => (
      <Badge
        colorPalette={item.transportation_count > 0 ? "blue" : "gray"}
        variant="subtle"
        borderRadius="md"
        px={{ base: 1, md: 2 }}
        py={{ base: 0.5, md: 1 }}
        fontSize={{ base: "2xs", md: "xs" }}
      >
        {item.transportation_count}
      </Badge>
    ),
  },
  {
    key: "transportations",
    label: "Jenis Transportasi",
    minWidth: { base: "150px", md: "200px" },
    render: (item: any) => {
      if (!item.transportations || item.transportations.length === 0) {
        return (
          <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500">
            Tidak ada transportasi
          </Text>
        );
      }

      const types = item.transportations.map((t: any) => t.type);
      const uniqueTypes = [...new Set(types)];

      const getTypeLabel = (type: string) => {
        switch (type.toLowerCase()) {
          case "airport":
            return "Bandara";
          case "bus_station":
            return "Terminal Bus";
          case "train_station":
            return "Kereta";
          case "harbor":
          case "port":
            return "Pelabuhan";
          default:
            return type;
        }
      };

      return (
        <Box display="flex" flexWrap="wrap" gap={1}>
          {uniqueTypes.map((type: unknown, index: number) => {
            const typeStr = type as string;
            const transportationsOfType = item.transportations.filter((t: any) => t.type === typeStr);

            return (
              <Popover.Root key={index} lazyMount unmountOnExit positioning={{ placement: "top" }} closeOnInteractOutside={true}>
                <Popover.Trigger asChild>
                  <Badge
                    variant="subtle"
                    size="sm"
                    borderRadius="sm"
                    fontSize={{ base: "2xs", md: "2xs" }}
                    px={1}
                    py={0.5}
                    cursor="pointer"
                    as="button"
                  >
                    {getTypeLabel(typeStr)} ({transportationsOfType.length})
                  </Badge>
                </Popover.Trigger>
                <Popover.Positioner>
                  <Popover.Content 
                    maxW="320px" 
                    maxH="200px" 
                    overflowY="auto"
                    zIndex={1000}
                    shadow="lg"
                  >
                    <Box p={3}>
                      <Text fontSize="sm" fontWeight="medium" mb={2}>
                        {getTypeLabel(typeStr)}:
                      </Text>
                      <VStack align="start" gap={1}>
                        {transportationsOfType.map((transportation: any) => (
                          <Text key={transportation.id} fontSize="xs">
                            • {transportation.name}
                          </Text>
                        ))}
                      </VStack>
                    </Box>
                  </Popover.Content>
                </Popover.Positioner>
              </Popover.Root>
            );
          })}
        </Box>
      );
    },
  },
  {
    key: "Koordinat",
    label: "Koordinat",
    minWidth: { base: "120px", md: "150px" },
    render: (item: any) => (
      <Text fontSize={{ base: "2xs", md: "sm" }}>
        {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
      </Text>
    ),
  },
];

import { Box, Text, Badge } from "@chakra-ui/react";
import type { TableColumn } from "../common/ReusableTable";
import type { Attraction } from "../../types/attraction";
import type { Transportation } from "../../types/transportation";

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
    label: "Name",
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
    key: "city",
    label: "City",
    sortable: true,
    minWidth: { base: "100px", md: "120px" },
  },
  {
    key: "province",
    label: "Province",
    sortable: true,
    minWidth: { base: "100px", md: "150px" },
    display: { base: "none", md: "table-cell" },
  },
  {
    key: "coordinates",
    label: "Coordinates",
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
];

// Transportation Table Configuration
export const transportationTableColumns: TableColumn[] = [
  {
    key: "index",
    label: "No",
    minWidth: { base: "50px", md: "60px" },
    textAlign: "center",
  },
  {
    key: "name",
    label: "Name",
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
    label: "Type",
    sortable: true,
    minWidth: { base: "80px", md: "120px" },
    render: (item: Transportation) => {
      const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
          case "airport":
            return "blue";
          case "bus_station":
            return "green";
          case "train_station":
            return "purple";
          case "port":
            return "orange";
          default:
            return "gray";
        }
      };

      const getTypeLabel = (type: string) => {
        switch (type.toLowerCase()) {
          case "airport":
            return "Airport";
          case "bus_station":
            return "Bus Station";
          case "train_station":
            return "Train Station";
          case "harbor":
            return "Harbor";
          default:
            return type;
        }
      };

      return (
        <Badge
          colorScheme={getTypeColor(item.type)}
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
    label: "Province",
    sortable: true,
    minWidth: { base: "100px", md: "150px" },
    display: { base: "none", md: "table-cell" },
  },
  {
    key: "coordinates",
    label: "Coordinates",
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
];

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
    label: "Attraction Name",
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
    key: "city",
    label: "City",
    sortable: true,
    minWidth: { base: "80px", md: "100px" },
  },
  {
    key: "province",
    label: "Province",
    sortable: true,
    minWidth: { base: "100px", md: "150px" },
    display: { base: "none", md: "table-cell" },
  },
  {
    key: "is_reachable",
    label: "Reachable",
    sortable: true,
    minWidth: { base: "80px", md: "100px" },
    render: (item: any) => (
      <Badge
        colorScheme={item.is_reachable ? "green" : "red"}
        borderRadius="md"
        px={{ base: 1, md: 2 }}
        py={{ base: 0.5, md: 1 }}
        fontSize={{ base: "2xs", md: "xs" }}
      >
        {item.is_reachable ? "✓ Yes" : "✗ No"}
      </Badge>
    ),
  },
  {
    key: "transportation_count",
    label: "Transport Count",
    sortable: true,
    minWidth: { base: "80px", md: "100px" },
    textAlign: "center",
    render: (item: any) => (
      <Badge
        colorScheme={item.transportation_count > 0 ? "blue" : "gray"}
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
    label: "Transportation Types",
    minWidth: { base: "150px", md: "200px" },
    render: (item: any) => {
      if (!item.transportations || item.transportations.length === 0) {
        return (
          <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500">
            No transportation
          </Text>
        );
      }

      const types = item.transportations.map((t: any) => t.type);
      const uniqueTypes = [...new Set(types)];

      return (
        <Box display="flex" flexWrap="wrap" gap={1}>
          {uniqueTypes.slice(0, 3).map((type: unknown, index: number) => {
            const typeStr = type as string;
            const getTypeColor = (type: string) => {
              switch (type.toLowerCase()) {
                case "airport":
                  return "blue";
                case "bus_station":
                  return "green";
                case "train_station":
                  return "purple";
                case "port":
                  return "orange";
                default:
                  return "gray";
              }
            };

            const getTypeLabel = (type: string) => {
              switch (type.toLowerCase()) {
                case "airport":
                  return "Airport";
                case "bus_station":
                  return "Bus";
                case "train_station":
                  return "Train";
                case "port":
                  return "Port";
                default:
                  return type;
              }
            };

            return (
              <Badge
                key={index}
                colorScheme={getTypeColor(typeStr)}
                size="sm"
                borderRadius="sm"
                fontSize={{ base: "2xs", md: "2xs" }}
                px={1}
                py={0.5}
              >
                {getTypeLabel(typeStr)}
              </Badge>
            );
          })}
          {uniqueTypes.length > 3 && (
            <Badge
              colorScheme="gray"
              size="sm"
              borderRadius="sm"
              fontSize={{ base: "2xs", md: "2xs" }}
              px={1}
              py={0.5}
            >
              +{uniqueTypes.length - 3}
            </Badge>
          )}
        </Box>
      );
    },
  },
  {
    key: "coordinates",
    label: "Coordinates",
    minWidth: { base: "120px", md: "150px" },
    render: (item: any) => (
      <Text fontSize={{ base: "2xs", md: "sm" }}>
        {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
      </Text>
    ),
  },
];

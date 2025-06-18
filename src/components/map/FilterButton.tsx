import { Button, Icon } from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { getTransportIcon } from "../../utils/mapIcons";
import { type TransportationType } from "@/types/transportation";

// Custom button component for filters
export const FilterButton = ({
  type,
  label,
  isActive,
  borderColor,
  subtleTextColor,
  filterColors,
  onToggle,
}: {
  type: string;
  label: string;
  isActive: boolean;
  borderColor: string;
  subtleTextColor: string;
  filterColors: Record<string, string>;
  onToggle: (type: TransportationType) => void;
}) => (
  <Button
    variant="outline"
    borderRadius="full"
    size="sm"
    onClick={() => onToggle(type as string as TransportationType)}
    borderColor={isActive ? filterColors[type] : borderColor}
    color={isActive ? filterColors[type] : subtleTextColor}
    _hover={{
      bg: useColorModeValue(`${type}.50`, `${type}.900`),
    }}
  >
    <Icon as={getTransportIcon(type)} mr={2} />
    {label}
  </Button>
);

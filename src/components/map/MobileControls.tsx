import { IconButton, HStack, Icon } from "@chakra-ui/react";
import { FaList, FaHome } from "react-icons/fa";

interface MobileControlsProps {
  onOpenFilters: () => void;
}

export function MobileControls({ onOpenFilters }: MobileControlsProps) {
  return (
    <>
      {/* Mobile Controls */}
      <HStack
        position="absolute"
        bottom="24px"
        left="50%"
        transform="translateX(-50%)"
        zIndex="2"
        gap={2}
        display={{ base: "flex", md: "none" }}
      >
        <IconButton
          aria-label="Open filters"
          onClick={onOpenFilters}
          colorScheme="blue"
          size="lg"
          borderRadius="full"
          boxShadow="lg"
        >
          <FaList />
        </IconButton>
      </HStack>

      {/* Home Button */}
      <IconButton
        aria-label="Return to Home"
        position="absolute"
        bottom="24px"
        right="16px"
        zIndex="2"
        colorScheme="blue"
        size="lg"
        borderRadius="full"
        boxShadow="lg"
        onClick={() => (window.location.href = "/")}
      >
        <Icon as={FaHome} boxSize={6} />
      </IconButton>
    </>
  );
}

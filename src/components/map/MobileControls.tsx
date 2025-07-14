import { IconButton, HStack } from "@chakra-ui/react";
import { GrDocumentText } from "react-icons/gr";
import { ImMap2 } from "react-icons/im";

interface MobileControlsProps {
  onOpenFilters: () => void;
  onOpenResult: () => void;
}

export function MobileControls({
  onOpenFilters,
  onOpenResult,
}: MobileControlsProps) {
  return (
    <>
      {/* Mobile Controls */}
      <HStack
        position="absolute"
        bottom="100px"
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
          <ImMap2 />
        </IconButton>
        <IconButton
          aria-label="Open filters"
          onClick={onOpenResult}
          colorScheme="blue"
          size="lg"
          borderRadius="full"
          boxShadow="lg"
        >
          <GrDocumentText />
        </IconButton>
      </HStack>
    </>
  );
}

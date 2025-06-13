"use client";

import { Button, Icon } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorMode, useColorModeValue } from "./color-mode";

export interface ColorModeButtonProps {
  display?: any;
}

export function ColorModeButton(props: ColorModeButtonProps) {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(LuMoon, LuSun);

  return (
    <Button
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
      rounded="full"
      display={props.display}
    >
      <Icon as={SwitchIcon} boxSize={4} />
    </Button>
  );
}

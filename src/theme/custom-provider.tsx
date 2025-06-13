// src/theme/custom-provider.tsx
import { 
  ChakraProvider,
  createSystem, 
  defaultConfig, 
  defineConfig,
} from "@chakra-ui/react";
import React from "react";

// Apple-inspired color palette
const customColors = {
  orange: {
    50: '#FFF8E6',
    100: '#FFEBCC',
    200: '#FFD999',
    300: '#FFC666',
    400: '#FFB333',
    500: '#F09609', // Base orange
    600: '#CC7A00',
    700: '#995C00',
    800: '#663D00',
    900: '#331F00',
  },
  pink: {
    50: '#FFE5F7',
    100: '#FFCCE9',
    200: '#FF99D4',
    300: '#FF66BE',
    400: '#FF33A9',
    500: '#FF0097', // Base pink
    600: '#CC0079',
    700: '#99005B',
    800: '#66003D',
    900: '#33001E',
  },
  purple: {
    50: '#F5E6FF',
    100: '#EBCCFF',
    200: '#D699FF',
    300: '#C266FF',
    400: '#B133FF',
    500: '#A200FF', // Base purple
    600: '#8100CC',
    700: '#610099',
    800: '#400066',
    900: '#200033',
  },
  blue: {
    50: '#E5F8FF',
    100: '#CCF1FF',
    200: '#99E2FF',
    300: '#66D4FF',
    400: '#33C5FF',
    500: '#00A4EF', // Base blue
    600: '#0083BF',
    700: '#00628F',
    800: '#004260',
    900: '#002130',
  },
  teal: {
    50: '#E5FAFA',
    100: '#CCF5F5',
    200: '#99EBEA',
    300: '#66E0E0',
    400: '#33D6D5',
    500: '#00ABA9', // Base teal
    600: '#008987',
    700: '#006765',
    800: '#004443',
    900: '#002221',
  },
  green: {
    50: '#F2FAE6',
    100: '#E6F5CC',
    200: '#CCEB99',
    300: '#B3E066',
    400: '#99D633',
    500: '#7FBA00', // Base green
    600: '#669500',
    700: '#4C7000',
    800: '#334A00',
    900: '#192500',
  }
};

// Adjust customColor to match Chakra UI's new API
const customColorsChakra = Object.fromEntries(
  Object.entries(customColors).map(([key, value]) => [
    key,
    Object.fromEntries(
      Object.entries(value).map(([shade, color]) => [
        shade,
        { value: color }
      ])
    )
  ])
);

// Define config according to new Chakra UI API
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        ...customColorsChakra,
      },
    },
    semanticTokens: {
      colors: {
        "chakra-body-bg": {
          value: { base: "white", _dark: "gray.900" },
        },
        "chakra-body-text": {
          value: { base: "gray.800", _dark: "gray.100" },
        },
        "accent": { 
          value: { base: customColors.blue[500], _dark: customColors.blue[400] },
        },
        "accent.emphasis": { 
          value: { base: customColors.pink[500], _dark: customColors.pink[400] },
        },
        "accent.subtle": { 
          value: { base: customColors.purple[500], _dark: customColors.purple[400] },
        },
        // Gradients
        "gradient.primary": {
          value: { 
            base: `linear-gradient(135deg, ${customColors.blue[500]} 0%, ${customColors.teal[500]} 100%)`,
            _dark: `linear-gradient(135deg, ${customColors.purple[500]} 0%, ${customColors.blue[500]} 100%)`
          },
        },
        "gradient.secondary": {
          value: { 
            base: `linear-gradient(135deg, ${customColors.orange[500]} 0%, ${customColors.pink[500]} 100%)`,
            _dark: `linear-gradient(135deg, ${customColors.pink[500]} 0%, ${customColors.purple[500]} 100%)`
          },
        },
        "gradient.accent": {
          value: { 
            base: `linear-gradient(135deg, ${customColors.green[500]} 0%, ${customColors.orange[500]} 100%)`,
            _dark: `linear-gradient(135deg, ${customColors.teal[500]} 0%, ${customColors.green[500]} 100%)`
          },
        },
        "gradient.rainbow": {
          value: { 
            base: `linear-gradient(135deg, ${customColors.orange[500]} 0%, ${customColors.pink[500]} 20%, ${customColors.purple[500]} 40%, ${customColors.blue[500]} 60%, ${customColors.teal[500]} 80%, ${customColors.green[500]} 100%)`,
            _dark: `linear-gradient(135deg, ${customColors.orange[500]} 0%, ${customColors.pink[500]} 20%, ${customColors.purple[500]} 40%, ${customColors.blue[500]} 60%, ${customColors.teal[500]} 80%, ${customColors.green[500]} 100%)`
          },
        },
      },
    },
  },
});

// Create the custom system
const customSystem = createSystem(defaultConfig, config);

// Provider component that applies the custom styling
export function CustomProvider(props: React.PropsWithChildren<{}>) {
  return (
    <ChakraProvider value={customSystem}>
      {props.children}
    </ChakraProvider>
  );
}

// Export the system for direct usage
export default customSystem;

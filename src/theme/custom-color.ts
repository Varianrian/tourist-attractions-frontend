// src/theme/apple-colors.ts

// Apple-inspired color palette based on the provided hex codes
// F09609 (Orange)
// FF0097 (Pink)
// A200FF (Purple)
// 00A4EF (Blue)
// 00ABA9 (Teal)
// 7FBA00 (Green)

export const customColors = {
  orange: "#F09609",
  pink: "#FF0097",
  purple: "#A200FF",
  blue: "#00A4EF",
  teal: "#00ABA9",
  green: "#7FBA00",
};

// Color shade variations
export const customShades = {
  orange: {
    50: "#FFF8E6",
    100: "#FFEBCC",
    200: "#FFD999",
    300: "#FFC666",
    400: "#FFB333",
    500: "#F09609", // Base orange
    600: "#CC7A00",
    700: "#995C00",
    800: "#663D00",
    900: "#331F00",
  },
  pink: {
    50: "#FFE5F7",
    100: "#FFCCE9",
    200: "#FF99D4",
    300: "#FF66BE",
    400: "#FF33A9",
    500: "#FF0097", // Base pink
    600: "#CC0079",
    700: "#99005B",
    800: "#66003D",
    900: "#33001E",
  },
  purple: {
    50: "#F5E6FF",
    100: "#EBCCFF",
    200: "#D699FF",
    300: "#C266FF",
    400: "#B133FF",
    500: "#A200FF", // Base purple
    600: "#8100CC",
    700: "#610099",
    800: "#400066",
    900: "#200033",
  },
  blue: {
    50: "#E5F8FF",
    100: "#CCF1FF",
    200: "#99E2FF",
    300: "#66D4FF",
    400: "#33C5FF",
    500: "#00A4EF", // Base blue
    600: "#0083BF",
    700: "#00628F",
    800: "#004260",
    900: "#002130",
  },
  teal: {
    50: "#E5FAFA",
    100: "#CCF5F5",
    200: "#99EBEA",
    300: "#66E0E0",
    400: "#33D6D5",
    500: "#00ABA9", // Base teal
    600: "#008987",
    700: "#006765",
    800: "#004443",
    900: "#002221",
  },
  green: {
    50: "#F2FAE6",
    100: "#E6F5CC",
    200: "#CCEB99",
    300: "#B3E066",
    400: "#99D633",
    500: "#7FBA00", // Base green
    600: "#669500",
    700: "#4C7000",
    800: "#334A00",
    900: "#192500",
  },
  red: {
    50: "#FFE6E6",
    100: "#FFCCCC",
    200: "#FF9999",
    300: "#FF6666",
    400: "#FF3333",
    500: "#FF0000", // Base red
    600: "#CC0000",
    700: "#990000",
    800: "#660000",
    900: "#330000",
  },
};

// Gradient definitions
export const customGradients = {
  orangeToPink: `linear-gradient(135deg, ${customColors.orange} 0%, ${customColors.pink} 80%)`,
  pinkToPurple: `linear-gradient(135deg, ${customColors.pink} 0%, ${customColors.purple} 100%)`,
  purpleToBlue: `linear-gradient(135deg, ${customColors.purple} 0%, ${customColors.blue} 100%)`,
  blueToTeal: `linear-gradient(135deg, ${customColors.blue} 0%, ${customColors.teal} 100%)`,
  tealToGreen: `linear-gradient(135deg, ${customColors.teal} 0%, ${customColors.green} 100%)`,
  greenToOrange: `linear-gradient(135deg, ${customColors.green} 0%, ${customColors.orange} 100%)`,
  // Rainbow gradient
  rainbow: `linear-gradient(135deg, ${customColors.orange} 0%, ${customColors.pink} 20%, ${customColors.purple} 40%, ${customColors.blue} 60%, ${customColors.teal} 80%, ${customColors.green} 100%)`,
};

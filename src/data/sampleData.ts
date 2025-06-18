import { createListCollection } from "@chakra-ui/react";

// This would be replaced with your actual data

export const provinces = createListCollection({
  items: [
    { label: "Jawa Barat", value: "JAWA BARAT" },
    { label: "Jawa Tengah", value: "JAWA TENGAH" },
    { label: "Jawa Timur", value: "JAWA TIMUR" },
    { label: "DKI Jakarta", value: "DKI JAKARTA" },
    { label: "D.I. Yogyakarta", value: "DI YOGYAKARTA" },
    { label: "Banten", value: "BANTEN" },
  ],
});

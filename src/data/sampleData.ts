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

export const bufferRadiusOptions = createListCollection({
  items: [
    { label: "1 km", value: 1000 },
    { label: "3 km", value: 3000 },
    { label: "5 km", value: 5000 },
  ],
});

export const attractionTypes = createListCollection({
  items: [
    { label: "Wisata Alam", value: "NATURAL" },
    { label: "Wisata Budaya", value: "CULTURAL" },
    { label: "Wisata Buatan", value: "ARTIFICIAL" },
  ],
});

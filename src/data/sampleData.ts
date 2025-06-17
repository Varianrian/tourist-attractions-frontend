import { createListCollection } from "@chakra-ui/react";

// This would be replaced with your actual data
export const SAMPLE_DATA = {
  attractions: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-6.202719473, 106.829518],
            [-6.20323879, 106.824245289],
            [-6.204776783, 106.819175205],
            [-6.207274348, 106.814502588],
            [-6.210635506, 106.810407006],
            [-6.214731088, 106.807045848],
            [-6.219403705, 106.804548283],
            [-6.224473789, 106.80301029],
            [-6.2297465, 106.802490973],
            [-6.235019211, 106.80301029],
            [-6.240089295, 106.804548283],
            [-6.244761912, 106.807045848],
            [-6.248857494, 106.810407006],
            [-6.252218652, 106.814502588],
            [-6.254716217, 106.819175205],
            [-6.25625421, 106.824245289],
            [-6.256773527, 106.829518],
            [-6.25625421, 106.834790711],
            [-6.254716217, 106.839860795],
            [-6.252218652, 106.844533412],
            [-6.248857494, 106.848628994],
            [-6.244761912, 106.851990152],
            [-6.240089295, 106.854487717],
            [-6.235019211, 106.85602571],
            [-6.2297465, 106.856545027],
            [-6.224473789, 106.85602571],
            [-6.219403705, 106.854487717],
            [-6.214731088, 106.851990152],
            [-6.210635506, 106.848628994],
            [-6.207274348, 106.844533412],
            [-6.204776783, 106.839860795],
            [-6.20323879, 106.834790711],
            [-6.202719473, 106.829518],
          ],
        ],
      },
      properties: {
        id: "02830461-39f4-460c-8307-d16c38361819",
        attraction_name: "Candi Jiwa dan Candi Blandongan",
        province: "Jawa Barat",
        city: "Kabupaten Karawang",
        latitude: -6.2297465,
        longitude: 106.829518,
        transportation_names: [
          "Andir",
          "Bandar Udara Internasional Husein Sastranegara",
          "Bandung",
          "Ciroyom",
          "CitiTrans",
          "DAMRI Kebon Kawung",
        ],
        transportation_count: 0,
        is_reachable: false,
      },
    },
  ],
  transportHubs: [
    {
      id: 1,
      name: "Soekarno-Hatta International Airport",
      location: [-6.1256, 106.6558],
      type: "airport",
    },
    {
      id: 2,
      name: "Yogyakarta International Airport",
      location: [-7.906, 110.0573],
      type: "airport",
    },
    {
      id: 3,
      name: "Gambir Station",
      location: [-6.1767, 106.8305],
      type: "train",
    },
    {
      id: 4,
      name: "Tanjung Priok Harbor",
      location: [-6.1069, 106.888],
      type: "harbor",
    },
    {
      id: 5,
      name: "Giwangan Bus Terminal",
      location: [-7.8365, 110.3926],
      type: "bus",
    },
  ],
};

export const provinces = createListCollection({
  items: [
    { label: "Jawa Barat", value: "jawa_barat" },
    { label: "Jawa Tengah", value: "jawa_tengah" },
    { label: "Jawa Timur", value: "jawa_timur" },
    { label: "DKI Jakarta", value: "dki_jakarta" },
    { label: "D.I. Yogyakarta", value: "di_yogyakarta" },
    { label: "Banten", value: "banten" },
    { label: "Bali", value: "bali" },
  ],
});

import {
  FaPlane,
  FaBus,
  FaTrain,
  FaShip,
  FaMapMarkerAlt,
  FaCompass,
  FaHome,
} from "react-icons/fa";

// Get icon for transport type
export const getTransportIcon = (type: string) => {
  switch (type) {
    case "attraction":
      return FaCompass;
    case "transportation":
      return FaMapMarkerAlt;
    case "attraction_buffer":
      return FaHome;
    case "AIRPORT":
      return FaPlane;
    case "BUS_STATION":
      return FaBus;
    case "TRAIN_STATION":
      return FaTrain;
    case "HARBOR":
      return FaShip;
    default:
      return FaMapMarkerAlt;
  }
};

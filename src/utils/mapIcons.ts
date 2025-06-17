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
    case "airport":
      return FaPlane;
    case "bus":
      return FaBus;
    case "train":
      return FaTrain;
    case "harbor":
      return FaShip;
    default:
      return FaMapMarkerAlt;
  }
};

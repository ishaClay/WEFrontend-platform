import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Economic from "../assets/images/Economic.svg";
import Environmental from "../assets/images/Environmental.svg";
import Governance from "../assets/images/Governance.svg";
import GreenEconomic from "../assets/images/GreenEconomic.svg";
import GreenEnvironmental from "../assets/images/GreenEnvironmental.svg";
import GreenGovernance from "../assets/images/GreenGovernance.svg";
import GreenSocialGray from "../assets/images/GreenSocial.svg";
import GreenStrategicIntegrationGray from "../assets/images/GreenStratagic.svg";
import GreenTech from "../assets/images/GreenTech.svg";
import SocialGray from "../assets/images/Social.svg";
import StrategicIntegrationGray from "../assets/images/Stratagic.svg";
import Tech from "../assets/images/Tech.svg";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImages = (name: string, active?: boolean) => {
  switch (name) {
    case "Social":
      return active ? GreenSocialGray : SocialGray;
    case "Technology & Innovation":
      return active ? GreenTech : Tech;
    case "Economics":
      return active ? GreenEconomic : Economic;
    case "Economic":
      return active ? GreenEconomic : Economic;
    case "Governance":
      return active ? GreenGovernance : Governance;
    case "Enviromental":
      return active ? GreenEnvironmental : Environmental;
    case "Strategic Intergration":
      return active ? GreenStrategicIntegrationGray : StrategicIntegrationGray;
    case "Strategic Integration":
      return active ? GreenStrategicIntegrationGray : StrategicIntegrationGray;
    default:
      return active ? GreenEnvironmental : Environmental;
  }
};

export const getGreenImages = (name: string) => {
  switch (name) {
    case "Social":
      return GreenSocialGray;
    case "Technology & Innovation":
      return GreenTech;
    case "Economics":
      return GreenEconomic;
    case "Governance":
      return GreenGovernance;
    case "Enviromental":
      return GreenEnvironmental;
    case "Strategic Intergration":
      return GreenStrategicIntegrationGray;
    default:
      return GreenEnvironmental;
  }
};
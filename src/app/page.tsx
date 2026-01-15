import HomeClient from "@/components/ui/home/main-client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "App Status & PWA Install",
  description:
    "Check your internet connection status in real time and install the Arfatur Rahman Progressive Web App for fast access, offline support, and a native app-like experience.",
};
const ArfatPWAStatusPage = () => {
  return <HomeClient />;
};

export default ArfatPWAStatusPage;

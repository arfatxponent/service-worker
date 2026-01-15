import CalculateDataViaUseMemo from "@/components/ui/use-memo/calculate-data";
import UseMemoGuide from "@/components/ui/use-memo/use-memo-guide";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "useMemo Hook - React Performance Optimization Guide",
  description:
    "Master React's useMemo hook to cache expensive calculations and prevent unnecessary recomputations. Interactive prime calculator demo with real-time render tracking.",
  keywords: [
    "useMemo",
    "React hooks",
    "memoization",
    "performance optimization",
    "expensive calculations",
    "caching",
    "React re-renders",
    "TypeScript",
    "React 19",
    "prime numbers",
  ],
  openGraph: {
    title: "useMemo Hook - React Performance Guide",
    description:
      "Learn useMemo through an interactive prime calculator demo. Visualize how memoization prevents wasteful recalculations on every render.",
    type: "article",
    url: "/state/use-memo",
  },
  twitter: {
    card: "summary_large_image",
    title: "useMemo Hook - React Performance Guide",
    description:
      "Interactive demo showing how useMemo caches expensive calculations and improves React performance.",
  },
  alternates: {
    canonical: "/state/use-memo",
  },
};

const UseMemoPage = () => {
  return (
    <div>
      <UseMemoGuide />
      <CalculateDataViaUseMemo />
    </div>
  );
};

export default UseMemoPage;

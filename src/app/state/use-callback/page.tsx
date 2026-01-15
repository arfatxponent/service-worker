// src/app/use-callback/page.tsx
import { UseCallbackDependencyDemo } from "@/components/useCallback/dependency-demo";
import { UseCallbackEfficientDemo } from "@/components/useCallback/effecient-demo";
import { UseCallbackReRenderDemo } from "@/components/useCallback/re-render-demo";
import { UseCallbackGuide } from "@/components/useCallback/use-callback-guides";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "useCallback Hook - React Performance Optimization Guide",
  description:
    "Master React's useCallback hook to prevent unnecessary re-renders, optimize dependencies, and build efficient custom hooks. Interactive examples with TypeScript.",
  keywords: [
    "useCallback",
    "React hooks",
    "React memo",
    "performance optimization",
    "memoization",
    "TypeScript",
    "React 19",
  ],
  openGraph: {
    title: "useCallback Hook - React Performance Guide",
    description:
      "Learn useCallback through 3 practical examples: preventing re-renders, optimizing dependencies, and building efficient hooks.",
    type: "article",
  },
};

export default function UseCallbackPage() {
  return (
    <main>
      <UseCallbackGuide />
      <UseCallbackReRenderDemo />
      <UseCallbackDependencyDemo />
      <UseCallbackEfficientDemo />
    </main>
  );
}

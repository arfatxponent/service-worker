"use client";
import { useEffect, useState } from "react";

export const usePWAInstall = () => {
  const [promptEvent, setPromptEvent] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault(); // Prevent automatic prompt
      setPromptEvent(e); // Save prompt event
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = () => {
    if (!promptEvent) return;
    promptEvent.prompt(); // Show install popup
    promptEvent.userChoice.then(() => setPromptEvent(null));
  };

  return { installApp, isInstallable: !!promptEvent };
};

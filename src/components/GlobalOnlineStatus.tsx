"use client";
import { useEffect, useState } from "react";

export default function GlobalOnlineStatus() {
  // default to online to avoid false offline state
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Update status on mount
    const updateStatus = () => setIsOffline(!navigator.onLine);
    updateStatus();

    // Listen to changes
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center p-2 z-50">
      You are offline 😢
    </div>
  );
}

"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function ArfatPage() {
  // Initial state is null so server & client match
  const [isOffline, setIsOffline] = useState<boolean | null>(null);

  useEffect(() => {
    // Only runs on client
    const updateOnlineStatus = () => setIsOffline(!navigator.onLine);

    // Set initial status
    updateOnlineStatus();

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <Card className="m-4 p-4">
      <CardContent>
        <h1 className="text-5xl">
          {isOffline === null
            ? "Checking connection..." // server render placeholder
            : isOffline
            ? "You are offline 😢"
            : "You are online ✅"}
        </h1>
        <p>
          This is the /arfat page. Try disconnecting your internet to see
          offline status.
        </p>
      </CardContent>
    </Card>
  );
}

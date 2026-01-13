"use client";
import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hook/usePWAInstall";

export default function PWAInstallButton() {
  const { installApp, isInstallable } = usePWAInstall();

  if (!isInstallable) return null; // Hide if not installable

  return (
    <>
      <main className="container mx-auto bg-accent">
        <Button onClick={installApp}>Install App</Button>
      </main>
    </>
  );
}

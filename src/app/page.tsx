"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hook/usePWAInstall";
import {
  Wifi,
  WifiOff,
  Download,
  CheckCircle2,
  Loader2,
  Smartphone,
  Signal,
  SignalZero,
} from "lucide-react";

export default function ArfatPWAStatusPage() {
  const [isOffline, setIsOffline] = useState<boolean | null>(null);
  const { installApp, isInstallable } = usePWAInstall();

  useEffect(() => {
    const updateOnlineStatus = () => setIsOffline(!navigator.onLine);
    updateOnlineStatus();

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  const isLoading = isOffline === null;
  const isOnline = isOffline === false;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Arfatur Rahman App Status
          </h1>
          <p className="text-muted-foreground">
            Monitor your connection and install the app
          </p>
        </div>

        {/* Connection Status Card */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Signal className="h-5 w-5" />
              Connection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`
                relative rounded-xl p-6 sm:p-8 transition-all duration-500
                ${isLoading ? "bg-muted" : ""}
                ${
                  isOnline
                    ? "bg-linear-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20"
                    : ""
                }
                ${
                  isOffline
                    ? "bg-linear-to-br from-destructive/10 to-destructive/5 border border-destructive/20"
                    : ""
                }
              `}
            >
              {/* Animated Background Pulse */}
              {!isLoading && (
                <div
                  className={`
                    absolute inset-0 rounded-xl opacity-30 animate-pulse
                    ${isOnline ? "bg-emerald-500/10" : "bg-destructive/10"}
                  `}
                />
              )}

              <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                {/* Status Icon */}
                <div
                  className={`
                    flex items-center justify-center w-20 h-20 rounded-full
                    transition-all duration-500
                    ${isLoading ? "bg-muted-foreground/20" : ""}
                    ${
                      isOnline
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : ""
                    }
                    ${isOffline ? "bg-destructive/20 text-destructive" : ""}
                  `}
                >
                  {isLoading ? (
                    <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                  ) : isOnline ? (
                    <Wifi className="h-10 w-10 animate-in zoom-in duration-300" />
                  ) : (
                    <WifiOff className="h-10 w-10 animate-in zoom-in duration-300" />
                  )}
                </div>

                {/* Status Text */}
                <div className="text-center sm:text-left space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {isLoading
                      ? "Checking..."
                      : isOnline
                      ? "You're Online"
                      : "You're Offline"}
                  </h2>
                  <p className="text-muted-foreground">
                    {isLoading
                      ? "Detecting your connection status"
                      : isOnline
                      ? "All services are available"
                      : "Some features may be limited"}
                  </p>
                </div>

                {/* Status Badge */}
                <div
                  className={`
                    sm:ml-auto px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-300
                    ${isLoading ? "bg-muted text-muted-foreground" : ""}
                    ${
                      isOnline
                        ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                        : ""
                    }
                    ${isOffline ? "bg-destructive/20 text-destructive" : ""}
                  `}
                >
                  <span className="flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" />
                        Loading
                      </>
                    ) : isOnline ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Connected
                      </>
                    ) : (
                      <>
                        <span className="h-2 w-2 rounded-full bg-destructive" />
                        Disconnected
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Install App Card */}
        <Card
          className={`
            transition-all duration-500 overflow-hidden
            ${
              isInstallable
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none h-0 p-0 border-0"
            }
          `}
        >
          {isInstallable && (
            <>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Smartphone className="h-5 w-5" />
                  Install App
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 text-primary">
                      <Download className="h-8 w-8" />
                    </div>

                    {/* Text */}
                    <div className="text-center sm:text-left flex-1 space-y-1">
                      <h3 className="text-xl font-semibold">
                        Get the Full Experience
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Install this app on your device for faster access and
                        offline support.
                      </p>
                    </div>

                    {/* Install Button */}
                    <Button
                      onClick={installApp}
                      size="lg"
                      className="w-full cursor-pointer sm:w-auto gap-2 font-semibold"
                    >
                      <Download className="h-4 w-4" />
                      Install Now
                    </Button>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 pt-6 border-t border-primary/10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { icon: Wifi, text: "Works Offline" },
                        { icon: Smartphone, text: "Native Experience" },
                        { icon: CheckCircle2, text: "Quick Access" },
                      ].map(({ icon: Icon, text }, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Icon className="h-4 w-4 text-primary" />
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={`
                  p-2 rounded-lg
                  ${
                    isOnline
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-muted text-muted-foreground"
                  }
                `}
              >
                {isOnline ? (
                  <Signal className="h-5 w-5" />
                ) : (
                  <SignalZero className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Network</p>
                <p className="font-semibold">
                  {isLoading ? "..." : isOnline ? "Active" : "None"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={`
                  p-2 rounded-lg
                  ${
                    isInstallable
                      ? "bg-primary/10 text-primary"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  }
                `}
              >
                {isInstallable ? (
                  <Download className="h-5 w-5" />
                ) : (
                  <CheckCircle2 className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">App</p>
                <p className="font-semibold">
                  {isInstallable ? "Available" : "Installed"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Info Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Try disconnecting your internet to see the offline status in action.
        </p>
      </div>
    </div>
  );
}

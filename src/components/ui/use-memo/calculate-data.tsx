"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Clock,
  Calculator,
  Hash,
  Zap,
  RefreshCw,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Custom time formatting function
function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const isPM = hours >= 12;
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes}:${seconds} ${isPM ? "PM" : "AM"}`;
}

function CalculateDataViaUseMemo() {
  const [selectedNum, setSelectedNum] = React.useState(100);
  const [useMemoEnabled, setUseMemoEnabled] = React.useState(true);

  const time = useTime();

  // ✅ Track total component renders
  const totalRenderCount = React.useRef(0);
  totalRenderCount.current += 1;

  // ✅ Track prime calculation counts (persists across renders)
  const primeCalcCount = React.useRef(0);

  // ✅ Track clock-triggered renders (renders caused by time changes)
  const clockRenderCount = React.useRef(0);
  const lastTimeRef = React.useRef<Date | null>(null);

  // Detect if this render was triggered by clock
  React.useEffect(() => {
    if (
      time &&
      lastTimeRef.current &&
      time.getTime() !== lastTimeRef.current.getTime()
    ) {
      clockRenderCount.current += 1;
    }
    lastTimeRef.current = time;
  });

  // ✅ Force re-render to update displayed counts
  const [, forceUpdate] = React.useState({});

  // Non-memoized calculation
  const primesWithoutMemo = (() => {
    if (!useMemoEnabled) {
      primeCalcCount.current += 1;
      console.log(
        `⚠️ Calculating primes (useMemo OFF) - Count: ${primeCalcCount.current}`
      );
      const result: number[] = [];
      for (let counter = 2; counter < selectedNum; counter++) {
        if (isPrime(counter)) {
          result.push(counter);
        }
      }
      return result;
    }
    return [];
  })();

  // Memoized calculation
  const primesWithMemo = React.useMemo(() => {
    if (!useMemoEnabled) return [];
    primeCalcCount.current += 1;
    console.log(
      `🔢 Calculating primes (useMemo ON) - Count: ${primeCalcCount.current}`
    );
    const result: number[] = [];
    for (let counter = 2; counter < selectedNum; counter++) {
      if (isPrime(counter)) {
        result.push(counter);
      }
    }
    return result;
  }, [selectedNum, useMemoEnabled]);

  const allPrimes = useMemoEnabled ? primesWithMemo : primesWithoutMemo;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let num = Math.min(100_000, Number(event.target.value));
    if (num < 2) num = 2;
    setSelectedNum(num);
  };

  // Reset counters
  const resetCounters = () => {
    totalRenderCount.current = 0;
    primeCalcCount.current = 0;
    clockRenderCount.current = 0;
    forceUpdate({});
  };

  // Toggle handler that also resets counters for fair comparison
  const handleToggle = (checked: boolean) => {
    resetCounters();
    setUseMemoEnabled(checked);
  };

  return (
    <section className="relative min-h-screen bg-slate-950">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-size-[64px_64px]" />

      {/* Gradient Orbs */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-31.25 w-31.25 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-25 w-25 translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="container relative mx-auto flex max-w-4xl flex-col gap-6 py-16">
        {/* Header */}
        <header className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row">
          <div>
            <h1 className="bg-linear-to-b from-white to-slate-400 bg-clip-text text-3xl font-bold text-transparent">
              Prime Calculator
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Real-time calculation demo with render tracking
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-1.5 text-sm font-medium text-blue-400 border border-slate-700/50">
            <Clock className="h-4 w-4" />
            <span suppressHydrationWarning>
              {time ? formatTime(time) : "--:--:-- --"}
            </span>
          </div>
        </header>

        {/* 🆕 Stats Dashboard */}
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between gap-2 text-lg text-white">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-400" />
                Render Statistics
              </div>
              <button
                onClick={resetCounters}
                className="flex items-center gap-1.5 rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                Reset Counters
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Renders */}
              <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total Renders
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "font-mono text-3xl font-bold",
                      totalRenderCount.current > 10
                        ? "text-red-400"
                        : "text-blue-400"
                    )}
                    suppressHydrationWarning
                  >
                    {totalRenderCount.current}
                  </span>
                  <span className="text-xs text-slate-500">times</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Component re-rendered
                </p>
              </div>

              {/* Clock Renders */}
              <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Clock Updates
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-mono text-3xl font-bold text-yellow-400"
                    suppressHydrationWarning
                  >
                    {clockRenderCount.current}
                  </span>
                  <span className="text-xs text-slate-500">ticks</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Renders from clock (every second)
                </p>
              </div>

              {/* Prime Calculations */}
              <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="h-3 w-3 text-purple-500" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Prime Calculations
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "font-mono text-3xl font-bold",
                      useMemoEnabled ? "text-emerald-400" : "text-red-400"
                    )}
                    suppressHydrationWarning
                  >
                    {primeCalcCount.current}
                  </span>
                  <span className="text-xs text-slate-500">times</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {useMemoEnabled
                    ? "Only when input changes ✓"
                    : "On EVERY render! ⚠️"}
                </p>
              </div>
            </div>

            {/* Comparison Insight */}
            <div
              className={cn(
                "mt-4 rounded-lg border p-3 text-sm",
                useMemoEnabled
                  ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
                  : "border-red-500/30 bg-red-500/5 text-red-400"
              )}
            >
              {useMemoEnabled ? (
                <div className="flex items-start gap-2">
                  <span className="text-lg">✅</span>
                  <div>
                    <p className="font-medium">useMemo is ON</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Notice how &quot;Prime Calculations&quot; stays low while
                      &quot;Clock Updates&quot; keeps incrementing. The
                      expensive calculation is cached!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <span className="text-lg">⚠️</span>
                  <div>
                    <p className="font-medium">useMemo is OFF</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Watch &quot;Prime Calculations&quot; match &quot;Total
                      Renders&quot; - the primes are being recalculated on every
                      single render, even from clock ticks!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Controls Card */}
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <Calculator className="h-5 w-5 text-blue-400" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {/* USE MEMO TOGGLE */}
              <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "rounded-full p-2",
                      useMemoEnabled ? "bg-emerald-500/10" : "bg-red-500/10"
                    )}
                  >
                    <Zap
                      className={cn(
                        "h-5 w-5",
                        useMemoEnabled ? "text-emerald-400" : "text-red-400"
                      )}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="use-memo-switch"
                      className="text-slate-300 font-medium"
                    >
                      Optimize with useMemo
                    </Label>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {useMemoEnabled
                        ? "Enabled — primes are memoized"
                        : "Disabled — primes recalculate on every render"}
                    </p>
                  </div>
                </div>
                <Switch
                  id="use-memo-switch"
                  checked={useMemoEnabled}
                  onCheckedChange={handleToggle}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>

              {/* Input Field */}
              <div className="grid gap-2">
                <Label htmlFor="num" className="text-slate-300">
                  Upper Limit (N)
                </Label>
                <div className="relative">
                  <Input
                    id="num"
                    type="number"
                    value={selectedNum}
                    onChange={handleInputChange}
                    className="bg-slate-950 border-slate-700 focus-visible:ring-blue-500 font-mono"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                    MAX 100k
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Enter a number to calculate all prime numbers up to it.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2 text-lg text-white">
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-purple-400" />
                Results
              </div>
              <Badge
                variant="outline"
                className="border-purple-500/30 text-purple-400"
              >
                {allPrimes.length} Found
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {allPrimes.length > 0 ? (
              <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mr-2">
                    Primes:
                  </span>
                  <span className="font-mono text-sm text-slate-300 break-all max-h-27.5 overflow-y-auto">
                    {allPrimes.join(", ")}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-800/30 py-8 text-center">
                <p className="text-slate-500">No primes found</p>
                <p className="text-xs text-slate-600 mt-1">
                  Try increasing the number
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Educational Note */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            📚 What&apos;s happening here?
          </h3>
          <div className="grid gap-4 text-sm text-slate-400">
            <div>
              <p className="font-medium text-slate-300">The Clock Problem:</p>
              <p className="mt-1">
                The clock updates every second, causing the component to
                re-render. Without{" "}
                <code className="text-blue-400 bg-slate-800 px-1 rounded">
                  useMemo
                </code>
                , every tick recalculates all primes — even though the input
                hasn&apos;t changed!
              </p>
            </div>
            <div>
              <p className="font-medium text-slate-300">The Solution:</p>
              <p className="mt-1">
                <code className="text-emerald-400 bg-slate-800 px-1 rounded">
                  useMemo
                </code>{" "}
                caches the result and only recalculates when{" "}
                <code className="text-yellow-400 bg-slate-800 px-1 rounded">
                  selectedNum
                </code>{" "}
                changes. Watch the &quot;Prime Calculations&quot; counter — with
                useMemo ON, it stays stable!
              </p>
            </div>
            <div className="border-t border-slate-800 pt-4">
              <p className="font-medium text-slate-300">Try this:</p>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Reset counters and wait 10 seconds with useMemo ON</li>
                <li>Note the Prime Calculations count (should be ~1)</li>
                <li>Toggle useMemo OFF, reset, and wait 10 seconds</li>
                <li>Prime Calculations should match Total Renders (~10+)!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Hooks
// ============================================

function useTime() {
  const [time, setTime] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setTime(new Date());

    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return time;
}

// ============================================
// Utilities
// ============================================

function isPrime(n: number) {
  const max = Math.ceil(Math.sqrt(n));

  if (n === 2) return true;
  if (n <= 1 || n % 2 === 0) return false;

  for (let counter = 3; counter <= max; counter += 2) {
    if (n % counter === 0) return false;
  }
  return true;
}

export default CalculateDataViaUseMemo;

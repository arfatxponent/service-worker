// components/counter-with-history.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Minus,
  Plus,
  RotateCcw,
  ArrowRight,
  Loader2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ICounterState } from "@/lib/types/useActionState/counter";
import { counterAction } from "@/lib/actions/counter-actions";

interface IHistoryEntry {
  action: string;
  count: number;
  timestamp: number;
}

const initialState: ICounterState = {
  count: 0,
  message: "",
  timestamp: Date.now(),
  lastAction: null,
};

export function CounterWithHistory() {
  const [state, formAction, isPending] = useActionState(
    counterAction,
    initialState
  );
  const [step, setStep] = useState(1);
  const [customValue, setCustomValue] = useState("");
  const [history, setHistory] = useState<IHistoryEntry[]>([]);

  // Track history
  useEffect(() => {
    if (state.lastAction) {
      setHistory((prev) => [
        {
          action: state.message,
          count: state.count,
          timestamp: state.timestamp,
        },
        ...prev.slice(0, 9),
      ]);
    }
  }, [state.timestamp, state.lastAction, state.message, state.count]);

  return (
    <section className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="min-h-[calc(100vh-65px)] mx-auto container  p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white">Counter Dashboard</h1>
            <p className="mt-2 text-gray-400">
              Powered by Server Actions & useActionState
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Main Counter Card */}
            <Card className="border-gray-700 bg-gray-800/50 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Counter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Display */}
                <div className="flex items-center justify-center rounded-xl bg-gray-900/50 p-8">
                  <span
                    className={cn(
                      "text-7xl font-bold tabular-nums transition-all",
                      state.count >= 0 ? "text-white" : "text-red-400",
                      isPending && "animate-pulse"
                    )}
                  >
                    {isPending ? (
                      <Loader2 className="h-16 w-16 animate-spin" />
                    ) : (
                      state.count
                    )}
                  </span>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <form action={formAction}>
                    <input type="hidden" name="action" value="decrement" />
                    <input type="hidden" name="step" value={step} />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isPending}
                      className="gap-2 bg-red-600 hover:bg-red-700"
                    >
                      <Minus className="h-5 w-5" />
                      Decrease
                    </Button>
                  </form>

                  <div className="flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-2">
                    <span className="text-sm text-gray-400">Step:</span>
                    <select
                      value={step}
                      onChange={(e) => setStep(Number(e.target.value))}
                      className="bg-transparent text-white focus:outline-none"
                    >
                      {[1, 5, 10, 25, 100].map((val) => (
                        <option key={val} value={val}>
                          {val}
                        </option>
                      ))}
                    </select>
                  </div>

                  <form action={formAction}>
                    <input type="hidden" name="action" value="increment" />
                    <input type="hidden" name="step" value={step} />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isPending}
                      className="gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="h-5 w-5" />
                      Increase
                    </Button>
                  </form>
                </div>

                {/* Set Value & Reset */}
                <div className="flex flex-wrap gap-3">
                  <form action={formAction} className="flex flex-1 gap-2">
                    <input type="hidden" name="action" value="set" />
                    <Input
                      type="number"
                      name="setValue"
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      placeholder="Set value..."
                      className="border-gray-600 bg-gray-700 text-white"
                    />
                    <Button type="submit" disabled={isPending || !customValue}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>

                  <form action={formAction}>
                    <input type="hidden" name="action" value="reset" />
                    <Button
                      type="submit"
                      variant="outline"
                      disabled={isPending || state.count === 0}
                      className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* History Card */}
            <Card className="border-gray-700 bg-gray-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Clock className="h-5 w-5" />
                  History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  {history.length === 0 ? (
                    <p className="text-center text-sm text-gray-500">
                      No actions yet
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {history.map((entry, index) => (
                        <HistoryItem
                          key={entry.timestamp}
                          entry={entry}
                          isLatest={index === 0}
                        />
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Stats Row */}
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <DashboardStat
              label="Current Value"
              value={state.count}
              colorClass="text-white"
            />
            <DashboardStat
              label="Current Step"
              value={step}
              colorClass="text-purple-400"
            />
            <DashboardStat
              label="Total Actions"
              value={history.length}
              colorClass="text-blue-400"
            />
            <DashboardStat
              label="Last Action"
              value={state.lastAction || "None"}
              colorClass="text-yellow-400"
              isText
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface IHistoryItemProps {
  entry: IHistoryEntry;
  isLatest: boolean;
}

function HistoryItem({ entry, isLatest }: IHistoryItemProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-700 bg-gray-900/50 p-3 transition-all",
        isLatest && "border-purple-500/50 bg-purple-500/10"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">{entry.action}</span>
        <span className="font-mono text-lg font-bold text-white">
          {entry.count}
        </span>
      </div>
      <span className="text-xs text-gray-500">
        {new Date(entry.timestamp).toLocaleTimeString()}
      </span>
    </div>
  );
}

interface IDashboardStatProps {
  label: string;
  value: number | string;
  colorClass: string;
  isText?: boolean;
}

function DashboardStat({
  label,
  value,
  colorClass,
  isText = false,
}: IDashboardStatProps) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4 text-center">
      <div
        className={cn(
          "text-2xl font-bold",
          colorClass,
          !isText && "tabular-nums"
        )}
      >
        {value}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

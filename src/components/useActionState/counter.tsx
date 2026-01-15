// src/components/useActionState/counter.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Minus,
  Plus,
  RotateCcw,
  ArrowRight,
  Loader2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { counterAction } from "@/lib/actions/counter-actions";
import { ICounterState } from "@/lib/types/useActionState/counter";

const initialState: ICounterState = {
  count: 0,
  message: "",
  timestamp: Date.now(),
  lastAction: null,
};

export function Counter() {
  const [state, formAction, isPending] = useActionState(
    counterAction,
    initialState
  );
  const [step, setStep] = useState(1);
  const [customValue, setCustomValue] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Show message temporarily when state changes
  useEffect(() => {
    if (state.message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [state.timestamp, state.message]);

  return (
    <section className="bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 ">
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-65px)] container mx-auto">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        </div>

        <Card className="relative w-full max-w-lg border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white">
              Counter App
            </CardTitle>
            <p className="text-sm text-white/60">
              Using Server Actions & useActionState
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Counter Display */}
            <div className="relative">
              <div
                className={cn(
                  "flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300",
                  isPending && "scale-95 opacity-70",
                  state.lastAction === "increment" && "border-green-500/50",
                  state.lastAction === "decrement" && "border-red-500/50",
                  state.lastAction === "reset" && "border-yellow-500/50",
                  state.lastAction === "set" && "border-blue-500/50"
                )}
              >
                {/* Action indicator */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  {state.lastAction && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
                        state.lastAction === "increment" &&
                          "bg-green-500/20 text-green-400",
                        state.lastAction === "decrement" &&
                          "bg-red-500/20 text-red-400",
                        state.lastAction === "reset" &&
                          "bg-yellow-500/20 text-yellow-400",
                        state.lastAction === "set" &&
                          "bg-blue-500/20 text-blue-400"
                      )}
                    >
                      {state.lastAction === "increment" && (
                        <TrendingUp className="h-3 w-3" />
                      )}
                      {state.lastAction === "decrement" && (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {state.lastAction === "reset" && (
                        <RotateCcw className="h-3 w-3" />
                      )}
                      {state.lastAction === "set" && (
                        <ArrowRight className="h-3 w-3" />
                      )}
                      {state.lastAction}
                    </span>
                  )}
                </div>

                {/* Count number */}
                <div className="relative">
                  {isPending && (
                    <Loader2 className="absolute -right-8 top-1/2 h-6 w-6 -translate-y-1/2 animate-spin text-white/50" />
                  )}
                  <span
                    className={cn(
                      "text-8xl font-bold tabular-nums transition-all duration-300",
                      state.count >= 0 ? "text-white" : "text-red-400",
                      isPending && "blur-sm"
                    )}
                  >
                    {state.count}
                  </span>
                </div>

                {/* Status message */}
                <div
                  className={cn(
                    "mt-4 h-6 text-sm text-white/60 transition-all duration-300",
                    showMessage ? "opacity-100" : "opacity-0"
                  )}
                >
                  {state.message}
                </div>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4">
              {/* Decrement Form */}
              <form action={formAction}>
                <input type="hidden" name="action" value="decrement" />
                <input type="hidden" name="step" value={step} />
                <Button
                  type="submit"
                  size="lg"
                  variant="outline"
                  disabled={isPending}
                  className="h-16 w-16 rounded-full border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 disabled:opacity-50"
                >
                  <Minus className="h-6 w-6" />
                </Button>
              </form>

              {/* Step Selector */}
              <div className="flex flex-col items-center gap-2">
                <Label className="text-xs text-white/60">Step</Label>
                <div className="flex gap-1">
                  {[1, 5, 10].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setStep(value)}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
                        step === value
                          ? "bg-purple-500 text-white"
                          : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Increment Form */}
              <form action={formAction}>
                <input type="hidden" name="action" value="increment" />
                <input type="hidden" name="step" value={step} />
                <Button
                  type="submit"
                  size="lg"
                  variant="outline"
                  disabled={isPending}
                  className="h-16 w-16 rounded-full border-green-500/50 bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:text-green-300 disabled:opacity-50"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </form>
            </div>

            {/* Secondary Controls */}
            <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4">
              {/* Set Custom Value */}
              <form action={formAction} className="flex gap-2">
                <input type="hidden" name="action" value="set" />
                <Input
                  type="number"
                  name="setValue"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="Enter value..."
                  className="flex-1 border-white/10 bg-white/5 text-white placeholder:text-white/40"
                />
                <Button
                  type="submit"
                  disabled={isPending || !customValue}
                  variant="secondary"
                  className="gap-2"
                >
                  <ArrowRight className="h-4 w-4" />
                  Set
                </Button>
              </form>

              {/* Reset Button */}
              <form action={formAction}>
                <input type="hidden" name="action" value="reset" />
                <Button
                  type="submit"
                  disabled={isPending || state.count === 0}
                  variant="ghost"
                  className="w-full gap-2 text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Counter
                </Button>
              </form>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <StatBox
                value={state.count > 0 ? state.count : 0}
                label="Positive"
                colorClass="text-green-400"
              />
              <StatBox
                value={step}
                label="Current Step"
                colorClass="text-white"
              />
              <StatBox
                value={state.count < 0 ? Math.abs(state.count) : 0}
                label="Negative"
                colorClass="text-red-400"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

interface IStatBoxProps {
  value: number;
  label: string;
  colorClass: string;
}

function StatBox({ value, label, colorClass }: IStatBoxProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className={cn("text-2xl font-bold", colorClass)}>{value}</div>
      <div className="text-xs text-white/40">{label}</div>
    </div>
  );
}

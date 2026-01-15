// src/components/useMemo/use-memo-guide.tsx
"use client";

import React, { useState, useMemo, memo, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Code2,
  Lightbulb,
  Play,
  CheckCircle2,
  ArrowRight,
  Zap,
  Calculator,
  RefreshCw,
  AlertTriangle,
  XCircle,
  Clock,
  Database,
  Filter,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// Main Guide Component
// ============================================
export function UseMemoGuide() {
  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-900">
      <div className="container mx-auto min-h-screen px-4 py-12">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        {/* Header */}
        <header className="relative mb-12 text-center">
          <Badge className="mb-4 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">
            React Performance Hook
          </Badge>
          <h1 className="text-4xl font-bold text-white md:text-5xl">useMemo</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Cache expensive calculations and avoid re-running them on every
            render
          </p>
        </header>

        <div className="relative mx-auto max-w-4xl space-y-8">
          {/* TL;DR Section */}
          <Card className="border-purple-500/20 bg-purple-500/5 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-white">
                <Zap className="h-5 w-5 text-purple-400" />
                TL;DR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <TLDRItem
                  question="What is useMemo used for?"
                  answer="Caches the result of expensive calculations so they don't run on every render."
                />
                <TLDRItem
                  question="useMemo vs useCallback?"
                  answer="useMemo caches a value, useCallback caches a function."
                />
                <TLDRItem
                  question="When to use it?"
                  answer="When you have slow calculations that don't need to run every render."
                />
                <TLDRItem
                  question="How does it work?"
                  answer="It remembers the result and only recalculates when dependencies change."
                />
              </div>
            </CardContent>
          </Card>

          {/* What is useMemo? */}
          <ConceptCard
            icon={<BookOpen className="h-5 w-5" />}
            title="What is useMemo?"
            iconColor="text-blue-400"
            borderColor="border-blue-500/20"
          >
            <p className="text-white/70">
              <code className="text-purple-400">useMemo</code> is a React Hook
              that{" "}
              <span className="font-medium text-white">
                memoizes (caches) the result of a calculation
              </span>
              . The calculation runs only when its dependencies change, not on
              every render.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <FeatureBox
                icon={<Database className="h-4 w-4" />}
                title="Caches Values"
                description="Stores the result in memory"
              />
              <FeatureBox
                icon={<Zap className="h-4 w-4" />}
                title="Skips Work"
                description="Avoids re-running expensive code"
              />
              <FeatureBox
                icon={<RefreshCw className="h-4 w-4" />}
                title="Smart Updates"
                description="Only recalculates when needed"
              />
            </div>
          </ConceptCard>

          {/* The Problem */}
          <ConceptCard
            icon={<AlertTriangle className="h-5 w-5" />}
            title="The Problem: Expensive Calculations Run Every Render"
            iconColor="text-amber-400"
            borderColor="border-amber-500/20"
          >
            <p className="mb-4 text-white/70">
              When a React component re-renders,{" "}
              <span className="font-medium text-white">
                all code inside it runs again
              </span>
              . If you have a slow calculation, it runs even when unrelated
              state changes.
            </p>

            <CodeBlock
              code={`function MyComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ❌ This runs on EVERY render!
  // Even when only 'text' changes!
  const expensiveValue = calculatePrimes(count);
  
  return (
    <>
      <input onChange={(e) => setText(e.target.value)} />
      <p>{expensiveValue}</p>
    </>
  );
}`}
            />

            <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <h4 className="flex items-center gap-2 text-sm font-medium text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                Why This Matters
              </h4>
              <p className="mt-2 text-xs text-white/60">
                Typing in the input causes a re-render. Each keystroke
                re-calculates all prime numbers — even though{" "}
                <code className="text-amber-300">count</code> didn&apos;t
                change! This makes typing feel slow and laggy.
              </p>
            </div>
          </ConceptCard>

          {/* Basic Syntax */}
          <ConceptCard
            icon={<Code2 className="h-5 w-5" />}
            title="Basic Syntax"
            iconColor="text-green-400"
            borderColor="border-green-500/20"
          >
            <CodeBlock
              code={`const memoizedValue = useMemo(
  () => {
    // Your expensive calculation
    return computeExpensiveValue(a, b);
  },
  [a, b]  // Dependency array
);`}
            />

            <div className="mt-6 space-y-4">
              <h4 className="text-sm font-medium text-white/80">
                What You Give It (Inputs)
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <ParameterBox
                  name="calculateFn"
                  type="() => value"
                  description="A function that returns the value you want to cache"
                />
                <ParameterBox
                  name="dependencies"
                  type="array"
                  description="Values that, when changed, trigger recalculation"
                />
              </div>

              <h4 className="mt-6 text-sm font-medium text-white/80">
                What You Get Back (Output)
              </h4>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <code className="text-sm font-medium text-purple-400">
                  memoizedValue
                </code>
                <p className="mt-2 text-xs text-white/60">
                  The cached result of your calculation. Same value on every
                  render unless dependencies change.
                </p>
              </div>
            </div>
          </ConceptCard>

          {/* Live Demo */}
          <ConceptCard
            icon={<Play className="h-5 w-5" />}
            title="Try It Live"
            iconColor="text-orange-400"
            borderColor="border-orange-500/20"
          >
            <LiveDemo />
          </ConceptCard>

          {/* The Solution */}
          <ConceptCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="The Solution"
            iconColor="text-emerald-400"
            borderColor="border-emerald-500/20"
          >
            <p className="mb-4 text-white/70">
              Wrap your expensive calculation in{" "}
              <code className="text-emerald-400">useMemo</code> to cache the
              result:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Bad Example */}
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-red-400">
                  <XCircle className="h-4 w-4" />
                  Without useMemo
                </div>
                <CodeBlock
                  code={`// ❌ Runs on EVERY render
const primes = calculatePrimes(count);

// Typing in input = recalculate!
// Clock ticking = recalculate!`}
                  small
                />
              </div>

              {/* Good Example */}
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  With useMemo
                </div>
                <CodeBlock
                  code={`// ✅ Only runs when count changes
const primes = useMemo(() => {
  return calculatePrimes(count);
}, [count]);

// Typing = no recalculation! ✓`}
                  small
                />
              </div>
            </div>
          </ConceptCard>

          {/* Mini Example */}
          <ConceptCard
            icon={<Code2 className="h-5 w-5" />}
            title="Complete Example"
            iconColor="text-cyan-400"
            borderColor="border-cyan-500/20"
          >
            <CodeBlock
              code={`import { useMemo, useState } from "react";

function Example() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ✅ Only recalculates when 'count' changes
  const expensiveValue = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 1_000_000; i++) sum += i;
    return sum;
  }, [count]);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <input onChange={(e) => setText(e.target.value)} />
      <p>Result: {expensiveValue}</p>
    </>
  );
}`}
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
                <p className="text-xs font-medium text-green-400">
                  ✔ Changing text
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Calculation does NOT re-run
                </p>
              </div>
              <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                <p className="text-xs font-medium text-blue-400">
                  ✔ Changing count
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Calculation re-runs (as expected)
                </p>
              </div>
            </div>
          </ConceptCard>

          {/* Common Mistake */}
          <ConceptCard
            icon={<Lightbulb className="h-5 w-5" />}
            title="Common Mistake: Too Many Dependencies"
            iconColor="text-yellow-400"
            borderColor="border-yellow-500/20"
          >
            <p className="mb-4 text-white/70">
              Adding frequently-changing values to dependencies{" "}
              <span className="font-medium text-white">
                defeats the purpose
              </span>{" "}
              of useMemo:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Bad */}
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-red-400">
                  <XCircle className="h-4 w-4" />
                  Too many dependencies
                </div>
                <CodeBlock
                  code={`// ❌ Recalculates on every keystroke!
const filtered = useMemo(() => {
  return items.filter(matchesSearch);
}, [items, searchText, sortOrder, 
    filterBy, pageSize]); // Too many!`}
                  small
                />
              </div>

              {/* Good */}
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Only what&apos;s needed
                </div>
                <CodeBlock
                  code={`// ✅ Only recalculates when needed
const filtered = useMemo(() => {
  return items.filter(matchesSearch);
}, [items, searchText]); // Just these two

// Sort and paginate separately`}
                  small
                />
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <h4 className="flex items-center gap-2 text-sm font-medium text-blue-400">
                <Lightbulb className="h-4 w-4" />
                Key Insight
              </h4>
              <p className="mt-2 text-xs text-white/60">
                Only add dependencies that actually affect the calculation. If a
                value doesn&apos;t change the result, don&apos;t include it!
              </p>
            </div>
          </ConceptCard>

          {/* When NOT to use */}
          <ConceptCard
            icon={<XCircle className="h-5 w-5" />}
            title="When You DON'T Need useMemo"
            iconColor="text-red-400"
            borderColor="border-red-500/20"
          >
            <div className="space-y-3">
              {[
                {
                  title: "Fast calculations",
                  desc: "Simple math or string operations don't need memoization — they're already quick.",
                },
                {
                  title: "Primitive values",
                  desc: "Numbers, strings, and booleans are cheap to create. Don't over-optimize.",
                },
                {
                  title: "Dependencies change often",
                  desc: "If deps change on every render, useMemo won't help — it recalculates anyway.",
                },
                {
                  title: "No performance problem",
                  desc: "Don't add useMemo 'just in case'. Measure first, optimize second.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
                >
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {item.title}
                    </p>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ConceptCard>

          {/* Comparison Table */}
          <ConceptCard
            icon={<ArrowRight className="h-5 w-5" />}
            title="useMemo vs useCallback"
            iconColor="text-cyan-400"
            borderColor="border-cyan-500/20"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 text-left text-white/80">Feature</th>
                    <th className="py-2 text-center text-purple-400">
                      useMemo
                    </th>
                    <th className="py-2 text-center text-indigo-400">
                      useCallback
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white/60">
                  <tr className="border-b border-white/5">
                    <td className="py-3">Purpose</td>
                    <td className="py-3 text-center">
                      Caches a{" "}
                      <strong className="text-purple-300">value</strong>
                    </td>
                    <td className="py-3 text-center">
                      Caches a{" "}
                      <strong className="text-indigo-300">function</strong>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">What is cached</td>
                    <td className="py-3 text-center">
                      Return value of function
                    </td>
                    <td className="py-3 text-center">Function reference</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Prevents</td>
                    <td className="py-3 text-center">
                      Expensive calculations re-running
                    </td>
                    <td className="py-3 text-center">Function re-creation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Returns</td>
                    <td className="py-3 text-center">Any value</td>
                    <td className="py-3 text-center">A function</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">When deps change</td>
                    <td className="py-3 text-center">Re-calculates value</td>
                    <td className="py-3 text-center">Re-creates function</td>
                  </tr>
                  <tr>
                    <td className="py-3">Common use case</td>
                    <td className="py-3 text-center">
                      Heavy computations, filtering, sorting
                    </td>
                    <td className="py-3 text-center">
                      Event handlers, callbacks to children
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-medium text-white/80 mb-2">
                Simple Way to Remember
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="text-xs text-white/60">
                  <code className="text-purple-400">useMemo</code> ={" "}
                  &quot;Remember this <strong>answer</strong>&quot;
                </div>
                <div className="text-xs text-white/60">
                  <code className="text-indigo-400">useCallback</code> ={" "}
                  &quot;Remember this <strong>function</strong>&quot;
                </div>
              </div>
            </div>
          </ConceptCard>

          {/* Real World Examples */}
          <ConceptCard
            icon={<Filter className="h-5 w-5" />}
            title="Real World Examples"
            iconColor="text-pink-400"
            borderColor="border-pink-500/20"
          >
            <div className="space-y-4">
              {/* Example 1 */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                  <Filter className="h-4 w-4 text-pink-400" />
                  Filtering a Large List
                </h4>
                <CodeBlock
                  code={`const filteredProducts = useMemo(() => {
  return products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase())
  );
}, [products, search]);`}
                  small
                />
              </div>

              {/* Example 2 */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                  <Calculator className="h-4 w-4 text-pink-400" />
                  Complex Calculations
                </h4>
                <CodeBlock
                  code={`const statistics = useMemo(() => {
  return {
    total: orders.reduce((sum, o) => sum + o.amount, 0),
    average: orders.length ? total / orders.length : 0,
    max: Math.max(...orders.map(o => o.amount)),
  };
}, [orders]);`}
                  small
                />
              </div>

              {/* Example 3 */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                  <Hash className="h-4 w-4 text-pink-400" />
                  Derived Data
                </h4>
                <CodeBlock
                  code={`const chartData = useMemo(() => {
  return rawData.map(item => ({
    x: new Date(item.date),
    y: item.value * conversionRate,
    label: formatLabel(item),
  }));
}, [rawData, conversionRate]);`}
                  small
                />
              </div>
            </div>
          </ConceptCard>

          {/* Quick Reference */}
          <QuickReference />
        </div>
      </div>
    </section>
  );
}

// ============================================
// Live Demo Component (FIXED)
// ============================================
function LiveDemo() {
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);
  const [selectedNum, setSelectedNum] = useState(100);
  const [text, setText] = useState("");

  // ✅ Use refs instead of state for tracking counts
  const calcCountRef = useRef(0);
  const renderCountRef = useRef(0);

  // ✅ Force update mechanism (for reset button)
  const [, forceUpdate] = useState({});

  // ✅ Track renders using ref (not useEffect with setState!)
  renderCountRef.current += 1;

  // Calculate primes - the expensive operation
  const calculatePrimes = (max: number): number[] => {
    const result: number[] = [];
    for (let i = 2; i < max; i++) {
      let isPrime = true;
      for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) result.push(i);
    }
    return result;
  };

  // Without useMemo - calculates every render
  const primesWithoutMemo = (() => {
    if (!useMemoEnabled) {
      calcCountRef.current += 1;
      return calculatePrimes(selectedNum);
    }
    return [];
  })();

  // With useMemo - only calculates when selectedNum changes
  const primesWithMemo = useMemo(() => {
    if (useMemoEnabled) {
      calcCountRef.current += 1;
      return calculatePrimes(selectedNum);
    }
    return [];
  }, [selectedNum, useMemoEnabled]);

  const primes = useMemoEnabled ? primesWithMemo : primesWithoutMemo;

  const resetDemo = () => {
    calcCountRef.current = 0;
    renderCountRef.current = 0;
    setText("");
    forceUpdate({});
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex justify-center gap-2">
        {[
          { value: false, label: "Without useMemo", color: "red" },
          { value: true, label: "With useMemo", color: "green" },
        ].map((mode) => (
          <button
            key={mode.label}
            type="button"
            onClick={() => {
              resetDemo();
              setUseMemoEnabled(mode.value);
            }}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              useMemoEnabled === mode.value
                ? mode.color === "red"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
                : "bg-white/10 text-white/60 hover:bg-white/20"
            )}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Stats Display */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-white/40">Component Renders</p>
            {/* ✅ Add suppressHydrationWarning */}
            <p
              className="mt-1 text-2xl font-bold tabular-nums text-blue-400"
              suppressHydrationWarning
            >
              {renderCountRef.current}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/40">Prime Calculations</p>
            {/* ✅ Add suppressHydrationWarning */}
            <p
              className={cn(
                "mt-1 text-2xl font-bold tabular-nums",
                useMemoEnabled ? "text-green-400" : "text-red-400"
              )}
              suppressHydrationWarning
            >
              {calcCountRef.current}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/40">Primes Found</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-purple-400">
              {primes.length}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Text Input - triggers re-render but shouldn't recalculate */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <label className="mb-2 block text-xs font-medium text-white/60">
            Type here (causes re-render, but should NOT recalculate primes)
          </label>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type anything..."
            className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
          />
        </div>

        {/* Number Input - should trigger recalculation */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <label className="mb-2 block text-xs font-medium text-white/60">
            Change this number (should recalculate primes)
          </label>
          <Input
            type="number"
            value={selectedNum}
            onChange={(e) => {
              const val = Math.min(1000, Math.max(2, Number(e.target.value)));
              setSelectedNum(val);
            }}
            min={2}
            max={1000}
            className="border-white/10 bg-white/5 font-mono text-white"
          />
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button
          onClick={resetDemo}
          size="sm"
          variant="ghost"
          className="gap-2 text-white/60 hover:bg-white/10 hover:text-white"
        >
          <RefreshCw className="h-4 w-4" />
          Reset Counters
        </Button>
      </div>

      {/* Result Message */}
      {!useMemoEnabled ? (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <span className="text-xs text-red-400">
            Type in the text box — watch calculations match renders!
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-3">
          <CheckCircle2 className="h-4 w-4 text-green-400" />
          <span className="text-xs text-green-400">
            Type in the text box — calculations stay stable!
          </span>
        </div>
      )}

      {/* Primes Display */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <p className="mb-2 text-xs font-medium text-white/40">
          First 20 primes up to {selectedNum}:
        </p>
        <p className="font-mono text-xs text-white/60">
          {primes.slice(0, 20).join(", ")}
          {primes.length > 20 && "..."}
        </p>
      </div>
    </div>
  );
}

// ============================================
// Helper Components
// ============================================

interface TLDRItemProps {
  question: string;
  answer: string;
}

function TLDRItem({ question, answer }: TLDRItemProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <p className="text-xs font-medium text-purple-400">{question}</p>
      <p className="mt-1 text-xs text-white/60">{answer}</p>
    </div>
  );
}

interface ConceptCardProps {
  icon: React.ReactNode;
  title: string;
  iconColor: string;
  borderColor: string;
  children: React.ReactNode;
}

function ConceptCard({
  icon,
  title,
  iconColor,
  borderColor,
  children,
}: ConceptCardProps) {
  return (
    <Card
      className={cn("border-white/10 bg-white/5 backdrop-blur", borderColor)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-white">
          <span className={cn("rounded-lg bg-white/10 p-2", iconColor)}>
            {icon}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

interface FeatureBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureBox({ icon, title, description }: FeatureBoxProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
      <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
        {icon}
      </div>
      <h4 className="text-sm font-medium text-white">{title}</h4>
      <p className="mt-1 text-xs text-white/50">{description}</p>
    </div>
  );
}

interface ParameterBoxProps {
  name: string;
  type: string;
  description: string;
}

function ParameterBox({ name, type, description }: ParameterBoxProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-2">
        <code className="text-sm font-medium text-purple-400">{name}</code>
        <Badge variant="outline" className="text-xs text-white/40">
          {type}
        </Badge>
      </div>
      <p className="mt-2 text-xs text-white/60">{description}</p>
    </div>
  );
}

interface CodeBlockProps {
  code: string;
  small?: boolean;
}

function CodeBlock({ code, small = false }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg border border-white/10 bg-slate-950 p-4",
        small && "p-3"
      )}
    >
      <code className={cn("text-sm text-white/80", small && "text-xs")}>
        {code}
      </code>
    </pre>
  );
}

function QuickReference() {
  return (
    <Card className="border-purple-500/20 bg-purple-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <ArrowRight className="h-5 w-5 text-purple-400" />
          Quick Reference
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">✅ Use When</h4>
            <ul className="space-y-1 text-xs text-white/60">
              <li>• Expensive calculations (filtering, sorting, math)</li>
              <li>• Creating objects/arrays used in dependencies</li>
              <li>• Deriving data from props or state</li>
              <li>• Component re-renders frequently with same data</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">
              ❌ Don&apos;t Use When
            </h4>
            <ul className="space-y-1 text-xs text-white/60">
              <li>• Simple/fast calculations</li>
              <li>• Dependencies change every render</li>
              <li>• No measurable performance problem</li>
              <li>• Just creating primitive values</li>
            </ul>
          </div>
        </div>

        {/* Pattern Summary */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
            <p className="text-xs font-medium text-green-400">✅ Good</p>
            <code className="mt-1 block text-[10px] text-white/60">
              useMemo(() =&gt; expensiveWork(), [dep])
            </code>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="text-xs font-medium text-amber-400">⚠️ Check</p>
            <code className="mt-1 block text-[10px] text-white/60">
              useMemo(() =&gt; simple, [many, deps])
            </code>
          </div>
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
            <p className="text-xs font-medium text-red-400">❌ Avoid</p>
            <code className="mt-1 block text-[10px] text-white/60">
              useMemo(() =&gt; a + b, [a, b])
            </code>
          </div>
        </div>

        {/* Remember */}
        <div className="mt-6 rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
          <h4 className="text-sm font-medium text-purple-400 mb-2">
            💡 Remember
          </h4>
          <p className="text-xs text-white/60">
            <code className="text-purple-300">useMemo</code> is for{" "}
            <strong className="text-white">values</strong>.{" "}
            <code className="text-indigo-300">useCallback</code> is for{" "}
            <strong className="text-white">functions</strong>. Both skip
            unnecessary work by caching their results.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default UseMemoGuide;

// src/components/useCallback/re-render-demo.tsx
"use client";

import React, { memo, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertTriangle,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Zap,
  Eye,
  EyeOff,
  LogIn,
  LogOut,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// Types
// ============================================
interface IProduct {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface IProductItemProps {
  product: IProduct;
  onDelete: (id: number) => void;
  renderCount: number;
}

// ============================================
// Sample Data
// ============================================
const initialProducts: IProduct[] = [
  {
    id: 1,
    name: "Millennium Falcon",
    description: "Fastest ship in the galaxy",
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-2.webp",
  },
  {
    id: 2,
    name: "X-Wing Fighter",
    description: "Rebel Alliance starfighter",
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-4.webp",
  },
  {
    id: 3,
    name: "TIE Fighter",
    description: "Imperial starfighter",
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-3.webp",
  },
  {
    id: 4,
    name: "Star Destroyer",
    description: "Imperial capital ship",
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-1.webp",
  },
];

// ============================================
// Product Item Component (Memoized)
// ============================================
const ProductItem = memo(function ProductItem({
  product,
  onDelete,
  renderCount,
}: IProductItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800">
      {/* Render Count Badge */}
      <div className="absolute -right-1 -top-1 z-10">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-lg",
            renderCount > 1
              ? "bg-gradient-to-br from-red-500 to-rose-600 text-white"
              : "bg-gradient-to-br from-emerald-500 to-green-600 text-white"
          )}
        >
          {renderCount}
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative">
        <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-xl bg-slate-700/50 p-2">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="text-center text-sm font-semibold text-white">
          {product.name}
        </h3>
        <p className="mt-1 text-center text-xs text-slate-400">
          {product.description}
        </p>
        <Button
          onClick={() => onDelete(product.id)}
          size="sm"
          className="mt-4 w-full gap-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
          variant="ghost"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    </div>
  );
});

// ============================================
// Main Demo Component
// ============================================
export function UseCallbackReRenderDemo() {
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [renderCounts, setRenderCounts] = useState<Record<number, number>>({
    1: 1,
    2: 1,
    3: 1,
    4: 1,
  });

  // ❌ Without useCallback
  const deleteProductBad = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ With useCallback
  const deleteProductGood = useCallback((id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
    if (!useCallbackEnabled) {
      setRenderCounts((prev) => {
        const updated = { ...prev };
        products.forEach((p) => {
          updated[p.id] = (updated[p.id] || 0) + 1;
        });
        return updated;
      });
    }
  };

  const resetDemo = () => {
    setProducts(initialProducts);
    setRenderCounts({ 1: 1, 2: 1, 3: 1, 4: 1 });
    setIsLoggedIn(false);
  };

  const deleteHandler = useCallbackEnabled
    ? deleteProductGood
    : deleteProductBad;

  return (
    <section className="relative min-h-screen bg-slate-950">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Gradient Orbs */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="container relative mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm text-red-400">
            <AlertTriangle className="h-4 w-4" />
            Problem #1
          </div>
          <h1 className="mt-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Unnecessary Re-renders
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Without useCallback, child components re-render even when they don't
            need to
          </p>
        </header>

        <div className="mx-auto max-w-6xl space-y-8">
          {/* Concept Card */}
          <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-800 bg-slate-900/50">
              <CardTitle className="flex items-center gap-3 text-lg text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                The Problem
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-slate-300">
                When a parent component re-renders, it creates{" "}
                <span className="font-medium text-white">
                  new function references
                </span>{" "}
                for all inline functions. Even with{" "}
                <code className="rounded bg-slate-800 px-2 py-0.5 text-sm text-red-400">
                  React.memo()
                </code>
                , children receive "new" function props, triggering re-renders.
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {/* Bad Example */}
                <div className="overflow-hidden rounded-xl border border-red-500/20 bg-red-500/5">
                  <div className="flex items-center gap-2 border-b border-red-500/20 bg-red-500/10 px-4 py-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-medium text-red-400">
                      Without useCallback
                    </span>
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm text-slate-300">
                    {`// ❌ New function on every render
const deleteProduct = (id) => {
  setProducts(prev => 
    prev.filter(p => p.id !== id)
  );
};

// memo doesn't help!
<ProductItem onDelete={deleteProduct} />`}
                  </pre>
                </div>

                {/* Good Example */}
                <div className="overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <div className="flex items-center gap-2 border-b border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">
                      With useCallback
                    </span>
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm text-slate-300">
                    {`// ✅ Stable function reference
const deleteProduct = useCallback((id) => {
  setProducts(prev => 
    prev.filter(p => p.id !== id)
  );
}, []); // Empty deps

// memo works now!
<ProductItem onDelete={deleteProduct} />`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Demo */}
          <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-800 bg-slate-900/50">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-3 text-lg text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  Live Demo
                </CardTitle>

                <div className="flex items-center gap-4">
                  {/* Toggle */}
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-full border px-4 py-2 transition-colors",
                      useCallbackEnabled
                        ? "border-emerald-500/30 bg-emerald-500/10"
                        : "border-red-500/30 bg-red-500/10"
                    )}
                  >
                    <Switch
                      id="useCallback-toggle"
                      checked={useCallbackEnabled}
                      onCheckedChange={setUseCallbackEnabled}
                    />
                    <Label
                      htmlFor="useCallback-toggle"
                      className={cn(
                        "text-sm font-medium",
                        useCallbackEnabled ? "text-emerald-400" : "text-red-400"
                      )}
                    >
                      {useCallbackEnabled
                        ? "useCallback ON"
                        : "useCallback OFF"}
                    </Label>
                  </div>

                  <Button
                    onClick={resetDemo}
                    variant="outline"
                    size="sm"
                    className="gap-2 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Status Bar */}
              <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      isLoggedIn ? "bg-emerald-500/20" : "bg-slate-700"
                    )}
                  >
                    {isLoggedIn ? (
                      <Eye className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Status</p>
                    <p
                      className={cn(
                        "font-medium",
                        isLoggedIn ? "text-emerald-400" : "text-slate-400"
                      )}
                    >
                      {isLoggedIn ? "Logged In" : "Logged Out"}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={toggleLogin}
                  className={cn(
                    "gap-2",
                    isLoggedIn
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  )}
                >
                  {isLoggedIn ? (
                    <>
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Log In
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2 rounded-lg bg-slate-700/50 px-3 py-2">
                  <Activity className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-400">
                    Click to trigger parent re-render
                  </span>
                </div>
              </div>

              {/* Products Grid */}
              {products.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {products.map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      onDelete={deleteHandler}
                      renderCount={renderCounts[product.id] || 1}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/30 p-12 text-center">
                  <p className="text-slate-500">All products deleted</p>
                  <Button onClick={resetDemo} className="mt-4 gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Reset Demo
                  </Button>
                </div>
              )}

              {/* Result Message */}
              <div className="mt-6">
                {!useCallbackEnabled ? (
                  <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-red-400">
                        All items re-render on login toggle!
                      </p>
                      <p className="text-sm text-slate-400">
                        Function reference changes → memo() can't help
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-emerald-400">
                        No unnecessary re-renders!
                      </p>
                      <p className="text-sm text-slate-400">
                        Stable function reference → memo() works correctly
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaway */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/50 p-6">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <span className="text-2xl">📝</span> Key Takeaway
            </h4>
            <ul className="grid gap-3 md:grid-cols-3">
              {[
                "Use useCallback when passing functions to memoized children",
                "Use functional updates (prev => ...) to avoid dependencies",
                "Empty dependency array [] = function never changes",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-lg bg-slate-800/50 p-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-sm text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

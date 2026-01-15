// src/components/useCallback/dependency-demo.tsx
"use client";

import React, { memo, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Heart,
  RefreshCw,
  Zap,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  XCircle,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// Types
// ============================================
interface IProduct {
  id: number;
  name: string;
  image: string;
  isFavorite: boolean;
}

interface IProductItemProps {
  product: IProduct;
  onFavorite: (id: number) => void;
  renderCount: number;
}

// ============================================
// Sample Data
// ============================================
const initialProducts: IProduct[] = [
  {
    id: 1,
    name: "Millennium Falcon",
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-2.webp",
    isFavorite: false,
  },
  {
    id: 2,
    name: "X-Wing Fighter",
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-1.webp",
    isFavorite: false,
  },
  {
    id: 3,
    name: "TIE Fighter",
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-3.webp",
    isFavorite: false,
  },
];

// ============================================
// Product Item Component (Memoized)
// ============================================
const ProductItem = memo(function ProductItem({
  product,
  onFavorite,
  renderCount,
}: IProductItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800">
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

      <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-xl bg-slate-700/50 p-2">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="text-center text-sm font-semibold text-white">
        {product.name}
      </h3>

      <Button
        onClick={() => onFavorite(product.id)}
        className={cn(
          "mt-4 w-full gap-2 transition-all",
          product.isFavorite
            ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all",
            product.isFavorite && "fill-current"
          )}
        />
        {product.isFavorite ? "Unfavorite" : "Favorite"}
      </Button>
    </div>
  );
});

// ============================================
// Main Demo Component
// ============================================
export function UseCallbackDependencyDemo() {
  const [optimizedMode, setOptimizedMode] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [renderCounts, setRenderCounts] = useState<Record<number, number>>({
    1: 1,
    2: 1,
    3: 1,
  });
  const [totalRenders, setTotalRenders] = useState(3);

  // ❌ Bad: products in dependency array
  const toggleFavoriteBad = useCallback(
    (id: number) => {
      setProducts(
        products.map((product) =>
          product.id === id
            ? { ...product, isFavorite: !product.isFavorite }
            : product
        )
      );
    },
    [products]
  );

  // ✅ Good: Use functional update
  const toggleFavoriteGood = useCallback((id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  }, []);

  const handleFavorite = (id: number) => {
    const handler = optimizedMode ? toggleFavoriteGood : toggleFavoriteBad;
    handler(id);

    if (!optimizedMode) {
      setRenderCounts((prev) => {
        const updated = { ...prev };
        products.forEach((p) => {
          updated[p.id] = (updated[p.id] || 1) + 1;
        });
        return updated;
      });
      setTotalRenders((prev) => prev + products.length);
    } else {
      setRenderCounts((prev) => ({
        ...prev,
        [id]: (prev[id] || 1) + 1,
      }));
      setTotalRenders((prev) => prev + 1);
    }
  };

  const resetDemo = () => {
    setProducts(initialProducts);
    setRenderCounts({ 1: 1, 2: 1, 3: 1 });
    setTotalRenders(3);
  };

  return (
    <section className="relative min-h-screen bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[150px]" />

      <div className="container relative mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400">
            <Lightbulb className="h-4 w-4" />
            Problem #2
          </div>
          <h1 className="mt-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Unnecessary Dependencies
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Adding state to useCallback's dependency array defeats its purpose
          </p>
        </header>

        <div className="mx-auto max-w-6xl space-y-8">
          {/* Concept Card */}
          <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-800 bg-slate-900/50">
              <CardTitle className="flex items-center gap-3 text-lg text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                The Problem
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-slate-300">
                Including{" "}
                <span className="font-medium text-white">state variables</span>{" "}
                in useCallback's dependency array causes the function to be
                recreated every time that state changes — defeating memoization!
              </p>

              {/* Flow Diagram */}
              <div className="my-6 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
                {[
                  { text: "Click Favorite", color: "text-slate-400" },
                  { text: "products changes", color: "text-slate-400" },
                  { text: "useCallback recreates", color: "text-amber-400" },
                  { text: "All items re-render", color: "text-red-400" },
                ].map((item, i, arr) => (
                  <React.Fragment key={i}>
                    <div
                      className={cn(
                        "rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm",
                        item.color
                      )}
                    >
                      {item.text}
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-slate-600" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {/* Bad Example */}
                <div className="overflow-hidden rounded-xl border border-red-500/20 bg-red-500/5">
                  <div className="flex items-center gap-2 border-b border-red-500/20 bg-red-500/10 px-4 py-2">
                    <XCircle className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-medium text-red-400">
                      With [products] dependency
                    </span>
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm text-slate-300">
                    {`const toggleFavorite = useCallback((id) => {
  setProducts(
    products.map(product => // Uses products
      product.id === id
        ? { ...product, isFavorite: !product.isFavorite }
        : product
    )
  );
}, [products]); // 🔴 Recreated every change!`}
                  </pre>
                </div>

                {/* Good Example */}
                <div className="overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <div className="flex items-center gap-2 border-b border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">
                      With functional update
                    </span>
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm text-slate-300">
                    {`const toggleFavorite = useCallback((id) => {
  setProducts(prevProducts => // Uses prev
    prevProducts.map(product =>
      product.id === id
        ? { ...product, isFavorite: !product.isFavorite }
        : product
    )
  );
}, []); // 🟢 Never recreated!`}
                  </pre>
                </div>
              </div>

              {/* Solution Box */}
              <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <h4 className="flex items-center gap-2 text-sm font-medium text-blue-400">
                  <Lightbulb className="h-4 w-4" />
                  The Solution
                </h4>
                <p className="mt-2 text-sm text-slate-400">
                  Use{" "}
                  <code className="rounded bg-slate-800 px-1.5 py-0.5 text-blue-400">
                    functional updates
                  </code>{" "}
                  with setState. Instead of reading{" "}
                  <code className="rounded bg-slate-800 px-1.5 py-0.5 text-white">
                    products
                  </code>{" "}
                  directly, use{" "}
                  <code className="rounded bg-slate-800 px-1.5 py-0.5 text-white">
                    prevProducts
                  </code>{" "}
                  from the updater function.
                </p>
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
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-full border px-4 py-2 transition-colors",
                      optimizedMode
                        ? "border-emerald-500/30 bg-emerald-500/10"
                        : "border-amber-500/30 bg-amber-500/10"
                    )}
                  >
                    <Switch
                      id="optimize-toggle"
                      checked={optimizedMode}
                      onCheckedChange={setOptimizedMode}
                    />
                    <Label
                      htmlFor="optimize-toggle"
                      className={cn(
                        "text-sm font-medium",
                        optimizedMode ? "text-emerald-400" : "text-amber-400"
                      )}
                    >
                      {optimizedMode ? "Optimized []" : "With [products]"}
                    </Label>
                  </div>

                  <Button
                    onClick={resetDemo}
                    variant="outline"
                    size="sm"
                    className="gap-2 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Stats */}
              <div className="mb-6 grid grid-cols-3 gap-4">
                {[
                  {
                    label: "Total Renders",
                    value: totalRenders,
                    color: "text-white",
                  },
                  {
                    label: "Favorites",
                    value: products.filter((p) => p.isFavorite).length,
                    color: "text-pink-400",
                  },
                  {
                    label: "Dependencies",
                    value: optimizedMode ? "[]" : "[products]",
                    color: optimizedMode
                      ? "text-emerald-400"
                      : "text-amber-400",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 text-center"
                  >
                    <p className={cn("text-2xl font-bold", stat.color)}>
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    onFavorite={handleFavorite}
                    renderCount={renderCounts[product.id] || 1}
                  />
                ))}
              </div>

              <p className="mt-4 text-center text-sm text-slate-500">
                👆 Click "Favorite" and watch which items re-render
              </p>

              {/* Result */}
              <div className="mt-6">
                {!optimizedMode ? (
                  <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium text-amber-400">
                        All 3 items re-render on every click!
                      </p>
                      <p className="text-sm text-slate-400">
                        [products] dependency recreates the function each time
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
                        Only the clicked item re-renders!
                      </p>
                      <p className="text-sm text-slate-400">
                        Empty dependency array keeps function stable
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
                "Avoid adding state to useCallback dependencies when possible",
                "Use setState(prev => ...) to access current state",
                "Goal: keep dependency array as small as possible",
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

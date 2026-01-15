// src/components/useCallback/use-callback-guide.tsx
"use client";

import React, { useState, useCallback, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Code2,
  Lightbulb,
  Play,
  CheckCircle2,
  ArrowRight,
  Zap,
  Package,
  RefreshCw,
  AlertTriangle,
  XCircle,
  Heart,
  Trash2,
  LogIn,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// Main Guide Component
// ============================================
export function UseCallbackGuide() {
  return (
    <section className="bg-gradient-to-br from-slate-900  to-slate-900">
      <div className="container mx-auto min-h-screen px-4 py-12">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        {/* Header */}
        <header className="relative mb-12 text-center">
          <Badge className="mb-4 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30">
            React Performance Hook
          </Badge>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            useCallback
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Memoize functions to maintain stable references and prevent
            unnecessary re-renders
          </p>
        </header>

        <div className="relative mx-auto max-w-4xl space-y-8">
          {/* TL;DR Section */}
          <Card className="border-indigo-500/20 bg-indigo-500/5 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-white">
                <Zap className="h-5 w-5 text-indigo-400" />
                TL;DR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <TLDRItem
                  question="What is useCallback used for?"
                  answer="Prevents function recreation on every render, improving performance."
                />
                <TLDRItem
                  question="useCallback vs useMemo?"
                  answer="useCallback memoizes functions, useMemo memoizes values."
                />
                <TLDRItem
                  question="When to use it?"
                  answer="When passing functions to memoized components (React.memo)."
                />
                <TLDRItem
                  question="useCallback vs useEffect?"
                  answer="useCallback stabilizes function references, useEffect runs side effects."
                />
              </div>
            </CardContent>
          </Card>

          {/* What is useCallback? */}
          <ConceptCard
            icon={<BookOpen className="h-5 w-5" />}
            title="What is useCallback?"
            iconColor="text-blue-400"
            borderColor="border-blue-500/20"
          >
            <p className="text-white/70">
              <code className="text-blue-400">useCallback</code> is a React Hook
              that{" "}
              <span className="text-white font-medium">
                memoizes (caches) a function
              </span>
              , ensuring it maintains the same reference across renders unless
              its dependencies change.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <FeatureBox
                icon={<RefreshCw className="h-4 w-4" />}
                title="Stable Reference"
                description="Same function instance across renders"
              />
              <FeatureBox
                icon={<Zap className="h-4 w-4" />}
                title="Performance"
                description="Prevents unnecessary re-renders"
              />
              <FeatureBox
                icon={<Package className="h-4 w-4" />}
                title="Works with memo()"
                description="Essential for memoized components"
              />
            </div>
          </ConceptCard>

          {/* The Problem */}
          <ConceptCard
            icon={<AlertTriangle className="h-5 w-5" />}
            title="The Problem: Function Reference Changes"
            iconColor="text-amber-400"
            borderColor="border-amber-500/20"
          >
            <p className="text-white/70 mb-4">
              In JavaScript, functions are objects. Each render creates a{" "}
              <span className="text-white font-medium">
                new function instance
              </span>{" "}
              with a different memory reference — even if the logic is
              identical.
            </p>

            <CodeBlock
              code={`function MyComponent() {
  // ❌ New function created on EVERY render
  const handleClick = () => {
    console.log('Clicked');
  };
  
  // Child re-renders even with memo()!
  return <Button onClick={handleClick} />;
}`}
            />

            <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
              <h4 className="flex items-center gap-2 text-sm font-medium text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                Why This Matters
              </h4>
              <p className="mt-2 text-xs text-white/60">
                When function reference changes, memoized child components (
                <code className="text-amber-300">React.memo</code>) will
                re-render because they see a "new" prop, defeating the purpose
                of memoization.
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
              code={`const memoizedFunction = useCallback(
  () => {
    // Your function logic
  },
  [dependency1, dependency2]  // Dependency array
);`}
            />

            <div className="mt-6 space-y-4">
              <h4 className="text-sm font-medium text-white/80">
                What You Give It (Inputs)
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <ParameterBox
                  name="function"
                  type="() => any"
                  description="The function you want to cache/memoize"
                />
                <ParameterBox
                  name="dependencies"
                  type="array"
                  description="Values that, when changed, recreate the function"
                />
              </div>

              <h4 className="mt-6 text-sm font-medium text-white/80">
                What You Get Back (Output)
              </h4>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <code className="text-sm font-medium text-purple-400">
                  memoizedFunction
                </code>
                <p className="mt-2 text-xs text-white/60">
                  The same function reference on every render (unless
                  dependencies change)
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
            <p className="text-white/70 mb-4">
              Wrap your function in{" "}
              <code className="text-emerald-400">useCallback</code> to keep a
              stable reference:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Bad Example */}
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-red-400">
                  <XCircle className="h-4 w-4" />
                  Without useCallback
                </div>
                <CodeBlock
                  code={`// ❌ New function every render
const deleteProduct = (id) => {
  setProducts(prev => 
    prev.filter(p => p.id !== id)
  );
};`}
                  small
                />
              </div>

              {/* Good Example */}
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  With useCallback
                </div>
                <CodeBlock
                  code={`// ✅ Stable reference
const deleteProduct = useCallback((id) => {
  setProducts(prev => 
    prev.filter(p => p.id !== id)
  );
}, []); // Empty deps = never changes`}
                  small
                />
              </div>
            </div>
          </ConceptCard>

          {/* Common Mistake */}
          <ConceptCard
            icon={<Lightbulb className="h-5 w-5" />}
            title="Common Mistake: Unnecessary Dependencies"
            iconColor="text-yellow-400"
            borderColor="border-yellow-500/20"
          >
            <p className="text-white/70 mb-4">
              Adding state to the dependency array{" "}
              <span className="text-white font-medium">
                defeats the purpose
              </span>{" "}
              of useCallback:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Bad */}
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-red-400">
                  <XCircle className="h-4 w-4" />
                  With [products] dependency
                </div>
                <CodeBlock
                  code={`// ❌ Recreated on every state change!
const toggle = useCallback((id) => {
  setProducts(
    products.map(p => ...)  // reads products
  );
}, [products]); // Function recreates!`}
                  small
                />
              </div>

              {/* Good */}
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  With functional update
                </div>
                <CodeBlock
                  code={`// ✅ Uses prev state, no dependency!
const toggle = useCallback((id) => {
  setProducts(prev =>    // uses prev
    prev.map(p => ...)
  );
}, []); // Never recreates!`}
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
                Use{" "}
                <code className="text-blue-300">setState(prev =&gt; ...)</code>{" "}
                (functional update) instead of reading state directly. This
                removes the need for state in dependencies!
              </p>
            </div>
          </ConceptCard>

          {/* Custom Hooks Best Practice */}
          <ConceptCard
            icon={<Package className="h-5 w-5" />}
            title="Best Practice: Custom Hooks"
            iconColor="text-purple-400"
            borderColor="border-purple-500/20"
          >
            <p className="text-white/70 mb-4">
              When creating custom hooks,{" "}
              <span className="text-white font-medium">
                always wrap returned functions
              </span>{" "}
              with useCallback:
            </p>

            <CodeBlock
              code={`function useCart() {
  const [cart, setCart] = useState([]);

  // ✅ Stable function references
  const addToCart = useCallback((item) => {
    setCart(prev => [...prev, item]);
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  return { cart, addToCart, removeFromCart };
}`}
            />

            <p className="mt-4 text-xs text-white/50">
              This allows components using your hook to avoid unnecessary
              re-renders when used with memo().
            </p>
          </ConceptCard>

          {/* When NOT to use */}
          <ConceptCard
            icon={<XCircle className="h-5 w-5" />}
            title="When You DON'T Need useCallback"
            iconColor="text-red-400"
            borderColor="border-red-500/20"
          >
            <div className="space-y-3">
              {[
                {
                  title: "Not passing to memoized component",
                  desc: "If the function isn't passed to a React.memo() component, useCallback won't help.",
                },
                {
                  title: "No performance benefit",
                  desc: "If memoizing doesn't bring noticeable improvement, skip it — adds complexity.",
                },
                {
                  title: "Simple components",
                  desc: "For small components that render quickly, the overhead isn't worth it.",
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
            title="Comparison: useCallback vs Other Hooks"
            iconColor="text-cyan-400"
            borderColor="border-cyan-500/20"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 text-left text-white/80">Feature</th>
                    <th className="py-2 text-center text-indigo-400">
                      useCallback
                    </th>
                    <th className="py-2 text-center text-purple-400">
                      useMemo
                    </th>
                    <th className="py-2 text-center text-amber-400">
                      useEffect
                    </th>
                    <th className="py-2 text-center text-emerald-400">
                      useRef
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white/60">
                  <tr className="border-b border-white/5">
                    <td className="py-2">Purpose</td>
                    <td className="py-2 text-center">Cache function</td>
                    <td className="py-2 text-center">Cache value</td>
                    <td className="py-2 text-center">Side effects</td>
                    <td className="py-2 text-center">Persist reference</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Returns</td>
                    <td className="py-2 text-center">Function</td>
                    <td className="py-2 text-center">Any value</td>
                    <td className="py-2 text-center">Nothing</td>
                    <td className="py-2 text-center">{`{ current }`}</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Triggers Re-render?</td>
                    <td className="py-2 text-center">No</td>
                    <td className="py-2 text-center">No</td>
                    <td className="py-2 text-center">Yes*</td>
                    <td className="py-2 text-center">No</td>
                  </tr>
                  <tr>
                    <td className="py-2">Common Use</td>
                    <td className="py-2 text-center">Event handlers</td>
                    <td className="py-2 text-center">Expensive calcs</td>
                    <td className="py-2 text-center">API calls</td>
                    <td className="py-2 text-center">DOM refs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-white/40">
              * useEffect can trigger re-render if it updates state
            </p>
          </ConceptCard>

          {/* Quick Reference */}
          <QuickReference />
        </div>
      </div>
    </section>
  );
}

// ============================================
// Live Demo Component
// ============================================
interface IProduct {
  id: number;
  name: string;
  image: string;
}

const initialProducts: IProduct[] = [
  {
    id: 1,
    name: "Falcon",
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-2.webp",
  },
  {
    id: 2,
    name: "X-Wing",
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-4.webp",
  },
  {
    id: 3,
    name: "TIE",
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-3.webp",
  },
];

const ProductItem = memo(function ProductItem({
  product,
  onDelete,
  renderCount,
}: {
  product: IProduct;
  onDelete: (id: number) => void;
  renderCount: number;
}) {
  return (
    <div className="relative flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="absolute -right-1 -top-1">
        <span
          className={cn(
            "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
            renderCount > 1
              ? "bg-red-500/20 text-red-400"
              : "bg-green-500/20 text-green-400"
          )}
        >
          {renderCount}
        </span>
      </div>
      <div className="h-12 w-12 overflow-hidden rounded-lg bg-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-2 text-xs text-white">{product.name}</p>
      <button
        onClick={() => onDelete(product.id)}
        className="mt-2 rounded bg-red-500/20 px-2 py-1 text-[10px] text-red-400 hover:bg-red-500/30"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
});

function LiveDemo() {
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [renderCounts, setRenderCounts] = useState<Record<number, number>>({
    1: 1,
    2: 1,
    3: 1,
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
    setRenderCounts({ 1: 1, 2: 1, 3: 1 });
    setIsLoggedIn(false);
  };

  const deleteHandler = useCallbackEnabled
    ? deleteProductGood
    : deleteProductBad;
  const totalRenders = Object.values(renderCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex justify-center gap-2">
        {[
          { value: false, label: "Without useCallback", color: "red" },
          { value: true, label: "With useCallback", color: "green" },
        ].map((mode) => (
          <button
            key={mode.label}
            type="button"
            onClick={() => setUseCallbackEnabled(mode.value)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              useCallbackEnabled === mode.value
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

      {/* State Display */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-white/40">Total Renders</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-white">
              {totalRenders}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/40">Login Status</p>
            <p
              className={cn(
                "mt-1 text-lg font-mono",
                isLoggedIn ? "text-green-400" : "text-white/40"
              )}
            >
              {isLoggedIn ? "true" : "false"}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/40">Optimized</p>
            <p
              className={cn(
                "mt-1 text-lg font-mono",
                useCallbackEnabled ? "text-green-400" : "text-red-400"
              )}
            >
              {useCallbackEnabled ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="flex justify-center gap-3">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onDelete={deleteHandler}
            renderCount={renderCounts[product.id] || 1}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <Button
          onClick={toggleLogin}
          size="sm"
          className={cn(
            "gap-2",
            isLoggedIn
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
              : "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
          )}
        >
          {isLoggedIn ? (
            <LogOut className="h-4 w-4" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          {isLoggedIn ? "Log Out" : "Log In"}
        </Button>

        <Button
          onClick={resetDemo}
          size="sm"
          variant="ghost"
          className="gap-2 text-white/60 hover:bg-white/10 hover:text-white"
        >
          <RefreshCw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <p className="text-center text-xs text-white/40">
        Toggle login and watch render counts. Badge shows re-render count per
        item.
      </p>

      {/* Result Message */}
      {!useCallbackEnabled ? (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <span className="text-xs text-red-400">
            All items re-render because function reference changes!
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-3">
          <CheckCircle2 className="h-4 w-4 text-green-400" />
          <span className="text-xs text-green-400">
            No extra re-renders! memo() works correctly.
          </span>
        </div>
      )}
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
      <p className="text-xs font-medium text-indigo-400">{question}</p>
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
      <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
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
        <code className="text-sm font-medium text-blue-400">{name}</code>
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
    <Card className="border-indigo-500/20 bg-indigo-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <ArrowRight className="h-5 w-5 text-indigo-400" />
          Quick Reference
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">✅ Use When</h4>
            <ul className="space-y-1 text-xs text-white/60">
              <li>• Passing function to React.memo() component</li>
              <li>• Function is a dependency of useEffect/useMemo</li>
              <li>• Building custom hooks with returned functions</li>
              <li>• Performance-critical event handlers</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">
              ❌ Don't Use When
            </h4>
            <ul className="space-y-1 text-xs text-white/60">
              <li>• Function not passed to memoized component</li>
              <li>• No measurable performance benefit</li>
              <li>• Simple components that render quickly</li>
              <li>• Adding unnecessary complexity</li>
            </ul>
          </div>
        </div>

        {/* Pattern Summary */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
            <p className="text-xs font-medium text-red-400">❌ Avoid</p>
            <code className="mt-1 block text-[10px] text-white/60">
              useCallback(fn, [state])
            </code>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="text-xs font-medium text-amber-400">⚠️ Okay</p>
            <code className="mt-1 block text-[10px] text-white/60">
              useCallback(fn, [props])
            </code>
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
            <p className="text-xs font-medium text-green-400">✅ Best</p>
            <code className="mt-1 block text-[10px] text-white/60">
              useCallback(fn, [])
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

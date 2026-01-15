// src/components/useCallback/efficient-demo.tsx
"use client";

import React, { useState, useCallback, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Package,
  RefreshCw,
  Zap,
  CheckCircle2,
  Code2,
  Sparkles,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// Types
// ============================================
interface ICartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface IUseCartReturn {
  cart: ICartItem[];
  addToCart: (item: Omit<ICartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

// ============================================
// Custom Hook: useCart
// ============================================
function useCart(): IUseCartReturn {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const addToCart = useCallback((item: Omit<ICartItem, "quantity">) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };
}

// ============================================
// Sample Products
// ============================================
const products = [
  {
    id: 1,
    name: "Lightsaber",
    price: 299.99,
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-2.webp",
  },
  {
    id: 2,
    name: "Blaster",
    price: 149.99,
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-1.webp",
  },
  {
    id: 3,
    name: "Helmet",
    price: 199.99,
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-3.webp",
  },
  {
    id: 4,
    name: "Droid",
    price: 499.99,
    image:
      "https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-4.webp",
  },
];

// ============================================
// Memoized Product Card
// ============================================
interface IProductCardProps {
  product: (typeof products)[0];
  onAdd: (item: Omit<ICartItem, "quantity">) => void;
}

const ProductCard = memo(function ProductCard({
  product,
  onAdd,
}: IProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800">
      <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-xl bg-slate-700/50 p-2 transition-transform group-hover:scale-105">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="text-center text-sm font-semibold text-white">
        {product.name}
      </h3>
      <p className="mt-1 text-center text-lg font-bold text-emerald-400">
        ${product.price}
      </p>
      <Button
        onClick={() => onAdd(product)}
        className="mt-4 w-full gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700"
        size="sm"
      >
        <Plus className="h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
});

// ============================================
// Memoized Cart Item
// ============================================
interface ICartItemRowProps {
  item: ICartItem;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartItemRow = memo(function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: ICartItemRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/50 p-3 transition-all hover:bg-slate-800">
      <div className="h-12 w-12 overflow-hidden rounded-lg bg-slate-700/50">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="truncate text-sm font-medium text-white">{item.name}</h4>
        <p className="text-xs text-slate-500">${item.price} each</p>
      </div>
      <div className="flex items-center gap-1">
        <Button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          size="icon"
          variant="ghost"
          className="h-7 w-7 text-slate-400 hover:bg-slate-700 hover:text-white"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium text-white">
          {item.quantity}
        </span>
        <Button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          size="icon"
          variant="ghost"
          className="h-7 w-7 text-slate-400 hover:bg-slate-700 hover:text-white"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <Button
        onClick={() => onRemove(item.id)}
        size="icon"
        variant="ghost"
        className="h-7 w-7 text-red-400 hover:bg-red-500/20 hover:text-red-300"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
});

// ============================================
// Main Demo Component
// ============================================
export function UseCallbackEfficientDemo() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  } = useCart();

  return (
    <section className="relative min-h-screen bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="pointer-events-none absolute left-1/3 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-violet-500/5 blur-[150px]" />

      <div className="container relative mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
            <Star className="h-4 w-4" />
            Best Practice
          </div>
          <h1 className="mt-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Efficient Custom Hooks
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Build reusable hooks with stable function references using
            useCallback
          </p>
        </header>

        <div className="mx-auto max-w-6xl space-y-8">
          {/* Concept Card */}
          <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-800 bg-slate-900/50">
              <CardTitle className="flex items-center gap-3 text-lg text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                The Pattern
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-slate-300">
                When building custom hooks that return functions, always use{" "}
                <span className="font-medium text-white">
                  useCallback with functional updates
                </span>
                . This ensures consumers get stable function references.
              </p>

              {/* Code Example */}
              <div className="mt-6 overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-center gap-2 border-b border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
                  <Code2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">
                    useCart Hook Implementation
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-sm text-slate-300">
                  {`function useCart() {
  const [cart, setCart] = useState([]);

  // ✅ All functions use empty dependency arrays
  const addToCart = useCallback((item) => {
    setCart((prev) => [...prev, item]);
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCart((prev) =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  }, []);

  return { cart, addToCart, removeFromCart, updateQuantity };
}`}
                </pre>
              </div>

              {/* Benefits Grid */}
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    icon: CheckCircle2,
                    title: "Stable References",
                    desc: "Functions never change between renders",
                    color: "from-emerald-500 to-green-600",
                  },
                  {
                    icon: Package,
                    title: "Reusable",
                    desc: "Safe to use with memoized components",
                    color: "from-blue-500 to-cyan-600",
                  },
                  {
                    icon: Zap,
                    title: "Performant",
                    desc: "No unnecessary re-renders",
                    color: "from-amber-500 to-orange-600",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 text-center"
                  >
                    <div
                      className={cn(
                        "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
                        item.color
                      )}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-medium text-white">{item.title}</h4>
                    <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Demo */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Products */}
            <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm lg:col-span-2">
              <CardHeader className="border-b border-slate-800 bg-slate-900/50">
                <CardTitle className="flex items-center gap-3 text-lg text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  Products
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAdd={addToCart}
                    />
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-slate-500">
                  Open console to see which components re-render
                </p>
              </CardContent>
            </Card>

            {/* Cart */}
            <Card className="overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-lg text-white">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600">
                        <ShoppingCart className="h-5 w-5 text-white" />
                      </div>
                      {itemCount > 0 && (
                        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white">
                          {itemCount}
                        </div>
                      )}
                    </div>
                    Cart
                  </CardTitle>
                  {cart.length > 0 && (
                    <Button
                      onClick={clearCart}
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {cart.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/30 p-8 text-center">
                    <ShoppingCart className="mx-auto h-12 w-12 text-slate-700" />
                    <p className="mt-3 text-sm text-slate-500">Cart is empty</p>
                    <p className="mt-1 text-xs text-slate-600">
                      Add some products to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <CartItemRow
                        key={item.id}
                        item={item}
                        onRemove={removeFromCart}
                        onUpdateQuantity={updateQuantity}
                      />
                    ))}

                    {/* Total */}
                    <div className="mt-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Total</span>
                        <span className="text-2xl font-bold text-emerald-400">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
                      Checkout
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Key Takeaways */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/50 p-6">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <span className="text-2xl">📝</span> Key Takeaways for Custom
              Hooks
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              <ul className="space-y-2">
                {[
                  "Wrap all returned functions in useCallback",
                  "Use functional updates to avoid dependencies",
                  "Keep dependency arrays empty when possible",
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
              <ul className="space-y-2">
                {[
                  "Consumers can safely use functions with memo()",
                  "Derived values don't always need useMemo",
                  "This pattern is used in libraries like React Query",
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

          {/* Quick Reference */}
          <Card className="overflow-hidden border-slate-800 bg-slate-900/50">
            <CardHeader className="border-b border-slate-800 bg-slate-900/50">
              <CardTitle className="text-lg text-white">
                🔍 Quick Reference: useCallback Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    type: "avoid",
                    label: "Avoid",
                    color: "red",
                    code: `// State in deps
useCallback(() => {
  doSomething(state);
}, [state]);`,
                  },
                  {
                    type: "okay",
                    label: "Okay",
                    color: "amber",
                    code: `// Props in deps (if needed)
useCallback(() => {
  onComplete(id);
}, [id, onComplete]);`,
                  },
                  {
                    type: "best",
                    label: "Best",
                    color: "emerald",
                    code: `// Functional update
useCallback(() => {
  setState(prev => ...);
}, []);`,
                  },
                ].map((item) => (
                  <div
                    key={item.type}
                    className={cn(
                      "overflow-hidden rounded-xl border",
                      item.color === "red" && "border-red-500/20 bg-red-500/5",
                      item.color === "amber" &&
                        "border-amber-500/20 bg-amber-500/5",
                      item.color === "emerald" &&
                        "border-emerald-500/20 bg-emerald-500/5"
                    )}
                  >
                    <div
                      className={cn(
                        "px-4 py-2 text-sm font-medium",
                        item.color === "red" && "bg-red-500/10 text-red-400",
                        item.color === "amber" &&
                          "bg-amber-500/10 text-amber-400",
                        item.color === "emerald" &&
                          "bg-emerald-500/10 text-emerald-400"
                      )}
                    >
                      {item.color === "red" && "❌ "}
                      {item.color === "amber" && "⚠️ "}
                      {item.color === "emerald" && "✅ "}
                      {item.label}
                    </div>
                    <pre className="p-4 text-xs text-slate-300">
                      {item.code}
                    </pre>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

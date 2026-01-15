// src/components/useActionState/use-action-state-guide.tsx
"use client";

import { useActionState, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Code2,
  Lightbulb,
  Play,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Zap,
  Package,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// Simple Demo Action
// ============================================
async function simpleCounterAction(
  prevState: number,
  formData: FormData
): Promise<number> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const action = formData.get("action") as string;

  if (action === "increment") return prevState + 1;
  if (action === "decrement") return prevState - 1;
  if (action === "reset") return 0;

  return prevState;
}

// ============================================
// Main Guide Component
// ============================================
export function UseActionStateGuide() {
  return (
    <section className="bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto min-h-screen px-4 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <Badge className="mb-4 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">
            React 19 Hook
          </Badge>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            useActionState
          </h1>
          <p className="mt-4 text-lg text-white/60">
            The simple way to handle form submissions and track loading states
          </p>
        </header>

        <div className="mx-auto max-w-4xl space-y-8">
          {/* What is it? */}
          <ConceptCard
            icon={<BookOpen className="h-5 w-5" />}
            title="What is useActionState?"
            iconColor="text-blue-400"
            borderColor="border-blue-500/20"
          >
            <p className="text-white/70">
              A React hook that helps you{" "}
              <span className="text-white font-medium">
                manage form submissions
              </span>{" "}
              and track their loading states. It connects your form to a
              function that runs when submitted.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <FeatureBox
                icon={<Zap className="h-4 w-4" />}
                title="Run Actions"
                description="Execute a function on form submit"
              />
              <FeatureBox
                icon={<Package className="h-4 w-4" />}
                title="Track Results"
                description="Keep the returned value in state"
              />
              <FeatureBox
                icon={<Loader2 className="h-4 w-4" />}
                title="Loading State"
                description="Know when action is running"
              />
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
              code={`const [state, formAction, isPending] = useActionState(actionFn, initialState);`}
            />

            <div className="mt-6 space-y-4">
              <h4 className="text-sm font-medium text-white/80">
                What You Give It (Inputs)
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <ParameterBox
                  name="actionFn"
                  type="function"
                  description="The function that runs when form submits. Receives prevState and formData."
                />
                <ParameterBox
                  name="initialState"
                  type="any"
                  description="Starting value before any submission (number, string, object, etc.)"
                />
              </div>

              <h4 className="mt-6 text-sm font-medium text-white/80">
                What You Get Back (Outputs)
              </h4>
              <div className="grid gap-3 sm:grid-cols-3">
                <ReturnBox
                  name="state"
                  description="Current value returned by your action"
                  color="text-purple-400"
                />
                <ReturnBox
                  name="formAction"
                  description="Pass this to form's action prop"
                  color="text-blue-400"
                />
                <ReturnBox
                  name="isPending"
                  description="true while action is running"
                  color="text-yellow-400"
                />
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

          {/* Action Function Explained */}
          <ConceptCard
            icon={<Lightbulb className="h-5 w-5" />}
            title="Understanding the Action Function"
            iconColor="text-yellow-400"
            borderColor="border-yellow-500/20"
          >
            <p className="mb-4 text-white/70">
              The action function{" "}
              <span className="text-white font-medium">
                always receives 2 parameters
              </span>
              , even if you don't use the second one:
            </p>

            <CodeBlock
              code={`async function myAction(
  prevState: number,    // Previous state value
  formData: FormData    // Data from the form
): Promise<number> {
  // Your logic here
  return newState;
}`}
            />

            <div className="mt-6 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
              <h4 className="flex items-center gap-2 text-sm font-medium text-yellow-400">
                <AlertIcon />
                Common Mistake
              </h4>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-red-400 mb-2">
                    ❌ Wrong - Missing formData
                  </p>
                  <CodeBlock
                    code={`async function increment(prevCount: number) {
  return prevCount + 1;
}`}
                    small
                  />
                </div>
                <div>
                  <p className="text-xs text-green-400 mb-2">
                    ✅ Correct - Both parameters
                  </p>
                  <CodeBlock
                    code={`async function increment(
  prevCount: number,
  formData: FormData
) {
  return prevCount + 1;
}`}
                    small
                  />
                </div>
              </div>
            </div>
          </ConceptCard>

          {/* Full Example */}
          <ConceptCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="Complete Example"
            iconColor="text-emerald-400"
            borderColor="border-emerald-500/20"
          >
            <CodeBlock
              code={`"use client";

import { useActionState } from 'react';

// Action function with proper typing
async function increment(
  prevState: number,
  formData: FormData
): Promise<number> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return new state
  return prevState + 1;
}

function CounterApp() {
  // Hook returns: state, formAction, isPending
  const [count, formAction, isPending] = useActionState(increment, 0);

  return (
    <form action={formAction}>
      <p>Count: {count}</p>
      <button disabled={isPending}>
        {isPending ? 'Loading...' : 'Increment'}
      </button>
    </form>
  );
}`}
            />
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
function LiveDemo() {
  const [state, formAction, isPending] = useActionState(simpleCounterAction, 0);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleSubmit = (action: string) => {
    setLastAction(action);
  };

  return (
    <div className="space-y-6">
      {/* State Display */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4 text-center sm:grid-cols-3">
          <div>
            <p className="text-xs text-white/40">state (count)</p>
            <p
              className={cn(
                "mt-1 text-4xl font-bold tabular-nums transition-all",
                state >= 0 ? "text-white" : "text-red-400",
                isPending && "opacity-50"
              )}
            >
              {state}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/40">isPending</p>
            <p
              className={cn(
                "mt-1 text-lg font-mono",
                isPending ? "text-yellow-400" : "text-green-400"
              )}
            >
              {isPending ? "true" : "false"}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/40">lastAction</p>
            <p className="mt-1 text-lg font-mono text-purple-400">
              {lastAction || "none"}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <form action={formAction} onSubmit={() => handleSubmit("decrement")}>
          <input type="hidden" name="action" value="decrement" />
          <Button
            type="submit"
            disabled={isPending}
            variant="outline"
            className="gap-2 border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            {isPending && lastAction === "decrement" && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            Decrement
          </Button>
        </form>

        <form action={formAction} onSubmit={() => handleSubmit("reset")}>
          <input type="hidden" name="action" value="reset" />
          <Button
            type="submit"
            disabled={isPending || state === 0}
            variant="outline"
            className="gap-2 border-white/20 text-white/60 hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </form>

        <form action={formAction} onSubmit={() => handleSubmit("increment")}>
          <input type="hidden" name="action" value="increment" />
          <Button
            type="submit"
            disabled={isPending}
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            {isPending && lastAction === "increment" && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            Increment
          </Button>
        </form>
      </div>

      <p className="text-center text-xs text-white/40">
        Click any button and watch the state values update
      </p>
    </div>
  );
}

// ============================================
// Helper Components
// ============================================

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
        <code className="text-sm font-medium text-blue-400">{name}</code>
        <Badge variant="outline" className="text-xs text-white/40">
          {type}
        </Badge>
      </div>
      <p className="mt-2 text-xs text-white/60">{description}</p>
    </div>
  );
}

interface ReturnBoxProps {
  name: string;
  description: string;
  color: string;
}

function ReturnBox({ name, description, color }: ReturnBoxProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
      <code className={cn("text-sm font-medium", color)}>{name}</code>
      <p className="mt-2 text-xs text-white/50">{description}</p>
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
        small && "p-3 text-xs"
      )}
    >
      <code className={cn("text-sm text-white/80", small && "text-xs")}>
        {code}
      </code>
    </pre>
  );
}

function AlertIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
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
            <h4 className="text-sm font-medium text-white/80">When to Use</h4>
            <ul className="space-y-1 text-xs text-white/60">
              <li>• Form submissions with server actions</li>
              <li>• Tracking loading states automatically</li>
              <li>• Managing form state without useState</li>
              <li>• Progressive enhancement support</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Key Points</h4>
            <ul className="space-y-1 text-xs text-white/60">
              <li>• Action receives prevState + formData</li>
              <li>• Return value becomes new state</li>
              <li>• isPending updates automatically</li>
              <li>• Works with Server Components</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

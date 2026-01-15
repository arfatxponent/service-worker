// src/components/useActionState/user-form.tsx
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  Calendar,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { submitUserForm } from "@/lib/actions/user-actions";
import { IUserFormState } from "@/lib/types/useActionState/user";

// Initial state - this is the state before any form submission
const initialState: IUserFormState = {
  status: "idle",
  message: "",
  errors: {},
  data: null,
  timestamp: Date.now(),
};

// Countries list
const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "India",
  "Brazil",
  "Other",
];

export function UserForm() {
  // useActionState hook
  // - state: The current state (result of last action or initial state)
  // - formAction: Pass this to form's action prop
  // - isPending: True while the action is executing
  const [state, formAction, isPending] = useActionState(
    submitUserForm,
    initialState
  );

  // Ref to reset form after successful submission
  const formRef = useRef<HTMLFormElement>(null);

  // Local state for controlled select component
  const [selectedCountry, setSelectedCountry] = useState("");

  // Reset form on successful submission
  useEffect(() => {
    if (state.status === "success" && formRef.current) {
      formRef.current.reset();
      setSelectedCountry("");
    }
  }, [state.status, state.timestamp]);

  return (
    <section className="bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto flex min-h-[calc(100vh-65px)] items-center justify-center p-4">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
        </div>

        <Card className="relative w-full max-w-2xl border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white">
              User Registration
            </CardTitle>
            <p className="text-sm text-white/60">
              Using Server Actions & useActionState
            </p>

            {/* State Explanation Box */}
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-left">
              <p className="text-xs font-medium text-white/80">
                Current State:
              </p>
              <div className="mt-1 flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-white/10 px-2 py-1 text-white/60">
                  status:{" "}
                  <span className="text-purple-400">{state.status}</span>
                </span>
                <span className="rounded bg-white/10 px-2 py-1 text-white/60">
                  isPending:{" "}
                  <span className="text-purple-400">
                    {isPending.toString()}
                  </span>
                </span>
                <span className="rounded bg-white/10 px-2 py-1 text-white/60">
                  errors:{" "}
                  <span className="text-purple-400">
                    {Object.keys(state.errors).length}
                  </span>
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Status Messages */}
            <StatusMessage state={state} />

            {/* Success View */}
            {state.status === "success" && state.data ? (
              <SuccessView data={state.data} />
            ) : (
              // Form View
              <form ref={formRef} action={formAction} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-sm font-medium text-white/80">
                    <User className="h-4 w-4" />
                    Personal Information
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* First Name */}
                    <FormField
                      name="firstName"
                      label="First Name"
                      placeholder="John"
                      error={state.errors.firstName}
                      disabled={isPending}
                    />

                    {/* Last Name */}
                    <FormField
                      name="lastName"
                      label="Last Name"
                      placeholder="Doe"
                      error={state.errors.lastName}
                      disabled={isPending}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Email */}
                    <FormField
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      icon={<Mail className="h-4 w-4" />}
                      error={state.errors.email}
                      disabled={isPending}
                    />

                    {/* Phone */}
                    <FormField
                      name="phone"
                      label="Phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      icon={<Phone className="h-4 w-4" />}
                      error={state.errors.phone}
                      disabled={isPending}
                    />
                  </div>

                  {/* Age */}
                  <div className="sm:w-1/3">
                    <FormField
                      name="age"
                      label="Age"
                      type="number"
                      placeholder="25"
                      icon={<Calendar className="h-4 w-4" />}
                      error={state.errors.age}
                      disabled={isPending}
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-sm font-medium text-white/80">
                    <MapPin className="h-4 w-4" />
                    Address Information
                  </h3>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white/80">
                      Street Address
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="123 Main St, Apt 4B"
                      disabled={isPending}
                      className={cn(
                        "min-h-20 border-white/10 bg-white/5 text-white placeholder:text-white/40",
                        state.errors.address && "border-red-500/50"
                      )}
                    />
                    <FieldError errors={state.errors.address} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* City */}
                    <FormField
                      name="city"
                      label="City"
                      placeholder="New York"
                      icon={<Building className="h-4 w-4" />}
                      error={state.errors.city}
                      disabled={isPending}
                    />

                    {/* Country Select */}
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-white/80">
                        <span className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Country
                        </span>
                      </Label>
                      {/* Hidden input to submit the value */}
                      <input
                        type="hidden"
                        name="country"
                        value={selectedCountry}
                      />
                      <Select
                        value={selectedCountry}
                        onValueChange={setSelectedCountry}
                        disabled={isPending}
                      >
                        <SelectTrigger
                          className={cn(
                            "border-white/10 bg-white/5 text-white",
                            state.errors.country && "border-red-500/50",
                            !selectedCountry && "text-white/40"
                          )}
                        >
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError errors={state.errors.country} />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit
                      </>
                    )}
                  </Button>

                  <Button
                    type="reset"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => setSelectedCountry("")}
                    className="gap-2 text-black border-white/10 hover:bg-white/10 hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </form>
            )}

            {/* Submit Another Button (shown after success) */}
            {state.status === "success" && (
              <div className="mt-6">
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full gap-2 border-white/10 text-black hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                  Submit Another
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// ============================================
// Sub Components
// ============================================

interface IFormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  icon?: React.ReactNode;
  error?: string[];
  disabled?: boolean;
}

function FormField({
  name,
  label,
  type = "text",
  placeholder,
  icon,
  error,
  disabled,
}: IFormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-white/80">
        {icon ? (
          <span className="flex items-center gap-2">
            {icon}
            {label}
          </span>
        ) : (
          label
        )}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "border-white/10 bg-white/5 text-white placeholder:text-white/40",
          error && "border-red-500/50"
        )}
      />
      <FieldError errors={error} />
    </div>
  );
}

interface IFieldErrorProps {
  errors?: string[];
}

function FieldError({ errors }: IFieldErrorProps) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="flex items-start gap-1 text-xs text-red-400">
      <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
      <span>{errors[0]}</span>
    </div>
  );
}

interface IStatusMessageProps {
  state: IUserFormState;
}

function StatusMessage({ state }: IStatusMessageProps) {
  if (state.status === "idle") return null;

  return (
    <div
      className={cn(
        "mb-6 flex items-center gap-3 rounded-lg border p-4",
        state.status === "success" &&
          "border-green-500/50 bg-green-500/10 text-green-400",
        state.status === "error" &&
          "border-red-500/50 bg-red-500/10 text-red-400",
        state.status === "validationError" &&
          "border-yellow-500/50 bg-yellow-500/10 text-yellow-400"
      )}
    >
      {state.status === "success" && <CheckCircle2 className="h-5 w-5" />}
      {state.status === "error" && <XCircle className="h-5 w-5" />}
      {state.status === "validationError" && (
        <AlertCircle className="h-5 w-5" />
      )}
      <span className="text-sm">{state.message}</span>
    </div>
  );
}

interface ISuccessViewProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    address: string;
    city: string;
    country: string;
  };
}

function SuccessView({ data }: ISuccessViewProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">
          Registration Complete!
        </h3>
        <p className="text-sm text-white/60">
          Here's a summary of your information
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <DataRow
            label="Full Name"
            value={`${data.firstName} ${data.lastName}`}
          />
          <DataRow label="Email" value={data.email} />
          <DataRow label="Phone" value={data.phone} />
          <DataRow label="Age" value={data.age.toString()} />
          <DataRow label="Address" value={data.address} />
          <DataRow label="City" value={data.city} />
          <DataRow label="Country" value={data.country} />
        </div>
      </div>
    </div>
  );
}

interface IDataRowProps {
  label: string;
  value: string;
}

function DataRow({ label, value }: IDataRowProps) {
  return (
    <div className="space-y-1">
      <span className="text-xs text-white/40">{label}</span>
      <p className="text-sm text-white">{value}</p>
    </div>
  );
}

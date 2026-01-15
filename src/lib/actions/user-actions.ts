// src/lib/actions/user-actions.ts
"use server";

import {
  IFieldErrors,
  IUserData,
  IUserFormState,
} from "@/lib/types/useActionState/user";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (basic)
const phoneRegex = /^[\d\s\-+()]{10,}$/;

export async function submitUserForm(
  prevState: IUserFormState, // Previous state (before this submission)
  formData: FormData // Form data from the submission
): Promise<IUserFormState> {
  // Returns the NEW state

  // Simulate network delay
  await delay(1000);

  // Extract form data
  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    age: formData.get("age") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    country: formData.get("country") as string,
  };

  // Validation
  const errors: IFieldErrors = {};

  // First Name validation
  if (!rawData.firstName || rawData.firstName.trim().length < 2) {
    errors.firstName = ["First name must be at least 2 characters"];
  }

  // Last Name validation
  if (!rawData.lastName || rawData.lastName.trim().length < 2) {
    errors.lastName = ["Last name must be at least 2 characters"];
  }

  // Email validation
  if (!rawData.email) {
    errors.email = ["Email is required"];
  } else if (!emailRegex.test(rawData.email)) {
    errors.email = ["Please enter a valid email address"];
  }

  // Phone validation
  if (!rawData.phone) {
    errors.phone = ["Phone number is required"];
  } else if (!phoneRegex.test(rawData.phone)) {
    errors.phone = ["Please enter a valid phone number"];
  }

  // Age validation
  const age = parseInt(rawData.age);
  if (!rawData.age || isNaN(age)) {
    errors.age = ["Age is required"];
  } else if (age < 18 || age > 120) {
    errors.age = ["Age must be between 18 and 120"];
  }

  // Address validation
  if (!rawData.address || rawData.address.trim().length < 5) {
    errors.address = ["Address must be at least 5 characters"];
  }

  // City validation
  if (!rawData.city || rawData.city.trim().length < 2) {
    errors.city = ["City is required"];
  }

  // Country validation
  if (!rawData.country || rawData.country.trim().length < 2) {
    errors.country = ["Please select a country"];
  }

  // If there are validation errors, return error state
  if (Object.keys(errors).length > 0) {
    return {
      status: "validationError",
      message: "Please fix the errors below",
      errors,
      data: null,
      timestamp: Date.now(),
    };
  }

  // Simulate random server error (10% chance) for demo
  if (Math.random() < 0.1) {
    return {
      status: "error",
      message: "Server error occurred. Please try again.",
      errors: {},
      data: null,
      timestamp: Date.now(),
    };
  }

  // Success! Create user data object
  const userData: IUserData = {
    firstName: rawData.firstName.trim(),
    lastName: rawData.lastName.trim(),
    email: rawData.email.trim().toLowerCase(),
    phone: rawData.phone.trim(),
    age: age,
    address: rawData.address.trim(),
    city: rawData.city.trim(),
    country: rawData.country.trim(),
  };

  // In real app, you would save to database here
  // await db.users.create({ data: userData });

  return {
    status: "success",
    message: `Welcome, ${userData.firstName}! Your profile has been created successfully.`,
    errors: {},
    data: userData,
    timestamp: Date.now(),
  };
}

// Action to reset the form state
export async function resetUserForm(): Promise<IUserFormState> {
  return {
    status: "idle",
    message: "",
    errors: {},
    data: null,
    timestamp: Date.now(),
  };
}

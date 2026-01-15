export interface IFieldErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  phone?: string[];
  age?: string[];
  address?: string[];
  city?: string[];
  country?: string[];
}

// The submitted user data
export interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  address: string;
  city: string;
  country: string;
}

export interface IUserFormState {
  status: "idle" | "success" | "error" | "validationError";
  message: string;
  errors: IFieldErrors;
  data: IUserData | null;
  timestamp: number;
}

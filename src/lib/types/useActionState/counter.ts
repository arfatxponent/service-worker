export interface ICounterState {
  count: number;
  message: string;
  timestamp: number;
  lastAction: "increment" | "decrement" | "reset" | "set" | null;
}

export interface ICounterFormData {
  action: "increment" | "decrement" | "reset" | "set";
  value?: number;
  step?: number;
}

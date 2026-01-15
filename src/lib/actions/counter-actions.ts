"use server";

import { ICounterState } from "@/lib/types/useActionState/counter";

// Simulate delay for demo purposes (remove in production)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function counterAction(
  prevState: ICounterState,
  formData: FormData
): Promise<ICounterState> {
  // Simulate network delay
  await delay(300);

  const action = formData.get("action") as string;
  const step = parseInt(formData.get("step") as string) || 1;
  const setValue = parseInt(formData.get("setValue") as string);

  let newCount = prevState.count;
  let message = "";
  let lastAction: ICounterState["lastAction"] = null;

  switch (action) {
    case "increment":
      newCount = prevState.count + step;
      message = `Increased by ${step}`;
      lastAction = "increment";
      break;

    case "decrement":
      newCount = prevState.count - step;
      message = `Decreased by ${step}`;
      lastAction = "decrement";
      break;

    case "reset":
      newCount = 0;
      message = "Counter reset to 0";
      lastAction = "reset";
      break;

    case "set":
      if (!isNaN(setValue)) {
        newCount = setValue;
        message = `Counter set to ${setValue}`;
        lastAction = "set";
      } else {
        message = "Invalid value provided";
      }
      break;

    default:
      message = "Unknown action";
  }

  return {
    count: newCount,
    message,
    timestamp: Date.now(),
    lastAction,
  };
}

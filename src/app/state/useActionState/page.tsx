import { Counter } from "@/components/useActionState/counter";
import { CounterWithHistory } from "@/components/useActionState/counter-with-history";
import { UseActionStateGuide } from "@/components/useActionState/use-action-state-guide";
import { UserForm } from "@/components/useActionState/user-form-component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "useActionState Hook - React 19 Form State Management Guide",
  description:
    "Learn how to use React 19's useActionState hook for managing form submissions, tracking loading states, and handling server actions with practical examples and TypeScript support.",
};
const UseActionStatePage = () => {
  return (
    <main>
      {/* Educational Guide Section */}
      <UseActionStateGuide />

      {/* Practical Examples */}
      <Counter />
      <CounterWithHistory />
      <UserForm />
    </main>
  );
};

export default UseActionStatePage;

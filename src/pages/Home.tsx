
import TestComponent from "@/components/ui/TestComponent";
import { useState } from "react";

type AgeProps = {
  age?: number;
};

export default function Home({
  age = 37,
}: AgeProps) {
  const weird: string  = 'This is a weird variable';
  const [isSwitch, setisSwitch] = useState<boolean>(false);
  return (
    <div className="container mx-auto space-y-4 p-8">
      <TestComponent />
      <p className="text-muted-foreground text-xl">
        Welcome to the professional-grade React starter template. Tailwind CSS
        v4 is working!
      </p>
      <p className="text-muted-foreground text-xl">
        Your name is <strong>{isSwitch ? "Scott" : "Abraham"}</strong> and you are{' '}
        <strong>{isSwitch ? age : age - 25}</strong> years old. {weird}.
      </p>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-transform active:scale-95"
        onClick={() => setisSwitch(!isSwitch)}
      >
        Toggle State
      </button>
    </div>
  );
}

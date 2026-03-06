import TestComponent from '@/components/ui/TestComponent';
import { useState } from 'react';

type AgeProps = {
  age?: number;
};

const messages: string[] = [
  'Hello World',
  'New Message',
  'New items',
  'butter biscuts',
  'Random words',
  'Last Words',
];

export default function Home({ age = 37 }: AgeProps) {
  const [isSwitch, setisSwitch] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [letter, setLetter] = useState('A');

  const toggleSwitch = () => {
    setisSwitch(!isSwitch);
  };

  const letterChange = () => {
    setLetter('B');
  };

  // This function advances the index, looping back to 0 at the end
  const cycleMessage = () => {
    setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  return (
    <div className="container mx-auto space-y-4 p-8">
      <TestComponent />
      <p className="text-muted-foreground text-xl">
        Welcome to the professional-grade React starter template. Tailwind CSS
        v4 is working!
      </p>{' '}
      <p className="text-muted-foreground text-xl">
        Your name is <strong>{isSwitch ? 'Scott' : 'Abraham'}</strong> and you
        are <strong>{isSwitch ? age : age - 25}</strong> years old.{' '}
        {messages[messageIndex]}.
      </p>
      <h1>{letter}</h1>
      <div className="flex gap-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white transition-transform hover:bg-blue-600 active:scale-95"
          onClick={toggleSwitch}
        >
          Toggle State
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white transition-transform hover:bg-blue-600 active:scale-95"
          onClick={cycleMessage} // Call our new function
        >
          Change Message
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white transition-transform hover:bg-blue-600 active:scale-95"
          onClick={letterChange}
        >
          Change Letters
        </button>
      </div>
    </div>
  );
}

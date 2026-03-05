type Props = {
  age: number;
  isSwitch: boolean;
};

export default function Home({
  age = 30,
  isSwitch = false,
}: Props) {
  let weird: string  = 'This is a weird variable';
  return (
    <div className="container mx-auto space-y-4 p-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Home Page
      </h1>
      <p className="text-muted-foreground text-xl">
        Welcome to the professional-grade React starter template. Tailwind CSS
        v4 is working!
      </p>
      <p className="text-muted-foreground text-xl">
        Your name is <strong>{isSwitch ? "yes" : "no"}</strong> and you are{' '}
        <strong>{age}</strong> years old {weird}.
      </p>
    </div>
  );
}

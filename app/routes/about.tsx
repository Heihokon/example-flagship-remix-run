import { useFsFlag } from "@flagship.io/react-sdk";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  // Get the flag `btnColor` using useFsFlag hook
  const flag = useFsFlag("myDutFlag");
  const flagValue = flag.getValue("#dc3545");

  return (
    <>
      <h1>About page </h1>
      <p>flag key: btnColor</p>
      <p>flag value: {flagValue}</p>
      <button style={{ background: flagValue }}>Click me</button>
    </>
  );
}

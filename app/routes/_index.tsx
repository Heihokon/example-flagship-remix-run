import { useFsFlag } from "@flagship.io/react-sdk";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  // Get the flag `btnColor` using useFsFlag hook
    const flag = useFsFlag("fs_add_to_cart_btn_color")
    const flagValue = flag.getValue("#dc3545")

    return (
        <>
            <h1>Home page </h1>
            <p>flag key: btnColor</p>
            <p>flag value: {flagValue}</p>
            <button style={{ background: flagValue }} >Click me</button>
            <br />
            <Link to="/about">Go to about page</Link>
        </>
    )
}



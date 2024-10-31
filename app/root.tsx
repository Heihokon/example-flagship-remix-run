import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  ShouldRevalidateFunction,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { getFsVisitorData } from "./fs.js";
import { FlagshipProvider } from "@flagship.io/react-sdk";
import React, { useState } from "react";


export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const visitorData = {
  id: "visitorId",
  hasConsented: true,
  context: {
    key: "value",
  },
};

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  /* Only revalidate on hard refresh or initial load because
    we need to fetch the visitor data on the server side just once,
    and not on every navigation on client-side.
  */
  
  return false;
};

export async function loader() {
  //Get visitor instance
  const visitor = await getFsVisitorData(visitorData);
  return visitor.getFlags().toJSON();
}

export default function App() {
  const initialData = useLoaderData<typeof loader>();  
  const [initialFlagsData] = useState(initialData);
  return (
    <FlagshipProvider
      envId={"YOUR_ENV_ID"} // set your environment ID
      apiKey={"YOUR_API_KEY"} // set your API key
      initialFlagsData={initialFlagsData} // set Initial flags data from visitor instance
      visitorData={visitorData} // visitor data
    >
      <Outlet />
    </FlagshipProvider>
  );
}

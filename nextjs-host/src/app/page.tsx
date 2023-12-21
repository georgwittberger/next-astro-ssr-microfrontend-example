import type { FC } from "react";
import Link from "next/link";
import { Counter } from "./Counter";
import { SSRMicroFrontend } from "./SSRMicroFrontend";

const HomePage: FC = async () => {
  return (
    <main className="grid gap-4 justify-items-start p-8">
      <h1 className="text-2xl">Next.js Host App</h1>
      <Counter />
      <SSRMicroFrontend
        url="http://localhost:4321/"
        basePath="http://localhost:4321"
      />
      <Link href="/other" className="underline">
        Go to other page
      </Link>
    </main>
  );
};

export default HomePage;

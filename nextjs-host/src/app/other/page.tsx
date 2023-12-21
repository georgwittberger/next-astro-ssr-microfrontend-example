import type { FC } from "react";
import Link from "next/link";

const OtherPage: FC = () => {
  return (
    <main className="grid gap-4 justify-items-start p-8">
      <h1 className="text-2xl">Other Page</h1>
      <Link href="/" className="underline">
        Go to home page
      </Link>
    </main>
  );
};

export default OtherPage;

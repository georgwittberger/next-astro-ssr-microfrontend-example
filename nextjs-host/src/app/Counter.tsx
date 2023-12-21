"use client";

import { type FC, useState } from "react";

export const Counter: FC = () => {
  const [counter, setCounter] = useState(0);
  return (
    <button
      className="px-4 py-2 border border-pink-800 rounded bg-pink-400 hover:bg-pink-300"
      onClick={() => setCounter((prev) => prev + 1)}
    >
      Host Count: {counter}
    </button>
  );
};

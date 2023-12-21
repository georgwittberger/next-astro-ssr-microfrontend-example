import { type FC, useEffect, useState } from "react";

export const Counter: FC = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("Microfrontend Counter mounted");
    return () => console.log("Microfrontend Counter unmounted");
  }, []);

  return (
    <button
      className="px-4 py-2 border border-amber-800 rounded bg-amber-400 hover:bg-amber-300"
      onClick={() => setCounter((prev) => prev + 1)}
    >
      Microfrontend Count: {counter}
    </button>
  );
};

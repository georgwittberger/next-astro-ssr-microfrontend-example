"use client";

import { type ComponentRef, type FC, useEffect, useRef } from "react";

type MicroFrontendProps = {
  html: string;
  inlineScript?: string;
};

export const MicroFrontend: FC<MicroFrontendProps> = ({
  html,
  inlineScript,
}) => {
  const wrapperRef = useRef<ComponentRef<"div">>(null);

  useEffect(() => {
    if (inlineScript) {
      eval(inlineScript);
    }
    const wrapper = wrapperRef.current;
    return () => {
      wrapper
        ?.querySelectorAll("astro-island")
        .forEach((island) =>
          island.dispatchEvent(new CustomEvent("astro:unmount")),
        );
    };
  }, [inlineScript]);

  return (
    <div
      ref={wrapperRef}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    ></div>
  );
};

import type { FC } from "react";
import { parse } from "node-html-parser";
import { MicroFrontend } from "./MicroFrontend";

type SSRMicroFrontendProps = {
  url: string;
  basePath?: string;
};

export const SSRMicroFrontend: FC<SSRMicroFrontendProps> = async ({
  url,
  basePath,
}) => {
  const originalHtml = await loadHtml(url);
  const { html, inlineScript } = processHtml(originalHtml, basePath);
  return <MicroFrontend html={html} inlineScript={inlineScript} />;
};

const loadHtml = async (url: string) => {
  const response = await fetch(url, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(
      `Error loading HTML: ${response.status} ${response.statusText}`,
    );
  }
  return response.text();
};

const absoluteUrlPattern = /^(?:\w+:)?\/\//;

const processHtml = (
  html: string,
  basePath = "",
): { html: string; inlineScript?: string } => {
  const htmlElement = parse(html, { comment: true });

  // Prefix relative <link> references with base path.
  const linkElements = htmlElement.querySelectorAll("link[href]");
  linkElements.forEach((linkElement) => {
    const linkHref = linkElement.getAttribute("href");
    if (!linkHref || absoluteUrlPattern.test(linkHref)) return;
    linkElement.setAttribute("href", `${basePath}${linkHref}`);
  });

  // Prefix Astro island references with base path.
  const islandElements = htmlElement.querySelectorAll("astro-island");
  islandElements.forEach((islandElement) => {
    const islandComponentUrl = islandElement.getAttribute("component-url");
    if (islandComponentUrl && !absoluteUrlPattern.test(islandComponentUrl)) {
      islandElement.setAttribute(
        "component-url",
        `${basePath}${islandComponentUrl}`,
      );
    }
    const islandRendererUrl = islandElement.getAttribute("renderer-url");
    if (islandRendererUrl && !absoluteUrlPattern.test(islandRendererUrl)) {
      islandElement.setAttribute(
        "renderer-url",
        `${basePath}${islandRendererUrl}`,
      );
    }
  });

  // Extract inline script code.
  const inlineScriptElements = htmlElement.querySelectorAll(
    "script:not([src],[type]:not([type='application/javascript']))",
  );
  let inlineScript = "";
  inlineScriptElements.forEach((scriptElement) => {
    inlineScript += `${scriptElement.textContent};`;
    scriptElement.remove();
  });

  const bodyElement = htmlElement.querySelector("body");
  if (!bodyElement) {
    throw new Error("Document has no body element");
  }

  // Move stylesheet <link> elements to body.
  const headStylesheetElements = htmlElement.querySelectorAll(
    "head link[rel='stylesheet']",
  );
  headStylesheetElements
    .toReversed()
    .forEach((stylesheetElement) =>
      bodyElement.insertAdjacentHTML(
        "afterbegin",
        stylesheetElement.toString(),
      ),
    );

  return {
    html: bodyElement.innerHTML.trim(),
    inlineScript: inlineScript || undefined,
  };
};

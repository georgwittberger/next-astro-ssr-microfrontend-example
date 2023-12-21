# Server-Side-Rendering Microfrontend with Next.js and Astro

This example project demonstrates how to solve server-side-rendering (SSR) for microfrontends using Next.js and Astro. The approach can also be implemented with other frameworks.

## Getting Started

### Starting the Microfrontend Server

1. Open a terminal in the subdirectory `astro-mfe`.
2. Install project dependencies: `pnpm install`.
3. Run production build: `pnpm build`.
4. Preview production build: `pnpm preview`.

Verify that the microfrontend (orange counter button) works on its own web page <http://localhost:4321/>.

### Starting the Host Application Server

1. Open a terminal in the subdirectory `nextjs-host`.
2. Install project dependencies: `pnpm install`.
3. Run production build: `pnpm build`.
4. Start production server: `pnpm start`.

Visit the host application on <http://localhost:3000/>.

## Architecture Concept

![Architecture Concept](./architecture.drawio.svg)

The approach of rendering the microfrontend inside the host application page is as follows.

1. Host application receives page request from the browser.
2. During server-side processing of the page request the host application makes an HTTP request to the microfrontend server to fetch an HTML document containing some prerendered representation of the microfrontend and references to resources like stylesheet `link` elements and `script` elements required for client-side hydration.
3. Some server-side logic inside the host application processes the received HTML document and integrates it into the host application's own HTML output.
   - It rewrites relative URL references (e.g. `href` of stylesheet `link` elements) to ensure that those references properly point to the microfrontend server from within the host application page.
   - It extracts inline `script` elements to enable execution of such scripts even during SPA-like soft navigations inside the host application.
   - It moves stylesheet `link` elements from the `head` next to the prerendered markup of the microfrontend in the `body`.
   - It renders the `body` content of the microfrontend HTML document inside a wrapper element in the host application page.
4. After client-side hydration of the host application page some logic executes the inline `script` code which may have been included in the microfrontend HTML document. This makes the microfrontend content interactive.

## Microfrontend using Astro + React

Implementation of the microfrontend is very easy using [Astro](https://astro.build/) and its [React integration](https://docs.astro.build/en/guides/integrations-guide/react/).

Simply create an Astro page which contains a client-side React island. That's it.

See the project example in the subdirectory `astro-mfe`. Take a look at the only page component `src/pages/index.astro`. It only renders some basic HTML document structure and the React island representing the microfrontend.

## Host Application using Next.js

Implementation of the host application involves making the server-side HTML document request, processing the HTML document and integrating its parts into the host application page.

Inside a [Next.js](https://nextjs.org/) project we use a React Server Component (RSC) to load the HTML document from the microfrontend server and render the transformed HTML output into the host application page. We also make use of a client component which receives the inline `script` code that is included in the microfrontend HTML document and evaluates it after client-side hydration.

See the project example in the subdirectory `nextjs-host`. Take a look at the home page component `src/app/page.tsx` which uses the RSC `SSRMicroFrontend` to render the microfrontend output. This component takes care of server-side data fetching and HTML transformation. Actual rendering of the microfrontend output is delegated to the client component `MicroFrontend` which additionally ensures that inline `script` code is executed after client-side rendering and properly tears down Astro islands when it is unmounted.

## License

[MIT](https://opensource.org/license/mit/)

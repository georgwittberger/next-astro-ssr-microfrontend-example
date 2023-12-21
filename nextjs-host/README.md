# Host Application based on Next.js

This is a host application example based on [Next.js](https://nextjs.org/) which embeds a server-side-rendered microfrontend.

## Preparation

Install project dependencies.

```shell
pnpm install
```

## Local Development

Run development server.

```shell
pnpm dev
```

Visit <http://localhost:3000/>

## Production Build

Run build. Note that microfrontend server must be running, otherwise you get `TypeError: fetch failed`.

```shell
pnpm build
```

Run production server.

```shell
pnpm start
```

Visit <http://localhost:3000/>

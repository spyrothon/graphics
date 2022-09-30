# Spyrothon App

`spyrothon_app` is the public-facing website for Spyrothon, https://spyrothon.org. It is used as a
central place for information about Spyrothon, including current schedules, newsletters, and more in
the future.

_All_ of `spyrothon_app` should be considered public-facing. Anything that requires permissions
should currently live in `spyrothon_admin` instead.

## Platform Install

`asdf` is the recommended platform manager. This application relies on `nodejs` and `pnpm`.

```zsh
asdf install
```

## Setup

This is a standard frontend package using `pnpm`.

### Install dependencies

pnpm normally does this for the whole repo at once, so generally this should not be needed:

```zsh
pnpm --filter ./spyrothon_app i
```

### Run in development

```zsh
pnpm dev
```

### Build a production release

```zsh
pnpm build
```

Artifacts will live in a `dist` folder in this directory.

## Testing

This is a standard frontend package using `pnpm`.

```zsh
# Check TypeScript
pnpm tsc
# Check ESLint
pnpm lint
# Check formatting
pnpm prettier
```

## Deployment

This is a standard frontend package using `pnpm`. It can be deployed to as a static site to any
hosting platform, like Render.com, Heroku, DigitalOcean App Platform, and others. Since this is a
monorepo, deployment will need some configuration to know how to build this application specifically
rather than something at the root of the repository.

- **install dependencies:** `pnpm --filter ./spyrothon_app i --frozen-lockfile` (not all platforms
  support pnpm)
- **build:** `pnpm --filter ./spyrothon_app build`
- **release directory:** `./spyrothon_app/dist`

Also, as a SPA, the host needs to be able to handle requests to any path and serve the same index
bundle. This is normally done with a "Rewrite" rule (_not_ a _redirect_ rule) that maps `/*` to `/`.

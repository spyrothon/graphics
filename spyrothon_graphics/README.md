# Spyrothon Graphics

`spyrothon_graphics` is the graphics system that powers the layouts for all of Spyrothon's streams.
These layouts are dynamic and configurable, all powered by data provided through `spyrothon_api`,
and controlled through `spyrothon_admin`.

`spyrothon_graphics` is not considered a public-facing application, since it is intended for use
only by the stream production. However, it does not have any login gating like the admin service
does. Public facing content should live in `spyrothon_app` instead.

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
pnpm --filter ./spyrothon_graphics i
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

- **install dependencies:** `pnpm --filter ./spyrothon_graphics i --frozen-lockfile` (not all
  platforms support pnpm)
- **build:** `pnpm --filter ./spyrothon_graphics build`
- **release directory:** `./spyrothon_graphics/dist`

Also, as a SPA, the host needs to be able to handle requests to any path and serve the same index
bundle. This is normally done with a "Rewrite" rule (_not_ a _redirect_ rule) that maps `/*` to `/`.

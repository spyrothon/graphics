# Spyrothon Admin

`spyrothon_admin` is the production management service that Spyrothon uses to plan and operate
events, including creating and managing schedule information used publicly as well as controlling
the graphics system in realtime.

Access to all of `spyrothon_admin` is gated through a login form. None of this application is
visible to the public. Anything meant to be shown publicly should live in `spyrothon_app` instead.

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
pnpm --filter ./spyrothon_admin i
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

- **install dependencies:** `pnpm --filter ./spyrothon_admin i --frozen-lockfile` (not all platforms
  support pnpm)
- **build:** `pnpm --filter ./spyrothon_admin build`
- **release directory:** `./spyrothon_admin/dist`

Also, as a SPA, the host needs to be able to handle requests to any path and serve the same index
bundle. This is normally done with a "Rewrite" rule (_not_ a _redirect_ rule) that maps `/*` to `/`.

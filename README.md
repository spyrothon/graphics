# Spyrothon Graphics

This is the monorepo for all of the software that Spyrothon uses. The architecture is split between
shared libraries and individual applications. Shared libraries live under `packages/` and include
things like the API client and UIKit, while all individual applications are at the top level and are
named `spyrothon_*` accordingly.

`spyrothon_admin` is the production management system that Spyrothon uses, including scheduling,
newsletter publishing, and live dashboards for controlling the stream during an event.

`spyrothon_api` is the primary backend powering data and integrations for all of the frontend
systems.

`spyrothon_app` is the public-facing website, https://spyrothon.org.

`spyrothon_graphics` is the layout system that gets loaded into OBS for streaming events.

## Usage

This repository relies on:

- elixir 1.12.2
- erlang/otp 24.0.4
- nodejs 16.11.1
- pnpm 7.11.0
- postgres 12 (or higher)

which are specified in `.tool-versions` and can easily be installed using `asdf` and their
respective plugins.

To get started, clone this repository and make sure the above tools are installed. Then, from the
repository root folder, install all of the frontend dependencies:

```zsh
# pnpm manages all package dependencies from the root level
pnpm -r i
```

From here, each application has its own process for getting up and running, and these are documented
in their respective READMEs. But in short, to get things up and running locally:

```zsh
# In one shell tab, for starting the API
cd spyrothon_api
# Copy the default configuration for development
cp config/dev.example.exs config/dev.exs
# Install dependencies and set up the dev environment
mix graphics.initialize
# Start the API
mix run --no-halt

# In another shell tab, for starting the admin service
cd spryothon_admin
# Start the dev server
pnpm dev
```

Once the frontend is running, you should be able to access it at the default
`http://localhost:5173`. The API should also be directly accessible from `http://localhost:4000`.

## Development

This repository has a lot of guardrails to help keep code consistent and clear. Namely, it uses
TypeScript to build strongly typed packages and avoid runtime errors, ESLint to help avoid pitfalls
and enforce a consistent code _structure_, and Prettier to enforce a consistent code _style_.

When pushing code to this repository, GitHub Actions will automatically check all three of the above
to make sure they pass. PRs and commits should only be put on `main` if they are passing all of
these checks.

When working locally, this repository includes a `settings.json` for VSCode to enable automatic
formatting and lint fixing, as well as an `extensions.json` to install recommended extensions for
all of the features used in this repository. If you're working in an editor other than VSCode,
you'll want to have:

- A TypeScript language server for in-editor type checking
- An ESLint plugin to highlight linting errors
- A Prettier plugin to automatically format code.

If you _don't_ want to use any of the above while working, that's fine. You can also check all of
these services using their respective `pnpm` commands. Each package should define a `tsc` and `lint`
command for running TypeScript and ESLint checking respectively, and running
`pnpm prettier . --write` should automatically format all files in the current directory.

## Deployment

This repository uses the same Github Actions to automatically deploy preview and production
environments for all applications. The exact setup of the deployments is not shared for security,
but the process is visible by looking at the `.github/workflows` files.

Each application in this repository also includes some instructions for creating a deployment from
scratch.

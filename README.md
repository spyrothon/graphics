# Spyrothon Graphics

This is the monorepo for all of the frontend packages that Spyrothon uses. The architecture is split
between shared libraries and individual applications. `api` and `uikit` are the shared bases on
which `admin`, `app`, and `graphics` are built.

`admin` is all of the production management that Spyrothon uses, including scheduling, newsletter
publishing, and live dashboards for controlling the stream during an event.

`app` is the public-facing website, https://spyrothon.org.

`graphics` is the layout system that gets loaded into OBS for streaming events.

## Usage

This repository relies on:

- nodejs 16.11.1
- pnpm 7.11.0

which are specified in `.tool-versions` and can easily be installed using `asdf` and their
respective plugins.

To get started, clone this repository and make sure the above tools are installed. Then, from the
repository root folder, install all of the dependencies:

```zsh
# pnpm manages all package dependencies from the root level
pnpm i
```

Now, any individual application can be run by `cd`ing into that package and running `dev`.

```zsh
# Start the `admin` application
cd packages/admin
pnpm dev
```

Running the application locally will also require you to have the backend running, which can be
found at https://github.com/spyrothon/graphics-api.

## Development

This repository has a lot of guardrails to help keep code consistent and clear. Namly, it uses
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

This version of the repository is not yet set up for simple deployment. Individual projects can be
built into SPA bundles using `pnpm build` in their respective directories, but serving those files
is currently left up to you.

```zsh
# Build a production version of the `graphics` application
cd packages/graphics
pnpm build
```

The result of building any package will be stored in a `dist` folder under that package.

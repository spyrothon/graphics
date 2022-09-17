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
# -r tells pnpm to install recursively through all packages
pnpm -r i
```

Now, any individual application can be run by `cd`ing into that package and running `dev`.

```zsh
# Start the `admin` application
cd packages/admin
pnpm dev
```

Running the application locally will also require you to have the backend running, which can be
found at https://github.com/spyrothon/graphics-api.

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

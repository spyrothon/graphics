# Graphics API

# Spyrothon API

`spyrothonn_api` is the service powering all other applications for Spyrothon. Managing run
information, scheduling, and other dynamic data, as well as providing real-time communication
between interfaces (graphics, dashboards, informational services, etc.).

## Platform Install

`asdf` is the recommended platform manager. This application relies on `elixir`, and `erlang`. You
can optionally also manage `postgres` through this service.

```zsh
asdf install
```

## Setup

This is a standard Elixir Mix application.

### Configuration

Copy the `dev.example.exs` to a personal `dev.exs` to be able to run in development. You can then
change any of the dev configuration to work for your setup.

```zsh
cp config/dev.example.exs config/dev.exs
```

### Install dependencies and initialize

```zsh
mix graphics.initialize
```

### Run in development

```zsh
mix run --no-halt
```

### Build a production release

```zsh
MIX_ENV=prod mix release --path ./release
```

## Testing

This application does not currently have any tests. It just relies on being compilable.

```zsh
# Check compilation
mix compile
# (Eventually) check that tests pass
mix test
```

## Deployment

This is a standard Elixir Mix application. It can be deployed to as a web service to any hosting
platform, like DigitalOcean App Platform, Render.com, Heroku, Gigalixir, and others. Since this is a
monorepo, deployment will need some configuration to know how to build this application specifically
rather than something at the root of the repository.

- **install dependencies:** `cd spyrothon_api && mix deps.get`
- **build:** `MIX_ENV=prod cd spyrothon_api && mix release --path ./releaase`
- **release directory:** `./spyrothon_api/release`

The release builds a standard Mix release with all of the normal commands for `start`, `stop`, and
more. Configuration for the release is set up to read `config/runtime.exs`, which relies on
environment variables being set when the application is started.

**NOTE:** Database operations (create, migrate, etc.) are currently not supported in the release
mode. You'll need to have some way of running them manually for now.

# Twitch Setup

Once you have at least a `client_id` specified in the `dev.json` , you can use the `access_token`
tool to get a user access token for a channel with `cd tools/access_token && yarn get` (assumes
`dev` environment currently).

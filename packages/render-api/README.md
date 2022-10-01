# Render API

This is an automatically-generated API for Render.com, created using the `api` package. For more
information about Render's API, check out the documentation at
https://api-docs.render.com/reference/introduction.

_This package is included here for use by `sprobothon`._

## Setup

For some reason, the docs for the `api` package are referencing a _beta_ version, but don't actually
mention that anywhere useful. To generate this package for yourself, run:

```zsh
npx api@beta install https://dash.readme.com/api/v1/api-registry/2vb1ls5l4l432i2gp
```

`api@beta` is the part that is missing from the package docs here:
https://api.readme.dev/docs/installation.
`https://dash.readme.com/api/v1/api-registry/2vb1ls5l4l432i2gp` is the Open API spec for Render.com,
found from their documentation pointing to the `api` package with the spec
`@render-api/v1.0#2vb1ls5l4l432i2gp`.

Running the `npx` script above will generate an API package under a `./api/apis` folder, which is
where this package has been moved from for use here.

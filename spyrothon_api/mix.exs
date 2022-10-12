defmodule GraphicsAPI.MixProject do
  use Mix.Project

  def project do
    [
      app: :graphics_api,
      version: "0.1.0",
      elixir: "~> 1.10",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      releases: [
        graphics_api: [
          include_executables_for: [:unix],
          applications: [runtime_tools: :permanent]
        ]
      ]
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: extra_applications(Mix.env()),
      mod: {GraphicsAPI.Application, []}
    ]
  end

  defp extra_applications(:dev), do: extra_applications(:all) ++ [:exsync]
  defp extra_applications(_all), do: [:logger]

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:jason, "~> 1.4.0"},
      {:plug, "~> 1.13.6"},
      {:plug_cowboy, "~> 2.5.2"},
      {:cors_plug, "~> 3.0.3"},
      {:ecto, "~> 3.9.1"},
      {:ecto_sql, "~> 3.9.0"},
      {:postgrex, "~> 0.16.5"},
      {:comeonin, "~> 5.3.2"},
      {:argon2_elixir, "~> 2.0"},
      {:exsync, "~> 0.2", only: :dev},
      {:riverside, "~> 2.2.1"},
      {:hackney, "~> 1.18.1"},
      {:tarams, "~> 1.7.0"},
      {:tesla, "~> 1.4.3"}
    ]
  end
end

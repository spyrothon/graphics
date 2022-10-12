defmodule Mix.Tasks.Graphics.Initialize do
  @moduledoc "The hello mix task: `mix help hello`"
  use Mix.Task

  alias GraphicsAPI.{Runs, Users}

  @shortdoc "Creates a database and initializes necessary info to run the Graphics API"
  def run(_) do
    Mix.Shell.IO.info("Installing dependencies")
    Mix.Task.run("deps.get")
    Mix.Shell.IO.info("\n\nCreating the database")
    Mix.Task.run("ecto.create")
    Mix.Shell.IO.info("\n\nRunning database migrations")
    Mix.Task.run("ecto.migrate")

    Mix.Shell.IO.info("\n\nStarting application to run necessary db commands")
    Mix.Task.run("app.start")

    Mix.Shell.IO.info("\n\nCreating initial data (schedule, init record, etc)")
    create_init()

    Mix.Shell.IO.info("\n\nCreating admin user (username/password `admin`)")
    create_admin()

    Mix.Shell.IO.info(
      "\n\nInitial data has been set up. You can now run `mix run --no-halt` to start using the Graphics API"
    )
  end

  defp create_init() do
    {:ok, schedule} =
      Runs.create_schedule(%{
        name: "First Schedule",
        series: "Mainline",
        start_time: DateTime.utc_now()
      })

    {:ok, run} =
      Runs.create_run(%{
        game_name: "Spyro the Dragon",
        category_name: "120%",
        estimate_seconds: 5400,
        platform: "PS1",
        release_year: "1998"
      })

    schedule = Runs.get_schedule(schedule.id)
    Runs.add_schedule_entry(schedule, %{"setup_seconds" => 300, "run_id" => run.id})

    Users.create_init(%{schedule_id: schedule.id})
  end

  defp create_admin() do
    {:ok, admin} = Users.create_user(%{name: "admin", password: "admin", role: "admin"})
    admin
  end
end

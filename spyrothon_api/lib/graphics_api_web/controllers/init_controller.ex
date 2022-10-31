defmodule GraphicsAPIWeb.InitController do
  use GraphicsAPIWeb.APIController

  alias GraphicsAPI.{Runs, Users}

  get "/" do
    json(conn, Users.get_init!())
  end

  get "/admin" do
    init = Users.get_init!()
    schedule = Runs.get_schedule(init.schedule_id, with_config: true)

    json(conn, %{
      schedule: schedule,
      obsConfig: schedule.obs_websocket_host,
      participants: Users.list_participants()
    })
  end

  post "/" do
    init_params = conn.body_params

    with {:ok, init} <- Users.update_init(init_params) do
      json(conn, init)
    else
      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end
end

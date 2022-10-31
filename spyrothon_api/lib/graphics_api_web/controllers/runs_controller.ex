defmodule GraphicsAPIWeb.RunsController do
  use GraphicsAPIWeb.APIController

  alias GraphicsAPI.Runs

  defmacro modify_run(conn, run_id, action) do
    quote bind_quoted: [conn: conn, run_id: run_id, action: action] do
      with run = %Runs.Run{} <- Runs.get_run(run_id),
           {:ok, updated_run} <- action.(run) do
        _respond_with_run(conn, updated_run)
      else
        run when is_nil(run) ->
          conn |> not_found()

        {:error, changeset} ->
          conn
          |> changeset_error(changeset)
      end
    end
  end

  get "" do
    json(conn, Runs.list_runs())
  end

  get "/:id" do
    run_id = Map.get(conn.path_params, "id")

    if run_id != nil do
      json(conn, Runs.get_run(run_id))
    end
  end

  post "/" do
    run_params = conn.body_params

    with {:ok, run} <- Runs.create_run(run_params) do
      _respond_with_run(conn, run)
    else
      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  put "/:id" do
    run_id = conn.path_params["id"]

    modify_run(
      conn,
      run_id,
      fn run ->
        Runs.update_run(run, conn.body_params)
      end
    )
  end

  delete "/:id" do
    run_id = conn.path_params["id"]
    modify_run(conn, run_id, &Runs.delete_run/1)
    no_content(conn)
  end

  patch "/:id/start" do
    run_id = conn.path_params["id"]
    modify_run(conn, run_id, &Runs.Timing.start_run/1)
  end

  patch "/:id/finish" do
    run_id = conn.path_params["id"]
    modify_run(conn, run_id, &Runs.Timing.finish_run/1)
  end

  patch "/:id/pause" do
    run_id = conn.path_params["id"]
    modify_run(conn, run_id, &Runs.Timing.pause_run/1)
  end

  patch "/:id/resume" do
    run_id = conn.path_params["id"]
    modify_run(conn, run_id, &Runs.Timing.resume_run/1)
  end

  patch "/:id/reset" do
    run_id = conn.path_params["id"]
    modify_run(conn, run_id, &Runs.Timing.reset_run/1)
  end

  get "/:id/runners" do
    run_id = Map.get(conn.path_params, "id")

    case run_id do
      nil ->
        not_found(conn)

      run_id ->
        run = Runs.get_run(run_id)
        json(conn, run.runners)
    end
  end

  post "/:id/runners" do
    run_id = Map.get(conn.path_params, "id")

    modify_run(conn, run_id, fn run ->
      Runs.add_runner(run, conn.body_params)
      run = Runs.get_run(run_id)
      {:ok, run}
    end)
  end

  put "/:id/runners/:runner_id" do
    run_id = Map.get(conn.path_params, "id")
    runner_id = Map.get(conn.path_params, "runner_id")

    modify_run(conn, run_id, fn run ->
      Runs.update_runner(run, runner_id, conn.body_params)
    end)
  end

  delete "/:id/runners/:runner_id" do
    run_id = Map.get(conn.path_params, "id")
    runner_id = Map.get(conn.path_params, "runner_id")

    modify_run(conn, run_id, fn run ->
      Runs.remove_runner(run, runner_id)
    end)
  end

  patch "/:id/runners/:runner_id/finish" do
    run_id = conn.path_params["id"]

    modify_run(
      conn,
      run_id,
      fn run ->
        Runs.Timing.finish_runner(run, conn.path_params["runner_id"])
      end
    )
  end

  patch "/:id/runners/:runner_id/resume" do
    run_id = conn.path_params["id"]

    modify_run(
      conn,
      run_id,
      fn run ->
        Runs.Timing.resume_runner(run, conn.path_params["runner_id"])
      end
    )
  end

  get "/:id/commentators" do
    run_id = Map.get(conn.path_params, "id")

    case run_id do
      nil ->
        not_found(conn)

      run_id ->
        run = Runs.get_run(run_id)
        json(conn, run.commentators)
    end
  end

  post "/:id/commentators" do
    run_id = Map.get(conn.path_params, "id")

    modify_run(conn, run_id, fn run ->
      Runs.add_commentator(run, conn.body_params)
      run = Runs.get_run(run_id)
      {:ok, run}
    end)
  end

  put "/:id/commentators/:commentator_id" do
    run_id = Map.get(conn.path_params, "id")
    commentator_id = Map.get(conn.path_params, "commentator_id")

    modify_run(conn, run_id, fn run ->
      Runs.update_commentator(run, commentator_id, conn.body_params)
    end)
  end

  delete "/:id/commentators/:commentator_id" do
    run_id = Map.get(conn.path_params, "id")
    commentator_id = Map.get(conn.path_params, "commentator_id")

    modify_run(conn, run_id, fn run ->
      Runs.remove_commentator(run, commentator_id)
    end)
  end

  def _respond_with_run(conn, run) do
    GraphicsAPIWeb.SyncSocketHandler.update_run(run)
    json(conn, run)
  end
end

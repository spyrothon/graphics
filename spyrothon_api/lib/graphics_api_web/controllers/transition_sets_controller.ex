defmodule GraphicsAPIWeb.TransitionSetsController do
  use GraphicsAPIWeb.APIController

  alias GraphicsAPI.Runs

  get "/:id" do
    set_id = conn.path_params["id"]

    case Runs.Transitions.get_transition_set(set_id) do
      nil -> not_found(conn)
      set -> json(conn, set)
    end
  end

  put "/:id" do
    set_id = conn.path_params["id"]
    set_params = conn.body_params

    with transition_set = %Runs.TransitionSet{} <- Runs.Transitions.get_transition_set(set_id),
         {:ok, transition_set} <-
           Runs.Transitions.update_transition_set(transition_set, set_params) do
      _update_schedule_for_transition_set(transition_set.id)
      json(conn, transition_set)
    else
      transition_set when is_nil(transition_set) ->
        conn |> not_found()

      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  post "/:id/reset" do
    set_id = conn.path_params["id"]

    with set <- Runs.Transitions.get_transition_set(set_id),
         true <- Runs.Transitions.reset_transition_set(set),
         entry when entry != nil <- Runs.get_schedule_entry_for_transition_set(set_id),
         schedule when schedule != nil <- Runs.get_schedule(entry.schedule_id) do
      GraphicsAPIWeb.SyncSocketHandler.update_schedule(schedule)
      json(conn, schedule)
    else
      _ ->
        conn
        |> put_status(500)
    end
  end

  defp _update_schedule_for_transition_set(transition_set_id) do
    schedule_id = Runs.Transitions.get_schedule_id_for_transition_set(transition_set_id)
    schedule = Runs.get_schedule(schedule_id)
    GraphicsAPIWeb.SyncSocketHandler.update_schedule(schedule)
    schedule
  end
end

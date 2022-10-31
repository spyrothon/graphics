defmodule GraphicsAPIWeb.ParticipantsController do
  use GraphicsAPIWeb.APIController

  alias GraphicsAPI.Users

  get "" do
    json(conn, Users.list_participants())
  end

  get "/:id" do
    participant_id = Map.get(conn.path_params, "id")

    cond do
      participant_id != nil -> json(conn, Users.get_participant(participant_id))
      true -> not_found(conn)
    end
  end

  post "/" do
    participant_params = conn.body_params

    with {:ok, participant} <- Users.create_participant(participant_params) do
      GraphicsAPIWeb.SyncSocketHandler.update_participant(participant)
      json(conn, participant)
    else
      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  put "/:id" do
    participant_id = conn.path_params["id"]
    participant_params = conn.body_params

    with participant = %Users.Participant{} <- Users.get_participant(participant_id),
         {:ok, participant} <- Users.update_participant(participant, participant_params) do
      GraphicsAPIWeb.SyncSocketHandler.update_participant(participant)
      json(conn, participant)
    else
      participant when is_nil(participant) ->
        conn |> send_resp(404, "")

      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  delete "/:id" do
    participant_id = conn.path_params["id"]

    with participant = %Users.Participant{} <- Users.get_participant(participant_id),
         {:ok, _participant} <- Users.delete_participant(participant) do
      no_content(conn)
    else
      nil ->
        conn |> not_found()

      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end
end

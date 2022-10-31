defmodule GraphicsAPIWeb.InterviewsController do
  use GraphicsAPIWeb.APIController

  alias GraphicsAPI.Runs

  get "" do
    json(conn, Runs.list_interviews())
  end

  get "/:id" do
    interview_id = Map.get(conn.path_params, "id")

    if interview_id != nil do
      json(conn, Runs.get_interview(interview_id))
    end
  end

  post "/" do
    interview_params = conn.body_params

    with {:ok, interview} <- Runs.create_interview(interview_params) do
      GraphicsAPIWeb.SyncSocketHandler.update_interview(interview)
      json(conn, interview)
    else
      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  put "/:id" do
    interview_id = conn.path_params["id"]
    interview_params = conn.body_params

    with interview = %Runs.Interview{} <- Runs.get_interview(interview_id),
         {:ok, interview} <- Runs.update_interview(interview, interview_params) do
      GraphicsAPIWeb.SyncSocketHandler.update_interview(interview)
      json(conn, interview)
    else
      interview when is_nil(interview) ->
        conn |> not_found()

      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  delete "/:id" do
    interview_id = conn.path_params["id"]

    with interview = %Runs.Interview{} <- Runs.get_interview(interview_id),
         {:ok, _interview} <- Runs.delete_interview(interview) do
      no_content(conn)
    else
      nil ->
        conn |> not_found()

      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  get "/:id/interviewers" do
    interview_id = Map.get(conn.path_params, "id")

    case interview_id do
      nil ->
        not_found(conn)

      interview_id ->
        interview = Runs.get_interview(interview_id)
        json(conn, interview.interviewers)
    end
  end

  post "/:id/interviewers" do
    interview_id = Map.get(conn.path_params, "id")

    with interview = %Runs.Interview{} <- Runs.get_interview(interview_id),
         {:ok, updated_interview} <- Runs.add_interviewer(interview, conn.body_params) do
      GraphicsAPIWeb.SyncSocketHandler.update_interview(updated_interview)
      json(conn, updated_interview)
    else
      interview when is_nil(interview) ->
        conn |> not_found()

      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  put "/:id/interviewers/:interviewer_id" do
    interview_id = Map.get(conn.path_params, "id")
    interviewer_id = Map.get(conn.path_params, "interviewer_id")

    with interview = %Runs.Interview{} <- Runs.get_interview(interview_id),
         {:ok, updated_interview} <-
           Runs.update_interviewer(interview, interviewer_id, conn.body_params) do
      GraphicsAPIWeb.SyncSocketHandler.update_interview(updated_interview)
      json(conn, updated_interview)
    else
      interview when is_nil(interview) ->
        conn |> not_found()

      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  delete "/:id/interviewers/:interviewer_id" do
    interview_id = Map.get(conn.path_params, "id")
    interviewer_id = Map.get(conn.path_params, "interviewer_id")

    with interview = %Runs.Interview{} <- Runs.get_interview(interview_id),
         {:ok, updated_interview} <- Runs.remove_interviewer(interview, interviewer_id) do
      GraphicsAPIWeb.SyncSocketHandler.update_interview(updated_interview)
      json(conn, updated_interview)
    else
      interview when is_nil(interview) ->
        conn |> not_found()

      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  get "/:id/interviewees" do
    interview_id = Map.get(conn.path_params, "id")

    case interview_id do
      nil ->
        not_found(conn)

      interview_id ->
        interview = Runs.get_interview(interview_id)
        json(conn, interview.interviewees)
    end
  end

  post "/:id/interviewees" do
    interview_id = Map.get(conn.path_params, "id")

    with interview = %Runs.Interview{} <- Runs.get_interview(interview_id),
         {:ok, updated_interview} <- Runs.add_interviewee(interview, conn.body_params) do
      GraphicsAPIWeb.SyncSocketHandler.update_interview(updated_interview)
      json(conn, updated_interview)
    else
      interview when is_nil(interview) ->
        conn |> not_found()

      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  put "/:id/interviewees/:interviewee_id" do
    interview_id = Map.get(conn.path_params, "id")
    interviewee_id = Map.get(conn.path_params, "interviewee_id")

    with interview = %Runs.Interview{} <- Runs.get_interview(interview_id),
         {:ok, updated_interview} <-
           Runs.update_interviewee(interview, interviewee_id, conn.body_params) do
      GraphicsAPIWeb.SyncSocketHandler.update_interview(updated_interview)
      json(conn, updated_interview)
    else
      interview when is_nil(interview) ->
        conn |> not_found()

      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  delete "/:id/interviewees/:interviewee_id" do
    interview_id = Map.get(conn.path_params, "id")
    interviewee_id = Map.get(conn.path_params, "interviewee_id")

    with interview = %Runs.Interview{} <- Runs.get_interview(interview_id),
         {:ok, updated_interview} <- Runs.remove_interviewee(interview, interviewee_id) do
      GraphicsAPIWeb.SyncSocketHandler.update_interview(updated_interview)
      json(conn, interview)
    else
      interview when is_nil(interview) ->
        conn |> not_found()

      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end
end

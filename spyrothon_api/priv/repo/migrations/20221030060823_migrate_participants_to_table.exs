defmodule GraphicsAPI.Repo.Migrations.MigrateParticipantsToTable do
  use Ecto.Migration

  alias GraphicsAPI.Users
  alias GraphicsAPI.Runs.{Interview, Run, Participant}

  alias GraphicsAPI.Runs

  def create_user_participant(run_participant) do
    Map.from_struct(run_participant)
    |> Map.put(:pronouns_visible, true)
    |> Users.create_participant()
  end

  def map_participants_to_user_participants(participants) do
    participants
    |> Enum.map(fn p ->
      {:ok, new_participant} = create_user_participant(p)

      %Participant{p | participant_id: new_participant.id}
      |> Map.from_struct()
    end)
  end

  def create_participants_for_run(run = %Run{}) do
    Runs.update_run(run, %{
      runners: map_participants_to_user_participants(run.runners),
      commentators: map_participants_to_user_participants(run.commentators)
    })
  end

  def create_participants_for_interview(interview = %Interview{}) do
    Runs.update_interview(interview, %{
      interviewers: map_participants_to_user_participants(interview.interviewers),
      interviewees: map_participants_to_user_participants(interview.interviewees)
    })
  end

  def up do
    Application.ensure_all_started(:graphics_api)

    Runs.list_runs()
    |> Stream.each(&create_participants_for_run/1)
    |> Stream.run()

    Runs.list_interviews()
    |> Stream.each(&create_participants_for_interview/1)
    |> Stream.run()
  end

  def down do
    Users.list_participants()
    |> Stream.each(&Users.delete_participant/1)
    |> Stream.run()
  end
end

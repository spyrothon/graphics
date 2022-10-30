# This script moves participant data from the embedded `participant` schema
# shared between runs and interviews into a dedicated table that will allow
# the data to be reused across runs and events.
#
# Unshared data like run timing and interview scores are _not_ part of this
# table and will still use an embedded schema to track them, since they are
# tied directly to the usage of the participant with that subject.
defmodule Mix.Tasks.Graphics.Migrations.ParticipantsToTable do
  @moduledoc "The hello mix task: `mix help hello`"
  use Mix.Task

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
    Runs.update_run(interview, %{
      interviewers: map_participants_to_user_participants(interview.interviewers),
      interviewees: map_participants_to_user_participants(interview.interviewees)
    })
  end

  @shortdoc "Extracts participant information from Runs and Interviews into the dedicated table"
  def run(_) do
    Runs.list_runs()
    |> Stream.each(&Migration.create_participants_for_run/1)
    |> Stream.run()

    Runs.list_interviews()
    |> Stream.each(&Migration.create_participants_for_interview/1)
    |> Stream.run()
  end
end

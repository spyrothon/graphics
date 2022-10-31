defmodule GraphicsAPI.Runs do
  import Ecto.Query, warn: false
  alias GraphicsAPI.Repo

  alias GraphicsAPI.Runs.{
    Commentator,
    Interview,
    InterviewParticipant,
    Schedule,
    ScheduleEntry,
    Run,
    Runner
  }

  ###
  # Runs
  ###

  def list_runs() do
    Run
    |> Repo.all()
    |> Repo.preload(runners: :participant, commentators: :participant)
  end

  def get_run(run_id) do
    Run
    |> Repo.get(run_id)
    |> Repo.preload(runners: :participant, commentators: :participant)
  end

  def create_run(params) do
    %Run{}
    |> Run.changeset(params)
    |> Repo.insert()
  end

  def update_run(run = %Run{}, params) do
    run
    |> Run.changeset(params)
    |> Repo.update()
  end

  def delete_run(run = %Run{}) do
    run
    |> Repo.delete()
  end

  def add_runner(run = %Run{}, runner_params) do
    runner_maps = run.runners |> Enum.map(&Map.from_struct/1)

    run
    |> Run.changeset(%{runners: runner_maps ++ [runner_params]})
    |> Repo.update()
  end

  def update_runner(run = %Run{}, runner_id, runner_params) do
    updated_runners =
      run.runners
      |> Enum.map(fn runner ->
        case runner do
          %{id: ^runner_id} ->
            runner
            |> Runner.changeset(runner_params)
            |> Ecto.Changeset.apply_changes()
            |> IO.inspect()

          _ ->
            runner
        end
        |> Map.from_struct()
      end)

    run
    |> Run.changeset(%{runners: updated_runners})
    |> Repo.update()
  end

  def remove_runner(run = %Run{}, runner_id) do
    updated_runners =
      run.runners
      |> Enum.reject(&(&1.id == runner_id))

    run
    |> Run.changeset()
    |> Ecto.Changeset.put_embed(:runners, updated_runners)
    |> Repo.update()
  end

  def add_commentator(run = %Run{}, commentator_params) do
    commentator_maps = run.commentators |> Enum.map(&Map.from_struct/1)

    run
    |> Run.changeset(%{commentators: commentator_maps ++ [commentator_params]})
    |> Repo.update()
  end

  def update_commentator(run = %Run{}, commentator_id, commentator_params) do
    updated_commentators =
      run.commentators
      |> Enum.map(fn commentator ->
        case commentator do
          %{id: ^commentator_id} ->
            commentator
            |> Commentator.changeset(commentator_params)
            |> Ecto.Changeset.apply_changes()
            |> IO.inspect()

          _ ->
            commentator
        end
        |> Map.from_struct()
      end)

    run
    |> Run.changeset(%{commentators: updated_commentators})
    |> Repo.update()
  end

  def remove_commentator(run = %Run{}, commentator_id) do
    updated_commentators =
      run.commentators
      |> Enum.reject(&(&1.id == commentator_id))

    run
    |> Run.changeset()
    |> Ecto.Changeset.put_embed(:commentators, updated_commentators)
    |> Repo.update()
  end

  ###
  # Interviews
  ###

  def list_interviews() do
    Interview
    |> Repo.all()
    |> Repo.preload(interviewers: :participant, interviewees: :participant)
  end

  def get_interview(interview_id) do
    Interview
    |> Repo.get(interview_id)
    |> Repo.preload(interviewers: :participant, interviewees: :participant)
  end

  def create_interview(params) do
    %Interview{}
    |> Interview.changeset(params)
    |> Repo.insert()
  end

  def update_interview(interview = %Interview{}, params) do
    interview
    |> Interview.changeset(params)
    |> Repo.update()
  end

  def delete_interview(interview = %Interview{}) do
    interview
    |> Repo.delete()
  end

  def add_interviewer(interview = %Interview{}, interviewer_params) do
    interviewer_maps = interview.interviewers |> Enum.map(&Map.from_struct/1)

    interview
    |> Interview.changeset(%{interviewers: interviewer_maps ++ [interviewer_params]})
    |> Repo.update()
  end

  def update_interviewer(interview = %Interview{}, interviewer_id, interviewer_params) do
    updated_interviewers =
      interview.interviewers
      |> Enum.map(fn interviewer ->
        case interviewer do
          %{id: ^interviewer_id} ->
            interviewer
            |> InterviewParticipant.changeset(interviewer_params)
            |> Ecto.Changeset.apply_changes()
            |> IO.inspect()

          _ ->
            interviewer
        end
        |> Map.from_struct()
      end)

    interview
    |> Interview.changeset(%{interviewers: updated_interviewers})
    |> Repo.update()
  end

  def remove_interviewer(interview = %Interview{}, interviewer_id) do
    updated_interviewers =
      interview.interviewers
      |> Enum.reject(&(&1.id == interviewer_id))

    interview
    |> Interview.changeset()
    |> Ecto.Changeset.put_embed(:interviewers, updated_interviewers)
    |> Repo.update()
  end

  def add_interviewee(interview = %Interview{}, interviewee_params) do
    interviewee_maps = interview.interviewees |> Enum.map(&Map.from_struct/1)

    interview
    |> Interview.changeset(%{interviewees: interviewee_maps ++ [interviewee_params]})
    |> Repo.update()
  end

  def update_interviewee(interview = %Interview{}, interviewee_id, interviewee_params) do
    updated_interviewees =
      interview.interviewees
      |> Enum.map(fn interviewee ->
        case interviewee do
          %{id: ^interviewee_id} ->
            interviewee
            |> InterviewParticipant.changeset(interviewee_params)
            |> Ecto.Changeset.apply_changes()
            |> IO.inspect()

          _ ->
            interviewee
        end
        |> Map.from_struct()
      end)

    interview
    |> Interview.changeset(%{interviewees: updated_interviewees})
    |> Repo.update()
  end

  def remove_interviewee(interview = %Interview{}, interviewee_id) do
    updated_interviewees =
      interview.interviewees
      |> Enum.reject(&(&1.id == interviewee_id))

    interview
    |> Interview.changeset()
    |> Ecto.Changeset.put_embed(:interviewees, updated_interviewees)
    |> Repo.update()
  end

  ###
  # Schedules
  ###

  @schedules_query from(s in Schedule,
                     preload: [
                       runs: [runners: :participant, commentators: :participant],
                       interviews: [interviewers: :participant, interviewees: :participant],
                       schedule_entries:
                         ^from(e in ScheduleEntry,
                           order_by: [asc: e.position],
                           preload: [:enter_transition_set, :exit_transition_set]
                         )
                     ]
                   )

  def list_schedules() do
    @schedules_query
    |> Repo.all()
  end

  def get_schedule(schedule_id, opts \\ []) do
    with_config = Keyword.get(opts, :with_config, false)

    @schedules_query
    |> Repo.get(schedule_id)
    |> Repo.preload(if with_config, do: [:obs_websocket_host], else: [])
  end

  def create_schedule(params) do
    %Schedule{}
    |> Schedule.changeset(params)
    |> Repo.insert()
  end

  def update_schedule(original_schedule = %Schedule{}, params) do
    {:ok, schedule} =
      original_schedule
      |> Schedule.changeset(params)
      |> Repo.update()

    _update_twitch_channel_info(schedule)

    {:ok, schedule}
  end

  def delete_schedule(schedule = %Schedule{}) do
    schedule
    |> Repo.delete()
  end

  def get_schedule_entry(entry_id) do
    Repo.get(ScheduleEntry, entry_id)
    |> Repo.preload([:enter_transition_set, :exit_transition_set])
  end

  def get_schedule_entry_for_transition_set(set_id) do
    Repo.one(
      from(s in ScheduleEntry,
        where: s.exit_transition_set_id == ^set_id or s.enter_transition_set_id == ^set_id
      )
    )
    |> Repo.preload([:enter_transition_set, :exit_transition_set])
  end

  def update_schedule_entry(entry = %ScheduleEntry{}, entry_params) do
    entry
    |> ScheduleEntry.update_changeset(entry_params)
    |> Repo.update()
  end

  def add_schedule_entry(schedule = %Schedule{}, entry_params) do
    entries = schedule.schedule_entries || []

    next_position =
      case Enum.at(entries, -1) do
        %{position: last_position} -> last_position + 1
        nil -> 0
      end

    updated_entry =
      entry_params
      |> Map.put("position", Map.get(entry_params, :position, next_position))
      |> Map.put("schedule_id", schedule.id)

    {:ok, entry} =
      %ScheduleEntry{}
      |> ScheduleEntry.changeset(updated_entry)
      |> Repo.insert()

    # If the schedule doesn't yet have a current entry, this must be the first
    # one, so set it as the current entry to ensure dashboards and everything work.
    if schedule.current_entry_id == nil do
      transition_schedule_to_entry(schedule, entry.id)
    end

    {:ok, entry}
  end

  def remove_schedule_entry(%Schedule{}, entry_id) do
    ScheduleEntry
    |> Repo.get!(entry_id)
    |> Repo.delete()
  end

  def transition_schedule_to_entry(schedule = %Schedule{}, new_entry_id) do
    old_entry_id = schedule.current_entry_id
    transition_time = DateTime.utc_now()

    {:ok, schedule} = update_schedule(schedule, %{current_entry_id: new_entry_id})

    if old_entry_id != nil do
      {:ok, _entry} =
        get_schedule_entry(old_entry_id)
        |> update_schedule_entry(%{exited_at: transition_time})
    end

    if new_entry_id != nil do
      {:ok, _entry} =
        get_schedule_entry(new_entry_id)
        |> update_schedule_entry(%{entered_at: transition_time, exited_at: nil})
    end

    {:ok, schedule}
  end

  defp _update_twitch_channel_info(schedule = %Schedule{}) do
    Task.async(fn ->
      new_run = get_schedule_entry(schedule.current_entry_id)

      case new_run do
        %{run_id: run_id} when not is_nil(run_id) ->
          run = get_run(run_id)

          Twitch.modify_channel_information(%{
            game_name: run.game_name,
            title: _format_run_title(schedule.run_title_template, run)
          })

        %{interview_id: interview_id} when not is_nil(interview_id) ->
          interview = get_interview(interview_id)

          Twitch.modify_channel_information(%{
            game_name: "Just Chatting",
            title: _format_interview_title(schedule.interview_title_template, interview)
          })

        _ ->
          :ok
      end
    end)
  end

  defp _format_run_title(template, run = %Run{}) do
    runner_names = run.runners |> Enum.map_join(", ", & &1.display_name)

    (template || "")
    |> String.replace("{{gameName}}", run.game_name || "")
    |> String.replace("{{categoryName}}", run.category_name || "")
    |> String.replace("{{runners}}", runner_names)
  end

  defp _format_interview_title(template, interview = %Interview{}) do
    interviewee_names = interview.interviewees |> Enum.map_join(", ", & &1.display_name)
    interviewer_names = interview.interviewers |> Enum.map_join(", ", & &1.display_name)

    (template || "")
    |> String.replace("{{interviewees}}", interviewee_names)
    |> String.replace("{{interviewers}}", interviewer_names)
  end
end

defmodule GraphicsAPI.Repo.Migrations.EnforceTransitionSetsForEntries do
  use Ecto.Migration

  alias GraphicsAPI.Runs.{ScheduleEntry, TransitionSet}
  alias GraphicsAPI.Repo

  def up do
    entries =
      ScheduleEntry
      |> Repo.all()
      |> Repo.preload([:enter_transition_set, :exit_transition_set])

    entries
    |> Enum.map(fn entry ->
      entry
      |> Ecto.Changeset.change()
      |> add_transition_set(:enter_transition_set_id, :enter_transition_set)
      |> add_transition_set(:exit_transition_set_id, :exit_transition_set)
      |> Repo.update()
    end)
  end

  def down do
    IO.inspect("Noting to undo for enforcing transitions")
  end

  defp add_transition_set(changeset, id, field) do
    case Ecto.Changeset.get_field(changeset, id) do
      nil -> Ecto.Changeset.put_assoc(changeset, field, %TransitionSet{})
      _ -> changeset
    end
  end
end

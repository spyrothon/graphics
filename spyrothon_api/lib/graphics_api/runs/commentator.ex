defmodule GraphicsAPI.Runs.Commentator do
  use Ecto.Schema
  import Ecto.Changeset

  alias GraphicsAPI.Users

  @fields [
    :id,
    :visible,
    :webcam_visible,
    :display_name,

    # Offloading data
    :participant_id
  ]

  embedded_schema do
    field(:visible, :boolean, default: true)
    field(:webcam_visible, :boolean, default: false)
    # An override of the participant's display name for a specific run
    field(:display_name, :string)

    belongs_to(:participant, Users.Participant)
  end

  def changeset(commentator, params \\ %{}) do
    commentator
    |> cast(params, @fields)
    |> validate_required([:participant_id])
  end

  def fields, do: @fields
end

defimpl Jason.Encoder, for: [GraphicsAPI.Runs.Commentator] do
  def encode(%{__struct__: _} = struct, options) do
    struct
    |> Map.from_struct()
    |> Map.take(GraphicsAPI.Runs.Commentator.fields())
    |> Jason.Encode.map(options)
  end
end

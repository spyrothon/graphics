defmodule GraphicsAPI.Runs.Runner do
  use Ecto.Schema
  import Ecto.Changeset

  alias GraphicsAPI.Users

  @fields [
    :id,
    :visible,
    :display_name,

    # Offloading data
    :participant_id,

    # Run Fields
    :finished_at,
    :actual_seconds,

    # Video ingest
    :gameplay_ingest_url,
    :gameplay_crop_transform,
    :webcam_ingest_url,
    :webcam_crop_transform
  ]

  @timing_fields [
    :finished_at,
    :actual_seconds
  ]

  embedded_schema do
    field(:visible, :boolean, default: true)
    # An override of the participant's display name for a specific run
    field(:display_name, :string)

    belongs_to(:participant, Users.Participant)

    # Run Fields
    field(:actual_seconds, :integer)
    field(:finished_at, :utc_datetime)

    # Video Ingest
    field(:gameplay_ingest_url, :string)
    field(:gameplay_crop_transform, :map)
    field(:webcam_ingest_url, :string)
    field(:webcam_crop_transform, :map)
  end

  def changeset(participant, params \\ %{}) do
    participant
    |> cast(params, @fields)
    |> validate_required([:participant_id])
  end

  def timing_changeset(participant, params \\ %{}) do
    participant
    |> cast(params, @timing_fields)
  end

  def fields, do: @fields ++ [:participant]
end

defimpl Jason.Encoder, for: [GraphicsAPI.Runs.Runner] do
  def encode(%{__struct__: _} = struct, options) do
    struct
    |> Map.from_struct()
    |> Map.take(GraphicsAPI.Runs.Runner.fields())
    |> Jason.Encode.map(options)
  end
end

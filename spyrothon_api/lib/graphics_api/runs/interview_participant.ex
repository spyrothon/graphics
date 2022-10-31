defmodule GraphicsAPI.Runs.InterviewParticipant do
  use Ecto.Schema
  import Ecto.Changeset

  alias GraphicsAPI.Users

  @fields [
    :id,
    :visible,
    :webcam_visible,
    :display_name,
    :score,

    # Offloading data
    :participant_id,
    :video_ingest_url,
    :video_crop_transform
  ]

  embedded_schema do
    field(:visible, :boolean, default: true)
    field(:webcam_visible, :boolean, default: false)
    # An override of the participant's display name for a specific interview
    field(:display_name, :string)

    field(:score, :integer, default: 0)

    field(:video_ingest_url, :string)
    field(:video_crop_transform, :map)

    belongs_to(:participant, Users.Participant)
  end

  def changeset(participant, params \\ %{}) do
    participant
    |> cast(params, @fields)
    |> validate_required([:participant_id])
  end

  def fields, do: @fields
end

defimpl Jason.Encoder, for: [GraphicsAPI.Runs.InterviewParticipant] do
  def encode(%{__struct__: _} = struct, options) do
    struct
    |> Map.from_struct()
    |> Map.take(GraphicsAPI.Runs.InterviewParticipant.fields())
    |> Jason.Encode.map(options)
  end
end

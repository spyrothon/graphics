defmodule GraphicsAPI.Users.Participant do
  use Ecto.Schema
  import Ecto.Changeset

  @fields [
    :id,
    :user_id,
    :display_name,
    :twitch_name,
    :twitter_name,
    :pronouns,
    :has_webcam
  ]

  @required_fields [
    :display_name
  ]

  @derive {Jason.Encoder, only: @fields}
  schema "users_participants" do
    belongs_to(:user, GraphicsAPI.Users.User)

    field(:display_name, :string)
    field(:twitch_name, :string)
    field(:twitter_name, :string)
    field(:pronouns, :string)
    field(:pronouns_visible, :boolean, default: true)

    field(:has_webcam, :boolean, default: false)

    timestamps()
  end

  def changeset(participant, params \\ %{}) do
    participant
    |> cast(params, @fields)
    |> validate_required(@required_fields)
  end

  def fields, do: @fields
end

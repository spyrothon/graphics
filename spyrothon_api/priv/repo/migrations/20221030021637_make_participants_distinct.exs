defmodule GraphicsAPI.Repo.Migrations.MakeParticipantsDistinct do
  use Ecto.Migration

  def change do
    create table(:users_participants) do
      add(:user_id, references(:users_users))

      # Display information
      add(:display_name, :string)
      add(:twitch_name, :string)
      add(:twitter_name, :string)
      add(:pronouns, :string)
      add(:pronouns_visible, :boolean, default: true)
      add(:has_webcam, :boolean, default: false)

      timestamps()
    end
  end
end

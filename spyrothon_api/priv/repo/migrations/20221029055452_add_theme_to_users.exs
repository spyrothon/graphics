defmodule GraphicsAPI.Repo.Migrations.AddThemeToUsers do
  use Ecto.Migration

  def change do
    alter table(:users_users) do
      add(:theme, :string)
    end
  end
end

defmodule GraphicsAPIWeb.AuthController do
  use GraphicsAPIWeb.APIController

  alias GraphicsAPI.Users

  get "/me" do
    case Map.get(conn.assigns, :current_user) do
      nil -> not_found(conn)
      current_user -> json(conn, current_user)
    end
  end

  put "/me" do
    user_params = conn.body_params
    assigns = conn.assigns

    with %{current_user: user} <- assigns,
         {:ok, user} <- Users.update_user(user, user_params) do
      json(conn, user)
    else
      ^assigns ->
        conn |> send_resp(401, "")

      ^user_params ->
        params_error(conn)

      {:error, "invalid password"} ->
        not_authorized(conn)

      {:error, changeset} ->
        conn
        |> changeset_error(changeset)
    end
  end

  post "/login" do
    with {:ok, %{name: name, password: password}} <-
           Tarams.cast(conn.body_params, %{name: :string, password: :string}),
         user = %Users.User{} <- Users.get_user_by_name(name),
         {:ok, user} <- Users.verify_password(user, password),
         {:ok, token} <- Users.create_session(user) do
      json(conn, %{token: token})
    else
      nil -> not_found(conn)
      {:error, "invalid password"} -> not_authorized(conn)
      {:error, _bad_params} -> params_error(conn)
    end
  end

  delete "/logout" do
    no_content(conn)
  end
end

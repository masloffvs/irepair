export type CallbackAction =
  | "search_app"
  | "support"
  | "install_app"
  | "confirm_install"
  | "cancel_install"
  | `select_app_${string}`;

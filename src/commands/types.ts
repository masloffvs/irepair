import type { Middleware } from "telegraf";

export interface Command {
  name: string;
  description: string;
  handler: Middleware;
}

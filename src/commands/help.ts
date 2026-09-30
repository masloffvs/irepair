import { Context } from "telegraf";
import { logger } from "../logger.js";
import type { Command } from "./types.js";

export const helpCommand: Command = {
  name: "help",
  description: "Show available commands",
  handler: (ctx: Context) => {
    logger.info("Help command triggered");
    ctx.reply(
      "Available commands:\n" +
        "/start - Start the bot\n" +
        "/help - Show this help message"
    );
  },
};

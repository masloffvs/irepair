import { Telegraf } from "telegraf";
import { logger } from "./logger.js";

export class Bot {
  private bot: Telegraf;

  constructor(token: string) {
    this.bot = new Telegraf(token);
  }

  public start(): void {
    this.bot.launch();
    logger.info("Bot started");
  }

  public stop(): void {
    this.bot.stop();
    logger.info("Bot stopped");
  }

  public getBot(): Telegraf {
    return this.bot;
  }
}

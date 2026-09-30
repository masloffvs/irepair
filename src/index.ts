import { Bot } from "./bot.js";
import { loadConfig } from "./config.js";
import { logger } from "./logger.js";
import { startCommand } from "./commands/start.js";
import { helpCommand } from "./commands/help.js";
import {
  handleCallback,
  handleSelectApp,
} from "./commands/callbackHandlers.js";
import { handleSearch } from "./commands/search.js";

const config = loadConfig();
logger.info("Config loaded");

const bot = new Bot(config.token);

const telegramBot = bot.getBot();

telegramBot.command(startCommand.name, startCommand.handler);
telegramBot.command(helpCommand.name, helpCommand.handler);

telegramBot.on("text", handleSearch);

telegramBot.action("search_app", handleCallback("search_app"));
telegramBot.action("support", handleCallback("support"));
telegramBot.action("install_app", handleCallback("install_app"));
telegramBot.action("confirm_install", handleCallback("confirm_install"));
telegramBot.action("cancel_install", handleCallback("cancel_install"));
telegramBot.action(/select_app_.+/, handleSelectApp);

logger.info("Commands and callbacks registered");
bot.start();

import { Context } from "telegraf";
import { logger } from "../logger.js";
import { searchApp } from "./database.js";
import { Markup } from "telegraf";

export const handleSearch = (ctx: Context) => {
  const text = ctx.message?.text;
  if (!text) return;

  if (text.startsWith("/")) return;

  logger.info(`Search query: ${text}`);

  const app = searchApp(text);

  if (app) {
    const message = `${app.icon} ${app.name}\nКатегория: ${app.category}`;

    const keyboard = Markup.inlineKeyboard([
      [Markup.button.callback("📥 Установить", "install_app")],
    ]);

    ctx.reply(message, keyboard);
  } else {
    ctx.reply(
      "😔 Такого приложения пока нет в базе, но ты можешь запросить его добавление у поддержки"
    );
  }
};

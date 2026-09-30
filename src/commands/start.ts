import { Context } from "telegraf";
import { logger } from "../logger.js";
import type { Command } from "./types.js";
import { Markup } from "telegraf";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const startCommand: Command = {
  name: "start",
  description: "Start the bot",
  handler: async (ctx: Context) => {
    logger.info("Start command triggered");

    const message =
      "👋 Привет! Нужен СберБанк, Альфа, Тинькофф, VK, Госуслуги или другое приложение, которое пропало из App Store?\n\n" +
      "Вернем любые удаленные приложения на твой iPhone за пару минут. Без компьютера, джейлбрейка и сложных настроек — скачивай официально через историю покупок.";

    const keyboard = Markup.inlineKeyboard([
      [Markup.button.callback("🔍 Найти мое приложение", "search_app")],
      [Markup.button.callback("💬 Поддержка", "support")],
    ]);

    const photoPath = join(__dirname, "../../res/start.jpg");

    try {
      const file = Bun.file(photoPath);
      const buffer = await file.arrayBuffer();
      const sendPhotoPromise = ctx.sendPhoto(
        { source: Buffer.from(buffer) },
        { caption: message, ...keyboard }
      );
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 3000)
      );
      await Promise.race([sendPhotoPromise, timeoutPromise]);
    } catch (error) {
      console.error("Failed to send photo:", error);
      ctx.reply(message, keyboard);
    }
  },
};

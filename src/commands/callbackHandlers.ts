import { Context } from "telegraf";
import { logger } from "../logger.js";
import type { CallbackAction } from "./callbacks.js";
import { appsDatabase, type App } from "./database.js";
import { Markup } from "telegraf";

export const handleCallback = (action: CallbackAction) => {
  return (ctx: Context) => {
    logger.info(`Callback triggered: ${action}`);

    switch (action) {
      case "search_app":
        showAppSuggestions(ctx);
        break;
      case "support":
        ctx.reply("💬 Для связи с поддержкой напишите @admin");
        break;
      case "install_app":
        showInstallConditions(ctx);
        break;
      case "confirm_install":
        ctx.reply("✅ Отлично! Данные для входа отправлены в личные сообщения.");
        break;
      case "cancel_install":
        ctx.reply("❌ Установка отменена.");
        break;
    }
  };
};

export const handleSelectApp = (ctx: Context) => {
  const callbackData = ctx.callbackQuery?.data;
  if (!callbackData) return;

  const appId = callbackData.replace("select_app_", "");
  const app = appsDatabase.find((a) => a.id === appId);

  if (app) {
    showAppCard(ctx, app);
  }
};

const showAppSuggestions = (ctx: Context) => {
  const message = "🔍 Выберите приложение из списка или введите название для поиска:";

  const keyboard = {
    reply_markup: {
      inline_keyboard: appsDatabase.map((app) => [
        { text: `${app.icon} ${app.name}`, callback_data: `select_app_${app.id}` },
      ]),
    },
  };

  ctx.reply(message, keyboard);
};

const showAppCard = (ctx: Context, app: App) => {
  const message = `${app.icon} ${app.name}\nКатегория: ${app.category}`;

  const keyboard = Markup.inlineKeyboard([
    [Markup.button.callback("📥 Установить", "install_app")],
  ]);

  ctx.reply(message, keyboard);
};

const showInstallConditions = (ctx: Context) => {
  const message =
    "⚠️ Как это работает: Мы дадим тебе данные временного App Store аккаунта. Тебе нужно зайти под ним только в App Store (НЕ в настройки телефона!), скачать приложение, а затем выйти. Твои личные данные в безопасности.";

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Понятно, продолжить", callback_data: "confirm_install" },
        ],
        [{ text: "❌ Отмена", callback_data: "cancel_install" }],
      ],
    },
  };

  ctx.reply(message, keyboard);
};

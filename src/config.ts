export interface BotConfig {
  token: string;
}

export const loadConfig = (): BotConfig => {
  const token = process.env.BOT_TOKEN;

  if (!token) {
    throw new Error("BOT_TOKEN is not set in environment variables");
  }

  return { token };
};

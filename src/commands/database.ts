export interface App {
  id: string;
  name: string;
  category: string;
  icon: string;
}

export const appsDatabase: App[] = [
  {
    id: "1",
    name: "СберБанк",
    category: "Финансы",
    icon: "🏦",
  },
  {
    id: "2",
    name: "Альфа-Банк",
    category: "Финансы",
    icon: "🔴",
  },
  {
    id: "3",
    name: "Тинькофф",
    category: "Финансы",
    icon: "🟢",
  },
  {
    id: "4",
    name: "VK",
    category: "Социальные сети",
    icon: "💬",
  },
  {
    id: "5",
    name: "Госуслуги",
    category: "Государственные",
    icon: "🏛️",
  },
  {
    id: "6",
    name: "Кинопоиск",
    category: "Развлечения",
    icon: "🎬",
  },
];

export const searchApp = (query: string): App | null => {
  const lowerQuery = query.toLowerCase();
  return (
    appsDatabase.find(
      (app) => app.name.toLowerCase().includes(lowerQuery)
    ) || null
  );
};

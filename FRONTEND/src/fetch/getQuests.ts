import { Quest } from "../types/quest";

export async function getQuests(): Promise<Quest[]> {
  const response = await fetch('/questList.json');
  // console.log(response.json);
  return response.json();
}

export async function getQuestsWithIds(): Promise<Quest[]> {
  const response = await fetch('/quests.json');
  // console.log(response.json);
  return response.json();
}

// export async function getQuestsWithIds(questIds: string[]): Promise<Quest[]> {
//   const response = await fetch('/questsWithId.json');
//   const quests: Quest[] = await response.json();

//   // Фильтруем квесты, оставляя только те, чьи id совпадают с теми, что переданы в questIds
//   const filteredQuests = quests.filter(quest => {
//     if (quest.id) questIds.includes(quest.id);
//   });

//   return filteredQuests;
// }

// const API_URL = 'https://your-api.com/quests'; // Замініть на свій API

// export const getQuestById = async (questId: string) => {
//   try {
//     const response = await fetch(`${API_URL}/${questId}`);
    
//     if (!response.ok) {
//       throw new Error(`Помилка отримання квесту: ${response.statusText}`);
//     }
    
//     const quest = await response.json();
//     return quest;
//   } catch (error) {
//     console.error('Помилка при отриманні квесту:', error);
//     return null;
//   }
// };

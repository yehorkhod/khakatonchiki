import { Quest, QuestInfoType } from '../types/quest';

export type TEST = {
  id: number;
  rating: string
  title: string;
}

export async function getQuests(): Promise<TEST[]> {
  const response = await fetch('http://localhost:8000/api/quests/top', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    });
  console.log(response);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText} blaaaa`);
  }
  const data = await response.json();
  console.log('Quests Info:', data);
  return data.top_quests;
}
// export async function getQuests(): Promise<Quest[]> {
//   const response = await fetch('/questList.json');
//   // console.log(response.json);
//   return response.json();
// }

export async function getQuestsWithIds(): Promise<Quest[]> {
  const response = await fetch('/quests.json');
  // console.log(response.json);
  return response.json();
}

export async function getQuestInfoById(
  questId: string,
): Promise<QuestInfoType> {
  const response = await fetch('http://localhost:8000/api/get_quest_info', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quest_id: questId }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  console.log('Quest Info:', data);
  return data;
}

// export async function Register(): Promise<any> {
//   const response = await fetch('http://localhost:8000/api/auth/register');
//   return response.json();
// }

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

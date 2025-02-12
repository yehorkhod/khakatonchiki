import { Quest, QuestInfoType } from '../types/quest';

export type TEST = {
  id: number;
  rating: string
  title: string;
}

export type getQuestsType = {
  author: string;
  author_id: string;
  description: string; 
  duration: string | null;
  id: number;
  number_of_tasks: number;
  rating: string;
  title: string;
}


export async function getQuests(): Promise<getQuestsType[]> {
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

export type getQuestInfoByIdType = {
  author: string;
  author_id: string;
  description: string; 
  duration: string | null;
  id: number;
  number_of_tasks: number;
  rating: string;
  title: string;
  comments: CommentType[] | [];

}

export type CommentType = {
  id: string;
  text: string;
  user_id: string;
  username: string;
}


export async function getQuestInfoById(
  questId: string,
): Promise<getQuestInfoByIdType> {
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

type getTasksType = {

}

export const getTasks = async (questId: string) => {
  try {
    const response = await fetch('http://localhost:8000/api/get_tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quest_id: questId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const finishQuest = async (questId: string): Promise<{ message: string } | null> => {
  try {
    const response = await fetch('/api/finish_quest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Додаємо токен авторизації
      },
      body: JSON.stringify({ quest_id: questId }),
    });

    if (!response.ok) {
      throw new Error(`Помилка: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Помилка завершення квесту:', error);
    return null;
  }
};


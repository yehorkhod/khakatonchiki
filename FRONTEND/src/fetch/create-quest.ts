import { Question } from "../types/quest";

type dataType = {
  title: string;
  description: string;
  duration: string;
  // tasks: Question[];
}

export async function createQuest(data: dataType, questions: Question[]) {
  const questData = {
    title: data.title,
    description: data.description,
    // duration: data.duration,
    tasks: questions,
  };

  console.log('Sending data:', JSON.stringify(questData, null, 2));

  const response = await fetch('http://localhost:8000/api/create_quest', {
    method: 'POST',
    credentials: 'include', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questData),
  });
  console.log('Server response:', response);

  if (!response.ok) {
    throw new Error('something went wrongggggg')
  }

  console.log(response);

  return response.json();
}
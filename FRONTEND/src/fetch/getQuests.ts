import { Quest } from "../types/quest";

export async function getQuests(): Promise<Quest[]> {
  const response = await fetch('/questList.json');
  // console.log(response.json);
  return response.json();
}


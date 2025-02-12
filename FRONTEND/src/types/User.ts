// type createdQuest = {
//   questId: string;
//   title: string;
// }
// type completedQuest = {
//   questId: string;
//   title: string;
// }

import { Quest } from "./quest";

export type User = {
  id?: string;
  username: string;
  email: string;
  rating?: "4.5";
  user_image: string;
  created_quests: Quest[];
  completed_quests: Quest[];
};

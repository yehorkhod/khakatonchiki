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
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  createdQuests: Quest[];
  completedQuests: Quest[];
};

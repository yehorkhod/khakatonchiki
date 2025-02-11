type createdQuest = {
  questId: string;
  title: string;
}
type completedQuest = {
  questId: string;
  title: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  createdQuests: createdQuest[];
  completedQuests: completedQuest[];
};

export type Quest = {
  id?: string;
  title: string;
  description: string;
  taskCount: number;
  timeLimit: number;
  media: MediaItem[];
  questions: Question[];
  rating: number;
  feedback: Feedback[];
}

type MediaItem = {
  type: "text" | "image" | "video";
  content: string;
};

type Feedback = {
  user: string;
  rating: number;
  comment: string;
};

type Media = {
  media: string;
};

export type Question = {
  text: string;
  type: string;
  options: string[];
  rightAnswer: string;
  media: string;
};

export type QuestInfoType = {
  id: string,
  title: string,
  author_id: string,
  number_of_tasks: string,
}

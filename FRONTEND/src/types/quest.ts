export type Quest = {
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

type Question = {
  type: "open" | "multipleChoice";
  question: string;
  options?: string[]; // Опціонально, для множинного вибору
};

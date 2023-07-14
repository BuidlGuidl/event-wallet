export type QuestionOption = {
  text: string;
  ok: boolean;
};

export type Question = {
  id: number;
  question: string;
  value: number;
  options: QuestionOption[];
};

export type QuestionsLeaderboard = {
  address: string;
  score: number;
};

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

export type UserData = {
  checkin: string;
  // "question:i": number;
  score: number;
};

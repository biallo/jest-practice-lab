export type CodeExample = {
  title: string;
  language: "typescript" | "bash";
  code: string;
  focusLines: number[];
};

export type ReviewItem = {
  question: string;
  answer: string;
};

export type Lesson = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
  examples: CodeExample[];
  reviews: ReviewItem[];
};

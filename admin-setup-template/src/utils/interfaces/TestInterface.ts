export interface TestQuestion {
  id: number;
  question: string;
  isActive: boolean;
  mark: number;
  negativeMark: number;
  level: {
    id: number;
    name: string;
  };
}

export interface TestType {
  id: number;
  title: string;
  perQuestionMark: number;
  perQuestionNegativeMark: number;
  isNegative: boolean;
  level: number;
  testType: number;
  organisationId: number;
  attemptTime: number;
  maxQuestions: number;
  maxAttempt: number;
  isAttempted: boolean | null;
  testQuestions: TestQuestion[];
}

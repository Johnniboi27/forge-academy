export type CourseCategory =
  | "Mathematics for Engineers"
  | "Physics for Engineers"
  | "Mechanical Engineering Core";

export type Difficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "University Level";

export type PracticeType =
  | "concept"
  | "calculation"
  | "unit-conversion"
  | "free-body"
  | "design-scenario"
  | "challenge";

export type ProblemResponse =
  | {
      kind: "multiple-choice";
      options: string[];
      correctOption: string;
    }
  | {
      kind: "numeric";
      value: number;
      tolerance: number;
      unit?: string;
    }
  | {
      kind: "vector";
      values: Record<string, number>;
      tolerance: number;
      unit?: string;
    };

export interface PracticeProblem {
  id: string;
  type: PracticeType;
  question: string;
  response: ProblemResponse;
  hint: string;
  solution: string;
  explanation: string;
  topic: string;
}

export interface WorkedExample {
  title: string;
  problem: string;
  steps: string[];
  conclusion: string;
}

export interface Lecture {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  category: CourseCategory;
  moduleId: string;
  moduleTitle: string;
  estimatedMinutes: number;
  writtenExplanation: string[];
  keyEquations: string[];
  applications: string[];
  workedExamples: WorkedExample[];
  diagramPrompt: string;
  importantConcept: string;
  commonMistake: string;
  engineersNote: string;
  practice: PracticeProblem[];
}

export interface CourseModule {
  id: string;
  title: string;
  lectures: Lecture[];
}

export interface SourceMaterial {
  id: string;
  provider: "MIT OpenCourseWare";
  courseNumber: string;
  title: string;
  url: string;
  license: string;
  resourceTypes: string[];
  note: string;
}

export interface SourceMaterialWithCourses extends SourceMaterial {
  forgeCourses: string[];
}

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  difficulty: Difficulty;
  description: string;
  prerequisites: string[];
  outcomes: string[];
  modules: CourseModule[];
  sourceMaterials: SourceMaterial[];
}

export interface Formula {
  id: string;
  name: string;
  category: string;
  equation: string;
  variables: string[];
  unitNotes: string;
  exampleUseCase: string;
}

export interface Note {
  id: string;
  lectureId: string;
  body: string;
  updatedAt: string;
}

export interface PracticeResult {
  lectureId: string;
  score: number;
  total: number;
  mastered: boolean;
  attemptedAt: string;
  missedProblemIds: string[];
}

export interface ProgressState {
  completedLectures: string[];
  practiceResults: Record<string, PracticeResult>;
  notes: Record<string, Note[]>;
  lastOpenedCourse?: string;
  streak: {
    count: number;
    lastPracticeDate?: string;
  };
}

export interface LearnerProfile {
  id: string;
  name: string;
  email?: string;
  createdAt: string;
  lastLoginAt: string;
}

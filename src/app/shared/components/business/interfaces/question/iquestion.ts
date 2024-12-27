export interface Answer {
    answer: string;
    key: string;
  }
  
  export interface Subject {
    _id: string;
    name: string;
    icon: string;
    createdAt: string; // ISO date string
  }
  
  export interface Exam {
    _id: string;
    title: string;
    duration: number; // in minutes
    subject: string; // ObjectId string
    numberOfQuestions: number;
    active: boolean;
    createdAt: string; // ISO date string
  }
  
  export interface IQuestion {
    answers: Answer[];
    type: string; // e.g., "single_choice"
    _id: string;
    question: string;
    correct: string; // key of the correct answer
    subject: Subject;
    exam: Exam;
    createdAt: string; // ISO date string
  }
  
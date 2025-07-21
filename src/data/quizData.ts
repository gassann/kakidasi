import questionsData from './questions.json';

export interface QuizQuestion {
  id: number;
  text: string;
  level: string;
  options: string[];
  correctAnswer: string;
  author: string;
}

export const quizQuestions: QuizQuestion[] = questionsData.questions;

export const getRandomOptionsFromLevel = (
  question: QuizQuestion,
  allQuestions: QuizQuestion[],
  count: number = 4,
  forceAuthorMode: boolean = false
): string[] => {
  // Get all titles from the same level or author except the correct answer
  const levelQuestions = allQuestions
    .filter(q => {
      if (forceAuthorMode || question.author) {
        return q.author === question.author;
      }
      return q.level === question.level;
    });
  
  // Get all available options (unique only)
  const availableOptions = levelQuestions
    .map(q => q.correctAnswer)
    .filter(answer => answer !== question.correctAnswer);

  // Remove duplicates
  const uniqueOptions = [...new Set(availableOptions)];

  // If we don't have enough unique options, fill with remaining questions from all levels
  let finalOptions = uniqueOptions;
  if (finalOptions.length < count - 1) {
    const allOtherAnswers = allQuestions
      .map(q => q.correctAnswer)
      .filter(answer => answer !== question.correctAnswer && !finalOptions.includes(answer));
    
    finalOptions = [...finalOptions, ...allOtherAnswers];
  }

  // Shuffle and get random options (ensuring no duplicates)
  const randomOptions = [...new Set(finalOptions)]
    .sort(() => Math.random() - 0.5)
    .slice(0, count - 1);
  
  // Add correct answer and shuffle again
  return [...randomOptions, question.correctAnswer].sort(() => Math.random() - 0.5);
};
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QuizQuestion, quizQuestions, getRandomOptionsFromLevel } from '../data/quizData';
import VerticalText from './VerticalText';
import { Home } from 'lucide-react';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, value } = location.state || {};
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedCharacters, setDisplayedCharacters] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalCharactersRead, setTotalCharactersRead] = useState(0);
  const [isRevealing, setIsRevealing] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset all state when starting a new quiz
    setCurrentQuestionIndex(0);
    setDisplayedCharacters(0);
    setSelectedAnswer(null);
    setScore(0);
    setTotalCharactersRead(0);
    setIsRevealing(true);
    setShowFeedback(false);
    
    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    startTimeRef.current = null;
    
    // Randomly select 10 questions
    const filteredQuestions = type === 'author'
      ? quizQuestions.filter(q => q.author && q.author.trim() === value)
      : quizQuestions.filter(q => {
          switch (value) {
            case 'easy':
              return q.level === 'easy';
            case 'medium':
              return q.level === 'middle';
            case 'hard':
              return q.level === 'high';
            default:
              return false;
          }
        });
    
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
  }, [type, value]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      const options = getRandomOptionsFromLevel(currentQuestion, quizQuestions, 4, type === 'author');
      setCurrentOptions(options);
    }
  }, [currentQuestion]);

  const maxDisplayLength = 200;

  useEffect(() => {
    if (!currentQuestion || !isRevealing) {
      return;
    }

    const targetLength = Math.min(currentQuestion.text.length, maxDisplayLength);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      // iOS用: requestAnimationFrameベースの滑らかなアニメーション
      let startTime: number | null = null;
      const duration = targetLength * 60; // 60ms per character
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentChars = Math.floor(progress * targetLength);
        
        setDisplayedCharacters(currentChars);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      const animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    } else {
      // 全ブラウザ統一: setInterval方式
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      const interval = isMobile ? 80 : isSafari ? 100 : 150;
      
      const timer = setInterval(() => {
        setDisplayedCharacters(prev => {
          if (prev >= targetLength) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isRevealing, currentQuestion?.id]);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer !== null || !currentQuestion) return;
    
    setIsRevealing(false);
    setSelectedAnswer(answer);
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    const newScore = score + (isCorrect ? 1 : 0);
    const newTotalChars = totalCharactersRead + displayedCharacters;
    
    if (isCorrect) {
      setScore(newScore);
    }
    setTotalCharactersRead(newTotalChars);
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        // Move to next question
        setCurrentQuestionIndex(prev => prev + 1);
        setDisplayedCharacters(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setIsRevealing(true);
        // Reset animation timer for next question
        startTimeRef.current = null;
      } else {
        // Quiz completed - navigate to results
        navigate('/results', { 
          state: { 
            score: newScore,
            totalQuestions: questions.length,
            totalCharactersRead: newTotalChars,
            quizType: type,
            quizValue: value
          }
        });
      }
    }, 2000);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#f5f2e9] text-[#2d2d2d] font-serif bg-pattern flex flex-col">
      <div className="w-full bg-[#e0d9c5] h-2 fixed top-0 left-0">
        <div 
          className="h-full bg-[#8b7d6b] transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 w-full flex-grow flex flex-col">
        <header className="mb-1 text-center">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 text-[#8b7d6b] hover:bg-[#e0d9c5] rounded-full transition-all"
            >
              <Home size={18} />
              <span className="text-sm">トップへ</span>
            </button>
            <h2 className="text-lg text-[#8b7d6b]">問題 {currentQuestionIndex + 1}/10</h2>
            <div className="w-[90px]"></div>
          </div>
        </header>

        {questions.length > 0 && currentQuestion && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-4 flex items-center justify-center h-[60vh]">
              <VerticalText 
                text={currentQuestion.text.substring(0, displayedCharacters) || ''}
                className="h-full"
              />
            </div>
            
            <div className="flex flex-col">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                {currentOptions.map((option, index) => (
                  <button
                    key={`${currentQuestionIndex}-${index}`}
                    onClick={() => handleAnswerSelect(option)}
                    onTouchEnd={(e) => e.currentTarget.blur()}
                    disabled={selectedAnswer !== null}
                    className={`w-full py-2 px-4 rounded-lg text-sm transition-all flex items-center justify-center min-h-[36px] focus:outline-none ${
                      selectedAnswer === null 
                        ? 'bg-white hover:bg-[#e0d9c5] text-[#2d2d2d]' 
                        : selectedAnswer === option
                          ? option === currentQuestion.correctAnswer
                            ? 'bg-green-100 border-2 border-green-500 text-green-800'
                            : 'bg-red-100 border-2 border-red-500 text-red-800'
                          : option === currentQuestion.correctAnswer && showFeedback
                            ? 'bg-green-100 border-2 border-green-500 text-green-800'
                            : 'bg-white text-[#2d2d2d] opacity-70'
                    } shadow-md`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <div className="text-center min-h-[60px] mt-6">
                {showFeedback && (
                  <>
                    <p className="text-lg">
                      {selectedAnswer === currentQuestion.correctAnswer 
                        ? '正解！' 
                        : '不正解'}
                    </p>
                    <p className="mt-1 text-sm">読んだ文字数: {displayedCharacters}文字</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
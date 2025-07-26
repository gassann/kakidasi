import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { getLiteraryTitle } from '../data/titleData';

interface ResultsState {
  score: number;
  totalQuestions: number;
  totalCharactersRead: number;
  quizType?: string;
  quizValue?: string;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    score = 0, 
    totalQuestions = 10, 
    totalCharactersRead = 0,
    quizType,
    quizValue
  } = 
    (location.state as ResultsState) || {};
  
  const accuracy = (score / totalQuestions) * 100;
  const averageCharsPerQuestion = Math.round(totalCharactersRead / totalQuestions);
  
  const { title, description } = getLiteraryTitle(score);

  return (
    <div className="min-h-screen bg-[#f5f2e9] text-[#2d2d2d] font-serif bg-pattern">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12 relative py-8">
          <h1 className="text-4xl mb-4 text-shadow tracking-wider">結果発表</h1>
          <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#8b7d6b] to-transparent"></div>
        </header>
        
        <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
          <h2 className="text-center mb-8 text-[#4a3f35]">
            <span className="text-2xl block mb-2">あなたは</span>
            <span className="text-3xl block">
            <br />
            「{title}」
            </span>
          </h2>
          <p className="text-center text-lg mb-12 text-[#8b7d6b] italic">{description}</p>
          
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#f5f2e9] p-6 rounded-lg text-center">
                <p className="text-sm uppercase tracking-wider text-[#8b7d6b]">正解率</p>
                <p className="text-3xl font-bold">{accuracy.toFixed(1)}%</p>
              </div>
              
              <div className="bg-[#f5f2e9] p-6 rounded-lg text-center">
                <p className="text-sm uppercase tracking-wider text-[#8b7d6b]">総読字数</p>
                <p className="text-3xl font-bold">{totalCharactersRead}字</p>
              </div>
              
              <div className="bg-[#f5f2e9] p-6 rounded-lg text-center">
                <p className="text-sm uppercase tracking-wider text-[#8b7d6b]">平均読字数</p>
                <p className="text-3xl font-bold">{averageCharsPerQuestion}字/問</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/quiz', { state: { type: quizType, value: quizValue } })}
              className="px-6 py-3 bg-[#8b7d6b] text-white rounded-full transition-all hover:bg-[#6a5d4b] flex items-center"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              もう一度挑戦する
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 border-2 border-[#8b7d6b] text-[#8b7d6b] rounded-full transition-all hover:bg-[#e0d9c5]"
            >
              トップページへ戻る
            </button>
          </div>
        </div>
        
        <div className="text-center text-[#8b7d6b] text-2xl mb-12">☙ ❧</div>
        
        <footer className="text-center py-8 text-[#8b7d6b] text-sm relative">
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#8b7d6b] to-transparent"></div>
          <p>© 2025 文豪の一行 - すべての文学作品の著作権は各出版社・著者に帰属します</p>
        </footer>
      </div>
    </div>
  );
};

export default ResultsPage;
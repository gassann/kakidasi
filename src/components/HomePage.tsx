import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const startQuiz = (type: string, value?: string) => {
    navigate('/quiz', { state: { type, value } });
  };

  return (
    <div className="min-h-screen bg-[#f5f2e9] text-[#2d2d2d] font-serif bg-pattern">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12 relative py-8">
          <h1 className="text-4xl md:text-5xl mb-4 text-shadow tracking-wider">書き出しクイズ</h1>
          <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#8b7d6b] to-transparent"></div>
          <div className="mt-12 max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 relative">
            <div className="text-xl leading-loose tracking-wider max-w-3xl mx-auto">
              『きょう、ママンが死んだ。もしかすると、昨日かもしれないが。』
            </div>
            <div className="mt-6 text-right">
              <p className="text-[#8b7d6b] text-lg">この作品は？</p>
            </div>
          </div>
        </header>

        <p className="text-lg max-w-3xl mx-auto mb-16 text-center leading-relaxed relative">
          あの名作の冒頭、覚えていますか？<br />
          文豪たちの魂が宿る書き出しから作品を当てる文学クイズに挑戦しましょう。<br />
          あなたの文学知識が試される時です。
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Level-based Quiz */}
          <div className="bg-white rounded-lg shadow-xl p-8 transform transition-all hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-[#8b7d6b] mr-4" />
              <h2 className="text-3xl text-[#4a3f35]">レベル別</h2>
            </div>
            <p className="text-center mb-8 leading-relaxed">
              あなたの文学知識のレベルに合わせて挑戦できます。<br />
              初心者から文学通まで、どなたでもお楽しみいただけます。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => startQuiz('level', 'easy')}
                className="px-6 py-2 bg-[#e3daca] text-[#4a3f35] rounded-full transition-all hover:bg-[#d1c7b0]"
              >
                初級
              </button>
              <button
                onClick={() => startQuiz('level', 'medium')}
                className="px-6 py-2 bg-[#e3daca] text-[#4a3f35] rounded-full transition-all hover:bg-[#d1c7b0]"
              >
                中級
              </button>
              <button
                onClick={() => startQuiz('level', 'hard')}
                className="px-6 py-2 bg-[#e3daca] text-[#4a3f35] rounded-full transition-all hover:bg-[#d1c7b0]"
              >
                上級
              </button>
            </div>
          </div>

          {/* Author-based Quiz */}
          <div className="bg-white rounded-lg shadow-xl p-8 transform transition-all hover:scale-[1.02] hover:shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-[#8b7d6b] mr-4" />
              <h2 className="text-3xl text-[#4a3f35]">文豪別</h2>
            </div>
            <p className="text-center mb-8 leading-relaxed">
              好きな作家の作品だけに特化したクイズに挑戦できます。<br />
              あなたの推し文豪は誰ですか？
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
              <button
                onClick={() => startQuiz('author', '芥川竜之介')}
                className="px-6 py-2 bg-[#e3daca] text-[#4a3f35] rounded-full transition-all hover:bg-[#d1c7b0]"
              >
                芥川竜之介
              </button>
              <button
                onClick={() => startQuiz('author', '太宰治')}
                className="px-6 py-2 bg-[#e3daca] text-[#4a3f35] rounded-full transition-all hover:bg-[#d1c7b0]"
              >
                太宰治
              </button>
              <button
                onClick={() => startQuiz('author', '夏目漱石')}
                className="px-6 py-2 bg-[#e3daca] text-[#4a3f35] rounded-full transition-all hover:bg-[#d1c7b0]"
              >
                夏目漱石
              </button>
            </div>
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

export default HomePage;
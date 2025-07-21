import titlesData from './titles.json';

interface Title {
  title: string;
  description: string;
}

interface TitleGroup {
  score: number;
  titles: Title[];
}

export interface LiteraryTitle {
  title: string;
  description: string;
}

export const getLiteraryTitle = (score: number): LiteraryTitle => {
  const titleGroup = titlesData.titles.find(group => group.score === score) || 
                    titlesData.titles.find(group => group.score === 0)!;
  
  const randomIndex = Math.floor(Math.random() * titleGroup.titles.length);
  return titleGroup.titles[randomIndex];
};
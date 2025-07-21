import React from 'react';

interface VerticalTextProps {
  text: string;
  className?: string;
}

const VerticalText: React.FC<VerticalTextProps> = ({ text, className }) => {
  return (
    <div 
      className={`writing-vertical overflow-hidden ${className}`}
      style={{
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
        fontSize: '1.1rem',
        lineHeight: '1.8',
        letterSpacing: '0.1em',
        padding: '0.75rem',
        overflowX: 'hidden',
        overflowY: 'hidden',
        fontFamily: "'Noto Serif JP', serif",
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'relative',
        top: 0,
        right: 0
      }}
    >
      {text}
    </div>
  );
};

export default VerticalText;
import React from 'react';

interface CubeFaceProps {
  squares: string[];
  className?: string;
}

const CubeFace: React.FC<CubeFaceProps> = ({ squares, className = '' }) => {
  return (
    <div className={`cube-face ${className}`}>
      <div className="face-grid">
        {squares.map((color, index) => (
          <div
            key={index}
            className={`face-square ${color}`}
            style={{
              backgroundColor: getColorValue(color),
            }}
          />
        ))}
      </div>
    </div>
  );
};

const getColorValue = (color: string): string => {
  const colors: { [key: string]: string } = {
    W: '#ffffff', // White
    Y: '#ffd500', // Yellow
    R: '#ff0000', // Red
    O: '#ff8c00', // Orange
    B: '#0000ff', // Blue
    G: '#00ff00', // Green
    X: '#2a2a2a', // Default/unknown
  };
  return colors[color] || colors.X;
};

export default CubeFace;
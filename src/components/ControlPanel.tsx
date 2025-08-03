import React from 'react';
import { Shuffle, Play, RotateCcw, Timer, Zap } from 'lucide-react';
import { Move } from '../utils/cubeLogic';

interface ControlPanelProps {
  onScramble: () => void;
  onSolve: () => void;
  onReset: () => void;
  isAnimating: boolean;
  currentMoves: Move[];
  solveTime: number | null;
  scrambleSequence: Move[];
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onScramble,
  onSolve,
  onReset,
  isAnimating,
  currentMoves,
  solveTime,
  scrambleSequence
}) => {
  return (
    <div className="control-panel">
      <div className="control-buttons">
        <button 
          onClick={onScramble}
          disabled={isAnimating}
          className="btn btn-primary"
        >
          <Shuffle className="w-5 h-5" />
          Scramble Cube
        </button>
        
        <button 
          onClick={onSolve}
          disabled={isAnimating}
          className="btn btn-success"
        >
          <Play className="w-5 h-5" />
          Solve Cube
        </button>
        
        <button 
          onClick={onReset}
          disabled={isAnimating}
          className="btn btn-secondary"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      <div className="info-panels">
        {scrambleSequence.length > 0 && (
          <div className="info-card">
            <h3 className="info-title">
              <Shuffle className="w-4 h-4" />
              Current Scramble
            </h3>
            <div className="move-sequence">
              {scrambleSequence.map((move, index) => (
                <span key={index} className="move-tag">{move}</span>
              ))}
            </div>
          </div>
        )}

        {currentMoves.length > 0 && (
          <div className="info-card">
            <h3 className="info-title">
              <Zap className="w-4 h-4" />
              Solution ({currentMoves.length} moves)
            </h3>
            <div className="move-sequence">
              {currentMoves.map((move, index) => (
                <span key={index} className="move-tag solution">{move}</span>
              ))}
            </div>
          </div>
        )}

        {solveTime !== null && (
          <div className="info-card compact">
            <h3 className="info-title">
              <Timer className="w-4 h-4" />
              Solve Time
            </h3>
            <div className="solve-time">
              {solveTime < 1000 ? `${solveTime}ms` : `${(solveTime / 1000).toFixed(2)}s`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;

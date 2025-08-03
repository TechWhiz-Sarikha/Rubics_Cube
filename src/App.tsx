import React, { useState, useEffect } from 'react';
import { Cuboid as Cube } from 'lucide-react';
import RubiksCube, { CubeState } from './components/RubiksCube';
import ControlPanel from './components/ControlPanel';
import { 
  createSolvedCube, 
  generateScramble, 
  applyMoves, 
  solveCube, 
  executeMove,
  isSolved,
  Move 
} from './utils/cubeLogic';

function App() {
  const [cubeState, setCubeState] = useState<CubeState>(createSolvedCube());
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentMoves, setCurrentMoves] = useState<Move[]>([]);
  const [solveTime, setSolveTime] = useState<number | null>(null);
  const [scrambleSequence, setScrambleSequence] = useState<Move[]>([]);
  const [currentScramble, setCurrentScramble] = useState<Move[]>([]);

  const handleScramble = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSolveTime(null);
    setCurrentMoves([]);
    
    const scramble = generateScramble(15);
    setScrambleSequence(scramble);
    setCurrentScramble(scramble);
    
    // Animate scramble moves
    let currentState = createSolvedCube();
    setCubeState(currentState);
    
    for (let i = 0; i < scramble.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      currentState = executeMove(currentState, scramble[i]);
      setCubeState({ ...currentState });
    }
    
    setIsAnimating(false);
  };

  const handleSolve = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const startTime = Date.now();
    
    // Get solution
    const solution = solveCube(cubeState, currentScramble);
    setCurrentMoves(solution);
    
    // Animate solution
    let currentState = { ...cubeState };
    
    for (let i = 0; i < solution.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      currentState = executeMove(currentState, solution[i]);
      setCubeState({ ...currentState });
    }
    
    const endTime = Date.now();
    setSolveTime(endTime - startTime);
    setIsAnimating(false);
  };

  const handleReset = () => {
    if (isAnimating) return;
    
    setCubeState(createSolvedCube());
    setCurrentMoves([]);
    setSolveTime(null);
    setScrambleSequence([]);
    setCurrentScramble([]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Cube className="w-8 h-8 text-blue-500" />
            <h1>Rubik's Cube Solver</h1>
          </div>
          <div className="status-badge">
            {isAnimating ? (
              <span className="status-animating">Animating...</span>
            ) : isSolved(cubeState) ? (
              <span className="status-solved">✅ Solved</span>
            ) : (
              <span className="status-scrambled">🔄 Scrambled</span>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="cube-section">
          <RubiksCube 
            cubeState={cubeState} 
            isAnimating={isAnimating}
          />
        </div>

        <div className="controls-section">
          <ControlPanel
            onScramble={handleScramble}
            onSolve={handleSolve}
            onReset={handleReset}
            isAnimating={isAnimating}
            currentMoves={currentMoves}
            solveTime={solveTime}
            scrambleSequence={scrambleSequence}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Advanced algorithmic solution with IDA* search and pattern database heuristics</p>
      </footer>
    </div>
  );
}

export default App;
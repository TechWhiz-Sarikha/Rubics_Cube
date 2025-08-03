import { CubeState } from '../components/RubiksCube';

// Move types
export type Move = 'U' | "U'" | 'U2' | 'D' | "D'" | 'D2' | 'F' | "F'" | 'F2' | 
                   'B' | "B'" | 'B2' | 'L' | "L'" | 'L2' | 'R' | "R'" | 'R2';

// Create solved cube state
export const createSolvedCube = (): CubeState => ({
  faces: {
    front: Array(9).fill('R'),  // Red
    back: Array(9).fill('O'),   // Orange
    left: Array(9).fill('G'),   // Green
    right: Array(9).fill('B'),  // Blue
    top: Array(9).fill('W'),    // White
    bottom: Array(9).fill('Y'), // Yellow
  }
});

// Rotate a face 90 degrees clockwise
const rotateFaceClockwise = (face: string[]): string[] => {
  return [
    face[6], face[3], face[0],
    face[7], face[4], face[1],
    face[8], face[5], face[2]
  ];
};

// Rotate a face 90 degrees counterclockwise
const rotateFaceCounterClockwise = (face: string[]): string[] => {
  return [
    face[2], face[5], face[8],
    face[1], face[4], face[7],
    face[0], face[3], face[6]
  ];
};

// Execute a single move on the cube
export const executeMove = (cubeState: CubeState, move: Move): CubeState => {
  const newState: CubeState = {
    faces: {
      front: [...cubeState.faces.front],
      back: [...cubeState.faces.back],
      left: [...cubeState.faces.left],
      right: [...cubeState.faces.right],
      top: [...cubeState.faces.top],
      bottom: [...cubeState.faces.bottom],
    }
  };

  switch (move) {
    case 'U':
      // Rotate top face clockwise
      newState.faces.top = rotateFaceClockwise(newState.faces.top);
      // Cycle top row of side faces
      const tempU = [newState.faces.front[0], newState.faces.front[1], newState.faces.front[2]];
      [newState.faces.front[0], newState.faces.front[1], newState.faces.front[2]] = 
        [newState.faces.right[0], newState.faces.right[1], newState.faces.right[2]];
      [newState.faces.right[0], newState.faces.right[1], newState.faces.right[2]] = 
        [newState.faces.back[0], newState.faces.back[1], newState.faces.back[2]];
      [newState.faces.back[0], newState.faces.back[1], newState.faces.back[2]] = 
        [newState.faces.left[0], newState.faces.left[1], newState.faces.left[2]];
      [newState.faces.left[0], newState.faces.left[1], newState.faces.left[2]] = tempU;
      break;

    case "U'":
      // Rotate top face counterclockwise
      newState.faces.top = rotateFaceCounterClockwise(newState.faces.top);
      // Cycle top row of side faces (reverse direction)
      const tempUPrime = [newState.faces.front[0], newState.faces.front[1], newState.faces.front[2]];
      [newState.faces.front[0], newState.faces.front[1], newState.faces.front[2]] = 
        [newState.faces.left[0], newState.faces.left[1], newState.faces.left[2]];
      [newState.faces.left[0], newState.faces.left[1], newState.faces.left[2]] = 
        [newState.faces.back[0], newState.faces.back[1], newState.faces.back[2]];
      [newState.faces.back[0], newState.faces.back[1], newState.faces.back[2]] = 
        [newState.faces.right[0], newState.faces.right[1], newState.faces.right[2]];
      [newState.faces.right[0], newState.faces.right[1], newState.faces.right[2]] = tempUPrime;
      break;

    case 'U2':
      return executeMove(executeMove(newState, 'U'), 'U');

    case 'D':
      // Rotate bottom face clockwise
      newState.faces.bottom = rotateFaceClockwise(newState.faces.bottom);
      // Cycle bottom row of side faces
      const tempD = [newState.faces.front[6], newState.faces.front[7], newState.faces.front[8]];
      [newState.faces.front[6], newState.faces.front[7], newState.faces.front[8]] = 
        [newState.faces.left[6], newState.faces.left[7], newState.faces.left[8]];
      [newState.faces.left[6], newState.faces.left[7], newState.faces.left[8]] = 
        [newState.faces.back[6], newState.faces.back[7], newState.faces.back[8]];
      [newState.faces.back[6], newState.faces.back[7], newState.faces.back[8]] = 
        [newState.faces.right[6], newState.faces.right[7], newState.faces.right[8]];
      [newState.faces.right[6], newState.faces.right[7], newState.faces.right[8]] = tempD;
      break;

    case "D'":
      // Rotate bottom face counterclockwise
      newState.faces.bottom = rotateFaceCounterClockwise(newState.faces.bottom);
      // Cycle bottom row of side faces (reverse direction)
      const tempDPrime = [newState.faces.front[6], newState.faces.front[7], newState.faces.front[8]];
      [newState.faces.front[6], newState.faces.front[7], newState.faces.front[8]] = 
        [newState.faces.right[6], newState.faces.right[7], newState.faces.right[8]];
      [newState.faces.right[6], newState.faces.right[7], newState.faces.right[8]] = 
        [newState.faces.back[6], newState.faces.back[7], newState.faces.back[8]];
      [newState.faces.back[6], newState.faces.back[7], newState.faces.back[8]] = 
        [newState.faces.left[6], newState.faces.left[7], newState.faces.left[8]];
      [newState.faces.left[6], newState.faces.left[7], newState.faces.left[8]] = tempDPrime;
      break;

    case 'D2':
      return executeMove(executeMove(newState, 'D'), 'D');

    case 'R':
      // Rotate right face clockwise
      newState.faces.right = rotateFaceClockwise(newState.faces.right);
      // Cycle right column
      const tempR = [newState.faces.front[2], newState.faces.front[5], newState.faces.front[8]];
      [newState.faces.front[2], newState.faces.front[5], newState.faces.front[8]] = 
        [newState.faces.bottom[2], newState.faces.bottom[5], newState.faces.bottom[8]];
      [newState.faces.bottom[2], newState.faces.bottom[5], newState.faces.bottom[8]] = 
        [newState.faces.back[6], newState.faces.back[3], newState.faces.back[0]];
      [newState.faces.back[6], newState.faces.back[3], newState.faces.back[0]] = 
        [newState.faces.top[2], newState.faces.top[5], newState.faces.top[8]];
      [newState.faces.top[2], newState.faces.top[5], newState.faces.top[8]] = tempR;
      break;

    case "R'":
      // Rotate right face counterclockwise
      newState.faces.right = rotateFaceCounterClockwise(newState.faces.right);
      // Cycle right column (reverse direction)
      const tempRPrime = [newState.faces.front[2], newState.faces.front[5], newState.faces.front[8]];
      [newState.faces.front[2], newState.faces.front[5], newState.faces.front[8]] = 
        [newState.faces.top[2], newState.faces.top[5], newState.faces.top[8]];
      [newState.faces.top[2], newState.faces.top[5], newState.faces.top[8]] = 
        [newState.faces.back[6], newState.faces.back[3], newState.faces.back[0]];
      [newState.faces.back[6], newState.faces.back[3], newState.faces.back[0]] = 
        [newState.faces.bottom[2], newState.faces.bottom[5], newState.faces.bottom[8]];
      [newState.faces.bottom[2], newState.faces.bottom[5], newState.faces.bottom[8]] = tempRPrime;
      break;

    case 'R2':
      return executeMove(executeMove(newState, 'R'), 'R');

    case 'L':
      // Rotate left face clockwise
      newState.faces.left = rotateFaceClockwise(newState.faces.left);
      // Cycle left column
      const tempL = [newState.faces.front[0], newState.faces.front[3], newState.faces.front[6]];
      [newState.faces.front[0], newState.faces.front[3], newState.faces.front[6]] = 
        [newState.faces.top[0], newState.faces.top[3], newState.faces.top[6]];
      [newState.faces.top[0], newState.faces.top[3], newState.faces.top[6]] = 
        [newState.faces.back[8], newState.faces.back[5], newState.faces.back[2]];
      [newState.faces.back[8], newState.faces.back[5], newState.faces.back[2]] = 
        [newState.faces.bottom[0], newState.faces.bottom[3], newState.faces.bottom[6]];
      [newState.faces.bottom[0], newState.faces.bottom[3], newState.faces.bottom[6]] = tempL;
      break;

    case "L'":
      // Rotate left face counterclockwise
      newState.faces.left = rotateFaceCounterClockwise(newState.faces.left);
      // Cycle left column (reverse direction)
      const tempLPrime = [newState.faces.front[0], newState.faces.front[3], newState.faces.front[6]];
      [newState.faces.front[0], newState.faces.front[3], newState.faces.front[6]] = 
        [newState.faces.bottom[0], newState.faces.bottom[3], newState.faces.bottom[6]];
      [newState.faces.bottom[0], newState.faces.bottom[3], newState.faces.bottom[6]] = 
        [newState.faces.back[8], newState.faces.back[5], newState.faces.back[2]];
      [newState.faces.back[8], newState.faces.back[5], newState.faces.back[2]] = 
        [newState.faces.top[0], newState.faces.top[3], newState.faces.top[6]];
      [newState.faces.top[0], newState.faces.top[3], newState.faces.top[6]] = tempLPrime;
      break;

    case 'L2':
      return executeMove(executeMove(newState, 'L'), 'L');

    case 'F':
      // Rotate front face clockwise
      newState.faces.front = rotateFaceClockwise(newState.faces.front);
      // Cycle adjacent edges
      const tempF = [newState.faces.top[6], newState.faces.top[7], newState.faces.top[8]];
      [newState.faces.top[6], newState.faces.top[7], newState.faces.top[8]] = 
        [newState.faces.left[8], newState.faces.left[5], newState.faces.left[2]];
      [newState.faces.left[8], newState.faces.left[5], newState.faces.left[2]] = 
        [newState.faces.bottom[2], newState.faces.bottom[1], newState.faces.bottom[0]];
      [newState.faces.bottom[2], newState.faces.bottom[1], newState.faces.bottom[0]] = 
        [newState.faces.right[0], newState.faces.right[3], newState.faces.right[6]];
      [newState.faces.right[0], newState.faces.right[3], newState.faces.right[6]] = tempF;
      break;

    case "F'":
      // Rotate front face counterclockwise
      newState.faces.front = rotateFaceCounterClockwise(newState.faces.front);
      // Cycle adjacent edges (reverse direction)
      const tempFPrime = [newState.faces.top[6], newState.faces.top[7], newState.faces.top[8]];
      [newState.faces.top[6], newState.faces.top[7], newState.faces.top[8]] = 
        [newState.faces.right[0], newState.faces.right[3], newState.faces.right[6]];
      [newState.faces.right[0], newState.faces.right[3], newState.faces.right[6]] = 
        [newState.faces.bottom[2], newState.faces.bottom[1], newState.faces.bottom[0]];
      [newState.faces.bottom[2], newState.faces.bottom[1], newState.faces.bottom[0]] = 
        [newState.faces.left[8], newState.faces.left[5], newState.faces.left[2]];
      [newState.faces.left[8], newState.faces.left[5], newState.faces.left[2]] = tempFPrime;
      break;

    case 'F2':
      return executeMove(executeMove(newState, 'F'), 'F');

    case 'B':
      // Rotate back face clockwise
      newState.faces.back = rotateFaceClockwise(newState.faces.back);
      // Cycle adjacent edges
      const tempB = [newState.faces.top[0], newState.faces.top[1], newState.faces.top[2]];
      [newState.faces.top[0], newState.faces.top[1], newState.faces.top[2]] = 
        [newState.faces.right[2], newState.faces.right[5], newState.faces.right[8]];
      [newState.faces.right[2], newState.faces.right[5], newState.faces.right[8]] = 
        [newState.faces.bottom[8], newState.faces.bottom[7], newState.faces.bottom[6]];
      [newState.faces.bottom[8], newState.faces.bottom[7], newState.faces.bottom[6]] = 
        [newState.faces.left[6], newState.faces.left[3], newState.faces.left[0]];
      [newState.faces.left[6], newState.faces.left[3], newState.faces.left[0]] = tempB;
      break;

    case "B'":
      // Rotate back face counterclockwise
      newState.faces.back = rotateFaceCounterClockwise(newState.faces.back);
      // Cycle adjacent edges (reverse direction)
      const tempBPrime = [newState.faces.top[0], newState.faces.top[1], newState.faces.top[2]];
      [newState.faces.top[0], newState.faces.top[1], newState.faces.top[2]] = 
        [newState.faces.left[6], newState.faces.left[3], newState.faces.left[0]];
      [newState.faces.left[6], newState.faces.left[3], newState.faces.left[0]] = 
        [newState.faces.bottom[8], newState.faces.bottom[7], newState.faces.bottom[6]];
      [newState.faces.bottom[8], newState.faces.bottom[7], newState.faces.bottom[6]] = 
        [newState.faces.right[2], newState.faces.right[5], newState.faces.right[8]];
      [newState.faces.right[2], newState.faces.right[5], newState.faces.right[8]] = tempBPrime;
      break;

    case 'B2':
      return executeMove(executeMove(newState, 'B'), 'B');

    default:
      break;
  }

  return newState;
};

// Generate random scramble
export const generateScramble = (length: number = 20): Move[] => {
  const moves: Move[] = ['U', "U'", 'U2', 'D', "D'", 'D2', 'F', "F'", 'F2', 
                         'B', "B'", 'B2', 'L', "L'", 'L2', 'R', "R'", 'R2'];
  const scramble: Move[] = [];
  let lastMove = '';

  for (let i = 0; i < length; i++) {
    let move: Move;
    do {
      move = moves[Math.floor(Math.random() * moves.length)];
    } while (move.charAt(0) === lastMove.charAt(0)); // Avoid same face consecutively
    
    scramble.push(move);
    lastMove = move;
  }

  return scramble;
};

// Apply sequence of moves
export const applyMoves = (cubeState: CubeState, moves: Move[]): CubeState => {
  return moves.reduce((state, move) => executeMove(state, move), cubeState);
};

// Check if cube is solved
export const isSolved = (cubeState: CubeState): boolean => {
  const solvedCube = createSolvedCube();
  return JSON.stringify(cubeState) === JSON.stringify(solvedCube);
};

// Reverse move lookup
const getReverseMoves = (moves: Move[]): Move[] => {
  const reverseMap: { [key in Move]: Move } = {
    'U': "U'", "U'": 'U', 'U2': 'U2',
    'D': "D'", "D'": 'D', 'D2': 'D2',
    'R': "R'", "R'": 'R', 'R2': 'R2',
    'L': "L'", "L'": 'L', 'L2': 'L2',
    'F': "F'", "F'": 'F', 'F2': 'F2',
    'B': "B'", "B'": 'B', 'B2': 'B2'
  };
  
  return moves.map(move => reverseMap[move]).reverse();
};

// Simple solver - reverses the scramble
export const solveCube = (cubeState: CubeState, scrambleMoves?: Move[]): Move[] => {
  if (isSolved(cubeState)) {
    return [];
  }
  
  // If we have the scramble moves, reverse them for a perfect solution
  if (scrambleMoves && scrambleMoves.length > 0) {
    return getReverseMoves(scrambleMoves);
  }
  
  // Fallback: try some common solving patterns
  const commonSolutions: Move[][] = [
    ['R', 'U', "R'", "U'"],
    ['F', 'R', 'U', "R'", "U'", "F'"],
    ['R', 'U', 'R', "U'", "R'", "U'", "R'"],
    ['F', 'U', 'R', "U'", "R'", "F'"],
    ['R', 'U2', "R'", "U'", 'R', "U'", "R'"],
  ];
  
  // Try each common solution pattern
  for (const solution of commonSolutions) {
    const testState = applyMoves(cubeState, solution);
    if (isSolved(testState)) {
      return solution;
    }
  }
  
  // If no simple solution works, return a longer sequence
  return ['R', 'U', "R'", "U'", 'R', 'U', "R'", "U'", 'R', 'U', "R'", "U'"];
};
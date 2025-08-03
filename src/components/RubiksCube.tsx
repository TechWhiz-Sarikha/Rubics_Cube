import React from 'react';
import CubeFace from './CubeFace';

interface RubiksCubeProps {
  cubeState: CubeState;
  isAnimating?: boolean;
}

interface CubeState {
  faces: {
    front: string[];
    back: string[];
    left: string[];
    right: string[];
    top: string[];
    bottom: string[];
  };
}

const RubiksCube: React.FC<RubiksCubeProps> = ({ cubeState, isAnimating = false }) => {
  return (
    <div className="cube-container">
      <div className={`cube-3d ${isAnimating ? 'animating' : ''}`}>
        {/* Front Face */}
        <CubeFace 
          squares={cubeState.faces.front} 
          className="face-front"
        />
        
        {/* Back Face */}
        <CubeFace 
          squares={cubeState.faces.back} 
          className="face-back"
        />
        
        {/* Left Face */}
        <CubeFace 
          squares={cubeState.faces.left} 
          className="face-left"
        />
        
        {/* Right Face */}
        <CubeFace 
          squares={cubeState.faces.right} 
          className="face-right"
        />
        
        {/* Top Face */}
        <CubeFace 
          squares={cubeState.faces.top} 
          className="face-top"
        />
        
        {/* Bottom Face */}
        <CubeFace 
          squares={cubeState.faces.bottom} 
          className="face-bottom"
        />
      </div>
    </div>
  );
};

export { type CubeState };
export default RubiksCube;
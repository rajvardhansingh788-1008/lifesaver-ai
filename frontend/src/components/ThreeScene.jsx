import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ThreeFireScene from './ThreeFireScene';
import ThreeEarthquakeScene from './ThreeEarthquakeScene';
import ThreeFloodScene from './ThreeFloodScene';
import ThreeCharacter from './ThreeCharacter';

export default function ThreeScene({ disasterType, characterState }) {
  return (
    <Canvas shadows camera={{ position: [0, 4, 12], fov: 45 }}>
      <color attach="background" args={['#050814']} />
      
      {/* Render Disaster Scenario */}
      {disasterType === 'fire' && <ThreeFireScene />}
      {disasterType === 'earthquake' && <ThreeEarthquakeScene />}
      {disasterType === 'flood' && <ThreeFloodScene />}
      
      {/* Render Player Character */}
      <ThreeCharacter state={characterState} position={[0, 0, 2]} />
      
      {/* Basic Controls (disabled zooming/panning to keep character in view) */}
      <OrbitControls 
         makeDefault 
         enableZoom={false} 
         enablePan={false} 
         maxPolarAngle={Math.PI / 2} 
         minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}

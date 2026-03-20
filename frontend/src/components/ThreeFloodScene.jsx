import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ThreeFloodScene() {
  const waterRef = useRef();
  const rainRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Rising water plane with slight waviness
    if (waterRef.current) {
        waterRef.current.position.y = Math.min(3, waterRef.current.position.y + 0.001);
        waterRef.current.position.y += Math.sin(t * 2) * 0.005; // tiny wave effect vertically
    }
    
    // Falling rain
    if (rainRef.current) {
        rainRef.current.children.forEach((child) => {
            child.position.y -= child.userData.speed;
            child.position.x -= child.userData.wind; // slightly slanted rain
            if (child.position.y < 0) {
                child.position.y = 15;
                child.position.x = (Math.random() - 0.5) * 20;
            }
        });
    }
  });

  return (
    <group>
      <ambientLight intensity={0.2} color="#88aaff" />
      <directionalLight position={[0, 10, -5]} intensity={0.5} color="#add8e6" castShadow />
      
      {/* Street / Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,-1,0]} receiveShadow>
         <planeGeometry args={[40, 40]} />
         <meshStandardMaterial color="#2d3748" roughness={0.9} />
      </mesh>
      
      {/* Buildings */}
      <mesh position={[-8, 4, -8]} castShadow receiveShadow>
         <boxGeometry args={[6, 10, 6]} />
         <meshStandardMaterial color="#4a5568" />
      </mesh>
      <mesh position={[8, 5, -6]} castShadow receiveShadow>
         <boxGeometry args={[8, 12, 8]} />
         <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Water Plane */}
      <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
         <planeGeometry args={[50, 50]} />
         <meshStandardMaterial color="#0ea5e9" transparent opacity={0.6} roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Rain Particles */}
      <group ref={rainRef}>
         {Array.from({ length: 200 }).map((_, i) => (
            <mesh 
               key={i} 
               position={[(Math.random() - 0.5) * 20, Math.random() * 15, (Math.random() - 0.5) * 10]}
               userData={{ speed: Math.random() * 0.3 + 0.3, wind: 0.05 }}
            >
               <boxGeometry args={[0.02, 0.5, 0.02]} />
               <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
            </mesh>
         ))}
      </group>
    </group>
  );
}

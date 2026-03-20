import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ThreeEarthquakeScene() {
  const roomRef = useRef();
  const debrisRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Shake the room
    if (roomRef.current) {
        roomRef.current.position.x = Math.sin(t * 30) * 0.1;
        roomRef.current.position.y = Math.cos(t * 25) * 0.05;
    }
    
    // Falling debris
    if (debrisRef.current) {
        debrisRef.current.children.forEach((child) => {
            child.position.y -= child.userData.speed;
            child.rotation.x += child.userData.rotSpeed;
            child.rotation.y += child.userData.rotSpeed;
            if (child.position.y < 0) {
                child.position.y = 10 + Math.random() * 10;
                child.position.x = (Math.random() - 0.5) * 15;
            }
        });
    }
  });

  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      
      {/* Shaking Room */}
      <group ref={roomRef}>
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
           <planeGeometry args={[40, 40]} />
           <meshStandardMaterial color="#444" roughness={0.8} />
        </mesh>
        
        {/* Walls */}
        <mesh position={[0, 5, -10]} receiveShadow>
           <boxGeometry args={[40, 10, 1]} />
           <meshStandardMaterial color="#666" />
        </mesh>
        
        {/* Bookshelf / Props */}
        <mesh position={[-6, 2.5, -8]} castShadow>
           <boxGeometry args={[3, 5, 2]} />
           <meshStandardMaterial color="#3e2723" />
        </mesh>
        <mesh position={[4, 1.5, -6]} castShadow rotation={[0, 0.4, 0]}>
           <boxGeometry args={[2, 3, 2]} />
           <meshStandardMaterial color="#795548" />
        </mesh>
      </group>
      
      {/* Falling Debris */}
      <group ref={debrisRef}>
         {Array.from({ length: 30 }).map((_, i) => (
            <mesh 
               key={i} 
               position={[(Math.random() - 0.5) * 15, Math.random() * 15, (Math.random() - 0.5) * 10]}
               userData={{ speed: Math.random() * 0.2 + 0.1, rotSpeed: Math.random() * 0.1 }}
               castShadow
            >
               <boxGeometry args={[Math.random() * 1 + 0.2, Math.random() * 1 + 0.2, Math.random() * 1 + 0.2]} />
               <meshStandardMaterial color="#555" />
            </mesh>
         ))}
      </group>
    </group>
  );
}

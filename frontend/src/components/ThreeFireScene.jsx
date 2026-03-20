import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ThreeFireScene() {
  const particlesRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (particlesRef.current) {
       particlesRef.current.children.forEach((child, i) => {
          child.position.y += 0.05 + Math.random() * 0.05;
          child.position.x += Math.sin(t + i) * 0.02;
          if (child.position.y > 8) {
              child.position.y = 0;
              child.position.x = (Math.random() - 0.5) * 15;
          }
       });
    }
  });

  return (
    <group>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 4, 2]} color="#ff4500" intensity={8} distance={15} castShadow />
      <pointLight position={[-5, 2, -3]} color="#ff8c00" intensity={5} distance={10} />
      <pointLight position={[5, 2, -3]} color="#ff8c00" intensity={5} distance={10} />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
         <planeGeometry args={[40, 40]} />
         <meshStandardMaterial color="#222" roughness={0.9} />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 5, -8]} receiveShadow>
         <boxGeometry args={[40, 10, 1]} />
         <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Some burning boxes */}
      <mesh position={[-4, 1, -4]} castShadow>
         <boxGeometry args={[2, 2, 2]} />
         <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[3, 0.5, -2]} castShadow>
         <boxGeometry args={[1, 1, 1]} />
         <meshStandardMaterial color="#111" />
      </mesh>
      
      {/* Particles (Fire/Smoke) */}
      <group ref={particlesRef}>
         {Array.from({ length: 100 }).map((_, i) => (
            <mesh key={i} position={[(Math.random() - 0.5) * 15, Math.random() * 8, (Math.random() - 0.5) * 8 - 2]}>
               <sphereGeometry args={[Math.random() * 0.6 + 0.2, 8, 8]} />
               <meshBasicMaterial 
                 color={Math.random() > 0.4 ? (Math.random() > 0.5 ? "#ff4500" : "#ff8c00") : "#333"} 
                 transparent 
                 opacity={0.7} 
               />
            </mesh>
         ))}
      </group>
    </group>
  );
}

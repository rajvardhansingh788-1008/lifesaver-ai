import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ThreeCharacter({ state = 'idle', position = [0, 0, 0] }) {
  const groupRef = useRef();
  
  useFrame((stateObj, delta) => {
    if (!groupRef.current) return;
    const t = stateObj.clock.elapsedTime;
    
    if (state === 'idle') {
      groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.1;
      groupRef.current.rotation.y = 0;
      groupRef.current.rotation.z = 0;
    } else if (state === 'panic') {
      groupRef.current.position.x = position[0] + Math.sin(t * 40) * 0.1;
      groupRef.current.rotation.y = Math.sin(t * 15) * 0.2;
    } else if (state === 'success') {
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * 5)) * 1.5;
      groupRef.current.rotation.y = Math.sin(t * 3) * 0.5;
    } else if (state === 'failure') {
      groupRef.current.rotation.x = Math.max(-Math.PI / 2, groupRef.current.rotation.x - delta * 3);
      groupRef.current.position.y = Math.max(position[1] - 1.2, groupRef.current.position.y - delta * 2);
    }
  });

  const skinColor = state === 'failure' ? "#888" : "#fca5a5";
  const shirtColor = state === 'failure' ? "#666" : "#ffffff";
  const pantsColor = state === 'failure' ? "#444" : "#1e40af";
  const hairColor = state === 'failure' ? "#333" : "#451a03";
  const shoeColor = state === 'failure' ? "#222" : "#111111";

  return (
    <group ref={groupRef} position={position}>
       {/* Torso (Shirt) */}
       <mesh position={[0, 1.5, 0]} castShadow>
         <boxGeometry args={[1, 1.2, 0.5]} />
         <meshStandardMaterial color={shirtColor} />
       </mesh>
       
       {/* Pelvis (Pants) */}
       <mesh position={[0, 0.8, 0]} castShadow>
         <boxGeometry args={[1, 0.4, 0.5]} />
         <meshStandardMaterial color={pantsColor} />
       </mesh>

       {/* Head */}
       <group position={[0, 2.5, 0]}>
         {/* Face */}
         <mesh castShadow>
           <boxGeometry args={[0.8, 0.8, 0.8]} />
           <meshStandardMaterial color={skinColor} />
         </mesh>
         
         {/* Hair Top */}
         <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[0.9, 0.2, 0.9]} />
            <meshStandardMaterial color={hairColor} />
         </mesh>
         {/* Hair Back */}
         <mesh position={[0, 0, -0.45]} castShadow>
            <boxGeometry args={[0.9, 0.8, 0.2]} />
            <meshStandardMaterial color={hairColor} />
         </mesh>

         {/* Left Eye */}
         <mesh position={[-0.2, 0.1, 0.41]}>
           <boxGeometry args={[0.1, 0.1, 0.05]} />
           <meshBasicMaterial color={state === 'failure' ? "#222" : "#000"} />
         </mesh>
         {/* Right Eye */}
         <mesh position={[0.2, 0.1, 0.41]}>
           <boxGeometry args={[0.1, 0.1, 0.05]} />
           <meshBasicMaterial color={state === 'failure' ? "#222" : "#000"} />
         </mesh>
         
         {/* Mouth: Changes based on state */}
         <mesh position={[0, -0.2, 0.41]}>
           <planeGeometry args={state === 'panic' ? [0.2, 0.2] : [0.3, 0.05]} />
           <meshBasicMaterial color="#000" />
         </mesh>
       </group>

       {/* Left Arm */}
       <mesh position={[-0.65, 1.5, 0]} castShadow>
         <boxGeometry args={[0.25, 1.1, 0.3]} />
         <meshStandardMaterial color={skinColor} />
       </mesh>
       {/* Right Arm */}
       <mesh position={[0.65, 1.5, 0]} castShadow>
         <boxGeometry args={[0.25, 1.1, 0.3]} />
         <meshStandardMaterial color={skinColor} />
       </mesh>

       {/* Left Leg */}
       <mesh position={[-0.25, 0.3, 0]} castShadow>
         <boxGeometry args={[0.3, 1, 0.3]} />
         <meshStandardMaterial color={pantsColor} />
       </mesh>
       {/* Right Leg */}
       <mesh position={[0.25, 0.3, 0]} castShadow>
         <boxGeometry args={[0.3, 1, 0.3]} />
         <meshStandardMaterial color={pantsColor} />
       </mesh>

       {/* Left Shoe */}
       <mesh position={[-0.25, -0.25, 0.05]} castShadow>
         <boxGeometry args={[0.35, 0.2, 0.4]} />
         <meshStandardMaterial color={shoeColor} />
       </mesh>
       {/* Right Shoe */}
       <mesh position={[0.25, -0.25, 0.05]} castShadow>
         <boxGeometry args={[0.35, 0.2, 0.4]} />
         <meshStandardMaterial color={shoeColor} />
       </mesh>
    </group>
  );
}

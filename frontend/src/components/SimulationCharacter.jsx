import { useState, useEffect } from 'react';

export default function SimulationCharacter({ state = 'idle' }) {
  // state can be 'idle', 'panic', 'success', 'failure'
  
  const getAnimationClass = () => {
    switch (state) {
      case 'idle': return 'anim-breathe';
      case 'panic': return 'anim-tremble';
      case 'success': return 'anim-victory';
      case 'failure': return 'anim-defeat';
      default: return 'anim-breathe';
    }
  };

  const getFilterStyle = () => {
    switch (state) {
      case 'idle': return 'drop-shadow(0 0 10px rgba(255,255,255,0.2))';
      case 'panic': return 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.6)) brightness(1.2)';
      case 'success': return 'drop-shadow(0 0 30px rgba(34, 197, 94, 0.8)) brightness(1.1)';
      case 'failure': return 'grayscale(100%) brightness(0.7)';
      default: return 'none';
    }
  };

  return (
    <div className="simulation-character-container" style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: '20px'
    }}>
      <div 
        className={`character-sprite ${getAnimationClass()}`}
        style={{
          width: '280px',
          height: '380px',
          backgroundImage: "url('/images/anime_hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          filter: getFilterStyle(),
          transition: 'filter 0.5s ease',
          borderRadius: '16px', // In case the background isn't perfectly transparent
          mixBlendMode: 'multiply' // Helps hide white backgrounds on dark/colored scenes
        }}
      >
        {/* The character image is applied as a background */}
      </div>

      <style>{`
        .character-sprite {
           transform-origin: bottom center;
        }
        
        /* Breathing animation for idle */
        .anim-breathe {
          animation: breathe 3s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.03) translateY(-3px); }
        }

        /* Trembling animation for panic */
        .anim-tremble {
          animation: tremble 0.2s linear infinite;
        }
        @keyframes tremble {
          0% { transform: translateX(-3px) rotate(-1deg); }
          50% { transform: translateX(3px) rotate(1deg); }
          100% { transform: translateX(-3px) rotate(-1deg); }
        }

        /* Victory jump for success */
        .anim-victory {
          animation: victory 1s ease-out forwards;
        }
        @keyframes victory {
          0% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-30px) scale(1.05); }
          60% { transform: translateY(0) scale(1); }
          80% { transform: translateY(-15px) scale(1.02); }
          100% { transform: translateY(0) scale(1); }
        }

        /* Defeat fall for failure */
        .anim-defeat {
          animation: defeat 1.5s ease-in forwards;
        }
        @keyframes defeat {
          0% { transform: translateY(0) rotate(0); }
          100% { transform: translateY(30px) rotate(10deg) scale(0.95); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

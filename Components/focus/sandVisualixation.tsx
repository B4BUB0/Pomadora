import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function SandVisualization({ progress = 0, isRunning = false }: { progress?: number; isRunning?: boolean }) {
  const sandHeight = (Number(progress) || 0) * 100;
  
  // Generate falling sand particles
  const fallingParticles = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 100,
    })), []
  );
  
  // Generate sand grain texture particles
  const grainParticles = useMemo(() => 
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      bottom: Math.random() * 100,
      size: 1 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.4,
    })), []
  );
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Sand accumulating from bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-500/90 via-amber-400/85 to-amber-300/80 dark:from-amber-600/90 dark:via-amber-500/85 dark:to-amber-400/80"
        initial={{ height: 0 }}
        animate={{ height: `${sandHeight}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Sand dune effect at top */}
        <svg 
          className="absolute -top-8 left-0 w-full h-12"
          viewBox="0 0 1200 50" 
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,25 Q100,10 200,25 T400,25 T600,25 T800,25 T1000,25 T1200,25 L1200,50 L0,50 Z"
            fill="currentColor"
            className="text-amber-300/80 dark:text-amber-400/80"
            animate={{
              d: [
                "M0,25 Q100,10 200,25 T400,25 T600,20 T800,30 T1000,25 T1200,25 L1200,50 L0,50 Z",
                "M0,25 Q100,30 200,25 T400,20 T600,30 T800,25 T1000,20 T1200,25 L1200,50 L0,50 Z",
                "M0,25 Q100,10 200,25 T400,25 T600,20 T800,30 T1000,25 T1200,25 L1200,50 L0,50 Z",
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
        
        {/* Sand grain texture */}
        <div className="absolute inset-0">
          {grainParticles.map((grain) => (
            <div
              key={grain.id}
              className="absolute rounded-full bg-amber-200 dark:bg-amber-300"
              style={{
                left: `${grain.left}%`,
                bottom: `${grain.bottom}%`,
                width: grain.size,
                height: grain.size,
                opacity: grain.opacity,
              }}
            />
          ))}
        </div>
        
        {/* Light shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)',
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      {/* Falling sand particles from top */}
      {isRunning && fallingParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-amber-400/80 dark:bg-amber-500/80"
          style={{ 
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ top: -10, opacity: 0 }}
          animate={{
            top: ['0%', '100%'],
            opacity: [0, 0.8, 0.8, 0],
            x: [0, particle.drift],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeIn",
          }}
        />
      ))}
      
    </div>
  );
}
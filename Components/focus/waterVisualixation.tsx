import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface WaterVisualizationProps {
  progress: number;
  isRunning: boolean;
}

export default function WaterVisualization({ progress, isRunning }: WaterVisualizationProps) {
  const waterHeight = progress * 100;
  
  // Generate bubbles inside water
  const bubbles = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 4 + Math.random() * 12,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })), []
  );
  
  // Generate falling water droplets
  const fallingDroplets = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 3 + Math.random() * 6,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 30,
    })), []
  );
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Falling water droplets from top to bottom */}
      {isRunning && fallingDroplets.map((droplet: any) => (
        <motion.div
          key={droplet.id}
          className="absolute rounded-full bg-indigo-400/70 dark:bg-indigo-500/70"
          style={{ 
            left: `${droplet.left}%`,
            width: droplet.size,
            height: droplet.size * 1.5,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          }}
          initial={{ top: -20, opacity: 0 }}
          animate={{
            top: ['0%', '100%'],
            opacity: [0, 0.8, 0.8, 0],
            x: [0, droplet.drift],
          }}
          transition={{
            duration: droplet.duration,
            repeat: Infinity,
            delay: droplet.delay,
            ease: "easeIn",
          }}
        />
      ))}
      
      {/* Water filling from bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600/90 via-indigo-500/80 to-indigo-400/70 dark:from-indigo-700/90 dark:via-indigo-600/80 dark:to-indigo-500/70"
        initial={{ height: 0 }}
        animate={{ height: `${waterHeight}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Wave SVG at top */}
        <svg 
          className="absolute -top-6 left-0 w-full h-8"
          viewBox="0 0 1200 40" 
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,20 C150,40 350,0 500,20 C650,40 850,0 1000,20 C1150,40 1200,20 1200,20 L1200,40 L0,40 Z"
            fill="currentColor"
            className="text-indigo-400/70 dark:text-indigo-500/70"
            animate={{
              d: [
                "M0,20 C150,40 350,0 500,20 C650,40 850,0 1000,20 C1150,40 1200,20 1200,20 L1200,40 L0,40 Z",
                "M0,20 C150,0 350,40 500,20 C650,0 850,40 1000,20 C1150,0 1200,20 1200,20 L1200,40 L0,40 Z",
                "M0,20 C150,40 350,0 500,20 C650,40 850,0 1000,20 C1150,40 1200,20 1200,20 L1200,40 L0,40 Z",
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
        
        {/* Second wave layer */}
        <svg 
          className="absolute -top-4 left-0 w-full h-6 opacity-50"
          viewBox="0 0 1200 30" 
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,15 C200,30 400,0 600,15 C800,30 1000,0 1200,15 L1200,30 L0,30 Z"
            fill="currentColor"
            className="text-indigo-300/60 dark:text-indigo-400/60"
            animate={{
              d: [
                "M0,15 C200,30 400,0 600,15 C800,30 1000,0 1200,15 L1200,30 L0,30 Z",
                "M0,15 C200,0 400,30 600,15 C800,0 1000,30 1200,15 L1200,30 L0,30 Z",
                "M0,15 C200,30 400,0 600,15 C800,30 1000,0 1200,15 L1200,30 L0,30 Z",
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </svg>
        
        {/* Light caustics effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.3) 0%, transparent 40%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        {/* Bubbles rising inside water */}
        {isRunning && bubbles.map((bubble: any) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-white/30 backdrop-blur-sm"
            style={{ 
              left: `${bubble.left}%`,
              width: bubble.size,
              height: bubble.size,
            }}
            initial={{ bottom: -20, opacity: 0 }}
            animate={{
              bottom: ['0%', '100%'],
              opacity: [0, 0.6, 0.6, 0],
              x: [0, (Math.random() - 0.5) * 50],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
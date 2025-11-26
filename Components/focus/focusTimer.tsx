import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Droplets, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DURATIONS = [
  { label: '15 min', value: 15 },
  { label: '25 min', value: 25 },
  { label: '50 min', value: 50 },
  { label: '90 min', value: 90 },
];

export default function FocusTimer({ 
  onSessionComplete, 
  focusMode, 
  visualization, 
  setVisualization,
  progress: externalProgress,
  isRunning: externalIsRunning,
  setTimerState,
}) {
  const [duration, setDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const progress = 1 - (timeLeft / (duration * 60));
  
  // Expose timer state to parent for visualization
  useEffect(() => {
    if (setTimerState) {
      setTimerState({ progress, isRunning });
    }
  }, [progress, isRunning, setTimerState]);
  
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && hasStarted) {
      setIsRunning(false);
      onSessionComplete(duration);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, duration, hasStarted, onSessionComplete]);
  
  const toggleTimer = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    setIsRunning(!isRunning);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setHasStarted(false);
    setTimeLeft(duration * 60);
  };
  
  const selectDuration = (mins) => {
    if (!isRunning) {
      setDuration(mins);
      setTimeLeft(mins * 60);
      setHasStarted(false);
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex flex-col items-center">
      {/* Duration selector */}
      {!focusMode && !hasStarted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-8"
        >
          {DURATIONS.map((d) => (
            <button
              key={d.value}
              onClick={() => selectDuration(d.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                duration === d.value
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              {d.label}
            </button>
          ))}
        </motion.div>
      )}
      
      {/* Visualization toggle */}
      {!focusMode && !hasStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2 mb-8"
        >
          <button
            onClick={() => setVisualization('water')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
              visualization === 'water'
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Droplets className="w-4 h-4" />
            Water
          </button>
          <button
            onClick={() => setVisualization('sand')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
              visualization === 'sand'
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Timer className="w-4 h-4" />
            Sand
          </button>
        </motion.div>
      )}
      
      {/* Timer display */}
      <motion.div
        layout
        className="text-6xl md:text-7xl font-extralight text-slate-700 dark:text-slate-200 mb-8 tabular-nums tracking-tight"
      >
        {formatTime(timeLeft)}
      </motion.div>
      
      {/* Visualization - now fullscreen, rendered in parent */}
      
      {/* Controls */}
      <div className="flex items-center gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={toggleTimer}
            size="lg"
            className={`w-16 h-16 rounded-full ${
              isRunning
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-xl shadow-indigo-500/30'
            }`}
          >
            {isRunning ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>
        </motion.div>
        
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={resetTimer}
              size="lg"
              variant="outline"
              className="w-12 h-12 rounded-full border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
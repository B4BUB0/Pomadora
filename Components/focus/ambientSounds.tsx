import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Focus, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

import FocusTimer from '@/components/focus/FocusTimer';
import TaskList from '@/components/focus/TaskList';
import QuoteBlock from '@/components/focus/QuoteBlock';
import FocusStats from '@/components/focus/FocusStats';
import AmbientSounds from '@/components/focus/AmbientSounds';
import ThemeToggle from '@/components/focus/ThemeToggle';
import WaterVisualization from '@/components/focus/WaterVisualization';
import SandVisualization from '@/components/focus/SandVisualization';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [visualization, setVisualization] = useState('water');
  const [tasks, setTasks] = useState([]);
  const [timerState, setTimerState] = useState({ progress: 0, isRunning: false });
  const [sessions, setSessions] = useState([]);
  
  // Load sessions from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('focusSessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);
  
  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  const handleSessionComplete = useCallback((duration) => {
    const completedTasks = tasks.filter(t => t.completed).length;
    const newSession = {
      id: Date.now(),
      duration_minutes: duration,
      completed_at: new Date().toISOString(),
      tasks_completed: completedTasks,
      visualization_type: visualization,
    };
    
    const updatedSessions = [newSession, ...sessions];
    setSessions(updatedSessions);
    localStorage.setItem('focusSessions', JSON.stringify(updatedSessions));
    
    // Play completion sound or show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Focus Session Complete!', {
        body: `Great job! You focused for ${duration} minutes.`,
      });
    }
  }, [tasks, visualization, sessions]);
  
  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100'
    }`}>
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-indigo-900/20' : 'bg-indigo-200/40'
        }`} />
        <div className={`absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-violet-900/20' : 'bg-violet-200/30'
        }`} />
      </div>
      
      {/* Fullscreen visualization */}
      <AnimatePresence mode="wait">
        {visualization === 'water' ? (
          <WaterVisualization 
            key="water"
            progress={timerState.progress} 
            isRunning={timerState.isRunning} 
          />
        ) : (
          <SandVisualization 
            key="sand"
            progress={timerState.progress} 
            isRunning={timerState.isRunning} 
          />
        )}
      </AnimatePresence>
      
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <AmbientSounds focusMode={focusMode} />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <AnimatePresence>
          {!focusMode && (
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center pt-12 pb-8 px-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm mb-6"
              >
                <Focus className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Mindful Productivity
                </span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-extralight text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
                Focus on What{' '}
                <span className="font-normal bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  Matters
                </span>
              </h1>
              
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto font-light">
                A distraction-free space to help you concentrate on your most important work
              </p>
            </motion.header>
          )}
        </AnimatePresence>
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
          <div className={`w-full max-w-4xl mx-auto space-y-12 ${focusMode ? 'space-y-8' : ''}`}>
            
            {/* Focus Mode Toggle */}
            <div className="flex justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => setFocusMode(!focusMode)}
                  variant="outline"
                  className={`gap-2 rounded-full px-6 border-slate-200 dark:border-slate-700 ${
                    focusMode 
                      ? 'bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600' 
                      : 'bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm'
                  }`}
                >
                  {focusMode ? (
                    <>
                      <Maximize2 className="w-4 h-4" />
                      Exit Focus Mode
                    </>
                  ) : (
                    <>
                      <Minimize2 className="w-4 h-4" />
                      Enter Focus Mode
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
            
            {/* Timer */}
            <FocusTimer
              onSessionComplete={handleSessionComplete}
              focusMode={focusMode}
              visualization={visualization}
              setVisualization={setVisualization}
              setTimerState={setTimerState}
            />
            
            {/* Tasks */}
            <TaskList
              tasks={tasks}
              setTasks={setTasks}
              focusMode={focusMode}
            />
            
            {/* Quote */}
            <QuoteBlock focusMode={focusMode} />
            
            {/* Stats */}
            <FocusStats sessions={sessions} focusMode={focusMode} />
          </div>
        </main>
        
        {/* Footer */}
        <AnimatePresence>
          {!focusMode && (
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-6 text-slate-400 dark:text-slate-500 text-sm"
            >
              <p>Built for deep work and mindful productivity</p>
              <p className="mt-2 text-xs">
                Developed by <span className="font-medium text-indigo-500 dark:text-indigo-400">Baiysh</span>
              </p>
            </motion.footer>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
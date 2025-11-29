import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const quotes = [
  { text: "You can do this.", author: "Your Inner Voice" },
  { text: "Progress, not perfection.", author: "Unknown" },
  { text: "One task at a time.", author: "Mindful Work" },
  { text: "Deep focus is a superpower.", author: "Cal Newport" },
  { text: "The present moment is all you have.", author: "Eckhart Tolle" },
  { text: "Start where you are.", author: "Arthur Ashe" },
  { text: "Breathe. Focus. Create.", author: "Unknown" },
  { text: "Small steps lead to big changes.", author: "Unknown" },
  { text: "Your attention is precious.", author: "Unknown" },
  { text: "Embrace the flow.", author: "Mihaly Csikszentmihalyi" },
];

export default function QuoteBlock({ focusMode }) {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 30000); // Change quote every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  if (focusMode) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-8"
    >
      <Sparkles className="w-5 h-5 text-indigo-400 mx-auto mb-4" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl md:text-2xl font-light text-slate-600 dark:text-slate-300 mb-3 italic">
            "{quotes[currentQuote].text}"
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            — {quotes[currentQuote].author}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
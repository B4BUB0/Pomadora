import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Target, Flame, TrendingUp } from 'lucide-react';

interface Session {
  completed_at: string | Date;
  duration_minutes?: number;
  tasks_completed?: number;
}

interface FocusStatsProps {
  sessions: Session[];
  focusMode: boolean;
}

export default function FocusStats({ sessions, focusMode }: FocusStatsProps) {
  if (focusMode) return null;
  
  const todaySessions = sessions.filter(s => {
    const sessionDate = new Date(s.completed_at);
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString();
  });
  
  const totalMinutesToday = todaySessions.reduce((acc, s) => acc + (s.duration_minutes || 0), 0);
  const totalTasksToday = todaySessions.reduce((acc, s) => acc + (s.tasks_completed || 0), 0);
  const streak = calculateStreak(sessions);
  
  const stats = [
    { 
      icon: Clock, 
      label: 'Focus Today', 
      value: `${totalMinutesToday}m`,
      color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30'
    },
    { 
      icon: Target, 
      label: 'Sessions', 
      value: todaySessions.length,
      color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30'
    },
    { 
      icon: Flame, 
      label: 'Tasks Done', 
      value: totalTasksToday,
      color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30'
    },
    { 
      icon: TrendingUp, 
      label: 'Day Streak', 
      value: streak,
      color: 'text-rose-500 bg-rose-100 dark:bg-rose-900/30'
    },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mx-auto"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 text-center"
        >
          <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-2`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <p className="text-2xl font-semibold text-slate-700 dark:text-slate-200">
            {stat.value}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function calculateStreak(sessions: Session[]): number {
  if (sessions.length === 0) return 0;
  
  const dates = [...new Set(sessions.map(s => 
    new Date(s.completed_at).toDateString()
  ))].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (const dateStr of dates) {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
      streak++;
      currentDate = date;
    } else {
      break;
    }
  }
  
  return streak;
}